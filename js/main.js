/////
///   Awesome Startup Employee Directory
/////
"use strict";
// global variables
let employees = [];
const randomAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, login, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".close");
const list = document.querySelector(".list");
let person;
let personArray;
let username;
let usernameArray;
let index;
let headerTwo = document.getElementsByTagName("h2");

// get api data
fetch(randomAPI)
  // .then(res => res.json())
  // .then(data => console.log(data));
    .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => {
    gridContainer.innerHTML = `<h2> Something went wrong!</h2>`;
    console.log(err)
  });

// Use fetch data to populate dom with employee cards
function displayEmployees(personData) {
    employees = personData;
    let employeeHTML = "";
    employees.forEach((employee, index) => {
      let { email, location: { city, street, state, postcode}, login: {username}, name, phone, picture } = employees[index] || {};
        employeeHTML += `
          <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}">
            <div class="text-container">
              <h2 class="name">${name.first} ${name.last}</h2>
              <p class="email">${email}</p>
              <p class="username">${username}</p>
              <p class="address">${city}</p>
          </div>
        </div>
        `
    });
  gridContainer.innerHTML = employeeHTML;

  // get names array to compare in filter function
  person = document.querySelectorAll(".card");
  personArray = Array.from(person);
} //end displayEmployees

// display modal window
function displayModal(index) {
  let modalHTML = "";
    let { login: {username}, name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index] || {};
    let date = new Date(dob.date);
    let year = date.getFullYear();
    let day = date.getDate();
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = monthNames[date.getMonth()];
      modalHTML +=  `
       <div class="modal-window" data-index="${index}">
        <img src="${picture.large}" alt="photo of ${name.first} ${name.last}" class="avatar" />
        <div class="text-container">
          <div class="arrow-container">
            <button class="arrow-left" id="left">&lt;</button>
            <h2 class="name">${name.first} ${name.last}</h2>
            <button class="arrow-right" id="right">&gt;</button>
          </div>
          <p class="username">${username}</p>
          <p class="email">${email}</p>
          <hr>
          <p class="address">${street.number} ${street.name}</p>
          <p> ${city}, ${state} ${postcode}</p>
          <p class="phone">${phone}</p>
          <hr>
          <p class="bday">Birthday: ${day} ${month} ${year}</p>
        </div>
      </div>
    `
  ;
overlay.classList.remove("hidden");
modalContainer.innerHTML = modalHTML;

////// Scroll through modal employee data
let rtBtn = document.getElementById("right");
let lftBtn = document.getElementById("left");
lftBtn.addEventListener("click", prevEmpl);
rtBtn.addEventListener("click", nextEmpl);
} //end display modal

/////functions for modal
let scrollModal = () => {
  displayModal(index);
}

const prevEmpl = () => {
  if(index === 0) {
    return false;
  }
  index--;
  scrollModal();
}

const nextEmpl = () => {
  if(index === 11) {
    return false;
  }
  index++;
  scrollModal();
}

// Function to open the modal window
const displayIt = (e) => {
  const empCard = e.target.closest(".card");
  index = empCard.getAttribute("data-index");
  if (empCard) {
    displayModal(index);
  }
} //end displayIt

//// Open the modal window & close it with click events
  gridContainer.addEventListener("click", displayIt);
  modalClose.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });

///// Filter names function
list.addEventListener("keyup", function() {
    var inputWord = list.value.toLowerCase();
     for(let i = 0; i < personArray.length; i++) {
      var searchableName = headerTwo[i].textContent.toLowerCase();
      if (searchableName.indexOf(inputWord) > -1) {
        personArray[i].style.display = "";
      } else {
        personArray[i].style.display = "none";
        }
    }
});
