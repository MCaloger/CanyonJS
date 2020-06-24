store.counter = Canyon.field("counter", 0)
store.myTextbox = Canyon.field("myTextbox", ""),
store.combined = Canyon.field("combined", "default"),
store.myList = Canyon.field("myList", ["hello", "there", "world"])

watchers.combinedWatcher = Canyon.watch([store.myTextbox, store.counter], () => {
    let text = store.myTextbox.get()
    let count = store.counter.get();
    store.combined.set(text.concat(count))
    store.myList.set([...store.myList.get(), store.combined.get()])
})

watchers.listWatcher = Canyon.watch([store.myList], () => {
    
    let list = store.myList.get()

    let myElement = {
        elementType: "div",
        attributes: [{"name": "id", "value": "listElement"}],
        actions: [],
        value: "",
        children: []
    }
    
    list.forEach((item, index) => myElement.children.push({
        elementType: "div",
        attributes: [{"name":"data-list-id", "value":index}],
        actions: [],
        value: item,
        children: [{
            elementType: "button",
            attributes: [{"name":"data-list-id", "value":index}, {"name":"data-action", "value":"removeEntry"}],
            actions: [actions.removeEntry],
            value: "Remove"
        }]
    }))
    Canyon.render(myElement, document.getElementById("container"))
})

actions.count = Canyon.action("count", ["click"], () => {
    let newValue = store.counter.get() + 1
    store.counter.set(newValue)
})

actions.updateText = Canyon.action("updateText", "input", (e) => {
    store.myTextbox.set(e.target.value)
})

actions.removeEntry = Canyon.action("removeEntry", "click", (e) => {

    let listId = e.target.getAttribute("data-list-id")

    let newList = store.myList.get()
    newList.splice(listId, 1)

    store.myList.set(newList)
})