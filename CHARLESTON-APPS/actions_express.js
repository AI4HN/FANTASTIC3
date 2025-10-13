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
 * Déclenchée par l'événement onclick sur la tuile Bagage.
 */
async function copyBagageExpress() {
    // --- Préparation des données avec le format JJ/MM/AAAA et HH:MM ---
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

    // Ligne Excel formatée : JJ/MM/AAAA\tHH:MM\t1\tVCA\t\tVCA\tDépot de bagage
    const excelLine = `${dateString}\t${timeString}\t1\tVCA\t\tVCA\tDépot de bagage`;


    // --- Copie dans le presse-papiers ---
    try {
        await navigator.clipboard.writeText(excelLine);
        showNotification('Bagage Express : Ligne copiée ! ✅', 'success');

    } catch (err) {
        console.error('Erreur lors de la copie dans le presse-papiers :', err);
        showNotification('Erreur : Copie dans le presse-papiers échouée ❌', 'error');
    }
}


/**
 * Génère la ligne de données pour Bouquet Accueil et la copie dans le presse-papiers.
 * Déclenchée par l'événement onclick sur la tuile Bouquet Accueil.
 */
async function copyBouquetAccueil() {
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
    
    // Ligne Excel formatée : JJ/MM/AAAA\tHH:MM\t0\tLivreur\t\tFLEURISTE\tAccueil Bouquet\tAccueil
    const excelLine = `${dateString}\t${timeString}\t0\tLivreur\t\tFLEURISTE\tAccueil Bouquet\tAccueil`;
    
    // --- 2. Copie dans le presse-papiers ---
    try {
        await navigator.clipboard.writeText(excelLine);
        showNotification('Bouquet Accueil : Ligne copiée ! 🌸', 'success');

    } catch (err) {
        console.error('Erreur lors de la copie dans le presse-papiers :', err);
        showNotification('Erreur : Copie dans le presse-papiers échouée ❌', 'error');
    }
}


/**
 * Génère la ligne de données pour Linge Accueil et la copie dans le presse-papiers.
 * Déclenchée par l'événement onclick sur la tuile Linge Accueil.
 */
async function copyLingeAccueil() {
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
    
    // Ligne Excel formatée : JJ/MM/AAAA\tHH:MM\t0\tLivreur\t\tLAUNDRYHEAP\tLinge ACCUEIL\tAccueil
    const excelLine = `${dateString}\t${timeString}\t0\tLivreur\t\tLAUNDRYHEAP\tLinge ACCUEIL\tAccueil`;
    
    // --- 2. Copie dans le presse-papiers ---
    try {
        await navigator.clipboard.writeText(excelLine);
        showNotification('Linge Accueil : Ligne copiée ! 👕', 'success');

    } catch (err) {
        console.error('Erreur lors de la copie dans le presse-papiers :', err);
        showNotification('Erreur : Copie dans le presse-papiers échouée ❌', 'error');
    }
}


/**
 * Génère la ligne de données pour Linge FabLab et la copie dans le presse-papiers.
 */
async function copyLingeFablab() {
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
    
    // Ligne Excel formatée : JJ/MM/AAAA\tHH:MM\t0\tLivreur\t\tKALHYGE\tLinge FABLAB\tPCS
    const excelLine = `${dateString}\t${timeString}\t0\tLivreur\t\tKALHYGE\tLinge FABLAB\tPCS`;
    
    // --- 2. Copie dans le presse-papiers ---
    try {
        await navigator.clipboard.writeText(excelLine);
        showNotification('Linge FabLab : Ligne copiée ! 🔬', 'success'); 

    } catch (err) {
        console.error('Erreur lors de la copie dans le presse-papiers :', err);
        showNotification('Erreur : Copie dans le presse-papiers échouée ❌', 'error');
    }
}

// ---------------------------------------------------------------------------------
// FONCTION ACTIVÉE : MACHINE À CAFÉ (8 CHAMPS)
// ---------------------------------------------------------------------------------

/**
 * Génère la ligne de données pour Machine à café et la copie dans le presse-papiers.
 * Déclenchée par l'événement onclick sur la tuile Machine Café.
 */
async function copyMachineCafe() {
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
    
    // Ligne Excel formatée : JJ/MM/AAAA\tHH:MM\t0\tAgent\t\tMENDS\tMachines à café\tPCS
    const excelLine = `${dateString}\t${timeString}\t0\tAgent\t\tMENDS\tMachines à café\tPCS`;
    
    // --- 2. Copie dans le presse-papiers ---
    try {
        await navigator.clipboard.writeText(excelLine);
        showNotification('Machine à café : Ligne copiée ! ☕', 'success');

    } catch (err) {
        console.error('Erreur lors de la copie dans le presse-papiers :', err);
        showNotification('Erreur : Copie dans le presse-papiers échouée ❌', 'error');
    }
}

// ---------------------------------------------------------------------------------
// FONCTION ACTIVÉE : MACHINE DISTRIBUTEUR (6e icône)
// ---------------------------------------------------------------------------------

/**
 * Génère la ligne de données pour Machine Distributeur et la copie dans le presse-papiers.
 * Déclenchée par l'événement onclick sur la tuile Machine Distributeur.
 */
async function copyMachineDistributeur() {
    // --- 1. Préparation des données avec le format JJ/MM/AAAA et HH:MM ---
    const now = new Date();
    
    const dateString = now.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    });
    
    const timeString = now.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    });
    
    // Ligne Excel formatée : JJ/MM/AAAA\tHH:MM\t0\tAgent\t\tMENDS\tMachines Distributeurs\tPCS
    const excelLine = `${dateString}\t${timeString}\t0\tAgent\t\tMENDS\tMachines Distributeurs\tPCS`;
    
    // --- 2. Copie dans le presse-papiers ---
    try {
        await navigator.clipboard.writeText(excelLine);
        showNotification('Distributeur : Ligne copiée ! 🍬', 'success');

    } catch (err) {
        console.error('Erreur lors de la copie dans le presse-papiers :', err);
        showNotification('Erreur : Copie dans le presse-papiers échouée ❌', 'error');
    }
}

// ---------------------------------------------------------------------------------
// NOUVELLE FONCTION : TRAITEUR (7e icône)
// ---------------------------------------------------------------------------------

/**
 * Génère la ligne de données pour Traiteur et la copie dans le presse-papiers.
 * Déclenchée par l'événement onclick sur la tuile Traiteur.
 */
async function copyTraiteur() {
    // --- 1. Préparation des données avec le format JJ/MM/AAAA et HH:MM ---
    const now = new Date();
    
    const dateString = now.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    });
    
    const timeString = now.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    });
    
    // Ligne Excel formatée avec les nouvelles valeurs :
    // JJ/MM/AAAA\tHH:MM\t0\tLIVREUR\t\tTRAITEUR\tPetit Dej - Repas ...\tPhilippe
    const excelLine = `${dateString}\t${timeString}\t0\tLIVREUR\t\tTRAITEUR\tPetit Dej - Repas ...\tPhilippe`;
    
    // --- 2. Copie dans le presse-papiers ---
    try {
        await navigator.clipboard.writeText(excelLine);
        showNotification('Traiteur : Ligne copiée ! 🍲', 'success');

    } catch (err) {
        console.error('Erreur lors de la copie dans le presse-papiers :', err);
        showNotification('Erreur : Copie dans le presse-papiers échouée ❌', 'error');
    }
}
