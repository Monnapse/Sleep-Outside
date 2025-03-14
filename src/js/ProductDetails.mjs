import { addProductToCart, convertToJson } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    console.log(dataSource);
  }

  async init() {
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));

    // Get Product Data
    await this.getProductData();
  }

  async getData() {
    return fetch(this?.dataSource?.path)
      .then(convertToJson)
      .then((data) => data);
  }

  async getProductData() {
    const data = await this.getData();
    //console.log(data, this.productId)
    this.product = data.find((item) => item.Id === this.productId? item : null);
  }

  async addToCart() {
    console.log(this.product);
    addProductToCart(this.product);
  }

  renderProductDetails() {
    /*

        {
    "Id": "880RR",
    "NameWithoutBrand": "Ajax Tent - 3-Person, 3-Season",
    "Name": "Marmot Ajax Tent - 3-Person, 3-Season",
    "Image": "../images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg",

    "SizesAvailable": {},
    "Colors": [
      {
        "ColorCode": "01",
        "ColorName": "Pale Pumpkin/Terracotta"
      }
    ],
    "DescriptionHtmlSimple": "Get out and enjoy nature with Marmot&#39;s Ajax tent, featuring a smart design with durable, waterproof construction and two doors for easy access.",
    "SuggestedRetailPrice": 300.0,
    "Brand": {
      "Id": "1308",
      "LogoSrc": "../images/logos/marmot-160x100.jpg",
      "Name": "Marmot"
    },
    "ListPrice": 199.99,
    "FinalPrice": 199.99
  },

        */
    document.title = `Sleep Outside | ${this.product?.NameWithoutBrand}`;
    document.getElementById("productBrand").innerText = this?.product.Brand?.Name;
    document.getElementById("productImage").src = this.product?.Image;
    document.getElementById("productName").innerText = this.product?.Name;;
    document.getElementById("productPrice").innerText = `$${this.product?.FinalPrice}`;
    document.getElementById("productDescription").innerHTML = this.product?.DescriptionHtmlSimple;
    document.getElementById("productColors").innerText = this.product?.Colors[0]?.ColorName;
  }
}
