class Binder {
    constructor(element, data = {}) {
    	this.element = element;
    	this.data = data;
    	this.bindings = {};
        this.elements = {};

        Array.from(this.element.querySelectorAll('[data-bind]')).forEach(element => {
            const [ type, data ] = element.dataset.bind.split(':').map(item => item.trim());
            if (!this.bindings[data]) this.bindings[data] = [];
            this.bindings[data].push({ type, element, previous: null });
        });

        this.setData(this.data);
    }

    setData(data) {
    	Object.keys(data).forEach(key => {
            if (this.bindings[key]) {
                this.bindings[key].forEach(item => {
                	item.previous = this.data[key];
                	this.render(item, data[key]);
                }); 
            }
            this.data[key] = data[key];
        });
    }

    getData(key) {
        return this.data[key];
    }

    render(item, data) {
        if (item.type === 'text') { 
            item.element.textContent = data;
            return;
        }
        if (item.type === 'disable') { 
            item.element.disabled = data;
            return;
        }
        if (item.type === 'class') {
            if (item.previous) item.element.classList.remove(item.previous);
            if (data) item.element.classList.add(data);
            return;
        }
        if (item.type === 'value') {
            item.element.value = data;
            return;
        }
        if (item.type === 'each') {
            //item.element.value = data;
            this.add(item.element, ...this.diff('+', item.previous, data));
            this.remove(item.element, ...this.diff('-', item.previous, data));
            return;
        }
    }

    diff(type, previous, data) {
        if (type === '+')
            return data.filter(item => {
                return previous.indexOf(item) === -1;
            });
        if (type === '-')
            return previous.filter(item => {
                return data.indexOf(item) === -1;
            });
    }

    add(element, ...components) {
        components.forEach(component => {
            const temp = {element: document.createElement('div')};
            temp.element.textContent = component.word;
            this.elements[component.word] = temp;
            element.appendChild(this.elements[component.word].element);
        });
    }

    remove(element, ...components) {
        components.forEach(component => {
            element.removeChild(this.elements[component.word].element);
            //component.destroy()
        });
    }
    
}

export default Binder;