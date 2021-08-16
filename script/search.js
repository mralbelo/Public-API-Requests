import { createEmployeeCard } from "./employees.js";
import { createElement } from "./utilities.js"

/**
 * This function will take care of adding the search form to the DOM
 */
export const generateSearchHTML = () => {
    const formRef = createElement({element: 'form', attr: [{action: '#'}, {method: 'get'}]});
    const inputRef = createElement({element: 'input', attr: [{type: 'search'}, {id: 'search-input'}, {class: 'search-input'}, {placeholder: 'Search...'}]});
    const btnRef = createElement({element: 'input', attr: [{type:'submit'}, {value: '🔍'}, {id: 'search-submit'}, {class: 'search-submit'}]});

    formRef.appendChild(inputRef);
    formRef.appendChild(btnRef);
    document.querySelector('.search-container').appendChild(formRef);
}

/**
 * This function will handle the search functionality upon submit
 * @param {*} event used to extract search criteria
 * @param {*} employees used for filterting purposes
 */
export const handleSearch = (event, employees) => {
    const galleryContainerRef = document.getElementById('gallery');
    const searchCriteria = event.target[0].value.toLowerCase();
    if (searchCriteria) {
        const filter = employees.filter((employee) => {
            return (
                employee.name.first.toLowerCase().includes(searchCriteria) ||
                employee.name.last.toLowerCase().includes(searchCriteria)
            );
        });
        galleryContainerRef.innerHTML = '';
        if (filter.length > 0) {
            filter.map((f) => {
                galleryContainerRef.appendChild(createEmployeeCard(f));
            });
        } else {
            const noResultsRef = createElement({element: 'div', content: 'No Results found :('})
            galleryContainerRef.appendChild(noResultsRef);
        }
    } else {
        galleryContainerRef.innerHTML = '';
        employees.map((employee) => galleryContainerRef.appendChild(createEmployeeCard(employee)));
    }
};
