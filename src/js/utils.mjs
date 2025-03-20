// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function addProductToCart(product) {
  console.log("Adding to cart", product);
  // Check if item isnt already in the cart
  const cartItems = getLocalStorage("so-cart") || [];
  let found = false;

  cartItems.map((cartProduct, index) => {
    if (cartProduct.Id == product.Id) {found = true};
  });

  if (found === true) return;

  console.log(product);

  setLocalStorage("so-cart", [...cartItems, product]);
}

export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  const htmlStrings = list.map(templateFn);

  if (clear) {
    parentElement.innerHTML = "";
  }
  
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
  }
  parentElement.insertAdjacentHTML("afterbegin", template);
  const fragment = document.createRange().createContextualFragment(template);
  parentElement.replaceChildren(fragment);
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  // Header
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerElement);

  // Footer
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}