let root = new CanyonComponent(`
    <div>
        {UserSelection}
        {UserList}
    </div>
`);

canyon.render(
  root.build({ UserSelection: UserSelection(users), UserList: UserList(users) })
);
