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
    }
}


/*
Register stores
*/
let store = {
    counter: Canyon.field("counter", 0),
    myTextbox: Canyon.field("myTextbox", ""),
    combined: Canyon.field("combined", "default"),
    myList: Canyon.field("list", ["hello", "there", "world"])
}

/*
Register watchers
*/
let watchers = {
    combinedWatcher: Canyon.watch([store.myTextbox, store.counter], () => {
        let text = store.myTextbox.get()
        let count = store.counter.get();
        store.combined.set(text.concat(count))
        console.log('object', [...store.myList.get(), store.combined.get()])
        store.myList.set([...store.myList.get(), store.combined.get()])
    }),
}

/*
Register actions
*/
let actions = {
    count: Canyon.action("count", ["click"], () => {
        let newValue = store.counter.get() + 1
        store.counter.set(newValue)
    }),
    updateText: Canyon.action("updateText", "input", (e) => {
        store.myTextbox.set(e.target.value)
    })
}

