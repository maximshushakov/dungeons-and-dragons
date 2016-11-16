import Component from "tools/component";

class Card extends Component {
    constructor(...data) {
        return super(...data);
    }

    init() {}

    render() {
        return (
            `<div class="card">
                <div class="_header">
                    <div class="_title">${this.data.word}</div>
                </div>
                <div class="_content">
                    <div class="_headline">${this.data.reading}</div>
                    <div class="_subheading">${this.data.meaning}</div>
                    <div class="_description">
                       ${this.data.example}
                    </div>
                </div>
            </div>`
        );
    }
}

export default Card;