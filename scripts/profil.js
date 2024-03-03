
window.onload = init;
function init(){
    document.querySelector('.form-select').addEventListener('change', choixImage);

}


    const selectElement = document.querySelector('.form-select')
    const imagesContainer = document.querySelector('.images');

    // images coesponding with option
    const imagePaths = {
        "legumes": "assets/images/memory-legume/memory_detail.png",
        "lettres": "assets/images/alphabet-scrabble/memory_detail_scrabble.png",
        "animaux": "assets/images/animaux/memory_detail_animaux.png",
        "animauwAnimes": "assets/images/animauxAnimes/memory_detail_animaux_animes.png",
        "animauwDomestique": "assets/images/animauxdomestiques/memory_detail_animaux_domestiques.png",
        "chiens": "assets/images/chiens/memory_details_chiens.png",
        "dinosaures": "assets/images/dinosaures/memory_detail_dinosaures.png",
        "dinosauresNom": "assets/images/dinosauresAvecNom/memory_details_dinosaures_avec_nom.png"
    };

    
    function choixImage() {
        const selectedOption = selectElement.value;
        const imagePath = imagePaths[selectedOption];

        
        imagesContainer.innerHTML = '';
        if (imagePath) {
            const imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = selectedOption;
            imagesContainer.appendChild(imageElement);
        }
    }

    // save data in localStorage

    
    document.querySelector('.btnSave').addEventListener('click', saveProfile);

    //var profile = JSON.parse(localStorage.getItem('profile')) || [];

function saveProfile(){
    const nomUtilisateur = document.getElementById('nom').value;
    const email = document.getElementById('mail').value;
    const choixMemory = document.querySelector('.form-select').value;
    const tailleMemory = document.querySelector('.taille select').value;
  
    const userData = {
        nom: nomUtilisateur,
        email: email,
        choixMemory: choixMemory,
        tailleMemory: tailleMemory
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Provide feedback to the user
    alert('Votre informations ont été enregistrées dans localStorage!');
    window.location.href = 'jouer.html';
}
