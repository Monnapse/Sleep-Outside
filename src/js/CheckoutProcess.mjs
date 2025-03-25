import { getLocalStorage } from "./utils.mjs";

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
        const price = item.FinalPrice? item.FinalPrice : item.ListPrice;

        this.itemTotal += item.FinalPrice;
      }
    }
  
    calculateOrderTotal() {
      this.calculateItemSubTotal();
      console.log(this.itemTotal)

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
  }