import { createElement, createModal } from './utilities.js';
import { fetchEmployees, createEmployeeCard, addModalContent } from './employees.js';
import { generateSearchHTML, handleSearch } from './search.js';

const galleryContainerRef = document.getElementById('gallery');

let employees;

// fetches the employees JSON
fetchEmployees()
// loop trough employees, creates cards & appends to DOM
    .then(e => {
        employees = e.results;
        employees && employees.map((employee) => galleryContainerRef.appendChild(createEmployeeCard(employee)));
    });

// This listener handles changes on employees card & adds listeners to trigger the modal on picture/name click
galleryContainerRef.addEventListener('DOMNodeInserted', (event) => {
    const card = event.target;
    if (card.children.length > 0) {
        card.children[0].addEventListener('click', () => handleModalEvents(card.id));
        card.children[1].firstChild.addEventListener('click', () => handleModalEvents(card.id));
    }
});

// Adds search form to DOM
generateSearchHTML();
// handles search submit event
document.querySelector('form').addEventListener('submit', (e) => handleSearch(e, employees));

// Handles modal creation & navigation
const handleModalEvents = (id) => {
    const modalRef = document.querySelector('.modal-container');
    let index = employees.findIndex((e) => e.login.uuid === id);
    const onNext = () => {
        if (index < employees.length - 1) {
            index++;
            handleModalEvents(employees[index].login.uuid);
        }
    };
    const onPrevious = () => {
        if (index >= 1) {
            index--;
            handleModalEvents(employees[index].login.uuid);
        }
    };
    if (!modalRef) {
        const modal = createModal(onPrevious, onNext);
        document.body.appendChild(modal);
    }
    addModalContent(employees[index]);
}