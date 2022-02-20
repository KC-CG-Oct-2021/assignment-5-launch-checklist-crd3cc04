// Write your helper functions here!
require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.getElementById('missionTarget');
   missionTarget.innerHTML = `
   
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `
}

function validateInput(testInput) {
    if (testInput === '' || testInput === '' || testInput === '') {
        return `Empty`
    } else if ((!isNaN(Number(testInput)))){
        return `Is a Number`
    } else {
        return 'Not a Number'
    }  
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let launchStatus = document.getElementById('launchStatus');
    let cargoStatus = document.getElementById('cargoStatus');

    
    if (validateInput(pilot) === `Empty` || validateInput(copilot) === `Empty` || validateInput(fuelLevel) === `Empty` || validateInput(cargoLevel) === `Empty`) {
        alert(`All fields are required`);
        //fieldCheck = false;
        list.style.visiability = 'hidden';
    } else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number'){
        alert(`Requires a name not numbers`);
        //fieldCheck = false;
        list.style.visiability = 'hidden';
    } else if (validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number') {
        alert(`Requires numerical values`);
        //fieldCheck = false;
        list.style.visiability = `hidden`;
    }
     /* else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready`;
        list.style.visiability = `hidden`;
      }*/

    if (Number(fuelLevel) < 10000) {
        list.style.visiability = `visible`;
        fuelStatus.innerHTML = `Not enough fuel for journey! We have ${fuelStatus}L loaded and at least 10,000L are needed!`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = `red`;
        
    } else if (Number(cargoLevel) > 10000) {
        list.style.visiability = `visible`;
        cargoStatus.innerHTML = `Cargo too heavy for takeoff! Max load is 10,000kg and we have ${cargoStatus.value}kg!`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = `red`;

    } else if (Number(cargoLevel) < 10000 && Number(fuelLevel) > 10000) {
        list.style.visiability = `visible`;
        fuelStatus.innerHTML = `Enough fuel for journey`;
        cargoStatus.innerHTML = `Cargo light enough for takeoff`;
        launchStatus.innerHTML = `Shuttle ready for launch`;
        launchStatus.style.color = `green`;
    }
   
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let idx = Math.floor(Math.random() * planets.length);
    return planets[idx];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
