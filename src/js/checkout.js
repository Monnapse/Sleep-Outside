import ExternalServices from "./ExternalServices.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { formDataToJSON } from "./utils.mjs";

loadHeaderFooter();

const checkoutProcess = new CheckoutProcess(
    "so-cart",
    "#order-summary"
);
checkoutProcess.init();
//checkoutProcess.displayOrderTotals();

const zipInput = document.querySelector("#zip");
const form = document.querySelector("form");

zipInput.addEventListener("input", (e) => {
    const zipCode = zipInput.value;

    if (zipCode.length >= 3)
    {
        checkoutProcess.calculateItemSummary();
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Order Submitted!");
    const checkout = checkoutProcess.checkout(
        formDataToJSON(form)
    );
});