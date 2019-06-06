// Awesome Startup Employee Directory
'use strict';
// global variables
let employees = [];
let names = [];
let empIndex = 0;
const randomAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, login, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".close")
const list = document.querySelector(".list");
const card = document.querySelector(".card");
let modWindow = document.getElementById("modWindow");
let modIndex = modalContainer.getAttribute("data-index");

// async version
// const request = async (url) => {
//     const res = await fetch(url);
//     const data = await res.json();
//     let resData = data.results;
//     // console.log(data.results);
//     // const people = resData.forEach((person, index)=> {
//     //   let name = person.name;
//     //   let email = person.email;
//     //   let city = person.location.city;
//     //   let picture = person.picture;
//     //   let username = person.login.username;
//       // let { email, location: { city, street, state, postcode}, login: {username}, name, phone, picture } = data.results[index] || {};
//       // console.log(person.email);
//       return {resData};
//     // });
// }
// request(randomAPI)
// .then(displayEmployees);

// Promise.then approach
fetch(randomAPI)
  .then(res => res.json())
  .then(res => res.results)
  // .then(res => console.log(res))
  .then(displayEmployees)
  .catch(err => {
    gridContainer.innerHTML = `<h2> Something went wrong!</h2>`;
    console.log(err)
  });

//promise version
function displayEmployees(personData) {
    employees = personData;
    let employeeHTML = '';
    employees.forEach((employee, index) => {

    let { email, location: { city, street, state, postcode}, login: {username}, name, phone, picture } = employees[index] || {};

    // let name = employee.name;
    // let email = employee.email;
    // let city = employee.location.city;
    // let picture = employee.picture;
    // let username = employee.login.username;

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
} //end displayEmployees


// // //async version
// function displayEmployees(personData) {
//     employees = personData;
//     let employeeHTML = '';
//     employees.resData.forEach((employee, index) => {
//
//     let { email, location: { city, street, state, postcode}, login: {username}, name, phone, picture } = employees.resData[index] || {};
//
//     // let name = employee.name;
//     // let email = employee.email;
//     // let city = employee.location.city;
//     // let picture = employee.picture;
//     // let username = employee.login.username;
//
//     employeeHTML += `
//       <div class="card" data-index="${index}">
//         <img class="avatar" src="${picture.large}">
//         <div class="text-container">
//           <h2 class="name">${name.first} ${name.last}</h2>
//           <p class="email">${email}</p>
//           <p class="username">${username}</p>
//           <p class="address">${city}</p>
//       </div>
//     </div>
//     `
//   });
//   gridContainer.innerHTML = employeeHTML;
// } //end displayEmployees

function displayModal(index) {
  let modalHTML = '';

      let name = employees[index].name;
      let email = employees[index].email;
      let street = employees[index].location.street;
      let city = employees[index].location.city;
      let postcode = employees[index].location.postcode;
      let state = employees[index].location.state;
      let picture = employees[index].picture;
      let username = employees[index].login.username;
      let dob = employees[index].dob;
      let phone = employees[index].phone;

      // let { login: {username}, name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index] || {};
      // let date = new Date(dob.date);

      modalHTML +=  `
     <div class="modal-window" id="modWindow" data-index="${index}">
      <img src="${picture.large}" alt="${name}" class="avatar" />
      <div class="text-container">
        <div class="arrow-container">
          <button class="arrow-left" id="left">&lt;</button>
          <h2 class="name">${name.first} ${name.last}</h2>
          <button class="arrow-right" id="right">&gt;</button>
        </div>
        <p class="username">${username}</p>
        <p class="email">${email}</p>
        <hr>
        <p class="address">${street}, ${state} ${postcode}</p>
        <p class="phone">${phone}</p>
        <hr>
        <p class="bday">${dob}</p>
      </div>
    </div>

`;
overlay.classList.remove("hidden");
modalContainer.innerHTML = modalHTML;
} //end display modal


//
//functions for modal
//
const displayIt = (e) => {
  const card = e.target.closest(".card");
  let index = card.getAttribute('data-index');
  if (e.target.closest(".card")) {
    displayModal(index);
  }

// Scroll modal
let rtBtn = document.getElementById("right");
let lftBtn = document.getElementById("left");

const prevEmpl = () => {
  // if(modIndex === 10) {
  //   return false;
  //   }
      modIndex--;
        console.log(modIndex);
        console.log("clicked left");
      scrollModal();
    }
const currentModal(n) => {
  displayModal(modIndex = n);
}
const nextEmpl = () => {
  if(modIndex === 11) {
    return false;
  }
  modIndex++;
  console.log(modIndex);
  console.log("clicked right");
  scrollModal();
}
  lftBtn.addEventListener('click', prevEmpl);
  rtBtn.addEventListener('click', nextEmpl);
} //end displayIt

  gridContainer.addEventListener('click', displayIt);
  modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
  });

  const scrollModal = () => {
    // overlay.classList.remove("hidden");
    displayModal(modIndex);

    // event.preventDefault();
  }

  // modalClose.addEventListener('keydown', (e) =>{
  // KeyboardEvent: key='Escape' | code='Escape'  if(e.key===27) {
  //     overlay.classList.add("hidden");
  //   }
  // });


list.addEventListener("keyup", function() {
    var inputWord = list.value.toLowerCase();

    for (i=0; i < employees.length; i++) {
      var searchableName = document.getElementsByTagName("H2")[i].textContent.toLowerCase();
      if (searchableName.indexOf(inputWord) > -1) {
      //   employees[i].style.display = '';
      // } else {
      //   employees[i].style.display = 'none';
        }
    }
});
