let links = [
    {title:"Home", url:"#home"},
    {title:"About", url:"#about"},
    {title:"Contact", url:"#contact"},
]

let LinkComponent = new CanyonComponent(`<a href="{url}">{title}</a>`)

let NavigatorComponent = () => {
    let container = canyon.template(`<div id="navigator"></div>`)

    links.forEach(link => {
        container.appendChild(LinkComponent.build({title: link.title, url: link.url}))
    })
    return container
}

