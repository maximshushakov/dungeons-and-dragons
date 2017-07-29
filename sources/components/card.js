import Component from "tools/component";

class Card extends Component {
    init() { }

    render() {
        return (
            `<div class="card -correct">
                <div class="_header">
                    <div class="_caption">${this.data.hint}</div>
                    <div class="_title">${this.data.word}</div>
                </div>
                <div class="_content">
                    <div class="_headline">${this.data.reading}</div>
                    <div class="_subheading">${this.data.meaning}</div>
                    <!--<div class="_description">
                        Examples: <br>
                        ${ (this.data.examples && this.data.examples.length) ? this.data.examples.join('<br>') : 'Soon' }
                    </div>-->
                </div>
                <div class="_actions">
                </div>
            </div>`
        );
    }
}

export default Card;