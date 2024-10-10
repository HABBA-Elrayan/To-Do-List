class Tache {
    titreEvent;
    heureDebutEvent; 
    heureFinEvent;
    dateEvent;
    descriptionEvent;

    constructor() {
        this.titreEvent =document.querySelector('#titre').value
        this.heureDebutEvent = document.querySelector('#hd').value
        this.heureFinEvent = document.querySelector('#hf').value
        this.dateEvent = document.querySelector('#date').value
        this.descriptionEvent = document.querySelector('#desc').value        
    }
}

let listeTaches = JSON.parse(localStorage.getItem('tache')) || [];
affichageTacheEcran(listeTaches);



// Fonctions 
function fermerAjoutTache(){
    document.querySelector('.div-ajt').classList.add('div-ajout');
    document.querySelector('.div-ajt').classList.remove('div-ajt');   
}
function ouvrirAjoutTache(){
    document.querySelector('.div-ajout').classList.add('div-ajt');
    document.querySelector('.div-ajout').classList.remove('div-ajout');
}
function fondFlou(){
    document.querySelector('.menu-overlay').classList.add('menu-overlayed');
    document.querySelector('.menu-overlay').classList.remove('menu-overlay'); 
}
function arretFondFlou(){
    document.querySelector('.menu-overlayed').classList.add('menu-overlay');
    document.querySelector('.menu-overlayed').classList.remove('menu-overlayed'); 
}
function nouvTache(){
    const nouvelleTache = new Tache;
    listeTaches.push(nouvelleTache);
    return nouvelleTache;
}
function saveLocal(){
    localStorage.setItem('tache', JSON.stringify(listeTaches));
}
function affichageTacheEcran(listeTaches){
    const principal = document.querySelector('.principal');
    principal.innerHTML = ''; 
    listeTaches.forEach((tache, index) => {
        principal.innerHTML += 
        `<div class="more" data-index="${index}">
            <p>${tache.titreEvent}</p>
            <button class="supprimer">Supprimer</button>
        </div>` 
    });
    document.querySelectorAll('.supprimer').forEach((btn, index) => {
        btn.addEventListener('click', () => supprimerTache(index));
    });
    document.querySelectorAll('.more').forEach((more, index) => {
        more.addEventListener('click', ()=>{agrandirTache(index);})
    });
}
function agrandirTache(index){
    const tache = listeTaches[index];
    document.querySelector('.g').innerHTML += `<div class="grand grand-${index}">
        <div id="boutton-fermer"><button class="fermer fermerTache-${index}">X</button></div>
        <span class="titreTache t">${tache.titreEvent}</span>
        <span class="dateTache t">Date de l'évènement :  <br>${tache.dateEvent}</span>
        <div id="hours"><span class="heureDTache t">Heure de début <br>${tache.heureDebutEvent}</span><span class="heureFTache t">Heure de fin <br>${tache.heureFinEvent}</span></div>
        <br>
        <div class="para">
            <p class="desp t">${tache.descriptionEvent}</p>
        </div>
    </div>`
    fondFlou();
    fermerGrandeTache(index);
}
function toutSupprimer(){
    localStorage.clear();
    listeTaches = [];
    affichageTacheEcran(listeTaches);
}
function supprimerTache(index) {
    
    listeTaches.splice(index, 1); 
    saveLocal();
    affichageTacheEcran(listeTaches); 
}
function fermerGrandeTache(index){
    document.querySelector(`.fermerTache-${index}`).addEventListener('click', ()=>{
        document.querySelector(`.grand-${index}`).remove();
        arretFondFlou();
})};


// evenement click boutton ajouter
document.querySelector('.add-event').addEventListener('click', ()=>{
    fondFlou();
    ouvrirAjoutTache();
});

// evenement click bouton X 
document.querySelector('.fermer').addEventListener('click', ()=>{
    arretFondFlou();
    fermerAjoutTache();
});

// evenement click boutton submit 
document.querySelector('#div-form').addEventListener('submit', ()=>{
    arretFondFlou();
    fermerAjoutTache();
    nouvTache();
    saveLocal();
    affichageTacheEcran(listeTaches);
});

// evenement click bouton tout supprimer 
document.querySelector('.tout-sup').addEventListener('click', ()=>{
    toutSupprimer();
});





