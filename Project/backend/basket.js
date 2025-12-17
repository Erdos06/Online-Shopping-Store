let basket = [];

const container = document.getElementsByClassName('cart-container')[0];

function renderBasket() {
  container.innerHTML = '';
  basket = JSON.parse(localStorage.getItem('currentBasket'));

  let helpText = document.getElementById('helpText');

  if (basket != null) {
    helpText.innerHTML = '';
    basket.map((item) => {
      container.innerHTML += `<div class="cart">
          <img
            src="${item.image}"
            alt=""
          />

          <p>${item.name}</p>
          <p>$${item.price}</p>
          <div class="btn-container">
            <button class="minus" onclick="minusButton(this, ${item.id})">-</button>
            <button class="count">${item.count}</button>
            <button class="plus" onclick="plusButton(this, ${item.id})">+</button>
          </div>
        </div>`;
    });
  } else {
    helpText.innerText = 'No items yet';
  }
}

renderBasket();

function minusButton(button, id) {
  const countButton = button.nextElementSibling;

  let count = Number(countButton.innerText) - 1;

  if (count == 0) {
    basket = basket.filter((item) => item.id != id);
  } else {
    basket.map((item) => {
      if (item.id == id) {
        item.count = count;
      }
    });
  }
  localStorage.setItem('currentBasket', JSON.stringify(basket));

  renderBasket();
}
function plusButton(button, id) {
  const countButton = button.previousElementSibling;

  let count = Number(countButton.innerText) + 1;

  basket.map((item) => {
    if (item.id == id) {
      item.count = count;
    }
  });
  localStorage.setItem('currentBasket', JSON.stringify(basket));

  renderBasket();
}

function deleteAll() {
  localStorage.setItem('currentBasket', []);

  window.location.reload();
}

function buy() {}
