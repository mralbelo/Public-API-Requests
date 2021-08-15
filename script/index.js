import { createElement, createModal } from './utilities.js';
import { fetchEmployees, createEmployeeCard} from './employees.js';


const galleryContainerRef = document.getElementById('gallery');


// on init = display employees & create search form
export let employees;
fetchEmployees()
    .then(e => {
        employees = e.results;
        employees && employees.map((employee) => galleryContainerRef.appendChild(createEmployeeCard(employee)));
    });

galleryContainerRef.addEventListener('click', (e) => {
    console.log(e.target.parentNode);
});

// NOTES:

// const prms = new Promise ( (resolve, reject) => {
// })