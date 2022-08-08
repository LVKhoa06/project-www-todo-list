//todo đi theo drag drop

// func move note + drag drop 

const c = console.log;
//#region declare const 
const app = document.querySelector('app');
const addNote = app.querySelector('add-note');
const fullSetting = document.querySelector('full');
const listNote = app.querySelector('list-note');
const listPin = app.querySelector('list-pin');
const inputNote = app.querySelector('.input-note');
const btnAddNote = app.querySelector('.btn-add');
const fullSettingContent = fullSetting.querySelector('content');
const headerFull = fullSetting.querySelector('header');
const iconPin = fullSetting.querySelector('.icon-pin');
const timeCreate = fullSetting.querySelector('time-create');
const timeDeadline = fullSetting.querySelector('deadline');
const fullSettingClose = fullSetting.querySelector('close');
const iconRecycleBin = fullSetting.querySelector('.icon-recycle-bin');
const iconListColor = fullSetting.querySelector('.icon-list-color');
const iconCopy = fullSetting.querySelector('.icon-copy');
const inputColor = fullSetting.querySelector('.input-color');
const tabColor = fullSetting.querySelector('tab');
const btnCancel = fullSetting.querySelector('.btn-cancel');
const btnOk = fullSetting.querySelector('.btn-ok');
const inputDeadline = fullSetting.querySelector('.input-deadline');
const foo = app.querySelector('#foo');

const CONST_LS_KEY = 'TODO-LIST';

const CONST_TODO_STATUS = {
    PENDING: 0,
    DOING: 1,
    COMPLETED: 2,
    CANCELED: -1,
    todo: '',

}
const colorDefault = 'var(--app-color-2)';
//#endregion declare const

const appOOP = {
    //#region declare
    onEdit: false, // Flag
    dataTodos: [],
    arrTest: [],
    toIndex: 0,
    //#endregion declare

    render: function () {
        const htmlsTodos = this.dataTodos.map((item, index) => {
            if (item.pin == false) {
                return `                
                <li draggable="true" style="border-color: ${item.color};" class="item-note ${item.status == 2 ? 'strikethrough' : ''}" data-index="${item.id}" >
                    <up-down>
                        <i class="icon-up-down icon-up fa-solid fa-caret-up"></i>
                        <i class="icon-up-down icon-down fa-solid fa-sort-down"></i>
                    </up-down>
                    <input class="checkbox-hide" type="checkbox" ${item.status == 2 ? 'checked' : ''}>
                    <span style="border-color: ${item.color};" class="checkbox-complete"></span>
                    <span ${item.outOfDate == true ? 'style="color:red;"' : ''} class="item-text">${item.text}</span>
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
                <li draggable="true" style="border-color: ${item.color};" class="item-note ${item.status == 2 ? 'strikethrough' : ''}" data-index="${item.id}" >
                    <up-down>
                        <i class="icon-up-down icon-up fa-solid fa-caret-up"></i>
                        <i class="icon-up-down icon-down fa-solid fa-sort-down"></i>
                    </up-down>  
                    <input class="checkbox-hide" type="checkbox" ${item.status == 2 ? 'checked' : ''}>
                    <span style="border-color: ${item.color};" class="checkbox-complete"></span>
                    <span  ${item.outOfDate == true ? 'style="color:red;"' : ''} class="item-text">${item.text}</span>
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
        const arrDeadline = todo.deadline.split('-');
        const arrDeadlineNumber = [Number(arrDeadline[0]), Number(arrDeadline[1]), Number(arrDeadline[2])];

        const htmlContent = `
                <li class="item-note bla ${todo.status == 2 ? 'strikethrough' : ''}" data-index="${outerId}" >
                    <input class="checkbox-hide" type="checkbox" onclick="appOOP.strikethroughItem(this)" ${todo.status == 2 ? 'checked' : ''}>
                    <span style="border-color: ${todo.color};" class="checkbox-complete"></span>
                    <span contenteditable="true" ${todo.outOfDate == true ? 'style="color:red;"' : ''} class="item-text">${todo.text}</span>
                    <i class="show icon-save" id="icon-save-inner" onclick="appOOP.updateTodo(this)"></i>
                </li>
                `;
        timeCreate.innerText = todo.date;
        timeDeadline.innerText = todo.deadline == '' ? '' : getDeadline(arrDeadlineNumber).text;

        fullSettingContent.innerHTML = htmlContent;
    },

    inputValueLength: function () {
        return inputNote.value.length;
    }, // inputValueLength

    createNote: function () {
        const id = `${Date.now()}`;
        let item, itemText, checkboxHide, checkboxShow, btn, icon, fullIcon, upDown, upIcon, downIcon;

        // Create item
        item = document.createElement("li");
        fullIcon = document.createElement("i");
        itemText = document.createElement("span");
        checkboxHide = document.createElement("input");
        checkboxShow = document.createElement("span");
        btn = document.createElement("button");
        icon = document.createElement('i');
        upDown = document.createElement('up-down');
        upIcon = document.createElement('i');
        downIcon = document.createElement('i');
        // Add attribute
        item.className = 'item-note';
        fullIcon.className = 'fa-solid fa-expand';
        itemText.className = 'item-text';
        btn.className = 'btn-delete';
        checkboxHide.className = 'checkbox-hide';
        checkboxShow.className = 'checkbox-complete';
        icon.className = 'icon-save';
        item.setAttribute("draggable", "true");
        checkboxHide.setAttribute("type", "checkbox");
        item.setAttribute("data-index", id);
        fullIcon.setAttribute('id', 'icon-full')
        upIcon.setAttribute('class', 'icon-up-down icon-up fa-solid fa-caret-up')
        downIcon.setAttribute('class', 'icon-up-down icon-down fa-solid fa-sort-down')

        // Assign checkbox to item
        item.appendChild(checkboxHide);
        item.appendChild(checkboxShow);
        item.appendChild(fullIcon);

        // Add text
        itemText.innerText = inputNote.value;
        btn.appendChild(document.createTextNode("x"));

        // Assign element to item
        item.appendChild(upDown);
        item.appendChild(itemText);
        item.appendChild(btn);
        item.appendChild(icon);

        upDown.appendChild(upIcon);
        upDown.appendChild(downIcon);

        // Add item to list
        listNote.appendChild(item);

        // After creating item then delete input value
        inputNote.value = "";

        item.ondragstart = (e) => this.todo = this.getElm(e);
        item.ondragenter = (e) => this.toIndex = this.getIndexTo(e);
        item.ondragend = (e) => this.dropElm(e);

        btn.onclick = this.deleteTodo;
        checkboxHide.onclick = (e) => this.strikethroughItem(e.target);
        icon.onclick = (e) => this.updateTodo(e.target);
        icon.onclick = this.clickIconTick;
        itemText.onclick = this.clickItem;
        fullIcon.onclick = this.clickIconFull;

        upIcon.onclick = (e) => this.moveNote(e, 'UP');
        downIcon.onclick = (e) => this.moveNote(e, 'DOWN');

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
            deadline: '',
            color: colorDefault,
            outOfDate: false,
            status: CONST_TODO_STATUS.DOING,
        });
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
        appOOP.reRender;
    }, // updateTodo

    deleteTodo: function (e) {

        if (appOOP.onEdit)
            return;

        const listElement = e.target.parentNode;
        const idDelete = listElement.dataset.index;
        listElement.parentNode.removeChild(listElement);

        if (listPin.children.length < 2) {
            listPin.classList.add('hide');
        } else {
            listPin.classList.remove('hide');
        }

        appOOP.dataTodos = appOOP.dataTodos.filter(item => item.id !== idDelete);
        appOOP.localSet();
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
            const upDown = item.querySelector('up-down');

            if (idInner !== idOuter) {
                tick.classList.add('lock-checkbox');
                btnDelete.classList.add('hide');
                fullIcon.classList.add('hide');
                upDown.classList.add('hide');
            }
        })

        appOOP.updateOnEdit(true);

        e.target.setAttribute('contenteditable', true);

        setTimeout(() => {
            e.target.focus();
        }, 50);

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

    sortData: function () {

        let time = getTimeToday();

        time = [
            editTime(time[0]),
            editTime(time[1]),
            time[2]
        ];

        const todayTxt = time.reverse().toString().replace(/,/g, '-');

        // primative: int, string <> object
        // helping func.
        function compareDate(a, b) {
            const deadlineProcessedA = a.deadline.split('-').reverse().join('-');
            const deadlineProcessedB = b.deadline.split('-').reverse().join('-');

            return (
                deadlineProcessedA < deadlineProcessedB ?
                    -1 :
                    deadlineProcessedA > deadlineProcessedB ?
                        1 :
                        0
            )
        } // compare

        let expiredTodos = [], notExpiredTodos = [];

        appOOP.dataTodos.forEach(item => {
            const deadlineProcessed = item.deadline.split('-').reverse();

            if (item.deadline == '' || deadlineProcessed.join('-') >= todayTxt) notExpiredTodos.push(item);
            else expiredTodos.push(item);
        }); // forEach

        const expiredTodosSorted = expiredTodos.sort(compareDate);

        appOOP.dataTodos = [...expiredTodosSorted, ...notExpiredTodos];

        appOOP.reRender;
    }, // sortData

    moveNote: function (e, direction) { // direction = 'UP' || 'DOWN'
        const id = e.target.closest('.item-note').dataset.index;
        const dataTodosLength = appOOP.dataTodos.length;
        const todo = appOOP.dataTodos.find(item => {
            return item.id === id;
        });

        const indexTodo = appOOP.dataTodos.indexOf(todo);

        if (direction === 'UP' && indexTodo === 0)
            return;
        if (direction === 'DOWN' && indexTodo === dataTodosLength - 1)
            return;

        appOOP.dataTodos = appOOP.dataTodos.filter(item => {
            return item.id !== id;
        }); // filter

        let newIndex = direction === 'UP' ? indexTodo - 1 : indexTodo + 1;

        appOOP.dataTodos.splice(newIndex, 0, todo);

        appOOP.reRender;
    }, // moveNote 

    get reRender() {
        appOOP.render();
        appOOP.handleEvents();
        appOOP.localSet();
    }, // reRender
    clientY: 0,
    getElm: function (e) {
        const id = e.target.closest('.item-note').dataset.index;
        const todo = appOOP.dataTodos.find(item => {
            return item.id === id;
        });
        foo.style.display = 'block';
        appOOP.clientY = e.clientY;
        return todo;
    },

    getIndexTo: function (e) {
        const item = e.target.closest('.item-note');
        const id = item.dataset.index;
        const marginBottomItem = Number(getComputedStyle(item).marginBottom.replace('px', ''));
        const todo = appOOP.dataTodos.find(item => {
            return item.id === id;
        });
        const listPinLength = listPin.childElementCount
        const indexTodo = appOOP.dataTodos.indexOf(todo);
        const computedAddNote = addNote.offsetHeight + Number(getComputedStyle(addNote).marginTop.replace('px', '')) + Number(getComputedStyle(listNote).marginTop.replace('px', '')) - foo.offsetHeight;
        const computedPin = listPin.offsetHeight + Number(getComputedStyle(listPin).marginTop.replace('px', '')) + Number(getComputedStyle(listPin).marginBottom.replace('px', ''));

        // let browserName = (function (agent) {
        //     switch (true) {
        //         // case agent.indexOf("edge") > -1: return "MS Edge";
        //         case agent.indexOf("edg/") > -1: return "Edge";
        //         case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
        //         case agent.indexOf("chrome") > -1 && !!window.chrome: return "Chrome";
        //         // case agent.indexOf("trident") > -1: return "MS IE";
        //         // case agent.indexOf("firefox") > -1: return "Mozilla Firefox";
        //         case agent.indexOf("safari") > -1: return "Safari";
        //         default: return "other";
        //     }
        // })(window.navigator.userAgent.toLowerCase());
        // const Num = browserName == "Edge" || CheckOperatingSystem() == 'Mac' ? 2 : 1;

        if (listPin.classList.contains('hide')) {
            if (e.clientY < appOOP.clientY) {
                foo.style.top = computedAddNote + (indexTodo * (item.offsetHeight + marginBottomItem));
            } else {
                foo.style.top = computedAddNote + ((indexTodo + 1) * (item.offsetHeight + marginBottomItem));
            }
        } else {

            if (e.clientY < appOOP.clientY) {
                foo.style.top = computedPin - Number(getComputedStyle(listNote).marginTop.replace('px', '')) + computedAddNote + ((indexTodo - (listPinLength - 2)) * (item.offsetHeight + marginBottomItem));
            }
            else {
                foo.style.top = computedPin - Number(getComputedStyle(listNote).marginTop.replace('px', '')) + computedAddNote + ((indexTodo - (listPinLength - 2) + 1) * (item.offsetHeight + marginBottomItem));
            }
        }
        return indexTodo;
    },

    dropElm: function (e) {
        const id = e.target.closest('.item-note').dataset.index;
        appOOP.dataTodos = appOOP.dataTodos.filter(item => {
            return item.id !== id;
        });

        appOOP.dataTodos.splice(appOOP.toIndex, 0, appOOP.todo);
        foo.style.display = 'none';
        foo.style.top = -1000;
        appOOP.reRender;
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
            const id = e.target.closest('advanced-edit').querySelector('.item-note').dataset.index;

            appOOP.dataTodos = appOOP.dataTodos.filter((item) => item.id !== id);
            appOOP.localSet();

            fullSetting.classList.add('hide');

            Array.from(listNote.children).forEach((item) => {
                if (item.dataset.index === id) {
                    item.remove();
                }
            });
        } // iconRecycleBin

        iconPin.onclick = (e) => {
            const id = e.target.closest('advanced-edit').querySelector('.item-note').dataset.index;
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

            appOOP.reRender;
        } // iconPin

        iconCopy.onclick = (e) => {
            const id = e.target.closest('advanced-edit').querySelector('.item-note').dataset.index;

            let dataCopy = appOOP.dataTodos.find(item => item.id === id);

            dataCopy = {
                ...dataCopy,
                id: `${Date.now()}`,
                date: getTime()
            }
            appOOP.dataTodos.push(dataCopy);

            const dataCopyId = dataCopy.id;

            fullSetting.classList.add('hide');
            appOOP.reRender;
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
            const id = e.target.closest('advanced-edit').querySelector('.item-note').dataset.index;

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
                }
            });

            headerFull.style.backgroundColor = inputColor.value;
            tabColor.classList.remove('show');

            appOOP.localSet()
        } // btnOk

        inputDeadline.onchange = (e) => {
            const wrapper = e.target.closest('advanced-edit');
            const textItem = wrapper.querySelector('.item-text');
            const id = wrapper.querySelector('.item-note').dataset.index;
            const arrDeadline = inputDeadline.value.split('-').reverse();
            const arrDeadlineNumber = [Number(arrDeadline[0]), Number(arrDeadline[1]), Number(arrDeadline[2])];
            const { totalDays, text } = getDeadline(arrDeadlineNumber);

            timeDeadline.innerText = text;

            appOOP.dataTodos = appOOP.dataTodos.map(item => {
                if (item.id !== id) {
                    return item
                } else {
                    return {
                        ...item,
                        deadline: inputDeadline.value.split('-').reverse().toString().replace(/,/g, '-')
                    }
                } // else
            }) // map

            if (totalDay(arrDeadlineNumber.toString()) < 0) {
                appOOP.dataTodos.forEach(item => {
                    if (item.id == id) {
                        item.outOfDate = true;
                    }
                }); // forEach

                textItem.style.color = 'red';

                Array.from(listNote.children).forEach(item => {
                    if (item.dataset.index == id) {
                        item.querySelector('.item-text').style.color = 'red';
                    }
                }); // Array.from
            } else {
                appOOP.dataTodos.forEach(item => {
                    if (item.id == id) {
                        item.outOfDate = false;
                    }
                }); // forEach

                textItem.style.color = 'var(--text-color-1)';

                Array.from(listNote.children).forEach(item => {
                    if (item.dataset.index == id) {
                        item.querySelector('.item-text').style.color = 'var(--text-color-1)';
                    }
                }); // Array.from
            } // else

            inputDeadline.value = arrDeadline.reverse().toString().replace(/,/g, '-');
            if (totalDays < 0)
                appOOP.sortData();

            appOOP.localSet();
        }
        // inputDeadline

        fullSetting.onclick = (e) => {
            tabColor.classList.remove('show');
        } // fullSetting

        app.querySelectorAll('.item-note').forEach(item => {

            item.ondragstart = (e) => appOOP.todo = appOOP.getElm(e);

            item.ondragenter = (e) => appOOP.toIndex = appOOP.getIndexTo(e);

            item.ondragend = (e) => appOOP.dropElm(e)

        }); // forEach

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
        });

        app.querySelectorAll('.icon-up').forEach(icon => {
            icon.onclick = (e) => {
                appOOP.moveNote(e, 'UP');
            }
        });

        app.querySelectorAll('.icon-down').forEach(icon => {
            icon.onclick = (e) => {
                appOOP.moveNote(e, 'DOWN');
            }
        });
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

