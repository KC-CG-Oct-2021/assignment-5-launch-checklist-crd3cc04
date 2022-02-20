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
    if (testInput === '' || testInput === null) {
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
    
    if (validateInput(pilot) === `Empty` || validateInput(copilot) === `Empty` || validateInput(fuelLevel.value) === `Empty` || validateInput(cargoLevel.value) === `Empty`) {
        showAlert(`All fields are required`);
        fieldCheck = false;

    } else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number'){
        showAlert(`Invalid Entry: requires a name in the Pilot and Co-pilot Name fields and a numerical value in Fuel Level and Cargo Mass fields`);
        fieldCheck = false;
        
    } else if (validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number') {
        showAlert(`Invalid Entry: requires a name in the Pilot and Co-pilot Name fields and a numerical value in Fuel Level and Cargo Mass fields`);
        fieldCheck = false;
        
    } else {
        fieldCheck = true;

    }
    
    if (Number(fuelLevel) < 10000 && fieldCheck) {
        list.style.visibility = `visible`;
        list.innerHTML = `
        <ol>
        <li>Pilot ${pilot} is ready for launch</li>
        <li>Co-pilot ${copilot} is ready for launch</li>
        <li>Not enough fuel for journey! We have ${fuelLevel}L loaded and at least 10,000L are needed!</li>
        <li>Cargo light enough for take off</li>
        </ol>
        `;
        document.getElementById('launchStatus').innerHTML = `Shuttle not ready for launch`;
        document.getElementById('launchStatus').style.color = `rgb(199, 37, 78)`;

    } else {   
        fuelReady = true;
    } 
    if (Number(cargoLevel || fuelLevel) > 10000 && fieldCheck) {
        list.style.visibility = `visible`;
        list.innerHTML = `
        <ol>
        <li>Pilot ${pilot} is ready for launch</li>
        <li>Co-pilot ${copilot} is ready for launch</li>
        <li>Enough fuel for journey</li>
        <li>Cargo too heavy for takeoff! Max load is 10,000kg and we have ${cargoLevel}kg!</li>
        </ol>
        `;
        document.getElementById('launchStatus').innerHTML = `Shuttle not ready for launch`;
        document.getElementById('launchStatus').style.color = `rgb(199, 37, 78)`;
        cargoReady = false;
    } else {    
        cargoReady = true;
    }
    if (fuelReady && cargoReady && fieldCheck) {
        list.style.visibility = `hidden`;
        document.getElementById('launchStatus').innerHTML = `Shuttle ready for launch`;
        document.getElementById('launchStatus').style.color = 'rgb(65, 159, 106)';
        list.innerHTML = `
        <ol>
        <li>Pilot ${pilot} is ready for launch</li>
        <li>Co-pilot ${copilot} is ready for launch</li>
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

function showAlert(message) {
    try{ window.alert(message);
} catch(error){};
}