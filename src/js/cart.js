import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  let cartTotal = 0;
  const htmlItems = cartItems.map((item) => {
    if (!item?.Id) return;
    cartTotal += item?.FinalPrice;
    return cartItemTemplate(item);
  });

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.querySelector("#cart-total").textContent = `Total: $${cartTotal}`;

  // Add Remove Button Functionality
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const itemId = e.target.dataset.id;
      const updatedCartItems = cartItems.filter((item) => item.Id !== itemId);
      setLocalStorage("so-cart", updatedCartItems);
      renderCartContents();
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image">
      <img
        src="${item?.Image ? item?.Image : item?.Images?.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-item" data-id="${item.Id}">Remove</button>
  </li>`;

  return newItem;
}

async function renderCartPage() {
  await loadHeaderFooter();
  renderCartContents();
}

renderCartPage();
