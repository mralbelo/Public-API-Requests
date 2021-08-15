import { createModal } from './utilities.js';
import { fetchEmployees, createEmployeeCard, addModalContent} from './employees.js';

const galleryContainerRef = document.getElementById('gallery');

let employees;

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

fetchEmployees()
    .then(e => {
        employees = e.results;
        employees && employees.map((employee) => galleryContainerRef.appendChild(createEmployeeCard(employee)));
    })
    .then(() => {
        [...document.getElementsByClassName('card')].map((card) => {
            const children = card.children;
            children[0].addEventListener('click', () => handleModalEvents(card.id));
            children[1].firstChild.addEventListener('click', () => handleModalEvents(card.id))
        });
    });
