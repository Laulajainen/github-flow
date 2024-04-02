"use strict";

const buttonSizeEl = document.getElementById("buttonSize");

// Handle cart in localstorage

let cart = [];

if (localStorage.getItem("cart") != null) {
    let fromLocalstorage = localStorage.getItem("cart");
    let fromLocalstorageArray = JSON.parse(fromLocalstorage);
    cart = fromLocalstorageArray;
    buttonSizeEl.innerHTML = fromLocalstorageArray.length;
} else {
    cart = [];
}

function addToCart(item) {
    if (item != "") {
        let product = item;
        cart.push(product);
        let cartJSON = JSON.stringify(cart);
        localStorage.setItem("cart", cartJSON);
        let fromLocalstorage = localStorage.getItem("cart");
        let fromLocalstorageArray = JSON.parse(fromLocalstorage);
        buttonSizeEl.innerHTML = fromLocalstorageArray.length;
    }
}
