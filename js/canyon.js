let Canyon = {
    field: (bind, defaultValue) => {
        let CanyonField = {
            value: defaultValue,
            watchers: [],
            set: (value) => {
                CanyonField.value = value
                let binds = []
                binds = document.querySelectorAll(`[data-bind="${bind}"]`)
                binds.forEach(element => {
                    element.innerText = CanyonField.value
                })
                CanyonField.watchers.forEach((watcher) => {
                    watcher.call(value)
                })
            },
            get: () => {
                return CanyonField.value
            }
        }
        CanyonField.set(CanyonField.value)
        return CanyonField
    },
    list: (list, bind, updateFn, renderFn) => {
        Canyon.watch("myList", updateFn)
        renderFn.call(list, bind)
    },
    actionListener: (element, listeners, fn) => {
        if(Array.isArray(listeners)){
            listeners.forEach(listener => {
                element.addEventListener(listener, fn)
            })
        } else {
            element.addEventListener(listeners, fn)
        }
    },
    action: (bind, listeners, fn) => {
        let binds = []
        binds = document.querySelectorAll(`[data-action="${bind}"]`)
        binds.forEach(element => {
            Canyon.actionListener(element, listeners, fn)
        })
        return {bind, listeners, fn}
    },
    watch: (fieldName, fn) => {
        if(Array.isArray(fieldName)){
            fieldName.forEach(field => {
                field.watchers.push(fn)
            })
        } else {
            fieldName.watchers.push(fn)
        }
    },
    render: (tree, parent) => {   
    
        let element = Canyon.buildElement(tree)
        parent.innerHTML = ''
        parent.appendChild(element)
    },
    buildElement: (tree) => {
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
                element.appendChild(Canyon.buildElement(child, element))
    
            })
        }
    
        return element
    }
}


/*
Register stores
*/
let store = {}

/*
Register watchers
*/
let watchers = {}

/*
Register actions
*/
let actions = {}

