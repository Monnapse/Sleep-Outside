import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import {loadHeaderFooter} from './utils.mjs';

loadHeaderFooter();


const productId = getParam('product');
const category = getParam('category');
const dataSource = new ProductData(category);

console.log(dataSource.getData(category));

async function initProduct() {
    const product = new ProductDetails(productId, dataSource);
    await product.init();
    product.renderProductDetails();
}

initProduct();

// add listener to Add to Cart button
//document
//  .getElementById("addToCart")
//  .addEventListener("click", addToCartHandler);
