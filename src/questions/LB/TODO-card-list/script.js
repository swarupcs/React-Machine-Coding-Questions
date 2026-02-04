const createTodoCard = (todoObj) => {
  const { userId, todo } = todoObj;

  const card = document.createElement("div");
  card.className = "todo-card";

  const title = document.createElement("span");
  title.innerText = `User #${userId}`;

  const desc = document.createElement("p");
  desc.innerText = todo;

  card.appendChild(title);
  card.appendChild(desc);

  return card;
};
