const username = 'admin';
const password = '1234';

const loginForm = document.getElementById("login-form");
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");

loginForm.addEventListener('submit', function(event){
    event.preventDefault();

    const enteredUsername = inputUsername.value;
    const enteredPassword = inputPassword.value;

    if(enteredUsername === username && enteredPassword === password){
        alert("Success!");

        window.location.href = "./pages/todo-page.html";
    }else{
        alert("Incorrect username or password.");
    }

});
