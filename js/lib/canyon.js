class Canyon {
    constructor(){
        this.store = {}
        this.watchers = {}
        this.actions = {}
    }

    field(bind, defaultValue) {
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
    }

    actionListener(element, listeners, fn){
        
        if(Array.isArray(listeners)){
            listeners.forEach(listener => {
                element.addEventListener(listener, fn)
            })
        } else {
            element.addEventListener(listeners, fn)
        }
    }

    action(bind, listeners, fn) {
        let binds = []
        binds = document.querySelectorAll(`[data-action*="${bind}"]`)
        binds.forEach(element => {
            this.actionListener(element, listeners, fn)
        })
        return {bind, listeners, fn}
    }

    watch(fieldName, fn) {
        if(Array.isArray(fieldName)){
            fieldName.forEach(field => {
                field.watchers.push(fn)
                fn.call()
            })
        } else {
            fieldName.watchers.push(fn)
            fn.call()
        }
    }

    render(template, parent = document.getElementById("root")) {
        parent.innerHTML = ''
        parent.appendChild(template)
    }

    template(template, ...params) {
        let checkTreeForActions = (tree) => {
    
            tree.childNodes.forEach(child => {
                checkElementForActions(child)
                if(child.hasChildNodes) {
                    checkTreeForActions(child)
                }
            })
        }
        
        let checkElementForActions = (element) => {
            if(element.hasAttribute){
                if(element.hasAttribute("data-action")) {
                    let dataAction = element.getAttribute("data-action")

                    let actions = dataAction.split(" ")

                    actions.forEach(action => {
                        if(this.actions[action]) {
                        
                            this.actionListener(element, this.actions[action].listeners, this.actions[action].fn)
                        }
                    })
                }
            }
            
        }
        
        let sanitizer = content => {
            let text = content.toString()
            text = text.replace(new RegExp("&",'g'), "&amp;")
            text = text.replace(new RegExp("<",'g'), "&lt;")
            text = text.replace(new RegExp(">",'g'), "&gt;")
            text = text.replace(new RegExp("'",'g'), "&#39;")
            text = text.replace(new RegExp('"','g'), "&quot;")
            return text
        }
        
        let isDOM = el => el instanceof Element
        
        let exportElement = content => {
            let parser = new DOMParser
            
            let element = parser.parseFromString(content, "text/html").body.childNodes[0]
        
            checkTreeForActions(element)
        
            return element
        }

        if(isDOM(template)) {
            newTemplate = template.outerHTML
        }
    
        let newTemplate = template
    
        for(let i = 0 ; i < params.length ; i++){        
            let name = params[i].name
            let value = params[i]
    
    
            if(name != "children"){
                value = sanitizer(value())
            }
            
            let string = () => `{${name}}`
            let replacer = new RegExp(string(),'g');
    
            newTemplate = newTemplate.replace(replacer, value)
        }
    
        return exportElement(newTemplate)
    }
}