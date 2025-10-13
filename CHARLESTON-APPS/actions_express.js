// AVERTISSEMENT : Je dois inclure l'avertissement dans tous les codes de cette application.
/*
================================================================================
  ACTIONS EXPRESS (JS)
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
    démonstration et n'incorpore aucune garantie de maintenance ou de support 
    pour d'éventuelles évolutions.
================================================================================
*/


/**
 * Affiche une notification furtive pour indiquer le succès ou l'échec de l'opération.
 * @param {string} message - Le message à afficher.
 * @param {string} type - 'success' (vert) ou 'error' (rouge).
 */
function showNotification(message, type = 'success') {
    const popup = document.getElementById('notification-popup');
    if (!popup) return;

    // Mise à jour du message et de la couleur
    if (type === 'success') {
        popup.style.backgroundColor = 'var(--green)';
    } else {
        popup.style.backgroundColor = 'var(--red)';
    }
    
    popup.textContent = message;

    // Affichage
    popup.classList.add('show');

    // Disparition après 2 secondes (2000 ms)
    setTimeout(() => {
        popup.classList.remove('show');
    }, 2000);
}


/**
 * Génère la ligne de données pour Bagage Express et la copie dans le presse-papiers.
 * Déclenchée par l'événement onclick sur la tuile.
 */
async function copyBagageExpress() {
    // --- 1. Préparation des données avec le format JJ/MM/AAAA et HH:MM ---
    const now = new Date();
    
    // Champ 1 : Date au format JJ/MM/AAAA
    const dateString = now.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    });
    
    // Champ 2 : Heure au format HH:MM
    const timeString = now.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    });

    // MODIFICATION CLÉ : Utilisation du caractère de TABULATION ('\t') comme séparateur pour Excel.
    // Format souhaité: JJ/MM/AAAA\tHH:MM\t1\tVCA\t\tVCA\tDépot de bagage
    const excelLine = `${dateString}\t${timeString}\t1\tVCA\t\tVCA\tDépot de bagage`;


    // --- 2. Copie dans le presse-papiers ---
    try {
        await navigator.clipboard.writeText(excelLine);
        
        // Succès : affichage de l'indication furtive verte demandée
        showNotification('Bagage Express : Ligne copiée ! ✅', 'success');

    } catch (err) {
        // Échec (ex: permission non accordée)
        console.error('Erreur lors de la copie dans le presse-papiers :', err);
        showNotification('Erreur : Copie dans le presse-papiers échouée ❌', 'error');
    }
}