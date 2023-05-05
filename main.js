let ean = document.getElementById("EAN"); //zone de saisie pour code EAN
console.log(ean);
let button = document.getElementById("button"); //bouton submit

// Le code EAN doit être égal à 13 caractères sinon le bouton ne fonctionne pas
ean.addEventListener("input", () => {
    let valueEan = ean.value;
    console.log(valueEan);
    if(valueEan.length === 13) {  
        button.disabled = false;
    } else {
        button.disabled = true;
    }
});

// Lancement du fetch lorsque l'on clique sur le bouton
button.addEventListener("click", /*async*/ () => {
    
    // Masquage de la div 'accueil" afin d'accéder au résultat de fetchFOOD
    document.getElementById("accueil").style.display = "none";
    
    /* //Lancement de fetchFood
    fetchFood() */
    
    let valueEan = ean.value;
    console.log("code EAN = " + valueEan); // Vérification de la prise en compte du code EAN
    fetch("https://fr.openfoodfacts.org/api/v0/product/" + valueEan)
    .then(fetchResult => fetchResult.json())
    .then(data => { console.log(data)

    // Affichage des résultats souhaités
    document.getElementById("img-food").src = data.product.image_url;
    document.getElementById("food-name").innerHTML = data.product.product_name;
    document.getElementById("brand").innerHTML = data.product.brands;
    document.getElementById("gen-name").innerHTML = data.product.generic_name_fr;
    document.getElementById("food-category").innerHTML = data.product.categories;
    document.getElementById("ingredients").innerHTML = data.product.ingredients_text;
    document.getElementById("packaging").innerHTML = data.product.packaging;

    // Afficher "Aucun" au lieu de "undefined" quand il n'y a pas d'allergènes
    document.querySelector("#allergens").innerHTML = data.product.allergens ? data.product.allergens : "Aucun";
    })

    // Remise à zéro de la zone de saisie
    ean.value = "";
    if (ean.value === "") {
        button.disabled = true;
    }
})

// La zone de saisie EAN ne doit pas être vide
if (ean.value === "") {
    button.disabled = true;
}

// Animation de la pastille downScroll
window.onscroll = () => {

    console.log(document.documentElement.scrollTop);

    if (document.documentElement.scrollTop > 300) {
        document.getElementById("downScroll").style.bottom = '-100vw';
    }
    else {
        document.getElementById("downScroll").style.bottom = "10vw";
    }
}


/*// Fonction asynchrone fetchFood permettant d'utiliser les données de l'API

async function fetchFood() {
    let valueEan = ean.value;
    console.log("code EAN = " + valueEan); // Vérification de la prise en compte du code EAN

    // Utilisation de fetch
    let fetchResult = await fetch("https://fr.openfoodfacts.org/api/v0/product/" + valueEan);
    console.log(fetchResult);

    // Transformation de la data obtenue par fetch en objet json
    let data = await fetchResult.json()
    console.log(data); // Récupération des informations de la réponse fetch

    // Affichage des résultats souhaités
    document.getElementById("img-food").src = data.product.image_url;
    document.getElementById("food-name").innerHTML = data.product.product_name;
    document.getElementById("brand").innerHTML = data.product.brands;
    document.getElementById("gen-name").innerHTML = data.product.generic_name_fr;
    document.getElementById("food-category").innerHTML = data.product.categories;
    document.getElementById("ingredients").innerHTML = data.product.ingredients_text;
    document.getElementById("packaging").innerHTML = data.product.packaging;

    // Afficher "Aucun" au lieu de "undefined" quand il n'y a pas d'allergènes
    if (data.product.allergens === "") {
        document.getElementById("allergens").innerHTML = "Aucun";
    }
    else {
            document.getElementById("allergens").innerHTML = data.product.allergens;
    }
}*/