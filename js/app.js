// store.counter = Canyon.field("counter", 0)
// store.myTextbox = Canyon.field("myTextbox", ""),
// store.combined = Canyon.field("combined", "default"),
// store.myList = Canyon.field("myList", ["hello", "there", "world"])

// watchers.combinedWatcher = Canyon.watch([store.myTextbox, store.counter], () => {
//     let text = store.myTextbox.get()
//     let count = store.counter.get();
//     store.combined.set(text.concat(count))
//     store.myList.set([...store.myList.get(), store.combined.get()])
// })

// watchers.listWatcher = Canyon.watch([store.myList], () => {
    
//     let list = store.myList.get()

//     let myElement = {
//         elementType: "div",
//         attributes: [{"name": "id", "value": "listElement"}],
//         actions: [],
//         value: "",
//         children: []
//     }
    
//     list.forEach((item, index) => myElement.children.push({
//         elementType: "div",
//         attributes: [{"name":"data-list-id", "value":index}],
//         actions: [],
//         value: item,
//         children: [{
//             elementType: "button",
//             attributes: [{"name":"data-list-id", "value":index}, {"name":"data-action", "value":"removeEntry"}],
//             actions: [actions.removeEntry],
//             value: "Remove"
//         }]
//     }))
//     Canyon.render(myElement, document.getElementById("container"))
// })

// actions.count = Canyon.action("count", ["click"], () => {
//     let newValue = store.counter.get() + 1
//     store.counter.set(newValue)
// })

// actions.updateText = Canyon.action("updateText", "input", (e) => {
//     store.myTextbox.set(e.target.value)
// })

// actions.removeEntry = Canyon.action("removeEntry", "click", (e) => {

//     let listId = e.target.getAttribute("data-list-id")

//     let newList = store.myList.get()
//     newList.splice(listId, 1)

//     store.myList.set(newList)
// })

// let newElement = new ElementBuilder({"id": "hello"}, {"value": "hello there"})
// let builtElement = Canyon.buildElement(newElement.getElement())
// Canyon.render(builtElement)

store.todos = Canyon.field("myTodos", [])
store.newTodo = Canyon.field("newTodo", "")

actions.updateNewTodo = Canyon.action("updateNewTodo", "input", (e) => {
    store.newTodo.set(e.target.value)
})

actions.addTodo = Canyon.action("addTodo", ["click"], () => {
    let oldItems = store.todos.get()
    let newItem = store.newTodo.get()

    store.todos.set([...oldItems, newItem])
    store.newTodo.set("")
})

actions.completeTodo = Canyon.action("completeTodo", "click", (e) => {

    let listId = e.target.getAttribute("data-list-id")

    let newList = todos.get()
    newList.splice(listId, 1)

    console.log('newList', newList, listId)

    store.myList.set(newList)
})



watchers.todoWatcher = Canyon.watch([store.todos], () => {
    let list = store.todos.get()

    console.log("list", list)

    //let myElement = templateEngine(`<div id="@id">hello</div>`, [{name: "id", value:"listElement"}])

    // let myElement = {
    //     elementType: "div",
    //     attributes: [{"name": "id", "value": "listElement"}],
    //     actions: [],
    //     value: "",
    //     children: []
    // }


    let children = []
    for(let i = 0 ; i < list.length ; i++) {
        
        

        
        // myElement.children.push({
        //     elementType: "div",
        //     attributes: [{"name":"data-list-id", "value":i}],
        //     actions: [],
        //     value: list[i],
        //     children: [{
        //         elementType: "button",
        //         attributes: [{"name":"data-list-id", "value":i}],
        //         // actions: [actions.removeEntry],
        //         value: "Remove"
        //     }]
        // })

        children.push(templateEngine(`<div data-list-id="@id">@value <button data-list-id="@id" data-action="completeTodo">Complete</button></div>`, [{name: "id", value: i}, {name: "value", value: list[i]}]))
    }

    let myElement = templateEngine(`<div id="@id">@children</div>`, [{name: "id", value:"listElement"}, {name: "children", value: children}])
    // list.forEach((item, index) => myElement.children.push({
    //     elementType: "div",
    //     attributes: [{"name":"data-list-id", "value":index}],
    //     actions: [],
    //     value: item,
    //     children: [{
    //         elementType: "button",
    //         attributes: [{"name":"data-list-id", "value":index}, {"name":"data-action", "value":"removeEntry"}],
    //         actions: [actions.removeEntry],
    //         value: "Remove"
    //     }]
    // }))

    console.log('children', children)
    console.log('myElement', myElement)
    Canyon.renderTemplate(myElement, document.getElementById("currentTodos"))
})