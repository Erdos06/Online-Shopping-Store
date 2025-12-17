let items = [];
const BACKEND = 'https://693fdb51993d68afba69f3b2.mockapi.io/items';

async function loadItems() {
  const res = await fetch(BACKEND);
  items = await res.json();

  render();
}
loadItems();

function submitReview() {
  const review = document.getElementById('review');

  const reviewText = review.value;
  const userName = JSON.parse(localStorage.getItem('loggedUser')).username;

  const reviewHTML = `
    <div>
      <h4 class="fw-bold">${userName}</h4>
      <p>${reviewText}</p>
    </div>
  `;

  document.getElementById('reviews').innerHTML += reviewHTML;

  document.getElementById('review').value = '';
}

function render() {
  const card = document.getElementById('card');

  let itemId = localStorage.getItem('idOfItem');
  const Item = items.find((item) => item.id == itemId);

  card.innerHTML = `
          <div class="row g-3">
        <div class="col-md-4 text-center">
          <img
            src="${Item.image}"
            alt=""
            class="img-fluid"
            width="300rem"
          />
          
        </div>
        <div class="col-md-8">
          <h2 class="title">${Item.name}</h2>
          <p class="price">$${Item.price}</p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>

          <ul>
            <li>Omnis iste natus error sit voluptatem</li>
            <li>Accusantium doloremque</li>
            <li>Laudantium, totam rem aperiam</li>
            <li>Eaque ipsa quae ab illo inventore veritatis</li>
          </ul>



          <button class="addButton mt-4" onclick="addToBasketButton(${Item.id})">Add to basket</button>

          <div class="accordion pt-5" id="reviewsAccordion">
            <div class="accordion-item border-0">
              <h2 class="accordion-header" id="headingReviews">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseReviews"
                  aria-expanded="false"
                  aria-controls="collapseReviews"
                >
                  Reviews
                </button>
              </h2>
              <div
                id="collapseReviews"
                class="accordion-collapse collapse"
                aria-labelledby="headingReviews"
                data-bs-parent="#reviewsAccordion"
              >
                <div class="accordion-body">
                  <div id="reviews">
                    <div>
                      <h4 class="fw-bold"></h4>
                      <p></p>
                    </div>
                  </div>
                  <hr />
                  <h5>Add Review</h5>

                  <div class="mb-3">
                    <label for="review" class="form-label">Your Review</label>
                    <textarea class="form-control" id="review" rows="4"></textarea>
                  </div>

                  <button id="submit" class="btn btn-dark" onclick="submitReview()" >Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}

function addToBasketButton(id) {
  if (localStorage.getItem('loggedUser') == null) {
    window.location.href = '../login/login.html';
    return;
  }

  let basket = [];
  const stored = localStorage.getItem('currentBasket');

  if (stored) {
    basket = JSON.parse(stored);
  }

  const existingItem = basket.find((item) => item.id == id);
  if (existingItem) {
    existingItem.count += 1;
  } else {
    const itemToAdd = items.find((value) => value.id == id);
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
