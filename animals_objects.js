"use strict";

window.addEventListener("DOMContentLoaded", start);

const btn = document.querySelectorAll("button");

// const catBtn = document.getElementById("cats");
// const sogBtn = document.getElementById("dogs");
// const allBtn = document.getElementById("seAlle");

let allAnimals = [];
let cats = [];
let dog = [];

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    let animal = {};
    let ny = jsonObject.fullname.split(" ");
    animal.name = ny[0];
    animal.desc = ny[2];
    animal.type = ny[3];
    animal.age = jsonObject.age;

    console.log(animal);
    // TODO: Create new object with cleaned data - and store that in the allAnimals array
    // TODO: MISSING CODE HERE !!!

    allAnimals.push(animal);
  });

  displayList(allAnimals);
}

btn.forEach((button) => {
  button.addEventListener("click", knap);
});

function knap(e) {
  console.log("FILTER", e.target.dataset.filter);
  const onlyCats = allAnimals.filter((animal) => animal.type === "cat");
  const onlyDogs = allAnimals.filter((animal) => animal.type === "dog");

  if (e.target.dataset.filter === "cat") {
    console.log("kun katte");
    console.log(onlyCats);
    displayList(onlyCats);
  } else if (e.target.dataset.filter === "dog") {
    console.log("kun hunde");
    console.log(onlyDogs);
    displayList(onlyDogs);
  } else {
    displayList(allAnimals);
  }
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
