"use strict";

const cartEl = document.getElementById("cartList");
const cartSizeEl = document.getElementById("cartSize");

// Read cart from localstorage
let checkoutCart = [];

if (localStorage.getItem("cart") != null) {
    let fromLocalstorage = localStorage.getItem("cart");
    let fromLocalstorageArray = JSON.parse(fromLocalstorage);
    checkoutCart = fromLocalstorageArray;
} else {
    checkoutCart = [];
}

function renderCart() {
    if (localStorage.getItem("cart") != null) {
        let cartfromLocalstorage = localStorage.getItem("cart");
        let cartfromLocalstorageArray = JSON.parse(cartfromLocalstorage);
        cartEl.innerHTML = "";
        let totalCost = 0;

        for (const product of cartfromLocalstorageArray) {
            totalCost += product.price;

            cartEl.innerHTML += `
    <li class="list-group-item d-flex justify-content-between lh-sm" style="min-height:75px;">
    <div class="w-100">
      <h6 class="my-0 w-75">${product.title}</h6>
      <small class="text-muted">${product.category}</small>
    <button class="btn btn-outline-danger py-0 px-2 position-absolute bottom-0 end-0 my-2 mx-2" onclick="removeItem(${product.id})">Remove</button>
    </div>
    <span class="text-muted">$${product.price}</span>
  </li>
`
        }

        cartEl.innerHTML += `
<li class="list-group-item d-flex justify-content-between">
<span>Total (USD)</span>
<strong>$${Math.round(totalCost)}</strong>
</li>`

        cartSizeEl.innerHTML = cartfromLocalstorageArray.length;
    }
}

function removeItem(id) {

    if (localStorage.getItem("cart") != null) {
        let fromLocalstorage = localStorage.getItem("cart");
        let fromLocalstorageArray = JSON.parse(fromLocalstorage);
        checkoutCart = fromLocalstorageArray;

        // Find index to remove
        let index = checkoutCart.findIndex(x => x.id === id);

        // Remove index from array
        checkoutCart.splice(index, 1);

        let cartJSON = JSON.stringify(checkoutCart);
        localStorage.setItem("cart", cartJSON);
        fromLocalstorage = localStorage.getItem("cart");
        fromLocalstorageArray = JSON.parse(fromLocalstorage);
        buttonSizeEl.innerHTML = fromLocalstorageArray.length;
        cartSizeEl.innerHTML = fromLocalstorageArray.length;
        renderCart();
    }
}

window.onload = renderCart();