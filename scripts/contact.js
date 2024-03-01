window.onload = init;

var users = JSON.parse(localStorage.getItem('users')) || [];

function init() {
        document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Recover email and password from the incription form
        var email = document.getElementById('mail').value;
        var password = document.getElementById('mdp').value;

        // check email và password have been already exists before
        var isAuthenticated = users.some(function(user) {
            return user.Email === email && user.Password === password;
        });

        // Email and password are correct, entry to page jouer.html
        if (isAuthenticated) {
            window.location.href = 'profil.html';
        } else {
            alert('Email ou mot de passe incorrect.');
        }
    });
};
