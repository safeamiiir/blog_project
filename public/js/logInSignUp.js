const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

loginBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode.parentNode;
    Array.from(e.target.parentNode.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
            parent.classList.add('slide-up')
        } else {
            signupBtn.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    });
});

signupBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode;
    Array.from(e.target.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
            parent.classList.add('slide-up')
        } else {
            loginBtn.parentNode.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    });
});
$(document).ready(function () {
    $("#form-singup").append("<input type='text' id='userName' class='input' placeholder='نام کاربری' value='' />");
    $("#form-singup").append("<input type='email' id='email' class='input' placeholder='پست الکترونیکی' value='' />");
    $("#form-singup").append("<input type='password' id='password' class='input' placeholder='کلمه عبور' value='' />");
    $('#signUpButton').on('click', function () {
        let valueOfInput = {
            // fname: $('#fname').val(),
            // lname: $('#lname').val(),
            userName: $('#userName').val(),
            email: $('#email').val(),
            password: $('#password').val()
        };
        console.log("sended",valueOfInput,"ended");
        $.ajax({
            type: "POST",
            url: "/user/signUp",
            data: valueOfInput,
            success: function (userCreate) {
                console.log(userCreate);
            }

        })
    });
});



$("#logInButton").on('click', function () {
    let valueOfInput = {
        userName : $('#lUserName').val(),
        password : $('#lPassword').val()
    };

console.log(valueOfInput);
$.ajax({
    type: "POST",
    url: "/user/logIn",
    data: valueOfInput,
    success: function (logedIn) {
        console.log(logedIn);
    }
});
});