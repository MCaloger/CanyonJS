let root = new CanyonComponent(`
    {UserSelection}
`)

canyon.render(root.build({UserSelection: UserSelection(users)}))