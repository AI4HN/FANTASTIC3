/**
 * Analyse une chaîne de texte depuis Teams pour en extraire le nom et le prénom.
 * @param {string} rawText Le texte complet copié depuis Teams (ex: "NOM Prénom (XXX-YY)").
 * @returns {object|null} Un objet {nom, prenom} si l'analyse réussit, sinon null.
 */
function parseTeamsName(rawText) {
    if (!rawText) return null;

    const cleanedText = rawText.replace(/\s*\(.*\)\s*$/, '').trim();
    const words = cleanedText.split(/\s+/);
    
    let splitIndex = -1;

    for (let i = 0; i < words.length; i++) {
        if (words[i] === words[i].toUpperCase() && isNaN(words[i])) {
            splitIndex = i;
        }
    }
    
    if (splitIndex !== -1 && splitIndex < words.length - 1) {
        const nom = words.slice(0, splitIndex + 1).join(' ');
        const prenom = words.slice(splitIndex + 1).join(' ');
        return { nom, prenom };
    }
    
    return null;
}

/**
 * Ouvre la page d'avertissement dans une nouvelle fenêtre popup.
 * @param {string} [pathPrefix='.'] Le préfixe de chemin pour trouver le fichier avertissement.html.
 */
function afficherAvertissement(pathPrefix = '.') {
    const url = `${pathPrefix}/avertissement.html`;
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