--
-- Déchargement des données de la table `Users`
-- mdp : azerty
--

INSERT INTO `Users` (`id`, `email`, `password`, `token`, `createdAt`, `updatedAt`) VALUES
    (1, 'a@a.fr', '$2b$10$Cw.TFiUvhUOdAq5Tpg5jAeRX7frZ2xI.jpWJ/aeHX5p2kwfysLisu', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5mciIsImlhdCI6MTY1MjE5NjYwN30._5YC0-MLyXafTPJhYPYP5oUyJw3IRJn5ntkEHupyDro', '2022-05-10 12:15:55', '2022-05-10 15:30:07');


--
-- Déchargement des données de la table `Badges`
--

INSERT INTO `Badges` (`id`, `autorisation`, `badgeAddress`, `prenom`, `nom`, `createdAt`, `updatedAt`, `user_id`) VALUES
(1, 0, '69 F2 56 C1', 'eee', 'eee', '2021-05-06 14:26:09', '2022-05-10 14:26:09', 1),
(2, 1, '39 0B 64 B3', 'eee', 'eee', '2022-05-10 14:26:09', '2022-05-10 14:26:09', 1);


--
-- Déchargement des données de la table `MicroControllers`
--

INSERT INTO `MicroControllers` (`id`, `seuilLuminosite`, `addrMac`, `createdAt`, `updatedAt`, `user_id`) VALUES
(1, 10, '88:75:9:c4:f5:fc', '2022-05-10 14:25:49', '2022-05-10 14:25:49', 1),
(2, 20, 'dddeee', '2022-05-10 14:25:49', '2022-05-10 14:25:49', 1);

--
-- Déchargement des données de la table `Historics`
--

INSERT INTO `Historics` (`id`, `createdAt`, `updatedAt`, `MicroControllerId`, `BadgeId`) VALUES
(1, '2022-05-10 15:15:28', '2022-05-01 15:15:28', 1, 2),
(2, '2022-05-11 15:15:28', '2022-05-10 15:15:28', 1, 2),
(3, '2022-05-11 15:15:28', '2022-05-10 15:15:28', 1, 1),
(4, '2022-05-11 15:15:28', '2022-05-10 15:15:28', 2, 2);
COMMIT;
