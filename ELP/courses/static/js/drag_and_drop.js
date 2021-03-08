class DragAndDrop {

    constructor(containerNode, elementsClass, url) {
        this.containerNode = containerNode;
        this.elementsClass = elementsClass;
        this.url = url;
        this.elementsOrder = {};
    }

    dragStartEventHandler() {
        let elements = this.getElements()
        elements.forEach(element => {
            element.addEventListener('dragstart', () => {
                element.classList.add('dragging');
            })
            element.addEventListener('dragend', () => {
                element.classList.remove('dragging');
            })
        })
    }

    dragOverEventHandler() {
        this.containerNode.addEventListener('dragover', event => {
            event.preventDefault();
            let afterElement = this.getAfterElement(event.clientY);
            let draggableElement = document.querySelector('.dragging');
            if ( draggableElement.parentNode.id === this.containerNode.id) {
                if (afterElement == null) {
                    this.containerNode.appendChild(draggableElement);
                } else {
                    this.containerNode.insertBefore(draggableElement, afterElement);
                }
            }
        })
    }

    dropEventHandler() {
        this.containerNode.addEventListener('drop',  () => {
            this.formElementsOrder();
            this.sendItemsOrder();
        })
    }

    getElements() {
        return document.querySelectorAll(`.${this.elementsClass}`)
    }

    getAfterElement(yPos) {
        let draggableElements = [...this.containerNode.querySelectorAll(`.${this.elementsClass}:not(.dragging)`)];
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

    formElementsOrder() {
        let elements = this.getElements()
        elements.forEach((element, i) => {
            this.elementsOrder[element.id] = i;
        })
    }

    sendItemsOrder() {
        let opts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(this.elementsOrder)
        };
        let response =  fetch(this.url, opts).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
            });
    }

    dragAndDrop() {
        this.dragStartEventHandler();
        this.dragOverEventHandler();
        this.dropEventHandler();
    }
}


class ModuleDragAndDrop extends DragAndDrop {
    dropEventHandler() {
        this.containerNode.addEventListener('drop',  () => {
            this.formElementsOrder();
            this.updateOrderField();
            this.sendItemsOrder();
        })
    }

    updateOrderField() {
        let elements = this.getElements()
        elements.forEach((element, i) => {
           let order = element.querySelector('.order');
           order.innerHTML = i + 1;
        })
    }
}

export  {ModuleDragAndDrop, DragAndDrop};