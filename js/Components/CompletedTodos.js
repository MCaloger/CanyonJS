
store.completedTodos = Canyon.field("completedTodos", [])
actions.uncompleteTodo = Canyon.action("uncompleteTodo", ["click"], (e) => {
    let listId = e.target.getAttribute("data-list-id")
    let newList = store.completedTodos.get()
    let newItem = newList.splice(listId, 1)

    store.todos.set([...store.todos.get(), newItem].sort())
    store.completedTodos.set(newList.sort())
})

watchers.completedTodoWatcher = Canyon.watch([store.completedTodos], () => {
    let list = store.completedTodos.get()
    let id = () => "listElement"
    let uncompleteTodo = () => actions.uncompleteTodo.bind
    
    let myElement = templateEngine(`<div id="{id}"></div>`, id)

    let listItemStyle = () => `display:flex; flex:1; align-items: center;`
    let strikethrough = () => `text-decoration: line-through; color: grey;`

    list.forEach((item, i) => {
        let value = () => item
        let index = () => i

        myElement.appendChild(templateEngine(`
        <li style="{listItemStyle}" class="list-group-item" data-list-id="{index}">
            <div style="{listItemStyle}{strikethrough}">
                {value}
            </div>
            <button type="button" class="btn btn-danger" data-list-id="{index}" data-action="{uncompleteTodo}">
                Uncomplete
            </button>
        </li>`, index, listItemStyle, value, uncompleteTodo, strikethrough))
    })

    Canyon.renderTemplate(myElement, document.getElementById("completedTodos"))
})