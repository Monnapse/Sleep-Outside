import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateOrderTotal();
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    for (let item of this.list) {
      if (!item?.Id) continue;
      const price = item.FinalPrice ? item.FinalPrice : item.ListPrice;

      this.itemTotal += item.FinalPrice;
    }
  }

  calculateOrderTotal() {
    this.calculateItemSubTotal();
    console.log(this.itemTotal);

    const subTotal = document.querySelector(`${this.outputSelector} #subtotal`);
    subTotal.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateItemSummary() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = this.itemTotal * 0.07;
    this.shipping = this.itemTotal * 0.03;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const total = document.querySelector(`${this.outputSelector} #order-total`);

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    total.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  // takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
  packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process.
    // An Array.map would be perfect for this process.

    const packagedItems = items.map((item) => {
      if (!item?.Id) return null;

      return {
        id: item.Id,
        name: item.NameWithoutBrand,
        price: item.FinalPrice,
        quantity: 1,
      };
    });

    return packagedItems;
  }
  async checkout(form) {
    // get the form element data by the form name
    // convert the form data to a JSON order object using the formDataToJSON function
    // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
    // call the checkout method in the ExternalServices module and send it the JSON order data.

    const packagedItems = this.packageItems(this.list);

    const checkoutData = {
      orderDate: new Date().toISOString(),
      fname: form.fname,
      lname: form.lname,
      street: form.street,
      city: form.city,
      state: form.state,
      zip: form.zip,
      cardNumber: form.cardNumber,
      expiration: form.expiration,
      code: form.code,
      items: packagedItems,
      orderTotal: this.orderTotal,
      shipping: this.shipping,
      tax: this.tax,
    };

    //const order = {
    //  method: "POST",
    //  headers: {
    //    "Content-Type": "application/json",
    //  },
    //  body: JSON.stringify(checkoutData),
    //};

    try {
      //const response = await services.checkout(checkoutData);
      const res = await services.checkout(checkoutData);
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      removeAllAlerts();
      alertMessage(err.message);
      console.log(err);
    }
  }
}
