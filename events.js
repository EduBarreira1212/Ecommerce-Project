import { purchase } from "./purchaseClass.js";

const offerForm = document.getElementById("offersForm");
const inputOfferForm = document.getElementsByClassName("inputClient");
const sweatShirtForm = document.getElementById("sweatShirtPageDetailsForm")
const inputSweatShirtform = document.getElementsByClassName("selectInputSweatShirt");
const tShirtForm = document.getElementById("tShirtPageDetailsForm");
const inputTShirtform = document.getElementsByClassName("selectInputTShirt");
const principalImage = document.getElementById("principalImage");
const otherImages = document.getElementsByClassName("otherImages");
const menuBtn = document.getElementById("menuIcon");
const menuHamburger = document.getElementById("menuHamburger");
const exitMenuBtn = document.getElementById("exitBtn");
const cartBtn = document.getElementById("cartIcon");
const cart = document.getElementById("cartPop-up");
const exitCartBtn = document.getElementById("exitCartBtn");
const cartList = document.getElementById("cartList");
const cartTotalPrice = document.getElementById("totalPrice")

const sweatShirtLi = document.createElement("li");
const sweatShirtNameSpan = document.createElement("span");
const sweatShirtQttSpan = document.createElement("span");
const sweatShirtPriceSpan = document.createElement("span");

const tShirtLi = document.createElement("li");
const tShirtNameSpan = document.createElement("span");
const tShirtQttSpan = document.createElement("span");
const tShirtPriceSpan = document.createElement("span");

let sweatShirt;
let tShirt;

function addStorage(event) {
  event.preventDefault();
  let inputs = [];
  for (const item of inputOfferForm) {
    inputs.push(item.value);
    console.log(item.value);
  }
  window.sessionStorage.setItem("nameClient", inputs[0]);
  window.sessionStorage.setItem("emailClient", inputs[1]);
  window.sessionStorage.setItem("cellPhoneClient", inputs[2]);

  //API test to DronaHQ

  /*postData(inputs)
    .then((data) => {

      console.log(data);

    });*/

}

async function postData(inputs) {

  const response = await fetch(url, {

    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      "name": inputs[0],
      "email": inputs[1],
      "cellphone": inputs[2]
    })
  });
  return response.json();
}

function addSweatShirtStorage(event) {
  event.preventDefault();
  let selectInput = [];
  for (const item of inputSweatShirtform) {
    console.log(item.value);
    selectInput.push(item.value);
  }
  sweatShirt = new purchase("Sweat shirt", 50.00, selectInput[0], selectInput[1]);
  console.table(sweatShirt);

  window.sessionStorage.setItem("sweatShirtPurchase", JSON.stringify(sweatShirt));

  openCart();
}

function addTShirtStorage(event) {
  event.preventDefault();
  let selectInput = [];
  for (const item of inputTShirtform) {
    console.log(item.value);
    selectInput.push(item.value);
  }
  tShirt = new purchase("T-shirt", 20.00, selectInput[0], selectInput[1]);
  console.table(tShirt);

  window.sessionStorage.setItem("T-ShirtPurchase", JSON.stringify(tShirt));

  openCart();
}

function changeImages(source) {
  principalImage.src = source;
}

function openMenu() {
  menuHamburger.style.visibility = "visible";
}

function closeMenu() {
  menuHamburger.style.visibility = "hidden";
}

function searchSweatShirt() {
  if (window.sessionStorage.getItem("sweatShirtPurchase") !== undefined && window.sessionStorage.getItem("sweatShirtPurchase") !== null) {
    let sweatShirtJSON = JSON.parse(window.sessionStorage.getItem("sweatShirtPurchase"));

    sweatShirtNameSpan.innerHTML = sweatShirtJSON.productName;
    sweatShirtQttSpan.innerHTML = sweatShirtJSON.quantity + "X";
    sweatShirtPriceSpan.innerHTML = "$" + sweatShirtJSON.price;

    sweatShirtLi.append(sweatShirtNameSpan, sweatShirtQttSpan, sweatShirtPriceSpan);

    cartList.appendChild(sweatShirtLi);

    return Number(sweatShirtJSON.totalSum);
  }
}

function searchTShirt() {
  if (window.sessionStorage.getItem("T-ShirtPurchase") !== undefined && window.sessionStorage.getItem("T-ShirtPurchase") !== null) {
    let tShirtJSON = JSON.parse(window.sessionStorage.getItem("T-ShirtPurchase"));

    tShirtNameSpan.innerHTML = tShirtJSON.productName;
    tShirtQttSpan.innerHTML = tShirtJSON.quantity + "X";
    tShirtPriceSpan.innerHTML = "$" + tShirtJSON.price;

    tShirtLi.append(tShirtNameSpan, tShirtQttSpan, tShirtPriceSpan);

    cartList.appendChild(tShirtLi);

    return Number(tShirtJSON.totalSum);
  }
}

function openCart() {
  cart.style.visibility = "visible";

  let totalSum;
  if (searchSweatShirt() == undefined && searchTShirt() == undefined) {
    totalSum = 0.00;
    console.log(totalSum);
  }
  else if (searchSweatShirt() == undefined) {
    totalSum = Number(searchTShirt()).toFixed(2);
    console.log(totalSum);
  }
  else if (searchTShirt() == undefined) {
    totalSum = Number(searchSweatShirt()).toFixed(2);
    console.log(totalSum);
  }
  else {
    totalSum = Number(searchSweatShirt() + searchTShirt()).toFixed(2);
    console.log(totalSum);
  }

  cartTotalPrice.innerText = "$" + totalSum;
}

function closeCart() {
  cart.style.visibility = "hidden";
}





offerForm.addEventListener("submit", addStorage);

if (document.title == "Sweat shirt") {
  sweatShirtForm.addEventListener("submit", addSweatShirtStorage);
}
if (document.title == "T-shirt") {
  tShirtForm.addEventListener('submit', addTShirtStorage);
}

for (const img of otherImages) {
  img.addEventListener("click", () => changeImages(img.src));
}

menuBtn.addEventListener("click", openMenu);

exitMenuBtn.addEventListener("click", closeMenu);

cartBtn.addEventListener("click", openCart);

exitCartBtn.addEventListener("click", closeCart);