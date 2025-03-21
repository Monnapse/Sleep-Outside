import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import {loadHeaderFooter, getParam} from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');

// Update Title
function capitalizeFirstWord(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const titleElement = document.getElementById('title');
titleElement.innerText = `Top Product: ${capitalizeFirstWord(category)}`;

const dataSource = new ProductData(category);
const listElement = document.getElementById('productList');
const productList = new ProductList(category, dataSource, listElement);
productList.init();