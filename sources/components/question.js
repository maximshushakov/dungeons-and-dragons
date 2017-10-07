import Component from "tools/component";

class Question extends Component {
    init() {
        var input = this.element.querySelector('[ref="input"]');
        var current = 0;
        var total = this.data.length;
        var status = '-default';

        /*input.addEventListener('change', (e) => {
            status = (input.value.trim() === this.data[current].word) ? '-correct' : '-incorrect';

            this.bindings.setData({
                status,
                isDisable: true,
                answer: this.data[current].word,
                hint: this.data[current].reading,
                question: this.data[current].word,
            });

            window.responsiveVoice.speak(this.data[current].word, 'Japanese Female');
        });*/

        //window.responsiveVoice.speak(this.data[current].word, 'Japanese Female');

        window.addEventListener('keypress', (e) => {
            if (e.code !== 'Enter') return;
            if (status === '-default') {
                input.dispatchEvent(new Event('change'));
                return;
            }

            current++;
            if (current === total) current = 0;
            show(current);
        })

        const show = (index) => {
            this.bindings.setData({
                question: this.data[index].meaning,
                hint: this.data[index].hint,
                status: '-default',
                isDisable: false,
                answer: '',
            });
            input.focus();
        };

        show(current);
    }

    render() {
        return (
            `<div class="card" data-bind="class:status" data-on="click:check">
                <div class="_content">
                    <div class="_headline" data-bind="text:question"></div>
                    <div class="_subheading" data-bind="text:hint"></div>
                    <div class="_description" data-bind="text:words"></div>
                    <div class="_textfield">
                        <input data-bind="value:answer" data-on="change:check" ref='input' class="_textbox" placeholder="Your answer...">
                    </div>
                </div>
            </div>`
        );
    }
}

export default Question;