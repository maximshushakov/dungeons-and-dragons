import Binder from "./binder";

class Component {
    constructor(data = {}, components = {}) {
        this.data = data;
        this.element = Component.render(this.render(), { data: this.data });
        this.bindings = new Binder(this.element, this.data, this);
        this.events = {};
        this.components = {};

        if (data['key'] !== undefined) this.element.dataset.key = data['key'];

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

    update(item, data) {
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
            const componentName = item.element.dataset.eachComponent;
            const toAdd = data.added.map(data => new Component.components[componentName](data));
            const toRemove = data.removed.map(data => this.components[data.key]);
            this.add(item.element, ...toAdd);
            this.remove(item.element, ...toRemove);
            return;
        }
    }

    destroy() {

    }

    add(element, ...components) {
        components.forEach(component => {
            element.appendChild(component.element);
            this.components[component.element.dataset.key] = component;
        });
    }

    remove(element, ...components) {
        components.forEach(component => {
            element.removeChild(component.element);
            component.destroy();
            delete this.components[component.element.dataset.key];
        });
    }

    static render(component, { element, data, components }) {
        const fragment = document.createDocumentFragment();
        const temp = document.createElement('div');
        Object.assign(Component.components, components);
        
        temp.innerHTML = Component.compile(component, data);
        
        //while (temp.children.item(0)) { 
            fragment.appendChild(temp.children.item(0));
        //};

        fragment.querySelectorAll('[data-component]').forEach(element => {
            const key = element.dataset.component;
            const data = Object.assign({}, element.dataset);
            if (!Component.components[key]) return;
            element.parentNode.replaceChild(new Component.components[key](data).element, element);
        })

        if (element) element.appendChild(fragment);

        return fragment.children[0];
    }

    static compile(component, data) {
        return component.replace(/{{(.+?)}}/g, (match, key) => {
            key = key.trim();
            return (data[key]) ? data[key] : match;
        }).replace(/<([A-Z].+?)\/>/g, (match, data) => {
            data = data.trim().split(' ');
            const key = data[0];
            return `<div data-component="${key}" ${ data.map(item => `data-${item}`).join(' ') }></div>`;
        });   
    }
}

Component.components = {};

export default Component;