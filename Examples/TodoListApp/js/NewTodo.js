
canyon.store.newTodo = canyon.field("newTodo", "")

let addTodo = () => {
    let newItem = canyon.store.newTodo.get()
    if(newItem != "") {
        canyon.store.todos.set([...canyon.store.todos.get(), newItem].sort())
        canyon.store.newTodo.set("")
    }
}

canyon.actions.addTodoOnEnterKey = canyon.action("onEnterKey", "keyup", e => {
    if(e.key) {
        if(e.key === "Enter") {
            addTodo()
        }
    }
})

canyon.actions.addTodo = canyon.action("addTodo", ["click"], () => {
   addTodo()
})

canyon.actions.updateNewTodo = canyon.action("updateNewTodo", "input", (e) => {
    canyon.store.newTodo.set(e.target.value)
})