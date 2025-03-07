import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Check if item isnt already in the cart
  const cartItems = getLocalStorage("so-cart") || [];
  let found = false;
  console.log(product);

  cartItems.map((cartProduct, index) => {
    if (cartProduct.Id == product.Id) found = true;
  });

  if (found === true) return;
  console.log(product);
  setLocalStorage("so-cart", [...cartItems, product]);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
