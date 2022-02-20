// Write your JavaScript code here!
//const { formSubmission } = require("./scriptHelper");

//const { formSubmission } = require("./scriptHelper");

//const { myFetch } = require("./scriptHelper");

//const { pickPlanet, addDestinationInfo } = require("./scriptHelper");



window.addEventListener("load", function() {
    list = document.getElementById('faultyItems');
    list.style.visibility = 'hidden';
    let form = document.querySelector("form");
    form.addEventListener('submit', (event)=> {
    event.preventDefault();
    //list = document.getElementById('faultyItems');
    pilot = document.querySelector('input[name=pilotName]').value;
    copilot = document.querySelector('input[name=copilotName]').value;
    fuelLevel = document.querySelector('input[name=fuelLevel]').value;
    cargoLevel = document.querySelector('input[name=cargoMass]').value;
    formSubmission(document,list,pilot,copilot,fuelLevel,cargoLevel);
    

    })

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let planet = pickPlanet(listedPlanets);
       let name = planet.name;
       let diameter = planet.diameter;
       let star = planet.star;
       let distance = planet.distance;
       let imageUrl = planet.image;
       let moons = planet.moons;
       addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl);
   })
   
});

