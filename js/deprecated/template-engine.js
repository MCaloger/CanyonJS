let buildElementFromText = text => {
    
}

let templateEngine = (template, params) => {

    let wrapper = document.createElement("div")
    let hasChildren = false
    let childrenIndex = null;

    let childWrapper = document.createElement("div")

    let isDOM = el => el instanceof Element

    let newTemplate = template
    console.log('params', params)

    for(let i = 0 ; i < params.length ; i++){
        let isChild = false;
        params[i].value
        console.log(params[i])
        
        if(params[i].name === "children") {
            hasChildren = true
            childrenIndex = i;
            isChild = true
        } 

        let string = "@" + params[i].name
        let replacer = new RegExp(string,'g');
        console.log('isChild', isChild)
        if(!isChild) {
            newTemplate = newTemplate.replace(replacer, params[i].value)
        } else {
            newTemplate = newTemplate.replace(replacer, '')
        }
            

    }

    wrapper.innerHTML = newTemplate

    let element = wrapper.firstChild

    console.log('childWrapper.firstChild', childWrapper, childWrapper.firstChild, hasChildren)

    if(hasChildren === true){
        for(let i = 0 ; i < params[childrenIndex].value.length ; i++){
            childWrapper.appendChild(params[childrenIndex].value[i])
        }
        element.appendChild(childWrapper)
    }
    
    return element
}