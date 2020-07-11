
store.todos = Canyon.field("myTodos", ["Dishes", "Laundry", "Figure out a new PoE build"])
actions.completeTodo = Canyon.action("completeTodo", ["click"], (e) => {

    let listId = e.target.getAttribute("data-list-id")
    let newList = store.todos.get()
    let newItem = newList.splice(listId, 1)
    store.completedTodos.set([...store.completedTodos.get(), newItem].sort())
    store.todos.set(newList.sort())
})

watchers.todoWatcher = Canyon.watch([store.todos], () => {
    let list = store.todos.get()
    let id = () => "listElement"
    let completeTodo = () => actions.completeTodo.bind
    
    let myElement = templateEngine(`<ul id="{id}" class="list-group"></ul>`, id)

    let listItemStyle = () => `display:flex; flex:1; align-items: center;`

    list.forEach((item, i) => {
        let value = () => item
        let index = () => i

        myElement.appendChild(templateEngine(`
        <li style="{listItemStyle}" class="list-group-item" data-list-id="{index}">
            <div style="{listItemStyle}">
                {value}
            </div>
            <button type="button" class="btn btn-success" data-list-id="{index}" data-action="{completeTodo}">
                Complete
            </button>
        </li>`, index, listItemStyle, value, completeTodo))
    })
    Canyon.renderTemplate(myElement, document.getElementById("currentTodos"))
})