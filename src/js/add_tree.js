document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche la soumission par défaut du formulaire

        // Récupère les données du formulaire
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Envoie les données via une requête POST
        sendHttpRequest('POST', '../php/ajout_arbre.php/arbre', data, function(error, response) { //#TODO ALBAAAAAAAAAAAAAAAAAAAAAN, LANAAAAAAAAAAAAAAAAAAAAAAA
            if (error) {
                console.error('Erreur:', error);
            } else {
                console.log('Succès:', response);
                // Redirection ou mise à jour de l'interface utilisateur après succès
            }
        });
    });
});