class Binder {
    constructor(element, data = {}, component) {
    	this.element = element;
        this.component = component;
    	this.data = data;
    	this.bindings = {};
        this.events = {};

        Array.from(this.element.querySelectorAll('[data-bind]')).forEach(element => {
            const [ type, data ] = element.dataset.bind.split(':').map(item => item.trim());
            if (!this.bindings[data]) this.bindings[data] = [];
            this.bindings[data].push({ type, element, previous: null });
        });

        Array.from(this.element.querySelectorAll('[data-on]')).forEach(element => {
            const [ event, callback ] = element.dataset.on.split(':');
            if (!this.events[event]) this.events[event] = [];
            this.events[event].push({ event, element, callback });
        });

        this.handler = (e) => {
            this.events[e.type].forEach(event => { 
                if (event.element === e.target && this.component[event.callback]) {
                    this.component[event.callback].apply(this.component, e);
                }
            });
        };

        Object.keys(this.events).forEach(event => {
            this.element.addEventListener(event, this.handler);
        });

        //this.setData(this.data);
    }

    setData(data) {
    	Object.keys(data).forEach(key => {
            if (this.bindings[key]) {
                this.bindings[key].forEach(item => {
                    item.previous = this.data[key];
                    
                    if (item.type === 'each') {
                        this.component.update(item, {
                            added:   this.diff('+', item.previous, data[key]), 
                            removed: this.diff('-', item.previous, data[key]),
                        });
                        return;
                    }
                	this.component.update(item, data[key]);
                }); 
            }
            this.data[key] = data[key];
        });
    }

    getData(key) {
        return this.data[key];
    }

    diff(type, previous, data) {
        if (!Array.isArray(previous)) previous = [];
        
        if (type === '+') {
            return data.filter((item, index) => {
                if (previous.indexOf(item) === -1) {
                    if (!item.key) item.key = String(index);
                    return true;
                }
            });
        }

        if (type === '-') {
            return previous.filter((item, index) => {
                if (data.indexOf(item) === -1) {
                    if (!item.key) item.key = String(index);
                    return true;
                }
            });
        }
    }

    distroy() {
        Object.keys(this.events).forEach(event => {
            this.element.removeEventListener(event, this.handler);
        });
        this.events = null;
        this.bindings = null;
    }
    
}

export default Binder;