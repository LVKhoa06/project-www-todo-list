import { checkEnvironment, getCurrentTime_ISOformat, getDateParts, getTotalDaysDifferent, moveItem, getDateDifferent } from "./utils-refactor.js";
import "../../css/small.css";
import "../../css/main.css" ;

// if (window.innerWidth > 767) {
//     import('./web.css').then(() => {
//        console.log("Imported web css");
//     });
// }
// else{
//     import('./mob.css').then(() => {
//        console.log("Imported mobile css");
//     });
// }

 
//#region app node 
const app = document.querySelector('app');
const formAddNote = app.querySelector('add-note');
const formInputNote = app.querySelector('.input-note');
const formBtnAddNote = app.querySelector('.btn-add');
const listPin = app.querySelector('list-pin');
const listNote = app.querySelector('list-note');
//#endregion app node 

//#region Secondary indicator
const indicator1 = app.querySelector('#indicator1');
const indicator2 = app.querySelector('#indicator2');
//#endregion Secondary indicator

//#region anvanced edit node
const overlay = document.querySelector('overlay');
const detailsEditHeader = overlay.querySelector('header');
const detailsEditPinIcon = overlay.querySelector('.icon-pin');
const detailsEditText = overlay.querySelector('content');
const detailsTimeDeadline = overlay.querySelector('deadline');
const detailsTimeCreate = overlay.querySelector('time-create');
const detailsInputDeadline = overlay.querySelector('.input-deadline');
const detailsInputColor = overlay.querySelector('.input-color');
const detailsTabColor = overlay.querySelector('tab');
const detailsBtnCancel = overlay.querySelector('.btn-cancel');
const detailsSubmitColor = overlay.querySelector('.btn-submit-color');
const detailsIconCopy = overlay.querySelector('.icon-copy');
const detailsIconRecycleBin = overlay.querySelector('.icon-recycle-bin');
const detailsEditClose = overlay.querySelector('close');
//#endregion anvanced edit node

const cloneElmDrag = document.querySelector('.item-drag');
const CONST_LS_KEY = 'TODO-LIST';
const CONST_TODO_STATUS = { // enumeration
    PENDING: 0,
    DOING: 1,
    COMPLETED: 2,
    CANCELED: -1,
}
const COLOR_DEFAULT = 'var(--app-color-1)';

//#endregion declare const

const appOOP = {
    //#region declare
    onEdit: false, // Flag

    // Data note 
    dataTodos: [],
    _data: [], // private property // accessed via GETTER / SETTER

    //#region DOM collection
    listNoteUnpin: [],
    listNotePin: [],
    itemMove: [],
    //#endregion DOM collection

    //#region from & to index note
    toIndex: 0,
    fromIndex: 0,
    //#endregion from & to index note

    //#region coordinate & size
    topUnpin: 0,
    topPin: 0,
    heightNote: 0,
    itemOffsetY: 0,
    mouseDownPageY: 0,
    //#endregion coordinate & size
    //#endregion declare

    //#region getter, setter
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
    //#endregion getter, setter

    //#region localStorage
    localSet: function () {
        localStorage.setItem(CONST_LS_KEY, JSON.stringify(appOOP.dataTodos));
    }, // localSet

    localGet: function () {
        const cached = localStorage.getItem(CONST_LS_KEY);
        if (cached)
            return JSON.parse(cached);

        return [];
    }, // localGet
    // #endregion localStorage

    //#region helping func
    inputValueLength: function () {
        return formInputNote.value.length;
    }, // inputValueLength
    //#endregion Helping func

    //#region sort data
    sortData: function () {
        const arrPin = appOOP.dataTodos.filter(elm => {
            return elm.pin == true;
        });

        const arrUnpin = appOOP.dataTodos.filter(elm => {
            return elm.pin == false;
        });

        appOOP.dataTodos = arrPin.concat(arrUnpin);
    }, // sortData

    sortDataDeadline: function () {
        let time = getDateParts();
        time = [
            time.day.toString().padStart(2, 0),
            time.month.toString().padStart(2, 0),
            time.year
        ];
        const todayTxt = time.reverse().toString().replace(/,/g, '-');

        function compareDate(a, b) {
            const deadlineProcessedA = a.deadline.split('-').reverse().join('-');
            const deadlineProcessedB = b.deadline.split('-').reverse().join('-');

            return (
                deadlineProcessedA < deadlineProcessedB ?
                    -1 :
                    deadlineProcessedA > deadlineProcessedB ?
                        1 :
                        0
            );
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
    }, // sortDataDeadline
    //#endregion sort data

    //#region render
    render: function () {
        const dataPin = this.dataTodos.filter(item => item.pin);
        const dataPinLength = dataPin.length;
        const dataUnPin = this.dataTodos.slice(dataPinLength);
        const htmlsTodos = dataUnPin.map((item) => {
            return `   
                <li style="border-color: ${item.color};" class="item-note ${item.status == 2 ? 'strikethrough' : ''}" data-index="${item.id}" >
                    <up-down draggable="true">
                        <i class="icon-drag fa-solid fa-grip-vertical"></i>
                    </up-down>
                    <input class="checkbox-hide" type="checkbox" ${item.status == 2 ? 'checked' : ''}>
                    <span style="border-color: ${item.color};" class="checkbox-complete"></span>
                    <span ${getTotalDaysDifferent(getCurrentTime_ISOformat(), item.date) < 0 ? 'style="color:red;"' : ''} class="item-text">${item.text}</span>
                    <button class="btn-delete">x</button>
                    <i class="icon-save"></i>
                    <i id="icon-details" class="fa-solid fa-expand"></i>
                    <div class="indicator-drag"></div>
                </li>
                    `;
        }).join('');

        if (dataPinLength > 0) {
            listPin.classList.remove('hide');
            const htmlPin = dataPin.map((item) => {
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
                        <i id="icon-details" class="fa-solid fa-expand"></i>
                        <div class="indicator-drag"></div>
                    </li>
                        `;
            }).join('');
            listPin.innerHTML = `
                <h3 class="title-pin">List Pin Note</h3>
            ${htmlPin}
            `;
        } else
            listPin.classList.add('hide');

        listNote.innerHTML = htmlsTodos;
    }, // render

    renderDetails: function (e) {
        const outerId = e.target.parentNode.dataset.index;
        const todo = appOOP.dataTodos.find(entry => entry.id === outerId);

        const htmlContent = `
                <li class="item-note bla ${todo.status == 2 ? 'strikethrough2' : ''}" data-index="${outerId}" >
                    <input class="checkbox-hide" type="checkbox" onclick="appOOP.strikethroughItem(appOOP)" ${todo.status == 2 ? 'checked' : ''}>
                    <span style="border-color: ${todo.color};" class="checkbox-complete"></span>
                    <span contenteditable="true" ${getTotalDaysDifferent(getCurrentTime_ISOformat(), todo.date) < 0 ? 'style="color:red;"' : ''} class="item-text">${todo.text}</span>
                    <i class="show icon-save" id="icon-save-inner" onclick="appOOP.submitText(appOOP)"></i>
                </li>
                `;
        detailsTimeCreate.innerText = todo.date;
        detailsTimeDeadline.innerText = todo.deadline == '' ? '' : getDateDifferent(todo.deadline).text;

        detailsEditText.innerHTML = htmlContent;
    }, // renderDetails
    //#endregion render

    //#region add/edit/delete note
    createNote: function () {
        const id = `${Date.now()}`;
        let item, itemText, checkboxHide, checkboxShow, btnDelete, iconSave, fullIcon, upDown, dragIcon, indicatorDrag;

        // Create item
        item = document.createElement("li");
        indicatorDrag = document.createElement("div");
        fullIcon = document.createElement("i");
        itemText = document.createElement("span");
        checkboxHide = document.createElement("input");
        checkboxShow = document.createElement("span");
        btnDelete = document.createElement("button");
        iconSave = document.createElement('i');
        upDown = document.createElement('up-down');
        dragIcon = document.createElement('i');
        dragIcon.setAttribute('class', 'icon-drag fa-solid fa-grip-vertical');
        upDown.appendChild(dragIcon);

        // Add attribute
        item.className = 'item-note';
        indicatorDrag.className = 'indicator-drag';
        fullIcon.className = 'fa-solid fa-expand';
        itemText.className = 'item-text';
        btnDelete.className = 'btn-delete';
        checkboxHide.className = 'checkbox-hide';
        checkboxShow.className = 'checkbox-complete';
        iconSave.className = 'icon-save';
        item.setAttribute("draggable", "true");
        checkboxHide.setAttribute("type", "checkbox");
        item.setAttribute("data-index", id);
        fullIcon.setAttribute('id', 'icon-details');

        // Add text
        itemText.innerText = formInputNote.value;
        btnDelete.appendChild(document.createTextNode("x"));

        // Assign element to item
        item.appendChild(checkboxHide);
        item.appendChild(checkboxShow);
        item.appendChild(fullIcon);
        item.appendChild(indicatorDrag);
        item.appendChild(upDown);
        item.appendChild(itemText);
        item.appendChild(btnDelete);
        item.appendChild(iconSave);
        listNote.appendChild(item);

        formInputNote.value = "";
        upDown.ontouchstart = (e) => appOOP.todo = appOOP.getElmWhenMouseDown(e);
        upDown.ontouchmove = (e) => {
            e.preventDefault();
            appOOP.useDisplayIndicator(e, 'MOBILE');
        }
        upDown.ontouchend = (e) => appOOP.dropElm(e);
        item.ondragstart = (e) => appOOP.todo = appOOP.getElmWhenMouseDown(e);
        item.ondragenter = (e) => appOOP.useDisplayIndicator(e, 'PC');
        item.ondragend = (e) => appOOP.dropElm(e);

        btnDelete.onclick = appOOP.deleteTodo;
        checkboxHide.onclick = (e) => appOOP.strikethroughItem(e.target);
        iconSave.onclick = (e) => appOOP.updateText(e.target);
        iconSave.onclick = appOOP.clickIconTick;
        itemText.onclick = appOOP.clickItem;
        fullIcon.onclick = appOOP.clickIconFull;

        appOOP.addTodo(id, itemText.innerText);
    }, // createNote

    statusOnEdit: function (boolean) {
        if (boolean) {
            appOOP.onEdit = true;
            formInputNote.setAttribute('disabled', true);
            formBtnAddNote.setAttribute('disabled', true);
        } else {
            appOOP.onEdit = false;
            formInputNote.removeAttribute('disabled');
            formBtnAddNote.removeAttribute('disabled');
        }
    }, // statusOnEdit

    addTodo: function (id, todoText) {
        appOOP.dataTodos.push({
            id,
            text: todoText,
            date: getCurrentTime_ISOformat(),
            pin: false,
            deadline: '',
            color: COLOR_DEFAULT,
            status: CONST_TODO_STATUS.DOING,
        });
        appOOP.localSet();
    }, // addTodo

    submitText: function (elm) {
        const ElmText = elm.parentNode.querySelector('.item-text');
        const newText = ElmText.textContent;
        const id = elm.parentNode.dataset.index;

        if (newText.trim().length < 1) {
            alert('Không được để note trống');
            return setTimeout(() => {
                ElmText.click(); // trigger
            }, 100);
        }

        appOOP.statusOnEdit(false);
        appOOP.updateTodo(id, 'text', newText);
        appOOP.data = [...appOOP.dataTodos];
    }, // submitText

    updateTodo: function (id, property, value) {
        appOOP.dataTodos = appOOP.dataTodos.map((item) => {
            if (item.id !== id)
                return item;
            else
                return {
                    ...item,
                    [property]: value
                } // return
        }); // map
    }, // updateTodo

    deleteTodo: function (e) {
        if (appOOP.onEdit)
            return;

        const listElement = e.target.parentNode;
        const id = listElement.dataset.index;
        listElement.parentNode.removeChild(listElement);

        if (listPin.children.length === 1)
            listPin.classList.add('hide');
        else
            listPin.classList.remove('hide');

        appOOP.dataTodos = appOOP.dataTodos.filter(item => item.id !== id);
        appOOP.localSet();
    }, // deleteTodo
    //#endregion add/edit/delete note

    //#region work with notes
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

        if (hasAtr)
            appOOP.updateTodo(id, 'status', CONST_TODO_STATUS.COMPLETED);
        else
            appOOP.updateTodo(id, 'status', CONST_TODO_STATUS.DOING);

        appOOP.submitText(elm);
        appOOP.localSet();
    }, // todoStatus

    focusNote: function (e) {
        const btnDelete = e.target.parentNode.querySelector('.btn-delete');
        const btnSave = e.target.parentNode.querySelector('.icon-save');
        const idOuter = e.target.parentNode.dataset.index;

        if (appOOP.onEdit)
            return;

        Array.from(listNote.children).forEach((item) => {
            const btnDelete = item.querySelector('.btn-delete');
            const tick = item.querySelector('.checkbox-complete');
            const idInner = item.dataset.index;
            const fullIcon = item.querySelector('#icon-details');
            const upDown = item.querySelector('up-down');

            if (idInner !== idOuter) {
                tick.classList.add('lock-checkbox');
                btnDelete.classList.add('hide');
                fullIcon.classList.add('hide');
                upDown.classList.add('hide');
            }
        });

        appOOP.statusOnEdit(true);

        e.target.setAttribute('contenteditable', true);

        setTimeout(() => {
            e.target.focus();
        }, 50);

        e.target.parentNode.classList.add('focus-item');
        btnDelete.classList.add('hide');
        btnSave.classList.add('show');

    }, // clickItem

    clickIconSave: function (e) {
        const listElement = e.target.parentNode;
        const idOuter = e.target.parentNode.dataset.index;
        const btnDelete = listElement.querySelector('.btn-delete');
        const itemText = listElement.querySelector('.item-text');
        const iconSave = listElement.querySelector('.icon-save');

        itemText.removeAttribute('contenteditable');

        listElement.classList.remove('focus-item');
        btnDelete.classList.remove('hide');

        appOOP.submitText(e.target);
        iconSave.classList.remove('show');

        Array.from(listNote.children).forEach((item) => {
            const btnDelete = item.querySelector('.btn-delete');
            const checkboxShow = item.querySelector('.checkbox-complete');
            const fullIcon = item.querySelector('#icon-details');
            const idInner = item.dataset.index;

            if (idInner !== idOuter) {
                checkboxShow.classList.remove('lock-checkbox');
                btnDelete.classList.remove('hide');
                fullIcon.classList.remove('hide');
            }
        });

        appOOP.onEdit = false;
    }, // clickIconSave

    showDetails: function (e) {
        const note = e.target.parentNode;
        const id = note.dataset.index;

        appOOP.dataTodos.forEach(item => {
            if (item.id == id) {
                detailsEditHeader.style.background = `linear-gradient(to bottom, ${item.color},  white`;
                if (item.pin == true) {
                    detailsEditPinIcon.classList.add('pin-item');
                } else {
                    detailsEditPinIcon.classList.remove('pin-item');
                }
            }
        }); // forEach

        overlay.classList.remove('hide');
        appOOP.submitText(e.target);
        appOOP.renderDetails(e);
    }, // showDetails
    //#endregion work with notes

    //#region event drag drop
    getElmWhenMouseDown: function (e) {
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
        cloneElmDrag.classList.remove('hide');
        appOOP.mouseDownPageY = e.pageY || e.targetTouches[0].pageY;
        item.classList.add('blur');

        // get height last child list pin and list unpin
        const pinLastItem = Array.from(listPin.children).at(-1);
        const unpinFirstItem = Array.from(listNote.children)[0];

        if (listNote.childElementCount > 0) {
            appOOP.topUnpin = unpinFirstItem.getBoundingClientRect().y - item.offsetHeight + 5;
        }
        // indicator1 offsetHeight
        appOOP.heightNote = item.offsetHeight;
        appOOP.topPin = pinLastItem.getBoundingClientRect().y + 5;

        return todo;
    }, // getElmWhenMouseDown

    displayIndicator: function (e, index, device) {
        const item = e.target.closest('.item-note');
        const titlePin = app.querySelector('.title-pin');
        appOOP.listNotePin = Array.from(listPin.children);
        appOOP.listNotePin.shift();
        appOOP.listNoteUnpin = Array.from(listNote.children);
        const listAllNote = appOOP.listNotePin.concat(appOOP.listNoteUnpin);
        const computedAddNote = formAddNote.offsetHeight + Number(getComputedStyle(formAddNote).marginTop.replace('px', ''));
        const computedPin = listPin.offsetHeight + Number(getComputedStyle(listPin).marginTop.replace('px', '')) + Number(getComputedStyle(listPin).marginBottom.replace('px', ''));
        const computedTitlePin = titlePin.offsetHeight + Number(getComputedStyle(titlePin).marginTop.replace('px', '')) + Number(getComputedStyle(titlePin).marginBottom.replace('px', ''));
        const checkDeviceY = device == 'PC' ? e.pageY : e.targetTouches[0].pageY;
        const checkDeviceX = device == 'PC' ? e.pageX : e.targetTouches[0].pageX;

        if (listPin.className === 'hide') {
            indicator1.style.top = computedAddNote + 5;  // indicator1.offsetHeight 
        } else {
            indicator1.style.top = computedAddNote + computedPin - 5;
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
                        indicator1.style.display = 'block';

                    else if (index == 0 && listPin.className !== 'hide') {
                        indicator1.style.display = 'block';
                        indicator1.style.top = computedAddNote + computedTitlePin - 5;
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
                indicator1.style.display = 'none';
            } else {
                indicator2.style.display = 'none';
            }
        }); // forEach

        appOOP.itemMove = item;
        appOOP.itemOffsetY = e.offsetY;
        cloneElmDrag.style.top = checkDeviceY;
        cloneElmDrag.style.left = checkDeviceX;
    }, // indicatorDrag

    dropElm: function (e) {
        const item = e.target.closest('.item-note');
        const id = item.dataset.index;

        cloneElmDrag.classList.add('hide');
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
        else if (appOOP.fromIndex <= appOOP.listNotePin.length && appOOP.itemMove === appOOP.listNoteUnpin.at(0) && appOOP.itemOffsetY < appOOP.heightNote / 2) {
            toIndex2 = appOOP.toIndex - 1;
        }
        else toIndex2 = appOOP.toIndex;

        if (toIndex2 === -1) {
            toIndex2 = 0;
        }

        moveItem(appOOP.dataTodos, appOOP.fromIndex, toIndex2);

        appOOP.data = [...appOOP.dataTodos];
    }, // dropElm

    useDisplayIndicator: function (e, device) {
        // PC
        if (device === 'PC') {
            const itemPC = e.target.closest('.item-note');
            const idPC = itemPC.dataset.index;
            const todoPC = appOOP.dataTodos.find(elm => {
                return elm.id === idPC;
            });

            const indexTodoPc = appOOP.dataTodos.indexOf(todoPC);

            appOOP.displayIndicator(e, indexTodoPc, 'PC');

            appOOP.toIndex = appOOP.dataTodos.indexOf(todoPC);
        } else {
            // Mobile
            const itemMb = document.elementFromPoint(e.targetTouches[0].pageX, e.targetTouches[0].pageY).closest('.item-note');
            const idMb = itemMb.dataset.index;
            const todoMb = appOOP.dataTodos.find(elm => {
                return elm.id === idMb;
            });

            const indexTodoMb = appOOP.dataTodos.indexOf(todoMb);
            appOOP.displayIndicator(e, indexTodoMb, 'MOBILE');
            appOOP.toIndex = appOOP.dataTodos.indexOf(todoMb);
        }
    }, // useDisplayIndicator
    //#endregion event drag drop

    handleEvents: function () {
        //#region event form add note
        formBtnAddNote.onclick = () => {
            const OS = checkEnvironment().os;

            if (appOOP.inputValueLength() > 0) {
                appOOP.createNote();
            }

            if (OS === 'Linux' || OS === 'Android' || OS === 'iOS') {
                app.querySelectorAll('up-down').forEach(item => {
                    item.innerHTML = '<i class="icon-up-down fa-solid fa-grip-vertical"></i>';
                });
            }
        } // btnAddNote.onclick

        formInputNote.onkeypress = function (e) {
            if (appOOP.inputValueLength() > 0 && e.charCode === 13) {
                appOOP.createNote();
            }
        } // enterKey
        //#endregion event form add note

        //#region event details
        detailsEditClose.onclick = () => {
            overlay.classList.add('hide');
        } // closeAnvanceEdit.

        detailsIconRecycleBin.onclick = (e) => {
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

        detailsEditPinIcon.onclick = (e) => {
            const id = e.target.closest('advanced-edit').querySelector('.item-note').dataset.index;

            detailsEditPinIcon.classList.toggle('pin-item');

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
        } // iconPin

        detailsIconCopy.onclick = (e) => {
            const id = e.target.closest('advanced-edit').querySelector('.item-note').dataset.index;
            let todoCopy = appOOP.dataTodos.find(item => item.id === id);
            const dataCopyId = todoCopy.id;

            todoCopy = {
                ...todoCopy,
                id: `${Date.now()}`,
                date: getCurrentTime_ISOformat()
            }

            appOOP.dataTodos.push(todoCopy);

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

        detailsInputColor.onclick = (e) => {
            e.stopPropagation();
            detailsTabColor.classList.add('show');
        } // inputColor

        detailsBtnCancel.onclick = () => {
            detailsTabColor.classList.remove('show');
        } // tabBtnCancel

        detailsSubmitColor.onclick = (e) => {
            const id = e.target.closest('advanced-edit').querySelector('.item-note').dataset.index;

            appOOP.updateTodo(id, 'color', detailsInputColor.value);

            app.querySelectorAll('.item-note').forEach(item => {
                if (item.dataset.index == id) {
                    item.querySelector('.checkbox-complete').style.borderColor = detailsInputColor.value;
                    item.style.borderColor = detailsInputColor.value;
                }
            });

            detailsEditHeader.style.background = `linear-gradient(to bottom, ${detailsInputColor.value}, white`;
            detailsTabColor.classList.remove('show');

            appOOP.localSet();
        } // tabBtnSubmitColor

        detailsInputDeadline.onchange = (e) => {
            const wrapper = e.target.closest('advanced-edit');
            const textItem = wrapper.querySelector('.item-text');
            const id = wrapper.querySelector('.item-note').dataset.index;
            const { totalDays, text } = getDateDifferent(detailsInputDeadline.value);

            detailsTimeDeadline.innerText = text;

            appOOP.updateTodo(id, 'deadline', detailsInputDeadline.value);

            if (getTotalDaysDifferent(getCurrentTime_ISOformat(), detailsInputDeadline.value) < 0) {
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

            if (totalDays < 0)
                appOOP.sortDataDeadline();

            appOOP.sortData();
            appOOP.localSet();
        } // inputDeadline

        overlay.onclick = () => {
            detailsTabColor.classList.remove('show');
        } // overlay
        //#endregion event details

        //#region event notes
        app.querySelectorAll('.item-note').forEach(item => {
            item.ondragstart = (e) => appOOP.getElmWhenMouseDown(e);
            item.ondragenter = (e) => appOOP.useDisplayIndicator(e, 'PC');
            item.ondragend = (e) => appOOP.dropElm(e);
        });

        app.querySelectorAll('up-down').forEach(item => {
            item.ontouchstart = (e) => {
                appOOP.getElmWhenMouseDown(e);
            };
            item.ontouchmove = (e) => {
                e.preventDefault();
                appOOP.useDisplayIndicator(e, 'MOBILE');
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
            text.onclick = (e) => appOOP.focusNote(e);
        });

        app.querySelectorAll('.icon-save').forEach(icon => {
            icon.onclick = (e) => appOOP.clickIconSave(e);
        });

        app.querySelectorAll('#icon-details').forEach(icon => {
            icon.onclick = (e) => appOOP.showDetails(e);
        });
        //#endregion event notes
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