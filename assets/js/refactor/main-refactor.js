
const c = console.log;
//#region declare const 
const app = document.querySelector('app');
const addNote = app.querySelector('add-note');
const overlay = document.querySelector('overlay');
const listNote = app.querySelector('list-note');
const listPin = app.querySelector('list-pin');
const inputNote = app.querySelector('.input-note');
const btnAddNote = app.querySelector('.btn-add');
const anvancedEditContent = overlay.querySelector('content');
const headerAnvanceEdit = overlay.querySelector('header');
const iconPin = overlay.querySelector('.icon-pin');
const timeCreate = overlay.querySelector('time-create');
const timeDeadline = overlay.querySelector('deadline');
const closeAnvanceEdit = overlay.querySelector('close');
const iconRecycleBin = overlay.querySelector('.icon-recycle-bin');
const iconChangeColor = overlay.querySelector('.icon-list-color');
const iconCopy = overlay.querySelector('.icon-copy');
const inputColor = overlay.querySelector('.input-color');
const tabColor = overlay.querySelector('tab');
const btnCancel = overlay.querySelector('.btn-cancel');
const btnSubmitColor = overlay.querySelector('.btn-submit-color');
const inputDeadline = overlay.querySelector('.input-deadline');
const indicator1 = app.querySelector('#indicator1');
const indicator2 = app.querySelector('#indicator2');
const elmDrag = document.querySelector('.item-drag');

const CONST_LS_KEY = 'TODO-LIST';

const CONST_TODO_STATUS = {
    PENDING: 0,
    DOING: 1,
    COMPLETED: 2,
    CANCELED: -1,
}
const COLOR_DEFAULT = 'var(--app-color-1)';
//#endregion declare const

const appOOP = {
    //#region declare
    todo: '',
    onEdit: false, // Flag
    dataTodos: [],
    _data: [], // private property // accessed via GETTER / SETTER
    arrTest: [],
    fromIndex: 0,
    toIndex: 0,
    mouseDownPageY: 0,
    hasChildListNote: false,
    topUnpin: 0,
    topPin: 0,
    heightNote: 0,
    listNoteUnpin: [],
    listNotePin: [],
    itemOffsetY: 0,
    itemMove: [],
    //#endregion declare

    get data() {
        return this._data
    }, // getter
    set data(value) {
        this._data = value;

        // do stuff
        this.sortData();
        this.render();
        this.handleEvents();

        this.localSet();
    }, // setter

    render: function () {
        const htmlsTodos = this.dataTodos.map((item) => {
            if (item.pin == false) {
                return `                
                <li  style="border-color: ${item.color};" class="item-note ${item.status == 2 ? 'strikethrough' : ''}" data-index="${item.id}" >
                    <up-down draggable="true">
                        <i class="icon-drag fa-solid fa-grip-vertical"></i>
                    </up-down>
                    <input class="checkbox-hide" type="checkbox" ${item.status == 2 ? 'checked' : ''}>
                    <span style="border-color: ${item.color};" class="checkbox-complete"></span>
                    <span ${getTotalDaysDifferent(getCurrentTime_ISOformat(), item.date) < 0 ? 'style="color:red;"' : ''} class="item-text">${item.text}</span>
                    <button class="btn-delete">x</button>
                    <i class="icon-save"></i>
                    <i id="icon-full" class="fa-solid fa-expand"></i>
                    <div class="indicator-drag"></div>
                </li>
                    `;
            }
        }).join('');

        const htmlPin = this.dataTodos.map((item) => {
            if (item.pin == true) {
                return `
                <li style="border-color: ${item.color};" class="item-note ${item.status == 2 ? 'strikethrough' : ''}" data-index="${item.id}" >
                    <up-down draggable="true">
                        <i class="icon-drag fa-solid fa-grip-vertical"></i>
                    </up-down>  
                    <input class="checkbox-hide" type="checkbox" ${item.status == 2 ? 'checked' : ''}>
                    <span style="border-color: ${item.color};" class="checkbox-complete"></span>
                    <span  ${getTotalDaysDifferent(getCurrentTime_ISOformat(), item.date) < 0 ? 'style="color:red;"' : ''} class="item-text">${item.text}</span>
                    <button class="btn-delete">x</button>
                    <i class="icon-save"></i>
                    <i id="icon-full" class="fa-solid fa-expand"></i>
                    <div class="indicator-drag"></div>
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
    }, // render

    renderFullTodo: function (e) {
        const outerId = e.target.parentNode.dataset.index;
        const todo = this.dataTodos.find(entry => entry.id === outerId);
        const arrDeadline = todo.deadline.split('-');
        const arrDeadlineNumber = `${Number(arrDeadline[2])}-${Number(arrDeadline[1])}-${Number(arrDeadline[0])}` ;

        const htmlContent = `
                <li class="item-note bla ${todo.status == 2 ? 'strikethrough2' : ''}" data-index="${outerId}" >
                    <input class="checkbox-hide" type="checkbox" onclick="appOOP.strikethroughItem(this)" ${todo.status == 2 ? 'checked' : ''}>
                    <span style="border-color: ${todo.color};" class="checkbox-complete"></span>
                    <span contenteditable="true" ${getTotalDaysDifferent(getCurrentTime_ISOformat(), todo.date) < 0 ? 'style="color:red;"' : ''} class="item-text">${todo.text}</span>
                    <i class="show icon-save" id="icon-save-inner" onclick="appOOP.updateTodo(this)"></i>
                </li>
                `;
        timeCreate.innerText = todo.date;
        timeDeadline.innerText = todo.deadline == '' ? '' : getDeadline(arrDeadlineNumber).text;

        anvancedEditContent.innerHTML = htmlContent;
    }, // renderFullTodo

    inputValueLength: function () {
        return inputNote.value.length;
    }, // inputValueLength

    createNote: function () {
        const id = `${Date.now()}`;
        let item, itemText, checkboxHide, checkboxShow, btn, icon, fullIcon, upDown, dragIcon, indicatorDrag;

        // Create item
        item = document.createElement("li");
        indicatorDrag = document.createElement("div");
        fullIcon = document.createElement("i");
        itemText = document.createElement("span");
        checkboxHide = document.createElement("input");
        checkboxShow = document.createElement("span");
        btn = document.createElement("button");
        icon = document.createElement('i');
        upDown = document.createElement('up-down');

        dragIcon = document.createElement('i');
        dragIcon.setAttribute('class', 'icon-drag fa-solid fa-grip-vertical');
        upDown.appendChild(dragIcon);

        // Add attribute
        item.className = 'item-note';
        indicatorDrag.className = 'indicator-drag'
        fullIcon.className = 'fa-solid fa-expand';
        itemText.className = 'item-text';
        btn.className = 'btn-delete';
        checkboxHide.className = 'checkbox-hide';
        checkboxShow.className = 'checkbox-complete';
        icon.className = 'icon-save';
        item.setAttribute("draggable", "true");
        checkboxHide.setAttribute("type", "checkbox");
        item.setAttribute("data-index", id);
        fullIcon.setAttribute('id', 'icon-full');

        // Add text
        itemText.innerText = inputNote.value;
        btn.appendChild(document.createTextNode("x"));

        // Assign element to item
        item.appendChild(checkboxHide);
        item.appendChild(checkboxShow);
        item.appendChild(fullIcon);
        item.appendChild(indicatorDrag);
        item.appendChild(upDown);
        item.appendChild(itemText);
        item.appendChild(btn);
        item.appendChild(icon);

        // Add item to list
        listNote.appendChild(item);

        inputNote.value = "";
        upDown.ontouchstart = (e) => this.todo = this.getElm(e);
        upDown.ontouchmove = (e) => {
            e.preventDefault();
            this.useIndicator(e, 'MOBILE');
        }

        upDown.ontouchend = (e) => this.dropElm(e);

        item.ondragstart = (e) => this.todo = this.getElm(e);

        item.ondragenter = (e) => this.useIndicator(e, 'PC');

        item.ondragend = (e) => this.dropElm(e);

        btn.onclick = this.deleteTodo;
        checkboxHide.onclick = (e) => this.strikethroughItem(e.target);
        icon.onclick = (e) => this.updateTodo(e.target);
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
            date: getCurrentTime_ISOformat(),
            pin: false,
            deadline: '',
            color: COLOR_DEFAULT,
            // outOfDate: false,
            status: CONST_TODO_STATUS.DOING,
        });
        appOOP.localSet();
    }, // addTodo

    // updateTodo('property', value)
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

        appOOP.data = [...appOOP.dataTodos]; // test setter
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
                    return item;
                }
                return {
                    ...item,
                    status: CONST_TODO_STATUS.COMPLETED
                }
            })
        } else {
            appOOP.dataTodos = appOOP.dataTodos.map((item) => {
                if (item.id != id) {
                    return item;
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
        const note = e.target.parentNode;
        const id = note.dataset.index;

        appOOP.dataTodos.forEach(item => {
            if (item.id == id) {
                headerAnvanceEdit.style.background = `linear-gradient(to bottom, ${item.color},  white`;
                if (item.pin == true) {
                    iconPin.classList.add('pin-item');
                } else {
                    iconPin.classList.remove('pin-item');
                }
            }
        })

        overlay.classList.remove('hide');
        appOOP.updateTodo(e.target);
        appOOP.renderFullTodo(e);

    }, // clickIconFull

    getElm: function (e) {
        const item = e.target.closest('.item-note');
        const text = item.querySelector('.item-text').textContent;
        const id = item.dataset.index;
        const todo = appOOP.dataTodos.find(item => {
            return item.id === id;
        });

        const dragItem = document.querySelector('.item-drag');
        const dragText = dragItem.querySelector('.text-drag');
        const checkboxDrag = dragItem.querySelector('.checkbox-hide');
        const checkboxShowDrag = dragItem.querySelector('.checkbox-complete');

        app.querySelectorAll('.item-note').forEach(item => {
            if (item.dataset.index == id) {
                dragItem.style.borderColor = todo.color;
                checkboxShowDrag.style.borderColor = todo.color;
            }
        });

        dragText.innerText = text;
        if (todo.status == 2) {
            dragItem.classList.add('strikethrough');
            checkboxDrag.setAttribute('checked', '');
        }
        else {
            dragItem.classList.remove('strikethrough');
            checkboxDrag.removeAttribute('checked');
        }
        appOOP.fromIndex = appOOP.dataTodos.indexOf(todo);
        elmDrag.classList.remove('hide');
        appOOP.mouseDownPageY = e.pageY || e.targetTouches[0].pageY;
        appOOP.hasChildListNote = listNote.contains(item);
        item.classList.add('blur');

        // get height last child list pin and list unpin
        const pinLastItem = Array.from(listPin.children).at(-1);
        const unpinFirstItem = Array.from(listNote.children)[0];

        appOOP.heightNote = item.offsetHeight;
        appOOP.topUnpin = unpinFirstItem.getBoundingClientRect().y - item.offsetHeight + 5; // indicator1 offsetHeight, item marginBottom
        appOOP.topPin = pinLastItem.getBoundingClientRect().y + 10;// indicator1 offsetHeight

        return todo;
    }, // getElm

    indicatorDrag: function (e, index, device) {
        const item = e.target.closest('.item-note');

        const titlePin = app.querySelector('.title-pin');
        appOOP.listNotePin = Array.from(listPin.children);
        appOOP.listNotePin.shift();
        appOOP.listNoteUnpin = Array.from(listNote.children);
        const listAllNote = appOOP.listNotePin.concat(appOOP.listNoteUnpin);
        const computedAddNote = addNote.offsetHeight + Number(getComputedStyle(addNote).marginTop.replace('px', '')) - indicator1.offsetHeight;
        const computedPin = listPin.offsetHeight + Number(getComputedStyle(listPin).marginTop.replace('px', '')) + Number(getComputedStyle(listPin).marginBottom.replace('px', ''));
        const computedTitlePin = titlePin.offsetHeight + Number(getComputedStyle(titlePin).marginTop.replace('px', '')) + Number(getComputedStyle(titlePin).marginBottom.replace('px', '')) - indicator1.offsetHeight;

        const checkDeviceY = device == 'PC' ? e.pageY : e.targetTouches[0].pageY;
        const checkDeviceX = device == 'PC' ? e.pageX : e.targetTouches[0].pageX;

        if (listPin.className === 'hide') {
            indicator1.style.top = computedAddNote + 10 + window.scrollY;  // indicator1.offsetHeight ?
        } else {
            indicator1.style.top = computedAddNote + computedPin + window.scrollY;
        }

        listAllNote.forEach(elm => {
            try {
                const nodeIndicatorDown = listAllNote[index];
                const nodeIndicatorUp = listAllNote[index - 1];
                if (checkDeviceY < appOOP.mouseDownPageY) {
                    elm.classList.remove('ondrag');
                    indicator1.style.display = 'none';

                    if (elm == nodeIndicatorUp && index !== listPin.childElementCount - 1)
                        elm.classList.add('ondrag');

                    else if (index == listPin.childElementCount - 1)
                        indicator1.style.display = 'block'

                    else if (index == 0 && listPin.className !== 'hide') {
                        indicator1.style.display = 'block';
                        c(computedAddNote + computedTitlePin + window.scrollY)
                        indicator1.style.top = computedAddNote + computedTitlePin + window.scrollY;
                    }
                } else {
                    elm.classList.remove('ondrag');
                    indicator1.style.display = 'none';

                    if (elm == nodeIndicatorDown)
                        elm.classList.add('ondrag');
                }
            } catch { }

            if (appOOP.fromIndex < appOOP.listNotePin.length && index === appOOP.listNotePin.length && e.offsetY < appOOP.heightNote / 2) {
                elm.classList.remove('ondrag');
                indicator2.style.display = 'block';
                indicator2.style.top = appOOP.topUnpin + window.scrollY;
            }
            else if (item === appOOP.listNotePin.at(-1) && index === appOOP.listNotePin.length - 1 && e.offsetY > appOOP.heightNote / 2) {
                elm.classList.remove('ondrag');
                indicator2.style.display = 'block';
                indicator2.style.top = appOOP.topPin + window.scrollY;
                indicator1.style.display = 'none'
            } else {
                indicator2.style.display = 'none';
            }
        }); // forEach

        appOOP.itemMove = item;
        appOOP.itemOffsetY = e.offsetY;
        elmDrag.style.top = checkDeviceY;
        elmDrag.style.left = checkDeviceX;
    }, // indicatorDrag

    dropElm: function (e) {
        const item = e.target.closest('.item-note');
        const id = item.dataset.index;

        elmDrag.classList.add('hide');
        item.classList.add('blur');
        indicator1.style.display = 'none';
        indicator2.style.display = 'none';

        if (appOOP.toIndex < listPin.childElementCount - 1) {

            appOOP.dataTodos = appOOP.dataTodos.map(elm => {
                if (elm.id !== id)
                    return elm;

                return {
                    ...elm,
                    pin: true
                }
            }) // map
        } else {
            appOOP.dataTodos = appOOP.dataTodos.map(elm => {
                if (elm.id !== id)
                    return elm;

                return {
                    ...elm,
                    pin: false
                }
            }) // map
        }
        let toIndex2;

        if (appOOP.fromIndex > appOOP.listNotePin.length - 1 && appOOP.itemMove === appOOP.listNotePin.at(-1) && appOOP.itemOffsetY > appOOP.heightNote / 2)
            toIndex2 = appOOP.fromIndex + 1;
        else if (appOOP.fromIndex < appOOP.listNotePin.length && appOOP.itemOffsetY < appOOP.heightNote / 2)
            toIndex2 = appOOP.toIndex - 1;
        else toIndex2 = appOOP.toIndex;

        if (toIndex2 === -1) {
            toIndex2 = 1; // 0 ? magic
        }

        moveItem(appOOP.dataTodos, appOOP.fromIndex, toIndex2);

        appOOP.data = [...appOOP.dataTodos];
    }, // dropElm

    sortData: function () {
        const arrPin = appOOP.dataTodos.filter(elm => {
            return elm.pin == true;
        });

        const arrUnpin = appOOP.dataTodos.filter(elm => {
            return elm.pin == false;
        });

        appOOP.dataTodos = arrPin.concat(arrUnpin);
    }, // sort

    sortDataDeadline: function () {
        let time = getDateParts();

        time = [
            time.date.toString().padStart(2, 0),
            time.month.toString().padStart(2, 0),
            time.year
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

        appOOP.data = [...appOOP.dataTodos];
    }, // sortData

    useIndicator: function (e, device) {
        // PC
        if (device === 'PC') {
            const itemPc = e.target.closest('.item-note');
            const idPc = itemPc.dataset.index;
            const todoPc = appOOP.dataTodos.find(elm => {
                return elm.id === idPc;
            });

            const indexTodoPc = appOOP.dataTodos.indexOf(todoPc);

            appOOP.indicatorDrag(e, indexTodoPc, 'PC');

            appOOP.toIndex = appOOP.dataTodos.indexOf(todoPc);

        } else {
            // Mobile
            const itemMb = document.elementFromPoint(e.targetTouches[0].pageX, e.targetTouches[0].pageY).closest('.item-note');
            const idMb = itemMb.dataset.index;
            const todoMb = appOOP.dataTodos.find(elm => {
                return elm.id === idMb;
            });

            const indexTodoMb = appOOP.dataTodos.indexOf(todoMb);;
            appOOP.indicatorDrag(e, indexTodoMb, 'MOBILE');
            appOOP.toIndex = appOOP.dataTodos.indexOf(todoMb);
        }
    },

    handleEvents: function () {
        btnAddNote.onclick = () => {
            if (appOOP.inputValueLength() > 0) {
                appOOP.createNote();
            }

            if (checkEnvironment().os === 'Linux' || checkEnvironment().os === 'Android' || checkEnvironment().os === 'iOS') {
                app.querySelectorAll('up-down').forEach(item => {
                    item.innerHTML = '<i class="icon-up-down fa-solid fa-grip-vertical"></i>'
                });
            }
        } // btnAddNote.onclick

        inputNote.onkeypress = function (e) {
            if (appOOP.inputValueLength() > 0 && e.charCode === 13) {
                appOOP.createNote();
            }
        } // enterKey

        closeAnvanceEdit.onclick = () => {
            overlay.classList.add('hide');
        } // fullSettingClose.

        iconRecycleBin.onclick = (e) => {
            const id = e.target.closest('advanced-edit').querySelector('.item-note').dataset.index;

            appOOP.dataTodos = appOOP.dataTodos.filter((item) => item.id !== id);
            appOOP.localSet();

            overlay.classList.add('hide');

            Array.from(listNote.children).forEach((item) => {
                if (item.dataset.index === id) {
                    item.remove();
                }
            });
        } // iconRecycleBin

        iconPin.onclick = (e) => {
            const id = e.target.closest('advanced-edit').querySelector('.item-note').dataset.index;

            iconPin.classList.toggle('pin-item');

            appOOP.dataTodos = appOOP.dataTodos.map(todo => {
                if (todo.id !== id)
                    return todo;
                return {
                    ...todo,
                    pin: !todo.pin
                }
            }) // map

            appOOP.sortDataDeadline();
            appOOP.data = [...appOOP.dataTodos];

        }, // iconPin

            iconCopy.onclick = (e) => {
                const id = e.target.closest('advanced-edit').querySelector('.item-note').dataset.index;

                let dataCopy = appOOP.dataTodos.find(item => item.id === id);

                dataCopy = {
                    ...dataCopy,
                    id: `${Date.now()}`,
                    date: getCurrentTime_ISOformat()
                }
                appOOP.dataTodos.push(dataCopy);

                const dataCopyId = dataCopy.id;

                overlay.classList.add('hide');

                appOOP.data = [...appOOP.dataTodos];
                Array.from(listNote.children).forEach((item) => {
                    const textItem = item.querySelector('.item-text');

                    if (dataCopyId == item.dataset.index) {
                        textItem.click();
                    }
                });
                appOOP.sortData();
            } // iconCopy

        inputColor.onclick = (e) => {
            e.stopPropagation();
            tabColor.classList.add('show');
        } // inputColor

        btnCancel.onclick = (e) => {
            tabColor.classList.remove('show');
        } // btnCancel

        btnSubmitColor.onclick = (e) => {
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
                    item.querySelector('.checkbox-complete').style.borderColor = inputColor.value;
                    item.style.borderColor = inputColor.value;
                }
            });

            headerAnvanceEdit.style.background = `linear-gradient(to bottom, ${inputColor.value}, white`;
            tabColor.classList.remove('show');

            appOOP.localSet();
        } // btnOk

        inputDeadline.onchange = (e) => {
            const wrapper = e.target.closest('advanced-edit');
            const textItem = wrapper.querySelector('.item-text');
            const id = wrapper.querySelector('.item-note').dataset.index;
            const arrDeadline = inputDeadline.value.split('-').reverse();
            const arrDeadlineNumber = `${Number(arrDeadline[2])}-${Number(arrDeadline[1])}-${Number(arrDeadline[0])}`;
            const { totalDays, text } = getDeadline(arrDeadlineNumber);

            timeDeadline.innerText = text;

            appOOP.dataTodos = appOOP.dataTodos.map(item => {
                if (item.id !== id) {
                    return item;
                } else {
                    return {
                        ...item,
                        deadline: inputDeadline.value.split('-').reverse().toString().replace(/,/g, '-')
                    }
                } // else
            }) // map

            if (getTotalDaysDifferent(getCurrentTime_ISOformat(), arrDeadlineNumber) < 0) {

                textItem.style.color = 'red';

                Array.from(listNote.children).forEach(item => {
                    if (item.dataset.index == id) {
                        item.querySelector('.item-text').style.color = 'red';
                    }
                }); // Array.from
            } else {

                textItem.style.color = 'var(--color-black-1)';

                Array.from(listNote.children).forEach(item => {
                    if (item.dataset.index == id) {
                        item.querySelector('.item-text').style.color = 'var(--color-white-1)';
                    }
                }); // Array.from
            } // else

            inputDeadline.value = arrDeadline.reverse().toString().replace(/,/g, '-');

            if (totalDays < 0)
                appOOP.sortDataDeadline();

            appOOP.sortData();
            appOOP.localSet();
        } // inputDeadline

        overlay.onclick = () => {
            tabColor.classList.remove('show');
        } // fullSetting

        app.querySelectorAll('.item-note').forEach(item => {
            item.ondragstart = (e) => appOOP.todo = appOOP.getElm(e);
            item.ondragenter = (e) => appOOP.useIndicator(e, 'PC');
            item.ondragend = (e) => appOOP.dropElm(e);
        }); // forEach

        app.querySelectorAll('up-down').forEach(item => {
            item.ontouchstart = (e) => {
                appOOP.todo = appOOP.getElm(e);
            };
            item.ontouchmove = (e) => {
                e.preventDefault();
                appOOP.useIndicator(e, 'MOBILE');
            }
            item.ontouchend = (e) => appOOP.dropElm(e);
        });

        app.querySelectorAll('.btn-delete').forEach(btn => {
            btn.onclick = (e) => appOOP.deleteTodo(e);
        });

        app.querySelectorAll('.checkbox-hide').forEach(checkbox => {
            checkbox.onclick = (e) => appOOP.strikethroughItem(e.target);
        });

        app.querySelectorAll('.item-text').forEach(text => {
            text.onclick = (e) => appOOP.clickItem(e);
        });

        app.querySelectorAll('.icon-save').forEach(icon => {
            icon.onclick = (e) => appOOP.clickIconTick(e);
        });

        app.querySelectorAll('#icon-full').forEach(icon => {
            icon.onclick = (e) => appOOP.clickIconFull(e);
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