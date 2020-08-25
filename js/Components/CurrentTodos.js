canyon.store.todos = canyon.field("myTodos", ["Dishes"]);
canyon.store.todoCounter = canyon.field(
  "todoCounter",
  canyon.store.todos.get().length
);

canyon.actions.completeTodo = canyon.action("completeTodo", ["click"], (e) => {
  let listId = e.target.getAttribute("data-list-id");
  let newList = canyon.store.todos.get();
  let newItem = newList.splice(listId, 1);
  canyon.store.completedTodos.set(
    [...canyon.store.completedTodos.get(), newItem].sort()
  );
  canyon.store.todos.set(newList.sort());
});

canyon.watchers.todoWatcher = canyon.watch([canyon.store.todos], () => {
  let list = canyon.store.todos.get();
  canyon.store.todoCounter.set(list.length);

  let id = "listElement";
  let completeTodo = canyon.actions.completeTodo.bind;

  let myElement = canyon.template(`<ul id="{id}" class="list-group"></ul>`, {
    id,
  });

  let listItemStyle = `display:flex; flex:1; align-items: center;`;

  let buttonComponent = new CanyonComponent(
    `<button type="button" class="btn btn-success" data-list-id="{index}" data-action="{completeTodo}">
                Complete
            </button>`
  );

  let liComponent = new CanyonComponent(
    `
        <li style="{listItemStyle}" class="list-group-item" data-list-id="{index}">
            <div style="{listItemStyle}">
                {value}
            </div>
            {Button}
        </li>`
  );

  list.forEach((item, i) => {
    let Button = buttonComponent.build({ index: i, completeTodo });
    console.log(
      "Button, typeof(Button)",
      Button,
      typeof Button,
      Button instanceof Element
    );
    let List = liComponent.build({ i, listItemStyle, value: item, Button });
    console.log(
      "List, typeof(List",
      List,
      typeof List,
      List instanceof Element
    );
    myElement.appendChild(List);
  });
  canyon.render(myElement, document.getElementById("currentTodos"));
});
