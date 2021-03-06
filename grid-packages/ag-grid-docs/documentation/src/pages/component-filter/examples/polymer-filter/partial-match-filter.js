import { html, PolymerElement } from 'https://unpkg.com/@polymer/polymer@3.4.1/polymer-element.js';

export default class PartialMatchFilter extends PolymerElement {
    static get template() {
        return html`
            Filter: <input style="height: 20px" id="input" on-input="onChange" value="{{text::input}}">
        `;
    }

    agInit(params) {
        this.params = params;
        this.valueGetter = params.valueGetter;
    }

    static get properties() {
        return {
            text: String
        };
    }

    isFilterActive() {
        return this.text != null && this.text !== '';
    }

    doesFilterPass(params) {
        return this.text.toLowerCase()
            .split(' ')
            .every(filterWord => this.valueGetter(params.node).toString().toLowerCase().indexOf(filterWord) >= 0);
    }

    getModel() {
        return { value: this.text };
    }

    setModel(model) {
        this.text = model ? model.value : '';
    }

    afterGuiAttached(params) {
        this.$.input.focus();
    }

    componentMethod(message) {
        alert(`Alert from PartialMatchFilterComponent: ${message}`);
    }

    onChange(event) {
        const newValue = event.target.value;

        if (this.text !== newValue) {
            this.text = newValue;
            this.params.filterChangedCallback();
        }
    }
}

customElements.define('partial-match-filter', PartialMatchFilter);
