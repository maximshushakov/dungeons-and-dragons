class Binder {
    constructor(element, data = {}) {
    	this.element = element;
    	this.data = data;
    	this.bindings = {};

        Array.from(this.element.querySelectorAll('[data-bind]')).forEach(element => {
            const [ type, data ] = element.dataset.bind.split(':');
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
                	//this.render(item, data[key]);
                }); 
            }
            this.data[key] = data[key];
        });
    }

    getData(key) {
        return this.data[key];
    }

    render(element, data) {
        if (item.type === 'text') { 
            item.element.textContent = data;
            return;
        }
        if (item.type === 'disabled') { 
            item.element.disabled = data;
            return;
        }
        if (item.type === 'class') {
            if (item.previous) item.element.classList.remove(item.previous);
            if (data) item.element.classList.add(data);
            return;
        }
    }
    
}

export default Binder;