const readline = require('readline');
const { Client } = require('pg');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new Client({
  user: 'toto',
  host: 'localhost',
  database: 'test',
  password: '1234',
  port: 5432, 
});


function afficherMenu() {
  console.log('\n\nMenu :\n');
  console.log('1. Ajouter un étudiant');
  console.log('2. Afficher tous les étudiants');
  console.log('3. Mettre à jour un étudiant');
  console.log('4. Supprimer un étudiant');
  console.log('5. Rechercher un étudiant');
  console.log('6. Quitter\n');
}


async function ajouterEtudiant() {
  rl.question('Entrez le nom de l\'étudiant : ', async (nom) => {
    rl.question('Entrez le prénom de l\'étudiant : ', async (prenom) => {
      rl.question('Entrez l\'âge de l\'étudiant : ', async (age) => {
        try {
          const res = await client.query("INSERT INTO etudiant (nom, prenom, age) VALUES ($1, $2, $3)", [nom, prenom, age]);
          console.log('Étudiant ajouté avec succès');
        } catch (err) {
          console.error('Erreur lors de l\'ajout de l\'étudiant', err);
        } finally {
          menuPrincipal();
          }
      });
    });
  });
}

// Fonction pour afficher tous les étudiants
async function afficherEtudiants() {
  try {
    const res = await client.query("SELECT * FROM etudiant");
    console.log('Liste des étudiants :', res.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des étudiants', err);
  } finally {
    menuPrincipal();
  }
}

async function rechercheEtudiant() {
  rl.question('Entrer l\'id de l\'etudiant rechercher: ',async (id) =>{
    try {
      const res = await client.query("SELECT * FROM etudiant WHERE id = $1", [id]);
      console.log('Etudiant recherché :', res.rows);
      // rl.close();
    } catch (err) {
      console.error('Erreur lors de la récupération des étudiants', err);
    } finally {
      menuPrincipal();
    }
  })
}


// Fonction pour mettre à jour un étudiant
async function mettreAJourEtudiant() {
  rl.question('Entrez l\'ID de l\'étudiant à mettre à jour : ', async (id) => {
    rl.question('Entrez le nouveau nom de l\'étudiant : ', async (nom) => {
      rl.question('Entrez le nouveau prénom de l\'étudiant : ', async (prenom) => {
        rl.question('Entrez le nouvel âge de l\'étudiant : ', async (age) => {
          try {
            const res = await client.query("UPDATE etudiant SET nom = $2, prenom = $3, age = $4 WHERE id = $1", [id, nom, prenom, age]);
            console.log('Étudiant mis à jour avec succès');
          } catch (err) {
            console.error('Erreur lors de la mise à jour de l\'étudiant', err);
          } finally {
            // rl.close();
            menuPrincipal();
          }
        });
      });
    });
  });
}

// Fonction pour supprimer un étudiant
async function supprimerEtudiant() {
  rl.question('Entrez l\'ID de l\'étudiant à supprimer : ', async (id) => {
    try {
      const res = await client.query("DELETE FROM etudiant WHERE id = $1", [id]);
      console.log('Étudiant supprimé avec succès');
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'étudiant', err);
    } finally {
      // rl.close();
      menuPrincipal();
    }
  });
}

// Fonction pour gérer le menu principal
function menuPrincipal() {
  afficherMenu();
  rl.question('Que souhaitez-vous faire : ', (choix) => {
    switch (choix) {
      case '1':
        ajouterEtudiant();
        break;
      case '2':
        afficherEtudiants();
        break;
      case '3':
        mettreAJourEtudiant();
        break;
      case '4':
        supprimerEtudiant();
        break;
      case '5':
        rechercheEtudiant();
        break;
      case '6':
        client.end();
        console.log('Programme terminé.');
        process.exit();
        break;
      default:
        console.log('Choix invalide. Veuillez saisir un nombre entre 1 et 5.');
        menuPrincipal();
        break;
    }
  });
}

// Démarrer le programme
client.connect()
  .then(() => {
    console.log('Connecté à la base de données');
    menuPrincipal();
  })
  .catch(err => console.error('Erreur de connexion', err));
