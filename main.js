const userInput = document.querySelector(".username");
const passwordInput = document.querySelector(".password");
const signInBtn = document.querySelector(".signin");
const userMessage = document.querySelector(".username-message");
const passwordMessage = document.querySelector(".password-message");
const signInMessage = document.querySelector(".signin-message");

signInBtn.addEventListener("click" , signIn);
document.addEventListener("keydown" , checkButtonCode);

function checkButtonCode(button){
    if(button.keyCode == 13){
        signIn();
    }
}

function signIn() {

    userMessage.innerText = "";
    passwordMessage.innerText = "";
    signInMessage.innerText = "";

    const userValue = userInput.value;
    const passwordValue = passwordInput.value;

    let ifSendData = true;
    const userRegex = /[c][o][m]/;

    if(userValue.length === 0){
        userMessage.innerText = "Please Enter Your Email";
        ifSendData = false;
    }else if(userValue.indexOf("@") === -1 || userValue.indexOf(".") === -1  || userRegex.test(userValue) == false){
        userMessage.innerText = "Please Enter a Valid Email";
        ifSendData = false;
    }

    if(passwordValue.length === 0){
        passwordMessage.innerText = "Please Enter Your Password";
        ifSendData = false;
    }else if(passwordValue.length <= 5){
        passwordMessage.innerText = "Password Should Be At Least 8 Characters";
        ifSendData = false;
    }

    if(ifSendData){
        const body = JSON.stringify({
            username: userValue,
            password: passwordValue
        })

        const headers = {
            "Content-type": "application/json"
        }

        fetch("https://jsonplaceholder.typicode.com/posts" , {
            method: "POST",
            body: body,
            headers: headers
        })
            .then((res) => {
                if(res.ok){
                    signInMessage.innerText = "You Sing In Successfully";
                }
            })
    }
}