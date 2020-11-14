let users = [
  "Amanda Adams",
  "Bob Barry",
  "Cathy Campbell",
  "Derrick Daas",
  "Eugene Earnst",
  "Fran Fabel",
];

let UserSelection = (users) => {
  let select = canyon.template(`<select id="users"></select>`);

  let UserOption = new CanyonComponent(`<option value="{id}">{user}</option>`);

  users.forEach((user, index) => {
    select.appendChild(UserOption.build({ id: index, user }));
  });
  let container = canyon.template(
    `
        <div>
            {select}
            <button>Submit</button>
        </div>
    `,
    { select }
  );
  return container;
};

// let UserList = (users) => {
//   let container = canyon.template(`<ul id="userList"></ul>`);
//   let UserList = new CanyonComponent(`<li value="{id}">{user}</li>`);
//   users.forEach((user, index) => {
//     container.appendChild(UserList.build({ id: index, user }));
//   });
//   return container;
// };

let UserList = (users) => {
  let container = new CanyonComponent(`<ul id="userList"></ul>`);
  let UserList = new CanyonComponent(`<li value="{id}">{user}</li>`);
  users.forEach((user, index) => {
    container.add(UserList.build({ id: index, user }));
  });
  return container.build();
};
