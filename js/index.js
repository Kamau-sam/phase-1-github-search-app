document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const usersQuery = event.target.search.value;
    const ul = document.querySelector("#user-list");
    ul.innerHTML = "";

    fetch(`https://api.github.com/search/users?q=${usersQuery}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("response error");
        }
        return response.json();
      })
      .then((data) => {
        data.items.forEach((user) => {
          const li = document.createElement("li");
          const userName = document.createElement("a");
          const avatar = document.createElement("img");

          userName.textContent = user.login;
          userName.href = user.html_url;
          avatar.src = user.avatar_url;
          avatar.alt = `${user.login}'s avatar`;

          li.appendChild(userName);
          li.appendChild(avatar);
          ul.appendChild(li);
        });
      })
      .catch((error) => {
        console.error("Failed:", error);
        ul.textContent = "Could not load data";
      });
  });
});
