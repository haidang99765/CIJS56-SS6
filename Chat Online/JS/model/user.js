import {md5} from "./utils.js";

export async function register(name, email, password) {
    let response = await firebase
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .get();

    if(response.empty) {
        firebase.firestore().collection("users").add({
            name: name,
            email: email,
            password: md5(password)
        });
        alert("Register successfully");
    } else {
        alert ("This email has been already used")
    }
}

export async function login(email, password) {
    let response = await firebase
    .firestore()
    .collection('users')
    .where('email','==', email)
    .get()

    if(response.empty) {
        alert('Your email or your password wrong');
    } else {
        for(let pass of response.docs) {
            if (pass.data().password == md5(password)) {
                alert("Login success");
            } else {
                alert('Your email or your password wrong');
            }
        }
    }
}

export function getUserInfo() {

}

//Xử lí bất đồng bộ: callback, promise, async/await
//chỗ nào có promise -> có await -> có async