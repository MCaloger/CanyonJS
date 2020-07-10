

store.todos = Canyon.field("myTodos", ["a", "b"])
store.newTodo = Canyon.field("newTodo", "")
store.completedTodos = Canyon.field("completedTodos", [])

let setTodos = async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/users/1/todos")
    let todos = await response.json()

    store.todos.set(todos)
}

setTodos()

actions.updateNewTodo = Canyon.action("updateNewTodo", "input", (e) => {
    store.newTodo.set(e.target.value)
})

actions.addTodo = Canyon.action("addTodo", ["click"], () => {
    let newItem = store.newTodo.get()
    store.todos.set([...store.todos.get(), newItem].sort())
    store.newTodo.set("")
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
    
    let myElement = templateEngine(`<div id="{id}"></div>`, id)

    // list.map((item, index) => {
    //     let value = () => item
    //     let indexf = () => index

    //     let subElement = templateEngine(`<div data-list-id="{index}">{value}</div>`, value, indexf)
    //     let buttonElement = templateEngine(`<button data-list-id="{index}" data-action="{completeTodo}">Complete</button>`, indexf, completeTodo)
    //     subElement.appendChild(buttonElement)
    //     myElement.appendChild(subElement)
    // })

    for(let i = 0 ; i < list.length ; i++){
        let value = () => list[i].title
        let index = () => i

        let subElement = templateEngine(`<div data-list-id="{index}">{value}</div>`, value, index)
        let buttonElement = templateEngine(`<button data-list-id="{index}" data-action="{completeTodo}">Complete</button>`, index, completeTodo)
        subElement.appendChild(buttonElement)
        myElement.appendChild(subElement)
    }

    Canyon.renderTemplate(myElement, document.getElementById("currentTodos"))
})

watchers.completedTodoWatcher = Canyon.watch([store.completedTodos], () => {
    let list = store.completedTodos.get()
    let id = () => "listElement"
    let uncompleteTodo = () => actions.uncompleteTodo.bind
    
    let myElement = templateEngine(`<div id="{id}"></div>`, id)

    for(let i = 0 ; i < list.length ; i++){
        let value = () => list[i].title
        let index = () => i

        let style = () => `text-decoration: line-through; color: grey`

        let subElement = templateEngine(`<div data-list-id="{index}" style="{style}">{value}</div>`, value, index, style)
        let buttonElement = templateEngine(`<button data-list-id="{index}" data-action="{uncompleteTodo}">Uncomplete</button>`, index, uncompleteTodo)
        subElement.appendChild(buttonElement)
        myElement.appendChild(subElement)
    }

    Canyon.renderTemplate(myElement, document.getElementById("completedTodos"))
})