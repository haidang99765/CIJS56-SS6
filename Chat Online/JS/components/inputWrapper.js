const $template = document.createElement('template');
$template.innerHTML = `
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <div class="form-group">
        <input type="text" id="input" class="form-control" placeholder="This is the input">
        <div class="text-danger" id="error"></div>
    </div>
`;

export default class InputWrapper extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        
        this.$input = this.shadowRoot.getElementById('input');
        this.$error = this.shadowRoot.getElementById('error');
    }

    static get observedAttributes() {
        return ['type', 'placeholder', 'error', 'default']; //default la gia tri mac dinh ma khi ta chua ghi gi, va observedAttributes se lay cac id o tren chung ta dat
    }

    attributeChangedCallback(attrName, oldValue, newValue) { //attributeChangedCallback dc su dung khi cac thuoc tinh co gia tri se thay doi
        switch(attrName) {
            case 'type':
                this.$input.type = newValue;
                break;
            case 'placeholder':
                this.$input.placeholder = newValue;
                break;
            case 'error':
                this.$error.innerHTML = newValue;
                break;
            case 'default':
                this.$input.value = newValue;
                break;
        }
    }

    get value() {
        return this.$input.value;
    }

    set error(message) {
        this.setAttribute('error', message);
    }
}

window.customElements.define('input-wrapper', InputWrapper);