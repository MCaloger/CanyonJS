
let View = (currentLocation) => {
    let page = null
    switch(currentLocation){
        case "#home":
            page = Homepage()
            break;
        case "#about":
            page = About()
            break;
        default:
            page = canyon.template(`<div>No page found</div>`)
            break;
    }
    return canyon.template(`
        <div>
            {NavigatorComponent}
            {page}
        </div>
    `, {NavigatorComponent: NavigatorComponent(), page})
}