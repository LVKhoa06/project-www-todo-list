// 

// status, text, deadline, color
function updateTodo_v2 (elm, property, value) {
    const id = elm.parentNode.dataset.index;

    appOOP.dataTodos = appOOP.dataTodos.map((item) => {
        if (item.id != id)
            return item;
        else
            return {
                ...item,
                [property]: value
            } // return
    }) // map
} // updateTodo_v2

/* GOODIES/ RECIPES/ NOTES
    💻 CONST_, declaration by domain
    💻 flag
    💻 localStorage: stringify() | parse()
    💻 enumeration ~CONST_TODO_STATUS
    💻 logic vs UI: helpers/ utils/ lib
    💻 object destructor + property alias, array spread/ destructor
    💻 string comparasion
    💻 sort() helper
    💻 getter/ setter: this._data // appOOP.data
*/
