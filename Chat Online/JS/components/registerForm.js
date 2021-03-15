const $template = document.createElement('template');
$template.innerHTML = `
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <form id="login-form" class="p-3"> 
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

        this.$loginForm = this.shadowRoot.getElementById('login-form');
        this.$name = this.shadowRoot.getElementById('name');
        this.$email = this.shadowRoot.getElementById('email');
        this.$password = this.shadowRoot.getElementById('password');
        this.$confirmpassword = this.shadowRoot.getElementById('confirm-password');
    }

    connectedCallback() { //connectedCallback chi duoc goi 1 lan duy nhat khi thẻ lần đầu tiên xuất hiện trong thẻ body
        this.$loginForm.onsubmit = (event) => {
            event.preventDefault(); //preventDefault là ngăn chặn việc xử lí ngay tại trang đích
            let email = this.$email.value;
            let password = this.$password.value;
            let confirmpassword = this.$confirmpassword.value;
            let name = this.$name.value;

            if(name == '') {
                this.$name.error = "Name cannot be blanked";
            } else {
                this.$name.error = "";
            }

            if(email == '') {
                this.$email.error = "Input your email";
            } else {
                this.$email.error = "";
            }

            if(password == '') {
                this.$password.error = "Input your password";
            } else {
                this.$password.error = "";
            }

            if (confirmpassword == '') {
                this.$confirmpassword.error = "Please enter the password you fill to confirm";
            } else if (confirmpassword == password) {
                this.$confirmpassword.error = ""
            }
            else {
                this.$confirmpassword.error = "Please enter the password same the password you fill";
            }
        }
    }
}

window.customElements.define('register-form', registerForm);

//bug nhỏ: ở mục tạo form Đăng kí thì em đã test thì đã kiểm tra được dữ liệu người dùng nhập vào, nhưng 
//nếu em thực hiện không điền gì vào form đăng kí mà ấn nút "Sign up" luôn thì nó không báo lỗi nếu không điền
//vào mục Confirm your password, phải đến lúc điền Password vào thì nó mới kiểm tra dữ liệu, em cũng không biết
//đây có phải lỗi nữa không ạ, có gì anh thấy sai ở đâu thì chỉ em với ạ
