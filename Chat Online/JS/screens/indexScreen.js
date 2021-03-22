const $template = document.createElement('template');
$template.innerHTML = /*html*/`
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <div id="index-screen">
        <h1>Welcome</h1>
    </div>
`;

export default class IndexScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define('index-screen', IndexScreen);