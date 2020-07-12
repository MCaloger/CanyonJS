let buildElementFromText = text => {
    
}

let buildElementFromElement = element => {

}

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
            let action = element.getAttribute("data-action")
    
            if(actions[action]) {
                
                Canyon.actionListener(element, actions[action].listeners, actions[action].fn)
            }
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


let templateEngine = (template, ...params) => {

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