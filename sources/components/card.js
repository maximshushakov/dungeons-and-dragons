import Component from "tools/component";

class Card extends Component {
    constructor(...data) {
        return super(...data);
    }

    init() {}

    render() {
        return (
            `<div class="card" data-bind="class:status">
                <div class="_header">
                    <div class="_title" data-bind="text:word"></div>
                </div>
                <div class="_content">
                    <div class="_headline" data-bind="text:reading"></div>
                    <div class="_subheading" data-bind="text:meaning"></div>
                    <div class="_description" data-bind="text:meaning"></div>
                    ${this.data.title}
                </div>
            </div>`
        );
    }
}

export default Card;