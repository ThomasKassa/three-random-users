const main = document.querySelector("main");
const title = document.querySelector("h1");

const urls = [
  "https://acme-users-api-rev.herokuapp.com/api/users/random",
  "https://acme-users-api-rev.herokuapp.com/api/users/random",
  "https://acme-users-api-rev.herokuapp.com/api/users/random"
];

const fetchAll = Promise.all(
  urls.map(url => fetch(url).then(response => response.json()))
);

const renderUsers = () => {
  fetchAll.then(users => {
    let i = 0;
    const html = users
      .map(user => {
        i++;
        user.number = i;
        return `
                <div class="indexContainer">
                    <h3 class="indexButton" href="#${i}">${i}</h3>
                </div>    

                <div class="userContainer">
                    <div class="userBox">

                        <h4 class="userName">${user.fullName}</h4>
                        <h4 class='userEmail'>${user.email}</h4>

                        <img class="avatar" src="${user.avatar}" alt="">
                        

                    </div>
                </div>`;
      })
      .join("");

    main.innerHTML = html;
    return users;
  });
};

renderUsers();

window.addEventListener("hashchange", ev => {
  ev.preventDefault();
  const userNumber = window.location.hash.slice(1);
  if (userNumber === "") {
    renderUsers();
  } else {
    fetchAll.then(users => {
      const clickedUser = users.find(user => {
        return parseInt(userNumber) === user.number;
      });

      const i = clickedUser.number;

      const html = `<div class="userContainer">
    <a class="number" href="#${i}">${i}</a>
    <div class="user${i}">
      <div class="userName">${clickedUser.fullName}</div>
      <div class='userEmail'>${clickedUser.email}</div>
      <div class='avatarContainer'>
        <img class="avatar" src="${clickedUser.avatar}" alt="">
      </div>
    </div>
  </div>`;

      main.innerHTML = html;
    });
  }
});

title.addEventListener("click", ev => {
  window.location.hash = "";
  renderUsers();
});