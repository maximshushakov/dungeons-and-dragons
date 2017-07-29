import Binder from "./binder";

class Component {
    constructor(data = {}, extend = {}) {
        Object.assign(this, extend);
        this.data = data;
        this.element = Component.render(this.render());
        this.bindings = new Binder(this.element);
        
        this.events = {};

        Array.from(this.element.querySelectorAll('[data-on]')).forEach(element => {
            const [ event, func ] = element.dataset.on.split(':');
            if (!this.events[event]) this.events[event] = [];
            this.events[event].push({ event, element, func });
        });

        this.handler = (e) => {
            this.events[e.type].forEach(event => { console.log(event.element === e.target) });
        };

        Object.keys(this.events).forEach(event => {
            this.element.children[0].addEventListener(event, this.handler);
        });        

        

        this.init();
    }

    init() {
        console.warn('invoked abstract Component.init method');
    }

    render() {
        console.warn('invoked abstract Component.render method');
        return `<div>Empty component</div>`;
    }

    static render(component, element = null) {
        if (typeof component !== 'string') {
            if (element) element.appendChild(component.element);
            return component;
        }
        else {
            let fragment = document.createDocumentFragment();
            let temp = document.createElement('div');
            
            temp.innerHTML = component;
            
            while (temp.children.item(0)) { 
                fragment.appendChild(temp.children.item(0));
            };

            if (element) element.appendChild(fragment);

            return fragment;
        }
    }
}

export default Component;