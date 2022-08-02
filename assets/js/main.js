// parentNode => closset
// quá deadline chữ đỏ

const c = console.log;
//#region declare const 
const app = document.querySelector('app');
const fullSetting = document.querySelector('full');
const listNote = app.querySelector('list-note');
const listPin = app.querySelector('list-pin');
const inputNote = app.querySelector('.input-note');
const btnAddNote = app.querySelector('.btn-add');
const fullSettingContent = fullSetting.querySelector('content');
const headerFull = fullSetting.querySelector('header');
const iconPin = fullSetting.querySelector('.icon-pin');
const timeNote = fullSetting.querySelector('time');
const fullSettingClose = fullSetting.querySelector('close');
const iconRecycleBin = fullSetting.querySelector('.icon-recycle-bin');
const iconListColor = fullSetting.querySelector('.icon-list-color');
const iconCopy = fullSetting.querySelector('.icon-copy');
const inputColor = fullSetting.querySelector('.input-color');
const tabColor = fullSetting.querySelector('tab');
const btnCancel = fullSetting.querySelector('.btn-cancel');
const btnOk = fullSetting.querySelector('.btn-ok');
const inputDeadline = fullSetting.querySelector('.input-deadline');
const tabDeadline = fullSetting.querySelector('tab-deadline');

const CONST_LS_KEY = 'TODO-LIST';

const CONST_TODO_STATUS = {
    PENDING: 0,
    DOING: 1,
    COMPLETED: 2,
    CANCELED: -1
}
const colorDefault = 'var(--app-color-2)';
//#endregion declare const

const arrBtn = app.querySelector('#arr-btn');
const clearBtn = app.querySelector('#clear-btn');

const appOOP = {
    //#region declare
    onEdit: false, // Flag
    dataTodos: [],
    //#endregion declare

    render: function () {
        const htmlsTodos = this.dataTodos.map((item, index) => {
            if (item.pin == false) {
                return `
                <li style="border-color: ${item.color};" class="item-note ${item.status == 2 ? 'strikethrough' : ''}" data-index="${item.id}" >
                    <input class="checkbox-hide" type="checkbox" ${item.status == 2 ? 'checked' : ''}>
                    <span style="border-color: ${item.color};" class="checkbox-complete"></span>
                    <span class="item-text">${item.text}</span>
                    <button class="btn-delete">x</button>
                    <i class="icon-save"></i>
                    <i id="icon-full" class="fa-solid fa-expand"></i>
                </li>
                    `;
            }
        }).join('');

        const htmlPin = this.dataTodos.map((item, index) => {
            if (item.pin == true) {
                return `
                <li style="border-color: ${item.color};" class="item-note ${item.status == 2 ? 'strikethrough' : ''}" data-index="${item.id}" >
                    <input class="checkbox-hide" type="checkbox" ${item.status == 2 ? 'checked' : ''}>
                    <span style="border-color: ${item.color};" class="checkbox-complete"></span>
                    <span class="item-text">${item.text}</span>
                    <button class="btn-delete">x</button>
                    <i class="icon-save"></i>
                    <i id="icon-full" class="fa-solid fa-expand"></i>
                </li>
                    `;
            }
        }).join('');
        listPin.innerHTML = `
            <h3 class="title-pin">List Pin Note</h3>
        ${htmlPin}
        `;
        if (listPin.children.length < 2) {
            listPin.classList.add('hide');
        } else {
            listPin.classList.remove('hide');
        }
        listNote.innerHTML = htmlsTodos;
    },

    renderFullTodo: function (e) {
        const outerId = e.target.parentNode.dataset.index;
        const todo = this.dataTodos.find(entry => entry.id === outerId);

        const htmlContent = `
                <li class="item-note bla ${todo.status == 2 ? 'strikethrough' : ''}" data-index="${outerId}" >
                    <input class="checkbox-hide" type="checkbox" onclick="appOOP.strikethroughItem(this)" ${todo.status == 2 ? 'checked' : ''}>
                    <span style="border-color: ${todo.color};" class="checkbox-complete"></span>
                    <span contenteditable="true" class="item-text">${todo.text}</span>
                    <i class="show icon-save" id="icon-save-inner" onclick="appOOP.updateTodo(this)"></i>
                </li>
                `;
        timeNote.innerText = todo.date;
        fullSettingContent.innerHTML = htmlContent;
    },

    inputValueLength: function () {
        return inputNote.value.length;
    }, // inputValueLength

    createNote: function () {
        const id = `${Date.now()}`;
        let item, itemText, checkboxHide, checkboxShow, btn, icon, fullIcon;

        // Create item
        item = document.createElement("li");
        fullIcon = document.createElement("i");
        itemText = document.createElement("span");
        checkboxHide = document.createElement("input");
        checkboxShow = document.createElement("span");
        btn = document.createElement("button");
        icon = document.createElement('i');

        // Add attribute
        item.className = 'item-note';
        fullIcon.className = 'fa-solid fa-expand';
        itemText.className = 'item-text';
        btn.className = 'btn-delete';
        checkboxHide.className = 'checkbox-hide';
        checkboxShow.className = 'checkbox-complete';
        icon.className = 'icon-save';
        checkboxHide.setAttribute("type", "checkbox");
        item.setAttribute("data-index", id);
        fullIcon.setAttribute('id', 'icon-full')

        // Assign checkbox to item
        item.appendChild(checkboxHide);
        item.appendChild(checkboxShow);
        item.appendChild(fullIcon);

        // Add text
        itemText.innerText = inputNote.value;
        btn.appendChild(document.createTextNode("x"));

        // Assign element to item
        item.appendChild(itemText);
        item.appendChild(btn);
        item.appendChild(icon);

        // Add item to list
        listNote.appendChild(item);

        // After creating item then delete input value
        inputNote.value = "";

        btn.onclick = this.deleteTodo;
        checkboxHide.onclick = (e) => appOOP.strikethroughItem(e.target);
        icon.onclick = (e) => appOOP.updateTodo(e.target);
        icon.onclick = this.clickIconTick;
        itemText.onclick = this.clickItem;
        fullIcon.onclick = this.clickIconFull;
        this.addTodo(id, itemText.innerText);

    }, // createNote

    updateOnEdit: function (boolean) {
        if (boolean) {
            appOOP.onEdit = true;

            inputNote.setAttribute('disabled', true);
            btnAddNote.setAttribute('disabled', true);
        } else {
            appOOP.onEdit = false;

            inputNote.removeAttribute('disabled');
            btnAddNote.removeAttribute('disabled');
        }
    }, // updateOnEdit

    localSet: function () {
        localStorage.setItem(CONST_LS_KEY, JSON.stringify(appOOP.dataTodos));
    }, // localSet

    localGet: function () {
        const cached = localStorage.getItem(CONST_LS_KEY);
        if (cached)
            return JSON.parse(cached);

        return [];
    }, // localGet



    addTodo: function (id, todoText) {

        appOOP.dataTodos.push({
            id,
            text: todoText,
            date: getTime(),
            pin: false,
            deadline: 'DD/MM/YYYY',
            color: colorDefault,
            status: CONST_TODO_STATUS.DOING,
        })
        c('Add');

        appOOP.localSet();
    }, // addTodo

    updateTodo: function (elm) {
        const ElmText = elm.parentNode.querySelector('.item-text')
        const newText = ElmText.textContent;
        const id = elm.parentNode.dataset.index;


        if (newText.trim().length < 1) {
            alert('Không được để note trống');
            return setTimeout(() => {
                ElmText.click(); // trigger
            }, 100);
        }

        appOOP.updateOnEdit(false);

        appOOP.dataTodos = appOOP.dataTodos.map((item) => {
            if (item.id != id)
                return item;
            else
                return {
                    ...item,
                    text: newText
                } // return
        }) // map
        c('Update');
        appOOP.render();
        appOOP.handleEvents();
        appOOP.localSet();
    }, // updateTodo

    deleteTodo: function (e) {

        if (appOOP.onEdit)
            return;

        const listElement = e.target.parentNode;
        const idDelete = listElement.dataset.index;
        e.target.parentNode.parentNode.removeChild(listElement);

        if (listPin.children.length < 2) {
            listPin.classList.add('hide');
        } else {
            listPin.classList.remove('hide');
        }

        appOOP.dataTodos = appOOP.dataTodos.filter(item => item.id !== idDelete);
        appOOP.localSet();
        c(`Delete`);


    }, // deleteTodo

    strikethroughItem: function (elm) {

        if (elm.hasAttribute('checked')) {
            elm.parentNode.classList.remove('strikethrough');
            elm.removeAttribute('checked');
        } else {
            elm.parentNode.classList.add('strikethrough');
            elm.setAttribute('checked', '');
        }
        appOOP.todoStatus(elm);
        appOOP.localSet();
    }, // strikethroughItem

    todoStatus: function (elm) {
        const id = elm.parentNode.dataset.index;
        const hasAtr = elm.parentNode.querySelector('.checkbox-hide').hasAttribute('checked');

        if (hasAtr) {
            appOOP.dataTodos = appOOP.dataTodos.map((item) => {
                if (item.id != id) {
                    return item
                }
                return {
                    ...item,
                    status: CONST_TODO_STATUS.COMPLETED
                }
            })
        } else {
            appOOP.dataTodos = appOOP.dataTodos.map((item) => {
                if (item.id != id) {
                    return item
                }
                return {
                    ...item,
                    status: CONST_TODO_STATUS.DOING
                }
            })
        }
        appOOP.updateTodo(elm);
        appOOP.localSet();
    }, // todoStatus

    clickItem: function (e) {
        const btnDelete = e.target.parentNode.querySelector('.btn-delete');
        const btnSave = e.target.parentNode.querySelector('.icon-save');
        const idOuter = e.target.parentNode.dataset.index;

        if (appOOP.onEdit)
            return;

        Array.from(listNote.children).forEach((item) => {
            const btnDelete = item.querySelector('.btn-delete');
            const tick = item.querySelector('.checkbox-complete');
            const idInner = item.dataset.index;
            const fullIcon = item.querySelector('#icon-full');

            if (idInner !== idOuter) {
                tick.classList.add('lock-checkbox');
                btnDelete.classList.add('hide');
                fullIcon.classList.add('hide');
            }
        })

        appOOP.updateOnEdit(true);

        e.target.setAttribute('contenteditable', true);

        setTimeout(() => {
            e.target.focus();
        }, 50);

        // e.target.parentNode.classList.remove('strikethrough');
        e.target.parentNode.classList.add('focus-item');
        btnDelete.classList.add('hide');
        btnSave.classList.add('show');

    }, // clickItem

    clickIconTick: function (e) {
        const listElement = e.target.parentNode;
        const idOuter = e.target.parentNode.dataset.index;
        const btnDelete = listElement.querySelector('.btn-delete');
        const itemText = listElement.querySelector('.item-text');
        const iconSave = listElement.querySelector('.icon-save');

        itemText.removeAttribute('contenteditable');

        listElement.classList.remove('focus-item');
        btnDelete.classList.remove('hide');

        appOOP.updateTodo(e.target);
        iconSave.classList.remove('show');

        Array.from(listNote.children).forEach((item) => {
            const btnDelete = item.querySelector('.btn-delete');
            const checkboxShow = item.querySelector('.checkbox-complete');
            const fullIcon = item.querySelector('#icon-full');
            const idInner = item.dataset.index;

            if (idInner !== idOuter) {
                checkboxShow.classList.remove('lock-checkbox');
                btnDelete.classList.remove('hide');
                fullIcon.classList.remove('hide');
            }
        })

        appOOP.onEdit = false;
    }, // clickIconTick

    clickIconFull: function (e) {
        const note = e.target.parentNode
        const id = note.dataset.index;
        const pinElm = appOOP.dataTodos.find(item => item.id === id);

        appOOP.dataTodos.forEach(item => {
            if (item.id == id) {
                headerFull.style.backgroundColor = item.color;
                if (item.pin == true) {
                    iconPin.classList.add('pin-item');
                } else {
                    iconPin.classList.remove('pin-item');
                }
            }
        })

        fullSetting.classList.remove('hide');
        appOOP.updateTodo(e.target);
        appOOP.renderFullTodo(e);

    }, // clickIconFull

    handleEvents: function () {
        btnAddNote.onclick = () => {

            if (appOOP.inputValueLength() > 0) {
                appOOP.createNote();
            }
        } // btnAddNote.onclick

        inputNote.onkeypress = function (e) {
            if (appOOP.inputValueLength() > 0 && e.charCode === 13) {
                appOOP.createNote();
            }
        } // enterKey

        fullSettingClose.onclick = () => {
            fullSetting.classList.add('hide');
        } // fullSettingClose.

        iconRecycleBin.onclick = (e) => {
            const id = e.target.parentNode.parentNode.parentNode.querySelector('.item-note').dataset.index;

            appOOP.dataTodos = appOOP.dataTodos.filter((item) => item.id !== id);
            appOOP.localSet();

            fullSetting.classList.add('hide');

            Array.from(listNote.children).forEach((item) => {
                if (item.dataset.index === id) {
                    item.remove();
                }
            })
        } // iconRecycleBin

        iconPin.onclick = (e) => {
            const id = e.target.parentNode.parentNode.querySelector('.item-note').dataset.index;
            const pinElm = appOOP.dataTodos.find(item => item.id === id);

            iconPin.classList.toggle('pin-item');

            appOOP.dataTodos = appOOP.dataTodos.filter(item => item.id !== id);
            appOOP.dataTodos.push(pinElm);

            appOOP.dataTodos.forEach(item => {
                if (item.id == id) {
                    if (item.pin == true) {
                        pinElm.pin = false;
                    } else {
                        pinElm.pin = true;
                    }
                }
            }) // forEach

            appOOP.render();
            appOOP.handleEvents();
            appOOP.localSet();
        } // iconPin

        arrBtn.onclick = function () {
            c(appOOP.dataTodos);
        } // iconPin

        iconCopy.onclick = (e) => {
            const id = e.target.parentNode.parentNode.parentNode.querySelector('.item-note').dataset.index;
            let dataCopy = appOOP.dataTodos.find(item => item.id === id);

            dataCopy = {
                ...dataCopy,
                id: `${Date.now()}`,
                date: getTime()
            }
            appOOP.dataTodos.push(dataCopy);

            const dataCopyId = dataCopy.id;

            fullSetting.classList.add('hide');
            appOOP.localSet();
            appOOP.render();
            appOOP.handleEvents();

            Array.from(listNote.children).forEach((item) => {
                const textItem = item.querySelector('.item-text');

                if (dataCopyId == item.dataset.index) {
                    textItem.click();
                }
            })

        } // iconCopy

        inputColor.onclick = (e) => {
            e.stopPropagation();
            tabColor.classList.add('show');
        } // inputColor

        btnCancel.onclick = (e) => {
            tabColor.classList.remove('show');
        } // btnCancel

        btnOk.onclick = (e) => {
            const id = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.item-note').dataset.index;

            appOOP.dataTodos = appOOP.dataTodos.map(item => {
                if (item.id !== id)
                    return item;
                else
                    return {
                        ...item,
                        color: inputColor.value
                    }
            });

            app.querySelectorAll('.item-note').forEach(item => {

                if (item.dataset.index == id) {
                    item.querySelector('.checkbox-complete').style.borderColor = inputColor.value
                    item.style.borderColor = inputColor.value;
                    // item.style.backgroundColor = inputColor.value;
                }
            })

            headerFull.style.backgroundColor = inputColor.value;
            tabColor.classList.remove('show');

            appOOP.localSet()
        } // btnOk

        inputDeadline.onchange = (e) => {
            getDeadline(e);
        };
        // inputDeadline

        clearBtn.onclick = function () {
            localStorage.clear();
        } // clearBtn

        fullSetting.onclick = (e) => {
            tabColor.classList.remove('show');
        }

        app.querySelectorAll('.btn-delete').forEach(btn => {
            btn.onclick = (e) => appOOP.deleteTodo(e);
        });

        app.querySelectorAll('.checkbox-hide').forEach(checkbox => {
            checkbox.onclick = (e) => appOOP.strikethroughItem(e.target);
        });

        app.querySelectorAll('.item-text').forEach(text => {
            text.onclick = (e) => appOOP.clickItem(e)
        });

        app.querySelectorAll('.icon-save').forEach(icon => {
            icon.onclick = (e) => appOOP.clickIconTick(e);
        });

        app.querySelectorAll('#icon-full').forEach(icon => {
            icon.onclick = (e) => appOOP.clickIconFull(e);
        })
    }, // handleEvents

    start() {
        this.dataTodos = this.localGet();

        setTimeout(() => {
            this.render();
            this.handleEvents();
        }, 1_000); // wait for reading ls in 1 seconds
    }, // start
} // appOOP

appOOP.start();
