

store.todos = Canyon.field("myTodos", ["Dishes", "Laundry", "Figure out a new PoE build"])
store.newTodo = Canyon.field("newTodo", "")
store.completedTodos = Canyon.field("completedTodos", [])

actions.updateNewTodo = Canyon.action("updateNewTodo", "input", (e) => {
    store.newTodo.set(e.target.value)
})

actions.addTodo = Canyon.action("addTodo", ["click"], () => {
    let newItem = store.newTodo.get()
    if(newItem != "") {
        store.todos.set([...store.todos.get(), newItem].sort())
        store.newTodo.set("")
    }
})

actions.completeTodo = Canyon.action("completeTodo", ["click"], (e) => {

    let listId = e.target.getAttribute("data-list-id")
    let newList = store.todos.get()
    let newItem = newList.splice(listId, 1)
    store.completedTodos.set([...store.completedTodos.get(), newItem].sort())
    store.todos.set(newList.sort())
})

actions.uncompleteTodo = Canyon.action("uncompleteTodo", ["click"], (e) => {
    let listId = e.target.getAttribute("data-list-id")
    let newList = store.completedTodos.get()
    let newItem = newList.splice(listId, 1)

    let compiledArray = 
    store.todos.set([...store.todos.get(), newItem].sort())
    store.completedTodos.set(newList.sort())
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

        let listContainer = templateEngine(`<li style="{listItemStyle}" class="list-group-item" data-list-id="{index}"></li>`, index, listItemStyle)
        let subElement = templateEngine(`<div style="{listItemStyle}">{value}</div>`, value, listItemStyle)
        let buttonElement = templateEngine(`<button type="button" class="btn btn-success" data-list-id="{index}" data-action="{completeTodo}">Complete</button>`, index, completeTodo)
        
        listContainer.appendChild(subElement)
        listContainer.appendChild(buttonElement)
        myElement.appendChild(listContainer)
    })
    Canyon.renderTemplate(myElement, document.getElementById("currentTodos"))
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

        let listContainer = templateEngine(`<li style="{listItemStyle}" class="list-group-item" data-list-id="{index}"></li>`, index, listItemStyle)
        let subElement = templateEngine(`<div style="{listItemStyle}{strikethrough}">{value}</div>`, value, listItemStyle, strikethrough)
        let buttonElement = templateEngine(`<button type="button" class="btn btn-danger" data-list-id="{index}" data-action="{uncompleteTodo}">Uncomplete</button>`, index, uncompleteTodo)
        
        listContainer.appendChild(subElement)
        listContainer.appendChild(buttonElement)
        myElement.appendChild(listContainer)
    })

    Canyon.renderTemplate(myElement, document.getElementById("completedTodos"))
})