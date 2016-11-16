class Component {
    constructor(store, data = {}, extend = {}) {
        Object.assign(this, extend);
        this.store = store;
        this.data = data;

        this.element = Component.render(this.render());
        this.element = this.element.children.item(0);

        this.init();

        return this.element;
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
            if (element) element.appendChild(component);
            return element || component;
        }
        else {
            let fragment = document.createDocumentFragment();
            let temp = document.createElement('div');
            
            temp.innerHTML = component;
            
            while (temp.children.item(0)) { 
                fragment.appendChild(temp.children.item(0));
            };

            if (element) element.appendChild(fragment);

            return element || fragment;
        }
    }
}

export default Component;