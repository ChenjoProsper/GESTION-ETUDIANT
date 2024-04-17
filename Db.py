import psycopg2

def saisir(test):
    print(test,end="")
    while(1):
        try:
            x = int(input(""))
            return x
        except:
            print("Entrer un entier: ",end=" ")

def connexion(db,name,pwd):
    try:
        connect = psycopg2.connect(database=db,user = name,password=pwd,host="127.0.0.1",port="5432")
        return connect
    except:
        return None
def ajouter(connect,name,prenom,age):
    try:
        cur = connect.cursor()
        sql = "INSERT INTO ETUDIANT(nom,prenom,age) values('{}','{}',{});".format(name,prenom,age)
        cur.execute(sql)
        connect.commit()
        print(cur.rowcount," nouvel etudiant ajouter")
    except:
        print("Nous avons rencontrer une erreur")

def search_nom(connect,nom):
    try:
        cur = connect.cursor()
        sql = "SELECT * FROM ETUDIANT WHERE nom = '{}'".format(nom)
        cur.execute(sql)
        rows = cur.fetchall()
        for row in rows:
            print("--------------------")
            print("ID: ",row[0])
            print("NOM: ",row[1])
            print("PRENOM: ",row[2])
            print("AGE: ",row[3])
            print("--------------------")
        print(cur.rowcount," Etudiant(s) trouver")
    except:
        print("Nous avons rencontrer une erreur")

def search(connect,id):
    try:
        cur = connect.cursor()
        sql = "SELECT * FROM ETUDIANT WHERE id = '{}'".format(id)
        cur.execute(sql)
        rows = cur.fetchall()
        if cur.rowcount > 0:
            for row in rows:
                print("--------------------")
                print("ID: ",row[0])
                print("NOM: ",row[1])
                print("PRENOM: ",row[2])
                print("AGE: ",row[3])
                print("--------------------")
            return 1
        else:
            print(cur.rowcount," Etudiant(s) trouver")
            return 0
    except:
        print("Nous avons rencontrer une erreur")

def update(connect,id):
    try:
        if(search(connect,id) ==1 ):
            print("_________________________")
            while(1):
                print("1: modifier le nom: ")
                print("2: modifier le prenom: ")
                print("3: modifier l'age: ")
                print("0: terminer: \n\n")
                chx = saisir("Que voulez vous modifier: ")
                match chx:
                    case 1:
                        name = input("Le nouveau nom : ")
                        cur = connect.cursor()
                        sql = "update ETUDIANT set nom = '{}' WHERE id = {}".format(name,id)
                        cur.execute(sql)
                        connect.commit()
                        print("nom modifier")
                    case 2:
                        prenom = input("Le nouveau prenom: ")
                        cur = connect.cursor()
                        sql = "update ETUDIANT set prenom = '{}' WHERE id = {}".format(prenom,id)
                        cur.execute(sql)
                        connect.commit()
                        print("prenom modifier")
                    case 3:
                        age = saisir("Le nouvel age: ")
                        cur = connect.cursor()
                        sql = "update ETUDIANT set age = {} WHERE id = {}".format(age,id)
                        cur.execute(sql)
                        connect.commit()
                        print("age modifier")
                    case 0:
                        break
            if cur.rowcount > 0:
                print(cur.rowcount," Etudiant(s) modifier")
        else:
            print("Pas trouver")
    except:
        print("Nous avons rencontrer une erreur")

def supprimer(connect,id):
    try:
        cur = connect.cursor()
        sql = "DELETE FROM ETUDIANT WHERE id = '{}'".format(id)
        cur.execute(sql)
        connect.commit()
        if cur.rowcount > 0:
            print(cur.rowcount," Etudiant(s) supprimer")
        else:
            print("Pas trouver")
    except:
        print("Nous avons rencontrer une erreur")

def Afficher(connect):
    try:
        cur = connect.cursor()
        sql = "SELECT * FROM ETUDIANT"
        cur.execute(sql)
        rows = cur.fetchall()
        for row in rows:
            print("--------------------")
            print("ID: ",row[0])
            print("NOM: ",row[1])
            print("PRENOM: ",row[2])
            print("AGE: ",row[3])
            print("--------------------")
        print(cur.rowcount," Etudiant(s) au totals")
    except:
        print("Nous avons rencontrer une erreur")