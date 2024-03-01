   
window.onload = init;

function init() {
    document.getElementById('nom').addEventListener('input', validateUsername);
    document.getElementById('mail').addEventListener('input', validateEmail);
    document.getElementById('mdp').addEventListener('input', validatePassword);
    document.getElementById('mdpConfirm').addEventListener('input', validateConfirmPassword);
    document.querySelector('.bi-eye-slash').addEventListener('click', togglePasswordVisibility);    
}
    


//validate username
    var usernameInput = document.getElementById('nom');   
function validateUsername() {
    var usernameValue = usernameInput.value.trim();
    var usenameIcon = document.querySelector('#nom + .icon');
    var usenameNote = document.getElementById('username-note');

    if (usernameValue.length >= 3) {
        usenameIcon.innerHTML = '<i class="bi bi-check-circle"></i>';
        usenameIcon.style.color = "green";
        usenameNote.classList.add('d-none');
    } else {
        usenameIcon.innerHTML = '<i class="bi bi-exclamation-circle"></i>';
        usenameIcon.style.color = "red";
        usenameNote.classList.remove('d-none');
    }
}

//validate email
    var emailInput = document.getElementById('mail');
function validateEmail() {
    var emailValue = emailInput.value.trim();
    var emailIcon = document.querySelector('#mail + .icon');

    if (isValidEmail(emailValue)) {
        emailIcon.innerHTML = '<i class="bi bi-check-circle"></i>';
        emailIcon.style.color = "green";
    } else {
        emailIcon.innerHTML = '<i class="bi bi-exclamation-circle"></i>';
        emailIcon.style.color = "red";
    }
}
function isValidEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


//validate password
    var passwordInput = document.getElementById('mdp');
function validatePassword() {
    var passwordValue = passwordInput.value.trim();
    var passwordNote = document.getElementById('mdp-note');
    var passwordStrength = document.getElementById('password-strength');

    var hasCaracter = /[A-Za-z]/.test(passwordValue);
    var hasNumber = /[0-9]/.test(passwordValue);
    var hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);
    var hasLength = passwordValue.length >= 6;

    if (hasCaracter && hasNumber && hasSymbol && hasLength) {
            passwordStrength.classList.remove('d-none');
            passwordStrength.querySelector('.faible').classList.remove('d-none');
            passwordStrength.querySelector('.moyen').classList.remove('d-none');
            passwordStrength.querySelector('.fort').classList.remove('d-none');
            passwordNote.classList.add('d-none');  
        
    } else if ((hasCaracter && hasNumber) || (hasCaracter && hasSymbol) || (hasCaracter && hasLength) || 
                (hasNumber && hasSymbol) || (hasNumber && hasLength) || 
                (hasSymbol && hasLength)) {
            passwordStrength.classList.remove('d-none');
            passwordStrength.querySelector('.faible').classList.remove('d-none');
            passwordStrength.querySelector('.moyen').classList.remove('d-none');
            passwordStrength.querySelector('.fort').classList.add('d-none');
            passwordNote.classList.remove('d-none');

    } else if(hasCaracter || hasNumber || hasSymbol || hasLength){
        passwordStrength.classList.remove('d-none');
        passwordStrength.querySelector('.faible').classList.remove('d-none');
        passwordStrength.querySelector('.moyen').classList.add('d-none');
        passwordStrength.querySelector('.fort').classList.add('d-none');
        passwordNote.classList.remove('d-none');
        
    } else{
        passwordStrength.classList.add('d-none');
        passwordNote.classList.remove('d-none');
    }   
}


//validate confirm password
    var confirmPasswordInput = document.getElementById('mdpConfirm');
function validateConfirmPassword() {
    var passwordValue = passwordInput.value.trim();
    var confirmPasswordValue = confirmPasswordInput.value.trim();
    var icon = document.querySelector('#mdpConfirm + .icon');

    if (confirmPasswordValue === passwordValue) {
        icon.innerHTML = '<i class="bi bi-check-circle"></i>';
        icon.style.color = "green";
    } else {
        icon.innerHTML = '<i class="bi bi-exclamation-circle"></i>';
        icon.style.color = "red";
    }
}

//toggle password
function togglePasswordVisibility(){

    const togglePassword = document.querySelector('.bi-eye-slash');
    const passwordInputType = passwordInput.getAttribute('type');

    if (passwordInputType === 'password') {
        passwordInput.setAttribute('type', 'text');
        //togglePassword.classList.remove('bi-eye-slash');
        togglePassword.classList.add('bi-eye');
    } else {
        passwordInput.setAttribute('type', 'password');
        // togglePassword.classList.remove('bi-eye');
        togglePassword.classList.add('bi-eye-slash');
    }
}


// localStorage
// Load existing users from localStorage

document.getElementById('creationAccount').addEventListener('click', saveFormData);

var users = JSON.parse(localStorage.getItem('users')) || [];

function saveFormData(event){
    event.preventDefault();
    
    var formData = {
        Name : document.getElementById('nom').value,
        Email: document.getElementById('mail').value,
        Password : document.getElementById('mdp').value
    };
    console.log(formData);

     // Check if the username or email already exists before saving
    var isExistingUsername = users.some(function(user) {
        return user.Name === formData.Name;
    });

    var isExistingEmail = users.some(function(user) {
        return user.Email === formData.Email;
    });

    if (isExistingUsername) {
        alert('Ce nom d\'utilisateur est déjà pris');
    } else if (isExistingEmail) {
        alert('Cet email est déjà utilisé');
    } else {
        users.push(formData);
    
        // Convert formData object to JSON string
        var formdataJSON = JSON.stringify(users);

        // Save formDataJSON to localStorage
        localStorage.setItem('users', formdataJSON);
     
        // Provide feedback to the user
        alert('Les données du formulaire ont été enregistrées dans localStorage!');

        // rediriger vers contact.html
        window.location.href = 'contact.html';
    }
}