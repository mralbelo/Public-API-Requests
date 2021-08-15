import { createElement, formatDate } from './utilities.js';

export const fetchEmployees = async () => {
    const url = 'https://randomuser.me/api/?results=12';
    const res = await fetch(url);
    return await res.json();
};

export const createEmployeeCard = (employee) => {
    const cardRef = createElement({ element: 'div', attr: [{ class: 'card' }, { id: employee.login.uuid }] });
    const profilePictureRef = createElement({ element: 'img', attr: [{ class: 'card-img' }, { src: employee.picture.large }, { alt: 'profile picture' }] });
    const cardImgContainerRef = createElement({ element: 'div', attr: [{ class: 'card-img-container' }] });
    const cardInfoContainerRef = createElement({ element: 'div', attr: [{ class: 'card-info-container' }] });
    const nameRef = createElement({ element: 'h3', content: `${employee.name.first} ${employee.name.last}`, attr: [{ id: 'name' }, { class: 'card-name cap' }] });
    const emailRef = createElement({ element: 'p', content: employee.email, attr: [{ class: 'card-text' }] });
    const otherInfoRef = createElement({ element: 'p', content: `${employee.location.city}, ${employee.location.state}`, attr: [{ class: 'card-text cap' }] });

    cardImgContainerRef.appendChild(profilePictureRef);
    cardInfoContainerRef.appendChild(nameRef);
    cardInfoContainerRef.appendChild(emailRef);
    cardInfoContainerRef.appendChild(otherInfoRef);
    cardRef.appendChild(cardImgContainerRef);
    cardRef.appendChild(cardInfoContainerRef);

    return cardRef;
}

export const addModalContent = (employee) => {
    const modalRef = document.querySelector('.modal-info-container');
    modalRef.innerHTML = '';

    const content = [
        createElement({ element: 'img', attr: [{ class: 'card-img' }, { src: employee.picture.large }, { alt: 'profile picture' }] }),
        createElement({ element: 'h3', content: `${employee.name.first} ${employee.name.last}`, attr: [{ id: 'name' }, { class: 'card-name cap' }] }),
        createElement({ element: 'p', content: employee.email, attr: [{ class: 'modal-text' }] }),
        createElement({ element: 'p', content: employee.location.city, attr: [{ class: 'modal-text cap' }] }),
        document.createElement('hr'),
        createElement({ element: 'p', content: employee.phone, attr: [{ class: 'modal-text' }] }),
        createElement({ element: 'p', content: `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.postcode} `, attr: [{ class: 'modal-text' }] }),
        createElement({ element: 'p', content: `Birthday: ${formatDate(employee.dob.date)}`, attr: [{ class: 'modal-text' }] })
    ];

    content.map(c => modalRef.appendChild(c));
}