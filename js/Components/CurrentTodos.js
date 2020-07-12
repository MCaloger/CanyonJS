
canyon.store.todos = canyon.field("myTodos", ["Dishes", "Laundry"])
canyon.store.todoCount = canyon.field("todoCount", 0)

canyon.actions.completeTodo = canyon.action("completeTodo", ["click"], (e) => {

    let listId = e.target.getAttribute("data-list-id")
    let newList = canyon.store.todos.get()
    let newItem = newList.splice(listId, 1)
    canyon.store.completedTodos.set([...canyon.store.completedTodos.get(), newItem].sort())
    canyon.store.todos.set(newList.sort())
})

canyon.watchers.todoWatcher = canyon.watch([canyon.store.todos], () => {
    let list = canyon.store.todos.get()
    canyon.store.todoCount.set(list.length)

    let id = () => "listElement"
    let completeTodo = () => canyon.actions.completeTodo.bind
    
    let myElement = canyon.template(`<ul id="{id}" class="list-group"></ul>`, id)

    let listItemStyle = () => `display:flex; flex:1; align-items: center;`

    list.forEach((item, i) => {
        let value = () => item
        let index = () => i

        myElement.appendChild(canyon.template(`
        <li style="{listItemStyle}" class="list-group-item" data-list-id="{index}">
            <div style="{listItemStyle}">
                {value}
            </div>
            <button type="button" class="btn btn-success" data-list-id="{index}" data-action="{completeTodo}">
                Complete
            </button>
        </li>`, index, listItemStyle, value, completeTodo))
    })
    canyon.render(myElement, document.getElementById("currentTodos"))
})