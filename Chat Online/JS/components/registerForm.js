import {register} from "../model/user.js"

const $template = document.createElement('template');
$template.innerHTML = /*html*/`
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <form id="register-form" class="p-3"> 
        <h2 class="text-center">Please register before using this app</h2>
        <p class="text-muted text-center">Join as a member</p>
        <input-wrapper id="name" type="text" placeholder="Name"></input-wrapper>
        <input-wrapper id="email" type="email" placeholder="Email"></input-wrapper>
        <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
        <input-wrapper id="confirm-password" type="password" placeholder="Confirm your password"></input-wrapper>
        <button class="btn btn-primary btn-block">Sign up</button>
    </form>
`;

export default class registerForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$registerForm = this.shadowRoot.getElementById('register-form');
        this.$name = this.shadowRoot.getElementById('name');
        this.$email = this.shadowRoot.getElementById('email');
        this.$password = this.shadowRoot.getElementById('password');
        this.$confirmpassword = this.shadowRoot.getElementById('confirm-password');
    }

    connectedCallback() { //connectedCallback chi duoc goi 1 lan duy nhat khi thẻ lần đầu tiên xuất hiện trong thẻ body
        this.$registerForm.onsubmit = (event) => {
            event.preventDefault(); //preventDefault là ngăn chặn việc xử lí ngay tại trang đích

            let name = this.$name.value;
            let email = this.$email.value;
            let password = this.$password.value;

            function require(value) {
                return value != '';
            }

            function confirmPassword(value) {
                return value == password
            }

            function validateEmail(email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }


            let isPassed = this.$name.validate(require, "Input your name") &
            (
                this.$email.validate(require, "Input your email") &&
                this.$email.validate(validateEmail, "Wrong email format")
            ) &
            this.$password.validate(require, "Input your password") &
            (
                this.$confirmpassword.validate(require, "Input your password confirmation") &&
                this.$confirmpassword.validate(confirmPassword, "Password is not match")
            );

            if (isPassed) {
                register(name, email, password);
            } 
        }
    }
}

window.customElements.define('register-form', registerForm);

