//Fetch user's data

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((users) => displayData(users));

//function to display user's data

const displayData = (users) => {
  const mainContainer = document.getElementById('users-container');

  users.map(async ({ name, email, id }) => {
    let userPosts = [];

    await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((response) => response.json())
      .then((posts) => {
        userPosts = userPosts.concat(posts);
      });

    const div1 = document.createElement('div');
    div1.innerHTML = `
    <h3 class = "user-name">Name: ${name}</h3> 
    <span class = "user-email">Email: ${email}</span>

    <button class = ${`link-to-post-${id}`}>Get user's Posts</button>
    `;

    // button.addEventListener('click', (e) => console.log(e.target));
    div1.classList.add('user-card');
    mainContainer.appendChild(div1);
    const button = document.querySelector(`.link-to-post-${id}`);
    button.addEventListener('click', () => {
      div1.appendChild(createList(userPosts));
    });
  });
};

//Function to create list of posts

const createList = (array) => {
  const list = document.createElement('ul');
  array.forEach(({ title, body }) => {
    const listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(title));
    list.appendChild(listItem);
  });
  return list;
};
