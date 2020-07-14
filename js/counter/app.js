let canyon = new Canyon()

canyon.store.counter = canyon.field('counter', 0)

canyon.actions.add = canyon.action("add", "click", () => {
    canyon.store.counter.set(canyon.store.counter.get() + 1)
})

canyon.actions.subtract = canyon.action("subtract", "click", () => {
    canyon.store.counter.set(canyon.store.counter.get() - 1)
})