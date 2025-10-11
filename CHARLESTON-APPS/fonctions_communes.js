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

/**
 * Retourne la date du jour au format "jj/mm/aaaa".
 * @returns {string} La date formatée.
 */
function getDateDuJourFormatee() {
    const today = new Date();
    // Utilise toLocaleDateString pour obtenir le format local français (ex: 11/10/2025)
    return today.toLocaleDateString('fr-FR');
}

function ajouterBoutonMenu() {
    const menuButton = document.createElement('a');
    menuButton.href = '../MENU.html';
    menuButton.className = 'menu-flottant';
    menuButton.textContent = 'MENU';
    menuButton.title = "Retour au menu d'accueil";
    document.body.appendChild(menuButton);
}

// ------------------------------------------------------------
// --- LOGIQUE LISTE CONFIDENTIELLE "PIERRES" ---
// ------------------------------------------------------------

function getListeConfidentielle() {
    const storedList = localStorage.getItem('listeConfidentielle');
    return storedList ? JSON.parse(storedList) : null;
}

function verifierSiNomDansListe(nom, prenom) {
    const liste = getListeConfidentielle();
    
    if (!nom || !prenom || !liste) {
         return false;
    }
    
    // Normalisation du nom pour la recherche : NOM PRENOM en MAJUSCULES
    const searchName = `${nom.trim().toUpperCase()} ${prenom.trim().toUpperCase()}`;

    const isFound = liste.includes(searchName);

    return isFound;
}

// ------------------------------------------------------------
// --- LOGIQUE POUR LISTE BADGES (Recherche Avancée) ---
// ------------------------------------------------------------

/**
 * Récupère la liste des badges stockée dans le localStorage.
 * @returns {Array} La liste des badges (objets {nom, prenom, societe}) ou un tableau vide.
 */
function getListeBadges() {
    const listJson = localStorage.getItem('listeBadges');
    try {
        return listJson ? JSON.parse(listJson) : [];
    } catch (e) {
        return [];
    }
}

/**
 * Calcule la distance de Levenshtein entre deux chaînes.
 */
function levenshtein(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0) {
                costs[j] = j;
            } else if (j > 0) {
                let newValue = costs[j - 1];
                if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                    newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                }
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        if (i > 0) {
            costs[s2.length] = lastValue;
        }
    }
    return costs[s2.length];
}

/**
 * Recherche avancée dans la liste des badges avec une tolérance aux erreurs (Levenshtein).
 * @param {string} queryNom Le nom saisi par l'opérateur.
 * @param {string} queryPrenom Le prénom saisi par l'opérateur.
 * @returns {object | null} Le meilleur objet correspondant {nom, prenom, societe, score} ou null.
 */
function rechercherBadge(queryNom, queryPrenom) {
    // MODIFICATION DU SEUIL : Réduit de 0.80 à 0.75 pour une tolérance maximale sur liste courte.
    const SEUIL_MINIMAL = 0.75; 
    
    const liste = getListeBadges();
    if (liste.length === 0 || !queryNom) return null;

    const qNom = queryNom.trim().toUpperCase();
    const qPrenom = queryPrenom.trim().toUpperCase();
    
    if (qNom === '') return null;
    
    let bestMatch = null;
    let highestScore = 0;

    liste.forEach(personne => {
        // La liste est déjà stockée en majuscules
        const refNom = personne.nom; 
        const refPrenom = personne.prenom;

        // Calcul des scores de similarité (1 = parfait, 0 = différent)
        const scoreNom = 1 - (levenshtein(qNom, refNom) / Math.max(qNom.length, refNom.length));
        const scorePrenom = 1 - (levenshtein(qPrenom, refPrenom) / Math.max(qPrenom.length, refPrenom.length));
        
        // Score combiné avec un poids plus important pour le nom de famille (65%)
        const combinedScore = (scoreNom * 0.65) + (scorePrenom * 0.35);

        if (combinedScore > highestScore) {
            highestScore = combinedScore;
            bestMatch = personne;
        }
    });

    // Seuil de tolérance : on ne retourne un résultat que s'il est au-dessus du seuil défini
    if (highestScore >= SEUIL_MINIMAL) {
        return {
            nom: bestMatch.nom,
            prenom: bestMatch.prenom,
            societe: bestMatch.societe,
            score: highestScore
        };
    }

    return null;
}