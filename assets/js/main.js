const c = console.log;
const clickMe = document.querySelector('.click-me');
//#region declare const 
const app = document.querySelector('app');
const listNote = app.querySelector('list-note');
const inputNote = app.querySelector('.input-note');
const btnAddNote = app.querySelector('.btn-add');
const btnDeleteTodo = app.querySelector('.btn-delete');

const CONST_LS_KEY = 'TODO-LIST';

const CONST_TODO_STATUS = {
    PENDING: 0,
    DOING: 1,
    COMPLETED: 2,
    CANCELED: -1
}
//#endregion declare const

const arrBtn = app.querySelector('#arr-btn');
const localBtn = app.querySelector('#local-btn');
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
            </li>
                `;
            // <i class="fa-solid fa-ellipsis-vertical"></i>
        });
        listNote.innerHTML = htmls.join('');
    },

    inputValueLength: function () {
        return inputNote.value.length;
    },

    createNote: function () {
        const id = `${Date.now()}`;
        let item, itemText, checkboxHide, checkboxShow, btn, icon, pinIcon;

        // Create item
        item = document.createElement("li");
        // pinIcon = document.createElement("i");
        itemText = document.createElement("span");
        checkboxHide = document.createElement("input");
        checkboxShow = document.createElement("span");
        btn = document.createElement("button");
        icon = document.createElement('i');

        // Add attribute
        item.className = 'item-note';
        // pinIcon.className = 'fa-solid fa-thumbtack';
        itemText.className = 'item-text';
        btn.className = 'btn-delete';
        checkboxHide.className = 'checkbox-hide';
        checkboxShow.className = 'checkbox-complete';
        icon.className = 'icon-save';
        checkboxHide.setAttribute("type", "checkbox");
        item.setAttribute("data-index", id);

        // Assign checkbox to item
        item.appendChild(checkboxHide);
        item.appendChild(checkboxShow);
        // item.appendChild(pinIcon)

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
        icon.onclick = this.clickIcon;
        itemText.onclick = this.clickItem;

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

    addTodo: function (id, todoText) {
        appOOP.dataTodos.push({
            id,
            text: todoText,
            status: CONST_TODO_STATUS.DOING
        })
        c('Add');
        appOOP.localSet();
    }, // addTodo

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

            if (idInner !== idOuter) {
                tick.classList.add('lock-checkbox');
                btnDelete.classList.add('hide');
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

    clickIcon: function (e) {
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
            const idInner = item.dataset.index;

            if (idInner !== idOuter) {
                checkboxShow.classList.remove('lock-checkbox');
                btnDelete.classList.remove('hide');
            }
        })

        appOOP.onEdit = false;
    }, // clickIcon

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

        arrBtn.onclick = function () {
            c(appOOP.dataTodos);
        }

        localBtn.onclick = function () {
            c(localStorage);
        }

        clearBtn.onclick = function () {
            localStorage.clear();
        }

        clickMe.onclick = function () {

        }

        // Add events for buttons
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
            icon.onclick = (e) => appOOP.clickIcon(e);
        });
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