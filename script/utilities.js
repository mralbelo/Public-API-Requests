
/**
 * This method will handle creating HTML elements
 * @param {*} element example: {element: 'div', content: 'hello world', attr: [{class: 'text'}] }
 * @returns HTML Element
 */
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

/**
 * This methods creates the modal element, invoker is responsible of adding content to `.modal-info-container` & adding the modal to the DOM.
 * @param {*} onPrevious callback to be excecuted on previous btn click
 * @param {*} onNext callback to be excecuted on next btn click
 * @returns Modal HTML Element
 */
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

/**
 * This method accepts a date & returns it formatted
 * @param {*} date date string to be formated
 * @returns formatted date on 00/0/0000 format
 */
export const formatDate = (date) => {
    const parsedDate = Date.parse(date);
    return new Intl.DateTimeFormat().format(parsedDate);
};

/**
 * This methods accepts a phone number string & returns it on `(XXX) XXX-XXXX` format.
 * PD. API already returns phone numbers with USA formats & I just added this method just in case, since it was a requirement on the instructions.
 */
export const formatPhoneNumber = (phone) => {
    const sanitazed = phone.replace(/\D+/g, '');
    const serialized = sanitazed.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (serialized) {
        return `(${serialized[1]}) ${serialized[2]}-${serialized[3]}`
    }
    return;
};
