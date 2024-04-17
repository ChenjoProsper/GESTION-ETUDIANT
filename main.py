from Db import *
import os

while(1):
    os.system("clear")
    connect = None
    print("\t\t\t***************CONNECION***************\n\n\n")
    print("1:Se connecter")
    print("2:Quitter\n\n")
    choix = saisir("Choix: ")
    match choix:
        case 1:
            print("\t\tVeiller remplir ces informations pour vous connecter a votre base de donnee\n\n")
            db = input("Entrer le nom de la base de donnee: ")
            nom = input("Entrer le nom de l'utilisateur de la base de donnee: ")
            pwd = input("Entrer le mot de passe: ")
            connect = connexion(db,nom,pwd)
            if connect != None:
                os.system("clear")
                while(True):
                    print("************Menu Principale************")
                    print("1: Ajouter")
                    print("2: Search")
                    print("3: Update")
                    print("4: Supprimer")
                    print("5: Afficher")
                    print("6: Se deconnecter")
                    chx = saisir("Option: ")
                    match chx:
                        case 1:
                            os.system("clear")
                            name = input("Nom: ")
                            prenom = input("Prenom: ")
                            age = saisir("Age: ")
                            ajouter(connect,name,prenom,age)
                        case 2:
                            os.system("clear")
                            print("1: Rechercher par id")
                            print("2: Rechercher par le nom")
                            print("0: Retour\n\n")
                            Op = saisir("Choix: ")
                            match Op:
                                case 1:
                                    id = saisir("Id de la personne rechercher: ")
                                    search(connect,id)
                                case 2:
                                    name = input("Nom de la personne rechercher: ")
                                    search_nom(connect,name)
                        case 3:
                            os.system("clear")
                            id = saisir("Id de la personne rechercher: ")
                            update(connect,id)
                        case 4:
                            os.system("clear")
                            id = saisir("Id de la personne rechercher: ")
                            supprimer(connect,id)
                        case 5:
                            os.system("clear")
                            Afficher(connect)
                        case 6:
                            break
                connect.close()
            else:
                print("Erreur de connexion")
        case 2:
            print("Aurevoir")
            break