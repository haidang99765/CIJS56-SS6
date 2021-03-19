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
    .where("password", "==", md5(password))
    .get()

    if (!response.empty) {
        alert("Login success");
    } else {
        alert("Email or password is wrong. Try again");
    }
}

export function getUserInfo() {

}

//Xử lí bất đồng bộ: callback, promise, async/await
//chỗ nào có promise -> có await -> có async