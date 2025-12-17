let users = [];

async function loadUsers() {
  const BACKEND = 'https://693fd439993d68afba69dc78.mockapi.io/users';
  const res = await fetch(BACKEND);
  users = await res.json();
  console.log(users);
}

loadUsers();

function loginBtnPressed() {
  document.getElementsByClassName('help-text')[0].innerText = '';

  let inputUsername = document.getElementsByClassName('fieldUsername')[0].value;
  let inputPassword = document.getElementsByClassName('fieldPassword')[0].value;

  if (inputUsername.trim() == '' || inputPassword.trim() == '') {
    document.getElementsByClassName('help-text')[0].innerText = '';

    document.getElementsByClassName('help-text')[0].innerText = `Something is empty`;
    return;
  }

  let isLogged = false;
  let loggedUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === inputUsername) {
      if (users[i].password == inputPassword) {
        isLogged = true;
        loggedUser = {
          id: users[i].id,
          username: users[i].username,
          items: users[i].items,
          balance: users[i].balance,
        };
      } else {
        document.getElementsByClassName('help-text')[0].innerText = 'Password is wrong';
        return;
      }
    }
  }
  if (!isLogged) {
    document.getElementsByClassName('help-text')[0].innerText = 'Username is wrong';
  } else {
    localStorage.setItem(
      'loggedUser',
      JSON.stringify({
        id: loggedUser.id,
        username: loggedUser.username,
        items: loggedUser.items,
        balance: loggedUser.balance,
      }),
    );
    window.location.href = '../index.html';
  }
}

function signupBtnPressed() {
  document.getElementsByClassName('login-island')[0].innerHTML = `
    <div class="text">Sign up</div>

    <div class="fields">
      <input type="text" class="fieldUsername" placeholder="username" />
      <input type="password" class="fieldPassword" placeholder="password" />
    </div>

    <div class="buttons">
      <button class="goBackButton" onclick="goBackPressed()">Go back</button>
      <button class="signup-btn" onclick="signupPressed()">Sign up</button>
    </div>

    <div class="help-text" style="color: red; font-size: 16px"></div>
  `;
}

function goBackPressed() {
  document.getElementsByClassName('login-island')[0].innerHTML = `
        <div class="text">Log in</div>
            <div class="fields">
              <input type="text" class="fieldUsername" placeholder="username" />
              <input type="password" class="fieldPassword" placeholder="password" />
            </div>

            <div class="buttons">
              <button class="login-btn" onclick="loginBtnPressed()">Log in</button>
              <button class="signup-btn" onclick="signupBtnPressed()">Sign up</button>
            </div>

             <div class="help-text" style="color: red; font-size: 16px"></div>
    `;
}

function signupPressed() {
  document.getElementsByClassName('help-text')[0].innerText = '';

  let inputUsername = document.getElementsByClassName('fieldUsername')[0].value;
  let inputPassword = document.getElementsByClassName('fieldPassword')[0].value;

  if (inputUsername.trim() == '' || inputPassword.trim() == '') {
    document.getElementsByClassName('help-text')[0].innerText = '';

    document.getElementsByClassName('help-text')[0].innerText = `Something is empty`;
    return;
  }

  if (users.length == 0) {
    users.push({ username: inputUsername, password: inputPassword });
  } else {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username == inputUsername) {
        document.getElementsByClassName('help-text')[0].innerText = `This username already exists`;
      }
    }
  }
}

function createBasket() {
  localStorage.setItem('currentBasket', JSON.stringify([]));
}

createBasket();
