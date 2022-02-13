-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 13, 2022 at 09:44 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foundem2`
--
DROP DATABASE IF EXISTS foundem2; 
CREATE DATABASE foundem2; 
USE foundem2; 
-- --------------------------------------------------------

--
-- Table structure for table `categorie`
--

CREATE TABLE `categorie` (
  `id_categorie` int(11) NOT NULL,
  `intitule_categorie` varchar(50) NOT NULL,
  `valeur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `intitule_categorie`, `valeur`) VALUES
(1, 'VETEMENTS', 5),
(2, 'PAPIERS', 15),
(3, 'ELECTONIQUE', 30),
(4, 'EFFETS PERSONNELS', 20);

-- --------------------------------------------------------

--
-- Table structure for table `historique`
--

CREATE TABLE `historique` (
  `id_historique` int(11) NOT NULL,
  `id_utilisateur_trouveur` int(11) NOT NULL,
  `liste_recompense` int(11) DEFAULT NULL,
  `rdv` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `historique`
--

INSERT INTO `historique` (`id_historique`, `id_utilisateur_trouveur`, `liste_recompense`, `rdv`) VALUES
(1, 2, NULL, 1),
(2, 1, 4, NULL),
(3, 1, 11, NULL),
(4, 1, 12, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `listerecompenses`
--

CREATE TABLE `listerecompenses` (
  `id` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `id_recompense` int(11) NOT NULL,
  `date_recompense` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `listerecompenses`
--

INSERT INTO `listerecompenses` (`id`, `id_utilisateur`, `id_recompense`, `date_recompense`) VALUES
(1, 1, 1, '2022-01-23'),
(2, 1, 1, '2022-01-23'),
(3, 1, 1, '2022-01-23'),
(4, 1, 1, '2022-01-23'),
(5, 1, 1, '2022-01-23'),
(6, 1, 1, '2022-01-23'),
(7, 1, 1, '2022-01-23'),
(8, 1, 1, '2022-01-23'),
(9, 1, 1, '2022-01-23'),
(10, 1, 1, '2022-01-23'),
(11, 1, 1, '2022-01-23'),
(12, 1, 1, '2022-02-10');

-- --------------------------------------------------------

--
-- Table structure for table `localisation`
--

CREATE TABLE `localisation` (
  `id_localisation` int(11) NOT NULL,
  `longitude` double NOT NULL,
  `latitude` double NOT NULL,
  `rayon` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `localisation`
--

INSERT INTO `localisation` (`id_localisation`, `longitude`, `latitude`, `rayon`) VALUES
(1, 2.1100964, 48.8708216, 5),
(2, 2.19, 48.89, 10),
(3, 2.24, 48.82, 5),
(4, 2.42, 48.68, 5),
(5, 2.44, 48.86, NULL),
(6, 2.3, 48.79, 10),
(14, 2.15, 49.6565, 5),
(15, 2.18786, 48.699009, NULL),
(16, 2.12, 48.81, NULL),
(17, 2.09056, 48.89639, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `objet`
--

CREATE TABLE `objet` (
  `id_objet` int(11) NOT NULL,
  `status_objet` enum('trouvé','perdu') NOT NULL,
  `intitule` varchar(25) NOT NULL,
  `description` text,
  `dates` date NOT NULL,
  `categorie` int(11) NOT NULL,
  `localisation` int(11) NOT NULL,
  `utilisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `objet`
--

INSERT INTO `objet` (`id_objet`, `status_objet`, `intitule`, `description`, `dates`, `categorie`, `localisation`, `utilisateur`) VALUES
(1, 'perdu', 'casquette noir', 'casquette noir de la marque adidas', '2022-01-05', 1, 2, 1),
(2, 'perdu', 'Iphone', 'Iphone SE 2020 perdu dans le 93', '2022-01-12', 3, 4, 2),
(3, 'perdu', 'Carte Navigo', 'Carte Navigo perdu ', '2021-12-30', 2, 1, 2),
(4, 'perdu', 'Boucles d\'oreilles', 'Boucles d\'oreilles en or', '2021-12-14', 4, 3, 2),
(5, 'trouvé', 'Iphone', 'Iphone SE 2020', '2022-01-20', 3, 5, 1),
(6, 'perdu', 'velo', 'velo noir VTT', '2022-01-21', 4, 14, 1),
(7, 'trouvé', 'test', NULL, '2022-01-19', 3, 5, 2),
(8, 'perdu', 'test_match', NULL, '2022-01-17', 3, 4, 1),
(9, 'perdu', 'trousse', 'trousse avec plusieurs stylos', '2022-01-18', 4, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `objetmatche`
--

CREATE TABLE `objetmatche` (
  `id_objet_matche` int(11) NOT NULL,
  `objet_trouve` int(11) NOT NULL,
  `objet_perdu` int(11) NOT NULL,
  `etat` enum('refuse','en cours','valide') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `objetmatche`
--

INSERT INTO `objetmatche` (`id_objet_matche`, `objet_trouve`, `objet_perdu`, `etat`) VALUES
(1, 5, 2, 'en cours'),
(2, 7, 8, 'en cours');

-- --------------------------------------------------------

--
-- Table structure for table `recompense`
--

CREATE TABLE `recompense` (
  `id_recompense` int(11) NOT NULL,
  `valeur` int(11) NOT NULL,
  `intitule` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `recompense`
--

INSERT INTO `recompense` (`id_recompense`, `valeur`, `intitule`) VALUES
(1, 100, 'voucher');

-- --------------------------------------------------------

--
-- Table structure for table `rendezvous`
--

CREATE TABLE `rendezvous` (
  `id_rdv` int(11) NOT NULL,
  `date_rdv` date NOT NULL,
  `etat` enum('refuse','en cours','valide') NOT NULL,
  `localisation` int(11) NOT NULL,
  `first_user` int(11) NOT NULL,
  `second_user` int(11) NOT NULL,
  `objet_matche` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rendezvous`
--

INSERT INTO `rendezvous` (`id_rdv`, `date_rdv`, `etat`, `localisation`, `first_user`, `second_user`, `objet_matche`) VALUES
(1, '2022-02-02', 'en cours', 16, 1, 2, 1),
(2, '2022-01-04', 'valide', 17, 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id_utilisateur` int(11) NOT NULL,
  `nom` varchar(25) DEFAULT NULL,
  `prenom` varchar(25) DEFAULT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mdp` varchar(200) NOT NULL,
  `solde` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `nom`, `prenom`, `username`, `email`, `mdp`, `solde`) VALUES
(1, 'TITI', 'Titi', 'titi', 'titi@gmail.com', 'titi', 0),
(2, 'Dupond', 'Sara', 'riz', 'sjdnd@gmail.com', '$2b$10$sHdO2LPIcdymWyfYZBQtdePFXHstyRnhJMSyz5z1Z59ef3Ifz6QLC', 100),
(5, 'Abalil', 'Rizlane', 'Tutu', 'toto@gmail.com', 'rootroot', 0),
(6, 'Toto', 'toto', 'Toto', 'titi@gmail.com', 'rootroot', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id_categorie`);

--
-- Indexes for table `historique`
--
ALTER TABLE `historique`
  ADD PRIMARY KEY (`id_historique`),
  ADD KEY `FK_utilisateur3` (`id_utilisateur_trouveur`) USING BTREE,
  ADD KEY `historique_ibfk_3` (`liste_recompense`) USING BTREE,
  ADD KEY `historique_ibfk_4` (`rdv`) USING BTREE;

--
-- Indexes for table `listerecompenses`
--
ALTER TABLE `listerecompenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_utilisateur` (`id_utilisateur`) USING BTREE,
  ADD KEY `FK_recompense` (`id_recompense`) USING BTREE;

--
-- Indexes for table `localisation`
--
ALTER TABLE `localisation`
  ADD PRIMARY KEY (`id_localisation`);

--
-- Indexes for table `objet`
--
ALTER TABLE `objet`
  ADD PRIMARY KEY (`id_objet`),
  ADD KEY `FK_categorie` (`categorie`) USING BTREE,
  ADD KEY `FK_localisation` (`localisation`) USING BTREE,
  ADD KEY `FK_utilisateur2` (`utilisateur`) USING BTREE;

--
-- Indexes for table `objetmatche`
--
ALTER TABLE `objetmatche`
  ADD PRIMARY KEY (`id_objet_matche`),
  ADD KEY `FK_objet_trouve` (`objet_trouve`) USING BTREE,
  ADD KEY `FK_objet_perdu` (`objet_perdu`) USING BTREE;

--
-- Indexes for table `recompense`
--
ALTER TABLE `recompense`
  ADD PRIMARY KEY (`id_recompense`);

--
-- Indexes for table `rendezvous`
--
ALTER TABLE `rendezvous`
  ADD PRIMARY KEY (`id_rdv`),
  ADD KEY `FK_localisation2` (`localisation`) USING BTREE,
  ADD KEY `FK_first_user` (`first_user`) USING BTREE,
  ADD KEY `FK_second_user` (`second_user`) USING BTREE,
  ADD KEY `rendezvous_ibfk_4` (`objet_matche`) USING BTREE;

--
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id_utilisateur`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `historique`
--
ALTER TABLE `historique`
  MODIFY `id_historique` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `listerecompenses`
--
ALTER TABLE `listerecompenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `localisation`
--
ALTER TABLE `localisation`
  MODIFY `id_localisation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `objet`
--
ALTER TABLE `objet`
  MODIFY `id_objet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `objetmatche`
--
ALTER TABLE `objetmatche`
  MODIFY `id_objet_matche` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `recompense`
--
ALTER TABLE `recompense`
  MODIFY `id_recompense` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rendezvous`
--
ALTER TABLE `rendezvous`
  MODIFY `id_rdv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `historique`
--
ALTER TABLE `historique`
  ADD CONSTRAINT `historique_ibfk_89` FOREIGN KEY (`id_utilisateur_trouveur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historique_ibfk_90` FOREIGN KEY (`liste_recompense`) REFERENCES `listerecompenses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historique_ibfk_91` FOREIGN KEY (`rdv`) REFERENCES `rendezvous` (`id_rdv`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `listerecompenses`
--
ALTER TABLE `listerecompenses`
  ADD CONSTRAINT `listerecompenses_ibfk_59` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listerecompenses_ibfk_60` FOREIGN KEY (`id_recompense`) REFERENCES `recompense` (`id_recompense`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `objet`
--
ALTER TABLE `objet`
  ADD CONSTRAINT `objet_ibfk_88` FOREIGN KEY (`categorie`) REFERENCES `categorie` (`id_categorie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `objet_ibfk_89` FOREIGN KEY (`localisation`) REFERENCES `localisation` (`id_localisation`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `objet_ibfk_90` FOREIGN KEY (`utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `objetmatche`
--
ALTER TABLE `objetmatche`
  ADD CONSTRAINT `objetmatche_ibfk_1` FOREIGN KEY (`objet_trouve`) REFERENCES `objet` (`id_objet`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `objetmatche_ibfk_2` FOREIGN KEY (`objet_perdu`) REFERENCES `objet` (`id_objet`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rendezvous`
--
ALTER TABLE `rendezvous`
  ADD CONSTRAINT `rendezvous_ibfk_117` FOREIGN KEY (`localisation`) REFERENCES `localisation` (`id_localisation`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rendezvous_ibfk_118` FOREIGN KEY (`first_user`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rendezvous_ibfk_119` FOREIGN KEY (`second_user`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rendezvous_ibfk_120` FOREIGN KEY (`objet_matche`) REFERENCES `objetmatche` (`id_objet_matche`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
