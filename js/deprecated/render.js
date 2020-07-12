let render = (tree, parent) => {   
    
    let element = buildElement(tree)
    parent.innerHTML = ''
    parent.appendChild(element)
}

let buildElement = (tree) => {
    let element = document.createElement(tree.elementType)

    if(Array.isArray(tree.attributes)){
        tree.attributes.forEach(attribute => {
            element.setAttribute(attribute.name, attribute.value)
        });
    }
    
    element.textContent = tree.value

    if(Array.isArray(tree.actions)) {
        
        tree.actions.forEach(action => {
            Canyon.actionListener(element, action.listeners, action.fn)
            
        })
    }

    if(Array.isArray(tree.children)) {
        tree.children.forEach((child) => {
            element.appendChild(buildElement(child, element))

        })
    }

    return element
}

let myTree = {
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

let renderList = (list, bind) => {

}