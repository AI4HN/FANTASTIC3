/*
     ================================================================================
      FONCTIONS COMMUNES
    ================================================================================
    
    ================================================================================
      AVERTISSEMENT - PROTOTYPE
    ================================================================================
      - Propriété : Ce code est un prototype et reste la propriété intellectuelle 
        de Frédéric Jacquet / AI[4]HumanNexus (https://ai4humannexus.com/).
      - Licence d'utilisation : Il est mis à la disposition exclusive de 
        l'accueil "Vivienne" de VCA, à titre gracieux et uniquement pour des 
        fins de test et d'évaluation.
      - Non-distribution : Ce code ne doit en aucun cas être transmis, copié ou 
        distribué sans l'autorisation écrite de son auteur.
      - Absence de garantie : Ce prototype est fourni "en l'état" à des fins de 
        démonstration et n'inclut aucune garantie de maintenance ou de support 
        pour d'éventuelles évolutions.
    ================================================================================
    */


/**
 * Analyse une chaîne de texte depuis Teams pour en extraire le nom, le prénom et s'il s'agit d'un externe.
 * @param {string} rawText Le texte complet copié depuis Teams (ex: "NOM Prénom (EXT-VCA-FR)").
 * @returns {object|null} Un objet {nom, prenom, isExternal} si l'analyse réussit, sinon null.
 */
function parseTeamsName(rawText) {
    if (!rawText) return null;

    const isExternal = rawText.toUpperCase().includes('(EXT');
    const cleanedText = rawText.replace(/\s*\(.*\)\s*$/, '').trim();
    const words = cleanedText.split(/\s+/);
    
    let splitIndex = -1;

    for (let i = 0; i < words.length; i++) {
        if (words[i] === words[i].toUpperCase() && isNaN(words[i])) {
            splitIndex = i;
        } else {
            break;
        }
    }
    
    if (splitIndex !== -1 && splitIndex < words.length - 1) {
        const nom = words.slice(0, splitIndex + 1).join(' ');
        const prenom = words.slice(splitIndex + 1).join(' ');
        return { nom, prenom, isExternal };
    }
    
    return null;
}

/**
 * Ouvre la page d'avertissement dans une nouvelle fenêtre popup.
 * @param {string} [pathPrefix='.'] Le préfixe de chemin pour trouver le fichier avertissement.html.
 */
function afficherAvertissement(pathPrefix = '.') {
    const url = `${pathPrefix}/AVERTISSEMENT.html`;
    const windowName = 'Avertissement';
    const windowFeatures = 'width=550,height=500,scrollbars=yes,resizable=yes';
    window.open(url, windowName, windowFeatures);
}


/**
 * Crée et ajoute un bouton flottant pour retourner au menu principal.
 */
function ajouterBoutonMenu() {
    const menuButton = document.createElement('a');
    menuButton.href = '../MENU.html';
    menuButton.className = 'menu-flottant';
    menuButton.textContent = 'MENU';
    menuButton.title = "Retour au menu d'accueil";
    document.body.appendChild(menuButton);
}


/**
 * Récupère la liste confidentielle depuis le localStorage.
 * @returns {string[] | null} Le tableau des noms de la liste, ou null si elle n'existe pas.
 */
function getListeConfidentielle() {
    const storedList = localStorage.getItem('listeConfidentielle');
    return storedList ? JSON.parse(storedList) : null;
}

/**
 * Vérifie si un nom/prénom est présent dans la liste confidentielle.
 * @param {string} nom Le nom de la personne à vérifier.
 * @param {string} prenom Le prénom de la personne à vérifier.
 * @returns {boolean} True si le nom est dans la liste, sinon false.
 */
function verifierSiNomDansListe(nom, prenom) {
    const liste = getListeConfidentielle();
    if (!nom || !prenom || !liste) {
        return false;
    }
    
    const searchName = `${nom.trim().toUpperCase()} ${prenom.trim().toUpperCase()}`;
    return liste.includes(searchName);
}

/**
 * Construit l'adresse e-mail en suivant les règles de formatage.
 * @param {string} prenom Le prénom de la personne.
 * @param {string} nom Le nom de famille de la personne.
 * @param {boolean} isExternal Indique s'il s'agit d'un contact externe.
 * @returns {string} L'adresse e-mail formatée.
 */
function construireAdresseEmail(prenom, nom, isExternal) {
    if (!prenom || !nom) return "";

    // MODIFICATION : Règle n°5 - Ne gère plus les prénoms composés.
    if (prenom.includes('-') || prenom.includes('.')) {
        return ""; // Retourne une chaîne vide si le prénom est composé
    }

    let prenomPart = prenom.trim().toLowerCase();
    let nomPart = nom.trim().toLowerCase().replace(/'/g, '-');

    if (isExternal) {
        nomPart += "-ext";
    }

    return `${prenomPart}.${nomPart}@vancleefarpels.com`;
}