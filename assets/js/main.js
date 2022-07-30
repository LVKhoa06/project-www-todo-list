// Refactor: Gộp hàm updateTodo ... 
// Priority: Medium

// Deadline todos : https://help.evernote.com/hc/en-us/articles/1500003792201-Set-a-due-date-for-a-task

const c = console.log;
//#region declare const 
const app = document.querySelector('app');
const fullSetting = document.querySelector('full');
const listNote = app.querySelector('list-note');
const inputNote = app.querySelector('.input-note');
const btnAddNote = app.querySelector('.btn-add');
const fullSettingContent = fullSetting.querySelector('content');
const iconPin = fullSetting.querySelector('.icon-pin');
const timeNote = fullSetting.querySelector('time');
const fullSettingClose = fullSetting.querySelector('close');
const iconRecycleBin = fullSetting.querySelector('.icon-recycle-bin');
const iconListColor = fullSetting.querySelector('.icon-list-color');
const iconCopy = fullSetting.querySelector('.icon-copy');

const CONST_LS_KEY = 'TODO-LIST';

const CONST_TODO_STATUS = {
    PENDING: 0,
    DOING: 1,
    COMPLETED: 2,
    CANCELED: -1
}
//#endregion declare const

const arrBtn = app.querySelector('#arr-btn');
const clearBtn = app.querySelector('#clear-btn');

const appOOP = {
    //#region declare
    onEdit: false, // Flag
    dataTodos: [],
    //#endregion declare

    render: function () {
        const htmls = this.dataTodos.map((item, index) => {
            return `
            <li class="item-note ${item.status == 2 ? 'strikethrough' : ''}" data-index="${item.id}" >
                <input class="checkbox-hide" type="checkbox" ${item.status == 2 ? 'checked' : ''}>
                <span class="checkbox-complete"></span>
                <span class="item-text">${item.text}</span>
                <button class="btn-delete">x</button>
                <i class="icon-save"></i>
                <i id="icon-full" class="fa-solid fa-expand"></i>
            </li>
                `;
        });
        listNote.innerHTML = htmls.join('');
    },

    testRender: function (e) {
        const id = e.target.parentNode.dataset.index;
        const todo = this.dataTodos.find(entry => entry.id === id);

        const htmlContent = `
                <li class="item-note bla ${todo.status == 2 ? 'strikethrough' : ''}" data-index="${todo.id}" >
                    <input class="checkbox-hide" type="checkbox" onclick="appOOP.strikethroughItem2(this)" ${todo.status == 2 ? 'checked' : ''}>
                    <span class="checkbox-complete"></span>
                    <span contenteditable="true" class="item-text">${todo.text}</span>
                    <i class="show icon-save" id="icon-save-inner" data-id="${id}" onclick="appOOP.updateTodo2(this)"></i>
                </li>
                `;
        timeNote.innerText = todo.date
        fullSettingContent.innerHTML = htmlContent;
    },

    inputValueLength: function () {
        return inputNote.value.length;
    },

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
        checkboxHide.onclick = this.strikethroughItem;
        icon.onclick = this.updateTodo;
        icon.onclick = this.clickIconTick;
        itemText.onclick = this.clickItem;
        fullIcon.onclick = this.clickIconFull;
        this.addTodo(id, itemText.innerText);

    }, // function createNote

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

    getTime: function () {
        const newTime = new Date();
        const minutes = newTime.getMinutes();
        const hours = newTime.getHours();
        const date = newTime.getDate();
        const month = newTime.getMonth() + 1;
        const year = newTime.getFullYear();

        function editTime(time) {
            return time < 10 ? `0${time}` : time;
        }

        return `${editTime(hours)}:${editTime(minutes)}.${editTime(date)}/${editTime(month)}/${year}`;
    },

    addTodo: function (id, todoText) {

        appOOP.dataTodos.push({
            id,
            text: todoText,
            date: appOOP.getTime(),
            status: CONST_TODO_STATUS.DOING,
        })
        c('Add');

        appOOP.localSet();
    }, // addTodo

    updateTodo2: function (btnSave) {
        const id = btnSave.dataset.id;
        const parent = btnSave.parentNode;
        const newText = parent.querySelector('.item-text').innerText;

        if (newText.trim().length < 1)
            return alert('Không được để note trống');

        // appOOP.updateOnEdit(false);

        appOOP.dataTodos = appOOP.dataTodos.map((item) => {
            if (item.id != id)
                return item;
            else
                return {
                    ...item,
                    text: newText
                } // return
        }) // map
        c('Update2');
        appOOP.render();
        appOOP.handleEvents();
        appOOP.localSet();
    }, // updateTodo

    updateTodo: function (e) {
        const ElmText = e.target.parentNode.querySelector('.item-text')
        const newText = ElmText.textContent;


        if (newText.trim().length < 1) {
            alert('Không được để note trống');
            return setTimeout(() => {
                ElmText.click(); // trigger
            }, 100);
        }

        appOOP.updateOnEdit(false);

        const id = e.target.parentNode.dataset.index;
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
        appOOP.localSet();
    }, // updateTodo

    deleteTodo: function (e) {

        if (appOOP.onEdit)
            return;

        const listElement = e.target.parentNode;
        const idDelete = listElement.dataset.index;
        e.target.parentNode.parentNode.removeChild(listElement);

        appOOP.dataTodos = appOOP.dataTodos.filter(item => item.id !== idDelete);
        appOOP.localSet();
        c(`Delete`);
    }, // deleteTodo

    strikethroughItem: function (e) {

        if (e.target.hasAttribute('checked')) {
            e.target.parentNode.classList.remove('strikethrough');
            e.target.removeAttribute('checked');
        } else {
            e.target.parentNode.classList.add('strikethrough');
            e.target.setAttribute('checked', '');
        }
        appOOP.todoStatus(e);
        appOOP.localSet();
    }, // strikethroughItem

    strikethroughItem2: function (elm) {

        if (elm.hasAttribute('checked')) {
            elm.parentNode.classList.remove('strikethrough');
            elm.removeAttribute('checked');
        } else {
            elm.parentNode.classList.add('strikethrough');
            elm.setAttribute('checked', '');
        }
        appOOP.todoStatus2(elm);
        appOOP.localSet();
    }, // strikethroughItem

    todoStatus: function (e) {
        const id = e.target.parentNode.dataset.index;
        const hasAtr = e.target.parentNode.querySelector('.checkbox-hide').hasAttribute('checked');

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
        appOOP.localSet();
    }, // todoStatus

    todoStatus2: function (elm) {
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
        appOOP.updateTodo2(elm);
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

        appOOP.updateTodo(e);
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
        appOOP.updateTodo(e);
        appOOP.testRender(e);

        fullSetting.classList.remove('hide');

    },

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

            appOOP.dataTodos = appOOP.dataTodos.filter(item => item.id !== id);
            appOOP.dataTodos.unshift(pinElm);

            appOOP.render();
            appOOP.handleEvents();
            appOOP.localSet();
        }

        arrBtn.onclick = function () {
            c(appOOP.dataTodos);
        } // iconPin

        iconCopy.onclick = (e) => {
            const id = e.target.parentNode.parentNode.parentNode.querySelector('.item-note').dataset.index;
            let dataCopy = appOOP.dataTodos.find(item => item.id === id);

            dataCopy = {
                ...dataCopy,
                id: `${Date.now()}`,
                date: appOOP.getTime()
            }
            
            appOOP.dataTodos.push(dataCopy);
            appOOP.localSet();
            appOOP.render();
            appOOP.handleEvents();
        }

        clearBtn.onclick = function () {
            localStorage.clear();
        }

        app.querySelectorAll('.btn-delete').forEach(btn => {
            btn.onclick = (e) => appOOP.deleteTodo(e);
        });

        app.querySelectorAll('.checkbox-hide').forEach(checkbox => {
            checkbox.onclick = (e) => appOOP.strikethroughItem(e);
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
    }, // handleEvent

    start() {
        this.dataTodos = this.localGet();

        setTimeout(() => {
            this.render();
            this.handleEvents();
        }, 1_000); // wait for reading ls in 1 seconds
    }, // start
} // appOOP

appOOP.start();
