"use strict";

let mainUrl = "https://fakestoreapi.com/products";

const mainEl = document.getElementById("main");
const searchEl = document.getElementById("search");

let url;

let products = [];

// Search
searchEl.addEventListener("input", (e) => {
    const value = e.target.value;

    mainEl.innerHTML = "";

    products.forEach(product => {
        if (product.title.includes(value)) {
            mainEl.innerHTML += `
            <div class="col">
            <div class="card h-100 p-3">
              <img src="${product.image}" class="card-img-top" style="height:250px; object-fit:contain;" alt="${product.title}">
              <div class="card-body">
                <h3 class="card-title fs-4">${product.title}</h3>
                <p class="fs-5"><strong>$ ${product.price}</strong></p>
                <p class="card-text">${product.description}</p>
                <button class="btn btn-primary float-end" onclick="addToCart(${JSON.stringify(product)})">➕ Add to cart</button>
                </div>
            </div>
          </div>
            `
        }
    })

})


function renderProducts(category) {

    url = mainUrl;

    if (category != "all") {

        switch (category) {
            case "men":
                url = mainUrl + "/categories/men's clothing";
                break;

            case "women":
                url = mainUrl + "/categories/women's clothing";
                break;

            case "jewelery":
                url = mainUrl + "/categories/jewelery";
                break;

            case "electronics":
                url = mainUrl + "/categories/electronics";
                break;

            default:
                url = mainUrl;
                break;
        }
    }

    mainEl.innerHTML = "";

    fetchRender();
}

function fetchRender() {
    // Fetch and render all products
    fetch(url)
        .then(response => response.json())
        .then(data => {
            products = data;
            for (const product of products) {

                let passingProduct = {
                    title: product.title,
                    price: product.price,
                    id: product.id,
                    category: product.category
                }

                let productJSON = JSON.stringify(passingProduct);
                let productString = productJSON.replaceAll("'", "");

                mainEl.innerHTML += `
            <div class="col">
            <div class="card h-100 p-3">
            <img src="${product.image}" class="card-img-top" style="height:250px; object-fit:contain;" alt="${product.title}">
              <div class="card-body">
                <h3 class="card-title fs-4">${product.title}</h3>
                <p class="fs-5"><strong>$ ${product.price}</strong></p>
                <p class="card-text">${product.description}</p>
                <button class="btn btn-primary" onclick='addToCart(${productString})'>➕ Add to cart</button>
                </div>
            </div>
          </div>
            `
            }
        })
}


window.onload = renderProducts("all");
