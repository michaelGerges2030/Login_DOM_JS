var signinemail = document.getElementById("signInEmail");
var signinpassword = document.getElementById("signInPassword");
var signupname = document.getElementById("signUpName");
var signupemail = document.getElementById("signUpEmail");
var signuppassword = document.getElementById("signUpPassword");

//Email should have at least a char or digit and end with @gmail.com
var exmailRegex = /^[a-zA-Z0-9]{4,16}@[a-z]{1,5}\.[a-z]{2,3}$/;
//Password should have capital and small chars, digits and sympols
var passwordRegex = /[A-Z]+[a-z]+[0-9]+[~!@#$%^&*_\\\-*\/]+/

// Chech if the user has an account or not
var signUpArray = []
if (localStorage.getItem('usersInfo') != null){
    signUpArray = JSON.parse( localStorage['usersInfo'] ); 
}

//check if any input is empty or not
function isSignUpEmpty(){
    if (signupemail.value == '' || signuppassword.value == '' || signupname.value==''){
        return false;
    }
    return true;
}

function isEmailExist(emailToCheck){
    for (var i = 0; i < signUpArray.length; i++){
        if (signUpArray[i].email.toLowerCase() == emailToCheck.toLowerCase()){
            document.querySelector('.exist').classList.replace('d-none','d-block')
            return true;
        }
    }
    return false;
}

function signUp(){
    if (isSignUpEmpty() == false){
        document.querySelector('.wrong').classList.replace('d-none', 'd-block')
    }
    else{
        if (passwordRegex.test(signuppassword.value) == false || exmailRegex.test(signupemail.value) == false){
            if (passwordRegex.test(signuppassword.value) == false){
                document.querySelector('.validatePass').classList.replace('d-none','d-block')
            }
            if(exmailRegex.test(signupemail.value) == false){
                document.querySelector('.validateEmail').classList.replace('d-none','d-block')
            }   
        }
        else{
            var singUpData = {
                name: signupname.value,
                email: signupemail.value,
                password: signuppassword.value
            }
            if(isEmailExist(singUpData.email)){
                signupname.value = ''
                signupemail.value = ''
                signuppassword.value = ''
            }
            else{
                signUpArray.push(singUpData)
                localStorage.setItem('usersInfo', JSON.stringify(signUpArray))
                document.querySelector('.passed').classList.replace('d-none','d-block')
                localStorage.setItem('userName', singUpData.name)
                window.location.href='home.html'
            }
        }
    }
}

function isLoginEmpty(){
    if (signinemail.value =='' || signinpassword.value == ''){
        return false;
    }
    return true;
}

function logIn(){
    if (isLoginEmpty() == false){
        document.querySelector('.wrong').classList.replace('d-none','d-block');
    }
    else{
        var password = signinpassword.value
        var email = signinemail.value
        for (var i = 0; i < signUpArray.length; i++){
            if (password.toLowerCase() == signUpArray[i].password.toLowerCase() && email.toLowerCase() == signUpArray[i].email.toLowerCase()){
                localStorage.setItem('userName', signUpArray[i].name)
                window.location.href='home.html'
                return;
            }
        }
        document.querySelector('.wrongLogin').classList.replace('d-none','d-block')
    }
}

if (document.getElementById('logo') != null){
    document.getElementById('welcome').innerHTML= 'Welcome ' + localStorage.getItem('userName')
}

function logout(){
    window.location.href='index.html';
}
