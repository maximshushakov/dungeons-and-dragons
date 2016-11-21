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
                    <div class="_title">${this.data.kanji}</div>
                </div>
                <div class="_content">
                    <div class="_headline">${this.data.kana}</div>
                    <div class="_subheading">${this.data.meaning}</div>
                    <div class="_description">
                       ${this.data.group}
                    </div>
                </div>
            </div>`
        );
    }
}

export default Card;