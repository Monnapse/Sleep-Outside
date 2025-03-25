import ProductData from "./ProductData.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const checkoutProcess = new CheckoutProcess(
    "so-cart",
    "#order-summary"
);
checkoutProcess.init();
//checkoutProcess.displayOrderTotals();

const zipInput = document.querySelector("#zip-code");

zipInput.addEventListener("input", (e) => {
    const zipCode = zipInput.value;

    if (zipCode.length >= 3)
    {
        checkoutProcess.calculateItemSummary();
    }
});