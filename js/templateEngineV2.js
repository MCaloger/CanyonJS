let buildElementFromText = text => {
    
}

let buildElementFromElement = element => {

}

let isDOM = el => el instanceof Element

let exportElement = content => {
    let element = new DOMParser.parseFromString(content, "text/html")

    console.log('element.outerHTML', element.outerHTML)

    if(element.hasAttribute("data-action")) {
        let action = element.getAttribute("data-action")

        if(actions[action]) {
            console.log('action found for', actions[action])
            Canyon.actionListener(element, actions[action].listeners, actions[action].fn)
        } else {
            console.log('No action found for ', action)
        }
    }

    return element
}


let templateEngine = (template, params) => {

    if(isDOM(template)) {
        newTemplate = template.outerHTML
    }

    let newTemplate = template

    for(let i = 0 ; i < params.length ; i++){        
        let name = params[i].name
        let value = params[i]

        let string = () => `{${name}}`
        let replacer = new RegExp(string(),'g');

        newTemplate = newTemplate.replace(replacer, value)
    }

    return exportElement(newTemplate)
}