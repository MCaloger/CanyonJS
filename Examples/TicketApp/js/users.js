

let users = [
    "Amanda Adams",
    "Bob Barry",
    "Cathy Campbell",
    "Derrick Daas",
    "Eugene Earnst",
    "Fran Fabel"
]


let UserSelection = (users) => {
    let select = canyon.template(`<select id="users"></select>`)
    
    let UserOption = new CanyonComponent(`<option value="{id}">{user}</option>`)
    
    users.forEach((user, index) => {
        select.appendChild(UserOption.build({id: index, user}))
    })
    let container = canyon.template(`
        <div>
            {select}
            <button>Submit</button>
        </div>
    `, {select})
    return container
} 
