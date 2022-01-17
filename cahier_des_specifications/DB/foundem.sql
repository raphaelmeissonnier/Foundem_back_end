DROP DATABASE foundem2; 
CREATE DATABASE foundem2; 
USE foundem2; 

CREATE TABLE Categorie
(
	id_categorie INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    intitule VARCHAR(50) NOT NULL, 
    valeur INTEGER NOT NULL
); 

CREATE TABLE Localisation
(
	id_localisation INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    longitude REAL NOT NULL, 
    latitude REAL NOT NULL, 
    rayon INTEGER
); 

CREATE TABLE Recompense
(
	id_recompense INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    valeur INTEGER NOT NULL, 
    intitule VARCHAR(25) NOT NULL
); 

CREATE TABLE Utilisateur 
(
	id_utilisateur INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(25), 
    prenom VARCHAR(25), 
    username VARCHAR(25) NOT NULL, 
    email VARCHAR(50) NOT NULL, 
    mdp VARCHAR(25) NOT NULL, 
    solde INTEGER NOT NULL 
);

CREATE TABLE ListeRecompenses 
(
	id_utilisateur INTEGER NOT NULL, 
    id_recompense INTEGER NOT NULL, 
    CONSTRAINT FK_utilisateur FOREIGN KEY (id_utilisateur)
    REFERENCES Utilisateur(id_utilisateur),
    CONSTRAINT FK_recompense FOREIGN KEY (id_recompense)
    REFERENCES Recompense(id_recompense)
); 

CREATE TABLE Objet
(
	id_objet INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    status_objet ENUM("trouvé", "perdu") NOT NULL, 
	intitule VARCHAR(25) NOT NULL,
    description TEXT, 
    dates DATE NOT NULL, 
    categorie INTEGER NOT NULL,
    localisation INTEGER NOT NULL,
    utilisateur INTEGER NOT NULL, 
    CONSTRAINT FK_categorie FOREIGN KEY (categorie)
    REFERENCES Categorie(id_categorie),
    CONSTRAINT FK_localisation FOREIGN KEY (localisation)
    REFERENCES Localisation(id_localisation),
    CONSTRAINT FK_utilisateur2 FOREIGN KEY (utilisateur)
    REFERENCES Utilisateur(id_utilisateur)
); 

CREATE TABLE Historique
(
	id_historique INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    date_transaction DATE NOT NULL, 
    id_objet_trouve INTEGER NOT NULL,
    id_utilisateur_trouveur INTEGER NOT NULL, 
    CONSTRAINT FK_objet FOREIGN KEY (id_objet_trouve)
    REFERENCES Objet(id_objet),
    CONSTRAINT FK_utilisateur3 FOREIGN KEY (id_utilisateur_trouveur)
    REFERENCES Utilisateur(id_utilisateur)
); 

CREATE TABLE ObjetMatche
(
	id_objet_matche INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    objet_trouve INTEGER NOT NULL, 
    objet_perdu INTEGER NOT NULL, 
    etat ENUM("refuse", "en cours", "valide") NOT NULL, 
    CONSTRAINT FK_objet_trouve FOREIGN KEY (objet_trouve)
    REFERENCES Objet(id_objet),
    CONSTRAINT FK_objet_perdu FOREIGN KEY (objet_perdu)
    REFERENCES Objet(id_objet)
);

CREATE TABLE RendezVous
(
	id_rdv INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    date_rdv DATE NOT NULL, 
    etat ENUM("refuse", "en cours", "valide") NOT NULL, 
    localisation INTEGER NOT NULL, 
    first_user INTEGER NOT NULL, 
    second_user INTEGER NOT NULL, 
    CONSTRAINT FK_localisation2 FOREIGN KEY (localisation)
    REFERENCES Localisation(id_localisation),
    CONSTRAINT FK_first_user FOREIGN KEY (first_user)
    REFERENCES Utilisateur(id_utilisateur),
    CONSTRAINT FK_second_user FOREIGN KEY (second_user)
    REFERENCES Utilisateur(id_utilisateur)
);