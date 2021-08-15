
// {element: 'div', content: '', attr: [{class: 'modal-container'}]}
export const createElement = (element) => {
    const elementRef = document.createElement(element.element);
    if (element.content) {
        elementRef.textContent = element.content;
    }
    if (element.attr) {
        element.attr.map((e) => {
            const key = Object.keys(e)[0];
            elementRef.setAttribute(key, e[key]);
        });
    }
    return elementRef;
};

export const createModal = (onPrevious, onNext) => {
    const modalContainerRef = createElement({element: 'div', attr: [{class:'modal-container'}]});
    const modalRef = createElement({element: 'div', attr: [{class: 'modal'}]});
    const modalButtonRef = createElement({element: 'button', attr: [{class: 'modal-close-btn', id: 'modal-close-btn', type: 'button'}]});
    const modalButtonTextRef = createElement({element: 'strong', content: 'X'});
    const modalContentRef = createElement({element: 'div', attr: [{class: 'modal-info-container'}]});

    const modalButtonContainerRef = createElement({element: 'div', attr: [{class: 'modal-btn-container'}]});
    const modalPrevButtonRef = createElement({element: 'button', content: 'Prev', attr: [{type: 'button'}, {id: 'modal-prev'}, {class: 'modal-prev btn'}]});
    const modalNextButtonRef = createElement({element: 'button', content: 'Next', attr: [{type: 'button'}, {id: 'modal-next'}, {class: 'modal-next btn'}]});

    const onCloseModalPress = () => modalContainerRef.remove();
    modalButtonRef.addEventListener('click', onCloseModalPress);

    modalPrevButtonRef.addEventListener('click', onPrevious);

    modalNextButtonRef.addEventListener('click', onNext);

    modalButtonRef.appendChild(modalButtonTextRef);
    modalButtonContainerRef.appendChild(modalPrevButtonRef);
    modalButtonContainerRef.appendChild(modalNextButtonRef);
    modalRef.appendChild(modalButtonRef);
    modalRef.appendChild(modalContentRef);
    modalRef.appendChild(modalButtonContainerRef);
    modalContainerRef.appendChild(modalRef);

    return modalContainerRef;
};

export const formatDate = (date) => {
    const parsedDate = Date.parse(date);
    return new Intl.DateTimeFormat().format(parsedDate);
}
