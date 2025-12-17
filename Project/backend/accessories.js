let items = [];
const BACKEND = 'https://693fdb51993d68afba69f3b2.mockapi.io/items';

const cartContainer = document.getElementsByClassName('cartContainer')[0];

async function loadItems() {
  const res = await fetch(BACKEND);
  items = await res.json();

  renderItems();
}

function renderItems() {
  items.map((value) => {
    cartContainer.innerHTML += `
        <div class="cart">
            <img
              src="${value.image}"
              alt="image"
              onclick="cardInfo(${value.id})"
            />

            <p>${value.name}</p>
            <p>$${value.price}</p>

            <div class="btn-container">
              <button class="add" onclick="addToBasket(${value.id})">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
                  />
                </svg>
              </button>
            </div>
          </div>
        `;
  });
}

loadItems();

async function titleSortAsc() {
  document.getElementById('sortButton').innerText = 'Title(A-Z)';

  const res = await fetch(`${BACKEND}?sortBy=name`);
  items = await res.json();

  cartContainer.innerHTML = '';
  renderItems();
}
async function titleSortDesc() {
  document.getElementById('sortButton').innerText = 'Title(Z-A)';

  const res = await fetch(`${BACKEND}?sortBy=name&order=desc`);
  items = await res.json();

  cartContainer.innerHTML = '';
  renderItems();
}
async function priceSortAsc() {
  document.getElementById('sortButton').innerText = 'Price (Lowest first)';

  const res = await fetch(`${BACKEND}?sortBy=price`);
  items = await res.json();

  cartContainer.innerHTML = '';
  renderItems();
}
async function priceSortDesc() {
  document.getElementById('sortButton').innerText = 'Price (Highest first)';

  const res = await fetch(`${BACKEND}?sortBy=price&order=desc`);
  items = await res.json();

  cartContainer.innerHTML = '';
  renderItems();
}

function addToBasket(itemId) {
  if (localStorage.getItem('loggedUser') == null) {
    window.location.href = '../login/login.html';
    return;
  }

  let basket = [];
  const stored = localStorage.getItem('currentBasket');

  if (stored) {
    basket = JSON.parse(stored);
  }

  const existingItem = basket.find((item) => item.id == itemId);
  if (existingItem) {
    existingItem.count += 1;
  } else {
    const itemToAdd = items.find((value) => value.id == itemId);
    basket.push({
      id: itemToAdd.id,
      name: itemToAdd.name,
      price: itemToAdd.price,
      image: itemToAdd.image,
      count: 1,
    });
  }

  localStorage.setItem('currentBasket', JSON.stringify(basket));
}

function cardInfo(id) {
  window.location.href = '../card.html';

  localStorage.setItem('idOfItem', id);
}
