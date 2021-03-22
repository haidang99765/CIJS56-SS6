import {login} from "../model/user.js"
import {require, validateEmail} from "../model/utils.js"

const $template = document.createElement('template');
$template.innerHTML = /*html*/`
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <form id="login-form" class="p-3"> 
        <h2 class="text-center">Login to your account</h2>
        <p class="text-muted text-center">We are Different, We make different</p>
        <input-wrapper id="email" type="email" placeholder="Email"></input-wrapper>
        <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
        <button class="btn btn-primary btn-block">Sign in</button>
    </form>
`;

export default class loginForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$loginForm = this.shadowRoot.getElementById('login-form');
        this.$email = this.shadowRoot.getElementById('email');
        this.$password = this.shadowRoot.getElementById('password');
    }

    connectedCallback() { //connectedCallback chi duoc goi 1 lan duy nhat khi thẻ lần đầu tiên xuất hiện trong thẻ body
        this.$loginForm.onsubmit = (event) => {
            event.preventDefault(); //preventDefault là ngăn chặn việc xử lí ngay tại trang đích
            let email = this.$email.value;
            let password = this.$password.value;

            let isPassed = this.$password.validate(require, "Input your password") &
            (
                this.$email.validate(require, "Input your email") &&
                this.$email.validate(validateEmail, "Wrong email format")
            );

            if (isPassed) {
                login(email, password);
            }
        }
    }
}

window.customElements.define('login-form', loginForm);

//text-muted là đổi màu chữ sang màu xám trong Bootstrap
//text-center là chỉnh chữ căn ra giữa
//p-3 là padding 3, chỉnh lề 2 bên thu về giữa
//btn btn-primary btn-block chỉnh nút button
//form action là điểm đích dùng để xử lí dữ liệu khi chúng ta ấn submit