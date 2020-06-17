let render = (tree, parent) => {   
    let element = document.createElement(tree.elementType)

    if(Array.isArray(tree.attributes)){
        tree.attributes.forEach(attribute => {
            element.setAttribute(attribute.name, attribute.value)
        });
    }
    
    element.textContent = tree.value

    if(Array.isArray(tree.actions)) {
        
        tree.actions.forEach(action => {
            console.log('action', element, action, action.bind, action.listeners, action.fn)
            Canyon.actionListener(element, action.listeners, action.fn)
            
        })
    }

    if(Array.isArray(tree.children)) {
        tree.children.forEach((child) => render(child, element))
    }
    
    console.log('element', element)
    parent.appendChild(element)

}

let tree = {
    elementType: "div",
    attributes: [],
    actions: [],
    value: "",
    children: [
        {
            elementType: "p",
            attributes: [
                {
                    "name": "data-bind",
                    "value": "combined"
                }
            ],
            actions: [],
            value: "hello",
            children: []
        },
        {
            elementType: "button",
            attributes: [
                {
                    "name": "data-action",
                    "value": "count"
                }
            ],
            actions: [actions.count],
            value: "hello",
            children: []
        }
    ]
}

let list = store.myList.get()

list.forEach(item => tree.children.push({
    elementType: "div",
    attributes: [],
    actions: [],
    value: item,
    children: []
}))

console.log('tree', tree)
render(tree, document.getElementById("container"))