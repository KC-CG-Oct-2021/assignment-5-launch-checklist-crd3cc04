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
    if (testInput === '' || testInput === null || testInput === 0) {
        return `Empty`
    }else if ((!isNaN(Number(testInput)))){
        return `Is a Number`
    } else {
        return 'Not a Number'
    }  
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
      
        fieldCheck = false;
        cargoReady = false;
        fuelReady = false;
    
    if (validateInput(pilot.value) === `Empty` || validateInput(copilot.value) === `Empty` || validateInput(fuelLevel.value) === `Empty` || validateInput(cargoLevel.value) === `Empty`) {
        alert(`All fields are required`);
        fieldCheck = false;
        list.style.visibility = 'visible';
    } else if (validateInput(fuelLevel.value) === 'Not a Number' || validateInput(cargoLevel.value) === 'Not a Number'){
        alert(`Invalid Entry: requires a name in the Pilot and Co-pilot Name fields and a numerical value in Fuel Level and Cargo Mass fields`);
        fieldCheck = false;
        list.style.visibility = 'visible';
    } else if (validateInput(pilot.value) === 'Is a Number' || validateInput(copilot.value) === 'Is a Number') {
        alert(`Invalid Entry: requires a name in the Pilot and Co-pilot Name fields and a numerical value in Fuel Level and Cargo Mass fields`);
        fieldCheck = false;
        list.style.visibility = `visible`;
    } else {
        fieldCheck = true;

    }
    
    if (Number(fuelLevel.value) < 10000 && fieldCheck) {
        list.innerHTML = `
        <ol>
        <li>Pilot ${pilot.value} is ready for launch</li>
        <li>Co-pilot ${copilot.value} is ready for launch</li>
        <li>Not enough fuel for journey! We have ${fuelLevel.value}L loaded and at least 10,000L are needed!</li>
        <li>Cargo light enough for take off</li>
        </ol>
        `;
        list.style.visibility = `visible`;
        document.getElementById('launchStatus').innerHTML = `Shuttle not ready for launch`;
        document.getElementById('launchStatus').style.color = `red`;
        fuelReady = false;
    } else {   
        fuelReady = true;
    } 
    if (Number(cargoLevel.value || fuelLevel.value) > 10000 && fieldCheck) {
        list.innerHTML = `
        <ol>
        <li>Pilot ${pilot.value} is ready for launch</li>
        <li>Co-pilot ${copilot.value} is ready for launch</li>
        <li>Enough fuel for journey</li>
        <li>Cargo too heavy for takeoff! Max load is 10,000kg and we have ${cargoLevel.value}kg!</li>
        </ol>
        `;
        list.style.visibility = `visible`;
        document.getElementById('launchStatus').innerHTML = `Shuttle not ready for launch`;
        document.getElementById('launchStatus').style.color = `red`;
        cargoReady = false;
    } else {    
        cargoReady = true;
    }
    if (fuelReady && cargoReady && fieldCheck) {
        list.style.visibility = `hidden`;
        document.getElementById('launchStatus').innerHTML = `Shuttle ready for launch`;
        document.getElementById('launchStatus').style.color = `green`;
        list.innerHTML = `
        <ol>
        <li>Pilot ${pilot.value} is ready for launch</li>
        <li>Co-pilot ${copilot.value} is ready for launch</li>
        <li>Enough fuel for journey</li>
        <li>Cargo light enough for take off</li>
        `;
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
