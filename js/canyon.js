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
                    element.value = CanyonField.value
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
        console.log('action', bind, listeners, fn)
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
    render: (tree, parent = document.getElementById("root")) => {   
    
        let element = Canyon.buildElement(tree)
        parent.innerHTML = ''
        parent.appendChild(element)
    },
    renderTemplate: (template, parent = document.getElementById("root")) => {
        parent.innerHTML = ''
        parent.appendChild(template)
    },
    buildElement: (tree) => {
        let element = null
        if(tree.elementType){
            element = document.createElement(tree.elementType)
        } else {
            element = document.createElement("div")
        }
    
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

// class ElementBuilder {
//     constructor(attributes, actions, children) {
//         this.element = {
//             "elementType": "div"
//         }

//         this.attributes = {}
//         this.children = {}
//         this.actions = {}

//         attributes.forEach(attribute => {
//             this.addAttribute(attribute.name, attribute.value)
//         })

//         actions.forEach(attribute => {
//             this.addAttribute(attribute.name, attribute.value)
//         })

//         children.forEach(attribute => {
//             this.addAttribute(attribute.name, attribute.value)
//         })
//     }
//         value.replace(/&/g, "&amp;")
//         value.replace(/"/g, "&quot;")
//         value.replace(/</g, "&lt;")
//         value.replace(/>/g, "&gt;")
//         return value
//     }

//     addAttribute(name, value) {
//         if(name === "value") {
//             value = this.cleanHTML(attribute.value) 
//         }
//         this.element[this.name] = this.value
//     }

//     addChild(element) {
//         this.children.push(element)
//     }

//     addAction() {

//     }

//     getElement() {
//         return this.element
//     }
// }