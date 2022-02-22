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

        let pilotStatus = document.getElementById('pilotStatus');
        let copilotStatus = document.getElementById('copilotStatus');
        let fuelStatus = document.getElementById('fuelStatus');
        let cargoStatus = document.getElementById('cargoStatus');
        let launchStatus = document.getElementById('launchStatus');
    
    if (validateInput(pilot) === `Empty` || validateInput(copilot) === `Empty` || validateInput(fuelLevel.value) === `Empty` || validateInput(cargoLevel.value) === `Empty`) {
        showAlert(`All fields are required`);
        fieldCheck = false;
        list.style.visibility = 'hidden'
    } else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number'){
        showAlert(`Invalid Entry: requires a name in the Pilot and Co-pilot Name fields and a numerical value in Fuel Level and Cargo Mass fields`);
        fieldCheck = false;
        list.style.visibility = 'hidden'
    } else if (validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number') {
        showAlert(`Invalid Entry: requires a name in the Pilot and Co-pilot Name fields and a numerical value in Fuel Level and Cargo Mass fields`);
        fieldCheck = false;
        list.style.visibility = 'hidden'
    } else {
        fieldCheck = true;

    };

    
    if (Number(fuelLevel) < 10000 && Number(cargoLevel) < 10000) {
        list.style.visibility = `visible`;
        launchStatus.style.color = 'rgb(199, 37, 78)';
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch'; 
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        fuelStatus.innerHTML = 'Fuel level too low for launch';
        cargoStatus.innerHTML = 'Cargo mass low enough for launch'; 
        fuelReady = false;
    }
    else if (Number(fuelLevel) > 10000 && Number(cargoLevel) > 10000) {
        /*let pilotStatus = document.getElementById('pilotStatus');
        let copilotStatus = document.getElementById('copilotStatus');
        let fuelStatus = document.getElementById('fuelStatus');
        let cargoStatus = document.getElementById('cargoStatus');
        let launchStatus = document.getElementById('launchStatus');*/

        list.style.visibility = `visible`;
        launchStatus.style.color = `rgb(199, 37, 78)`;
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        fuelStatus.innerHTML = 'Fuel level high enough for launch';
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch';

    }
    else if (Number(fuelLevel) < 10000 && Number(cargoLevel) > 10000) {
       
        list.style.visibility = `visible`;
        launchStatus.style.color = `rgb(199, 37, 78)`;
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        fuelStatus.innerHTML = 'Fuel level too low for launch';
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
        cargoReady = false;

    }
    else  {
        /*let pilotStatus = document.getElementById('pilotStatus');
        let copilotStatus = document.getElementById('copilotStatus');
        let fuelStatus = document.getElementById('fuelStatus');
        let cargoStatus = document.getElementById('cargoStatus');*/

        list.style.visibility = `hidden`;
        launchStatus.style.color = 'rgb(65, 159, 106)';
        launchStatus.innerHTML = `Shuttle is Ready for Launch`;
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        fuelStatus.innerHTML = 'Fuel level high enough for launch';
        cargoStatus.innerHTML = 'Cargo mass low enough for launch';
        
    };
   
};

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