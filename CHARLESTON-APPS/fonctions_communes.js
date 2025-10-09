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


function parseTeamsName(rawText) {
    if (!rawText) return null;
    const isExternal = rawText.toUpperCase().includes('(EXT');
    const cleanedText = rawText.replace(/\s*\(.*\)\s*$/, '').trim();
    const words = cleanedText.split(/\s+/);
    let splitIndex = -1;
    for (let i = 0; i < words.length; i++) {
        if (words[i] === words[i].toUpperCase() && isNaN(words[i])) {
            splitIndex = i;
        } else { break; }
    }
    if (splitIndex !== -1 && splitIndex < words.length - 1) {
        const nom = words.slice(0, splitIndex + 1).join(' ');
        const prenom = words.slice(splitIndex + 1).join(' ');
        return { nom, prenom, isExternal };
    }
    return null;
}

function afficherAvertissement(pathPrefix = '.') {
    const url = `${pathPrefix}/AVERTISSEMENT.html`;
    window.open(url, 'Avertissement', 'width=550,height=500,scrollbars=yes,resizable=yes');
}

function ajouterBoutonMenu() {
    const menuButton = document.createElement('a');
    menuButton.href = '../MENU.html';
    menuButton.className = 'menu-flottant';
    menuButton.textContent = 'MENU';
    menuButton.title = "Retour au menu d'accueil";
    document.body.appendChild(menuButton);
}

// --- LOGIQUE LISTE CONFIDENTIELLE "PIERRES" ---
function getListeConfidentielle() {
    const storedList = localStorage.getItem('listeConfidentielle');
    return storedList ? JSON.parse(storedList) : null;
}

function verifierSiNomDansListe(nom, prenom) {
    const liste = getListeConfidentielle();
    
    if (!nom || !prenom || !liste) {
         return false;
    }
    
    // Normalisation du nom pour la recherche
    const searchName = `${nom.trim().toUpperCase()} ${prenom.trim().toUpperCase()}`;

    const isFound = liste.includes(searchName);

    return isFound;
}

// --- NOUVELLE LOGIQUE POUR LISTE BADGES ---

/**
 * Récupère la liste des badges depuis le localStorage.
 * @returns {object[] | null} Un tableau d'objets {nom, prenom, societe}, ou null.
 */
function getListeBadges() {
    const storedList = localStorage.getItem('listeBadges');
    return storedList ? JSON.parse(storedList) : null;
}

/**
 * Calcule la distance de Levenshtein entre deux chaînes.
 * Source : https://github.com/gustf/js-levenshtein
 */
function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    let tmp, i, j, prev, val;
    if (a.length > b.length) { tmp = a; a = b; b = tmp; }

    let row = Array(a.length + 1);
    for (i = 0; i <= a.length; i++) { row[i] = i; }

    for (i = 1; i <= b.length; i++) {
        prev = i;
        for (j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                val = row[j - 1];
            } else {
                val = Math.min(row[j - 1] + 1, Math.min(prev + 1, row[j] + 1));
            }
            row[j - 1] = prev;
            prev = val;
        }
        row[a.length] = prev;
    }
    return row[a.length];
}

/**
 * Recherche un nom dans la liste des badges avec une tolérance aux erreurs.
 * @param {string} queryNom Le nom saisi par l'opérateur.
 * @param {string} queryPrenom Le prénom saisi par l'opérateur.
 * @returns {object | null} Le meilleur objet correspondant {nom, prenom, societe, score} ou null.
 */
function rechercherBadge(queryNom, queryPrenom) {
    const liste = getListeBadges();
    if (!liste || !queryNom || !queryPrenom) return null;

    const qNom = queryNom.trim().toUpperCase();
    const qPrenom = queryPrenom.trim().toUpperCase();
    let bestMatch = null;
    let highestScore = 0;

    liste.forEach(personne => {
        const refNom = personne.nom.toUpperCase();
        const refPrenom = personne.prenom.toUpperCase();

        // Calcul des scores de similarité (1 = parfait, 0 = différent)
        const scoreNom = 1 - levenshtein(qNom, refNom) / Math.max(qNom.length, refNom.length);
        const scorePrenom = 1 - levenshtein(qPrenom, refPrenom) / Math.max(qPrenom.length, refPrenom.length);
        
        // Score combiné avec un poids plus important pour le nom de famille
        const combinedScore = (scoreNom * 0.65) + (scorePrenom * 0.35);

        if (combinedScore > highestScore) {
            highestScore = combinedScore;
            bestMatch = personne;
        }
    });

    // Seuil de tolérance : on ne retourne un résultat que s'il est suffisamment proche
    if (highestScore > 0.75) { 
        bestMatch.score = highestScore;
        return bestMatch;
    }

    return null;
}