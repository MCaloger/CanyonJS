canyon.store.completedTodos = canyon.field("completedTodos", []);

canyon.store.completedTodoCounter = canyon.field("completedTodoCounter", 0);

canyon.actions.uncompleteTodo = canyon.action(
  "uncompleteTodo",
  ["click"],
  (e) => {
    let listId = e.target.getAttribute("data-list-id");
    let newList = canyon.store.completedTodos.get();
    let newItem = newList.splice(listId, 1);
    canyon.store.todos.set([...canyon.store.todos.get(), newItem].sort());
    canyon.store.completedTodos.set(newList.sort());
  }
);

canyon.actions.deleteTodo = canyon.action("deleteTodo", "click", (e) => {
  let listId = e.target.getAttribute("data-list-id");

  let newList = canyon.store.completedTodos.get();
  newList.splice(listId, 1);
  canyon.store.completedTodos.set(newList.sort());
});

canyon.watchers.completedTodoWatcher = canyon.watch(
  [canyon.store.completedTodos],
  () => {
    let list = canyon.store.completedTodos.get();
    canyon.store.completedTodoCounter.set(list.length);

    let id = () => "listElement";
    let uncompleteTodo = () => canyon.actions.uncompleteTodo.bind;
    let deleteTodo = () => canyon.actions.deleteTodo.bind;
    let myElement = canyon.template(`<div id="{id}"></div>`, id);

    let listItemStyle = () => `display:flex; flex:1; align-items: center;`;
    let strikethrough = () => `text-decoration: line-through; color: grey;`;

    list.forEach((item, i) => {
      let value = () => item;
      let index = () => i;

      myElement.appendChild(
        canyon.template(
          `
        <li style="{listItemStyle}" class="list-group-item" data-list-id="{index}">
            <div style="{listItemStyle}{strikethrough}">
                {value}
            </div>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary btn-warning" data-list-id="{index}" data-action="{uncompleteTodo}">
                    Uncomplete
                </button>
                <button type="button" class="btn btn-secondary btn-danger" data-list-id="{index}" data-action="{deleteTodo}">
                    Delete
                </button>
            </div>
        </li>`,
          [
            index,
            listItemStyle,
            value,
            uncompleteTodo,
            strikethrough,
            deleteTodo,
          ]
        )
      );
    });

    canyon.render(myElement, document.getElementById("completedTodos"));
  }
);
