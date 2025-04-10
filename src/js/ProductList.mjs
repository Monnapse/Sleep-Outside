import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  console.log(product);
  const productImage = product.Image ? product.Image : product.Images ? product.Images.PrimaryMedium : null;
  return `
    <li class="product-card">
        <a href="/product_pages/index.html?product=${product?.Id}&category=${product?.Category}">
        <img
          src="${productImage}"
          alt="${product?.NameWithoutBrand}"
        />
        <h3 class="card__brand">${product?.Brand.Name}</h3>
        <h2 class="card__name">${product?.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product?.ListPrice}</p></a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
