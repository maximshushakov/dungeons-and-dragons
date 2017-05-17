import Component from "tools/component";

class Question extends Component {
    init() {
        var input = this.element.querySelector('[ref="input"]');
        var current = 0;
        var total = this.data.length;
        var status = '';

        input.addEventListener('change', (e) => {
            status = (input.value.trim() === this.data[current].answer) ? '-correct' : '-incorrect';

            this.bindings.setData({
                status,
                isDisable: true,
            });

            setTimeout(() => {
                current++;
                if (current === total) current = 0;
                show(current);
            }, 1500)
        });

        const show = (index) => {
            this.bindings.setData({
                question: this.data[index].question,
                words: this.data[index].words,
                status: '-default',
                isDisable: false,
            });
            input.focus();
        };

        show(current);
    }

    render() {
        return (
            `<div class="card" data-bind="class:status">;
                <div class="_content">
                    <div class="_headline" data-bind="text:question"></div>
                    <div class="_subheading">Combine these words to a sentence:</div>
                    <div class="_description" data-bind="text:words"></div>
                    <div class="_textfield">
                        <input data-bind="disabled:isDisable" ref='input' class="_textbox" placeholder="Your answer...">
                    </div>
                </div>
            </div>`
        );
    }
}

export default Question;