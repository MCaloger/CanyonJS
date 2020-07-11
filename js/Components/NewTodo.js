
store.newTodo = Canyon.field("newTodo", "")
actions.addTodo = Canyon.action("addTodo", ["click"], () => {
    let newItem = store.newTodo.get()
    if(newItem != "") {
        store.todos.set([...store.todos.get(), newItem].sort())
        store.newTodo.set("")
    }
})

actions.updateNewTodo = Canyon.action("updateNewTodo", "input", (e) => {
    store.newTodo.set(e.target.value)
})