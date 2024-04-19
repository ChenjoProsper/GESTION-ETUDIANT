const readline = require('readline')
const {Client} = require('pg')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function afficheConnexion(){
    console.log("\n\n*******************Connexion*********************\n")
    console.log("1: Se connecter")
    console.log("2: Quitter")
}
function afficheMenu(){
    console.log("\n\n*******************Menu Principale*********************\n")
    console.log("1:Ajouter un etudiant")
    console.log("2:Modifier un etudiant")
    console.log("3:Supprimer un etudiant")
    console.log("4:Recherche un etudiant")
    console.log("5:Afficher les etudiants")
    console.log("6:Se deconnecter\n")
}
function connexion(){
    rl.question("Nom de la base de donnee: ",(bd_name)=>{
        rl.question("Nom de l'utilisateur: ",(user)=>{
            rl.question("Password: ",(password)=>{
                try{
                    const client = new Client({
                        user: user,
                        database: bd_name,
                        host:'localhost',
                        port: '5432',
                        password: password,
                    });
                    client.connect()
                    console.log('Connecté à la base de données');
                    menuPrincipal(client)
                }catch{
                    console.log("Erreur de connexion");
                    menuConnexion();
                }
            })
        })
    })
}
async function ajouter(client){
    rl.question('Nom: ', async (nom) => {
        rl.question('Prenom: ', async (prenom) => {
            rl.question('Age: ', async (age) => {
                try{
                    const res = await client.query("INSERT INTO etudiant (nom, prenom, age) VALUES($1, $2, $3)" , [nom,prenom,age]);
                    console.log("Ajouter");
                }catch(err){
                    console.log("Nous avons rencontrer une erreur",err);
                }finally{
                    menuPrincipal(client);
                }
            });
        });
    });
}
async function modifier(client){
    rl.question("Id de l'etudiant cible: ", async (id) =>{
        rl.question("Nouveau nom: ",async (nom)=>{
            try{
                const res = await client.query("UPDATE etudiant SET nom = $1 where id = $2 ",[nom,id])
                console.log("modification effectuer")
            }catch(err){
                console.log("Nous avons rencontrer un probleme ",err)
            }finally{
                menuPrincipal(client)
            }
        })
    })
}
async function supprimer(client){
    rl.question("Id de l'etudiant cible: ", async (id)=>{
        try{
            const res = await client.query("DELETE FROM etudiant WHERE id = $1",[id])
            console.log("suppression effectuer")
        }catch(err){
            console.log("Nous avons rencontrer un probleme ",err)
        }finally{
            menuPrincipal(client)
        }
    })
}
async function recherche(client){
    rl.question("Id de l'etudiant cible: ", async (id)=>{
        try{
            const res = await client.query("SELECT * FROM etudiant WHERE id = $1",[id])
            console.log("Etudiant rechercher: ",res.rows)
        }catch(err){
            console.log("Nous avons rencontrer un probleme ",err)
        }finally{
            menuPrincipal(client)
        }
    })
}
async function afficher(client){
    try {
        const res = await client.query("SELECT * FROM etudiant");
        console.log('Liste des étudiants :', res.rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des étudiants', err);
    } finally {
        menuPrincipal(client);
    }
}
function menuPrincipal(client){
    afficheMenu()
    rl.question("Choix: ",(Option)=>{
        switch(Option){
            case '1':
                ajouter(client);
                break;
            case '2':
                modifier(client);
                break;
            case '3':
                supprimer(client);
                break;
            case '4':
                recherche(client);
                break;
            case '5':
                afficher(client)
                break
            case '6':
                console.log("Deconnection")
                client.end()
                menuConnexion()
            }
        })
}
function menuConnexion(){
    afficheConnexion()
    rl.question("Option: ",(option)=>{
    switch(option){
        case '1':
            console.log("\n\nVeiller remplir ces informatoins afin de vous connecter\n")
            connexion()
            break;
        case '2':
            console.log("Au revoir")
            process.exit()
        default:
            console.log("Erruer de choix")
            menuConnexion()
        }
    })
}
menuConnexion()
