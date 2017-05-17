import Binder from "./binder";

class Component {
    constructor(data = {}, extend = {}) {
        Object.assign(this, extend);
        this.data = data;
        this.element = Component.render(this.render());
        this.bindings = new Binder(this.element);
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