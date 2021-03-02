"use strict"

const modules = document.querySelectorAll('.m');
const menu = document.querySelector('#modules');

modules.forEach(module => {
    module.addEventListener('dragstart', () => {
        module.classList.add('dragging');
    })
    module.addEventListener('dragend', () => {
        module.classList.remove('dragging');
    })
    }
)

menu.addEventListener('dragover', event => {
    event.preventDefault();
    let afterElement = getDrugAfterElement(menu, event.clientY);
    let draggableModule = document.querySelector('.dragging');
    if (afterElement == null) {
        menu.appendChild(draggableModule);
    } else {
        menu.insertBefore(draggableModule, afterElement);
    }
})

menu.addEventListener('drop', async() => {
    let modules_order = updateOrderField();
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(modules_order)
    };
    let response = await fetch(' http://127.0.0.1:8000/courses/module/order/', opts);
    let result = await response.json();
    console.log(result);

})

function getDrugAfterElement(container, yPos) {
    let draggableElements = [...container.querySelectorAll('.m:not(.dragging)')];
    return draggableElements.reduce( (closest, child) => {
        let box = child.getBoundingClientRect();
        let offset = yPos - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child};
        } else {
            return closest;
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}

function updateOrderField() {
    let modules_order = {};
    let modules = document.querySelectorAll('.m');
    modules.forEach((module, i) => {
        let order = module.querySelector('.order');
        order.innerHTML = i + 1;
        modules_order[module.id] = i;
    })
    return modules_order;
}


