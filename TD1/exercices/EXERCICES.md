# Exercices MongoDB - Gestion de Bibliothèque

## 📚 Scénario

Vous êtes chargé(e) de gérer la base de données d'une bibliothèque municipale. La base de données contient des informations sur les livres, les membres et les emprunts. Vous devez effectuer différentes opérations pour maintenir et interroger cette base de données.

---

## 📊 Données à Insérer

### Collection : `livres`

| Titre | Auteur | Année | Genre | ISBN | Disponible | Exemplaires |
|-------|--------|-------|-------|------|------------|-------------|
| Le Petit Prince | Antoine de Saint-Exupéry | 1943 | Fiction | 978-2-07-061275-8 | true | 3 |
| 1984 | George Orwell | 1949 | Science-fiction | 978-0-452-28423-4 | true | 2 |
| Les Misérables | Victor Hugo | 1862 | Roman | 978-2-253-09633-4 | true | 4 |
| Harry Potter à l'école des sorciers | J.K. Rowling | 1997 | Fantasy | 978-2-07-054120-6 | false | 5 |
| Le Seigneur des Anneaux | J.R.R. Tolkien | 1954 | Fantasy | 978-2-266-15410-5 | true | 3 |
| L'Étranger | Albert Camus | 1942 | Roman | 978-2-07-036002-4 | true | 2 |
| Fondation | Isaac Asimov | 1951 | Science-fiction | 978-2-207-30018-3 | true | 2 |
| Notre-Dame de Paris | Victor Hugo | 1831 | Roman | 978-2-253-09678-5 | false | 3 |

### Collection : `membres`

| Nom | Prénom | Email | Date d'inscription | Ville | Code Postal | Téléphone |
|-----|--------|-------|-------------------|-------|-------------|-----------|
| Dupont | Marie | marie.dupont@email.com | 2024-01-15 | Paris | 75002 | 0601020304 |
| Martin | Pierre | pierre.martin@email.com | 2024-02-20 | Lyon | 69001 | (optionnel) |
| Bernard | Sophie | sophie.bernard@email.com | 2023-11-10 | Marseille | 13001 | 0612345678 |
| Lefebvre | Jean | jean.lefebvre@email.com | 2024-03-05 | Paris | 75003 | 0623456789 |
| Moreau | Claire | claire.moreau@email.com | 2023-12-20 | Lyon | 69002 | (optionnel) |

**Structure de l'adresse :** Chaque membre a un objet `adresse` avec les champs : `ville` et `codePostal`.

### Collection : `emprunts`

| Membre (nom) | Livre (titre) | Date d'emprunt | Date de retour prévue | Retourné |
|--------------|---------------|----------------|----------------------|----------|
| Dupont | Le Petit Prince | 2024-01-20 | 2024-02-05 | false |
| Martin | 1984 | 2024-01-25 | 2024-02-10 | false |
| Bernard | Harry Potter à l'école des sorciers | 2024-01-15 | 2024-02-01 | false |
| Lefebvre | Les Misérables | 2024-01-10 | 2024-01-26 | true |
| Dupont | L'Étranger | 2024-02-01 | 2024-02-15 | false |

**Structure :** Chaque emprunt contient : `membreNom`, `livreTitre`, `dateEmprunt`, `dateRetourPrevue`, `retourne` (boolean).

---

## 🎯 Exercices

### **Partie 1 : Connexion et Création (voir fichiers 01 et 02)**

#### Exercice 1.1 : Connexion
Créer un script qui :
1. Se connecte à MongoDB
2. Crée la base de données `bibliotheque_exercice`
3. Affiche toutes les bases de données existantes

#### Exercice 1.2 : Création de collections
Créer les trois collections suivantes :
1. `livres` (création implicite lors de l'insertion)
2. `membres` (avec validation : nom, prénom et email obligatoires)
3. `emprunts` (création simple)

---

### **Partie 2 : Insertion de Données (voir fichier 03)**

#### Exercice 2.1 : Insertion simple
Insérer UN livre : "Le Comte de Monte-Cristo" d'Alexandre Dumas (1844), genre Roman, 2 exemplaires disponibles.

#### Exercice 2.2 : Insertion multiple
Insérer TOUS les livres du tableau ci-dessus en une seule opération.

#### Exercice 2.3 : Insertion de membres avec documents imbriqués
Insérer TOUS les membres du tableau. N'oubliez pas de structurer l'adresse comme un objet imbriqué.

#### Exercice 2.4 : Insertion d'emprunts
Insérer TOUS les emprunts du tableau. Utilisez `new Date()` pour les dates.

---

### **Partie 3 : Lecture de Données (voir fichier 04)**

#### Exercice 3.1 : Lecture simple
1. Afficher TOUS les livres
2. Afficher UN livre spécifique : "1984"

#### Exercice 3.2 : Lecture avec filtre
1. Afficher tous les livres disponibles
2. Afficher tous les livres de genre "Fantasy"

#### Exercice 3.3 : Projection
Afficher uniquement le titre et l'auteur de tous les livres (sans l'_id).

#### Exercice 3.4 : Tri et limite
1. Afficher les livres triés par année de publication (croissant)
2. Afficher les 3 livres les plus anciens

#### Exercice 3.5 : Comptage
1. Compter le nombre total de livres
2. Compter le nombre de livres de Science-fiction
3. Compter le nombre de membres inscrits en 2024

#### Exercice 3.6 : Lecture avec champs imbriqués
Afficher tous les membres habitant à Paris.

---

### **Partie 4 : Filtres Basiques (voir fichier 05)**

#### Exercice 4.1 : Opérateurs de comparaison
1. Trouver les livres publiés après 1950 (`$gt`)
2. Trouver les livres avec 3 exemplaires ou plus (`$gte`)
3. Trouver les livres publiés avant 1900 (`$lt`)
4. Trouver les livres avec 2 exemplaires ou moins (`$lte`)

#### Exercice 4.2 : Plages de valeurs
Trouver les livres publiés entre 1940 et 1960 (inclus).

#### Exercice 4.3 : Opérateur $in
Trouver les livres de genre "Fantasy" OU "Science-fiction".

#### Exercice 4.4 : Opérateur $ne
Trouver tous les livres qui ne sont PAS disponibles.

#### Exercice 4.5 : Opérateur $exists
1. Trouver les membres qui ont un numéro de téléphone
2. Trouver les membres qui n'ont PAS de numéro de téléphone

---

### **Partie 5 : Filtres Logiques (voir fichier 06)**

#### Exercice 5.1 : Opérateur $and
Trouver les livres de genre "Fantasy" ET disponibles.

#### Exercice 5.2 : Opérateur $or
Trouver les livres de Victor Hugo OU les livres publiés avant 1850.

#### Exercice 5.3 : Combinaison $and et $or
Trouver les livres (de genre "Fantasy" OU "Science-fiction") ET disponibles.

#### Exercice 5.4 : Opérateur $nor
Trouver les livres qui ne sont NI de genre "Fantasy" NI de genre "Fiction".

#### Exercice 5.5 : Requête complexe
Trouver les membres de Paris OU Lyon inscrits après le 1er janvier 2024.

---

### **Partie 6 : Recherche Textuelle (voir fichier 07)**

#### Exercice 6.1 : Regex simple
Trouver tous les livres dont le titre contient "Le" (insensible à la casse).

#### Exercice 6.2 : Recherche de préfixe
Trouver les livres dont le titre commence par "L" (insensible à la casse).

#### Exercice 6.3 : Recherche par auteur
Trouver tous les livres dont l'auteur contient "Hugo".

#### Exercice 6.4 : Recherche dans les emails
Trouver tous les membres dont l'email se termine par "@email.com".

---

### **Partie 7 : Mise à Jour (voir fichier 08)**

#### Exercice 7.1 : Opérateur $set
1. Marquer le livre "Harry Potter" comme disponible
2. Ajouter un champ `langue: "Français"` au livre "Le Petit Prince"
3. Changer la ville de Sophie Bernard à "Nice"

#### Exercice 7.2 : Opérateur $inc
1. Augmenter de 2 le nombre d'exemplaires de "1984"
2. Diminuer de 1 le nombre d'exemplaires de "Les Misérables"

#### Exercice 7.3 : Opérateur $unset
Supprimer le champ `langue` du livre "Le Petit Prince".

#### Exercice 7.4 : updateMany
Ajouter le champ `langue: "Français"` à tous les livres de Victor Hugo.

#### Exercice 7.5 : Upsert
Insérer ou mettre à jour un livre "Dune" de Frank Herbert (1965), genre Science-fiction, 3 exemplaires, disponible.

---

### **Partie 8 : Opérations sur les Tableaux (voir fichier 09)**

#### Exercice 8.1 : Ajouter un champ tableau
Ajouter un champ `tags` au livre "Le Petit Prince" avec les valeurs : `["classique", "jeunesse", "philosophie"]`.

#### Exercice 8.2 : $push
Ajouter le tag "best-seller" au livre "Harry Potter".

#### Exercice 8.3 : $addToSet
Essayer d'ajouter le tag "classique" au livre "Le Petit Prince" (il existe déjà, donc il ne devrait pas être ajouté en double).

#### Exercice 8.4 : $pull
Retirer le tag "jeunesse" du livre "Le Petit Prince".

#### Exercice 8.5 : Filtrage avec $in sur tableau
Trouver tous les livres qui ont le tag "classique".

#### Exercice 8.6 : Filtrage avec $all
Trouver tous les livres qui ont TOUS les tags "classique" ET "philosophie".

#### Exercice 8.7 : Filtrage avec $size
Trouver tous les livres qui ont exactement 3 tags.

---

### **Partie 9 : Suppression (voir fichier 10)**

#### Exercice 9.1 : deleteOne
Supprimer le livre "Le Comte de Monte-Cristo".

#### Exercice 9.2 : deleteMany avec filtre
Supprimer tous les emprunts qui ont été retournés (`retourne: true`).

#### Exercice 9.3 : Suppression conditionnelle
Supprimer tous les livres publiés avant 1850.

#### Exercice 9.4 : Suppression avec $and
Supprimer tous les livres de genre "Roman" ET non disponibles.

---

### **Partie 10 : Requêtes Avancées (Combinaison)**

#### Exercice 10.1 : Statistiques
Afficher :
1. Le nombre total de livres
2. Le nombre de livres disponibles
3. Le nombre de livres par genre (utilisez `distinct`)

#### Exercice 10.2 : Pagination
Afficher les livres de la page 2 (5 livres par page) triés par titre.

#### Exercice 10.3 : Recherche multi-critères
Trouver les livres :
- De genre "Fantasy" OU "Science-fiction"
- Publiés après 1950
- Avec au moins 2 exemplaires

#### Exercice 10.4 : Gestion des emprunts
1. Trouver tous les emprunts non retournés
2. Trouver les emprunts dont la date de retour prévue est dépassée (date < aujourd'hui)

#### Exercice 10.5 : Mise à jour conditionnelle
Marquer comme non disponibles tous les livres qui ont 0 exemplaires.

---

## 🎓 Conseils

1. **Testez chaque requête** avant de passer à la suivante
2. **Utilisez `console.log()`** pour afficher les résultats
3. **Vérifiez les modifications** avec des requêtes `find()` après chaque `update` ou `delete`
4. **Sauvegardez vos scripts** pour chaque exercice
5. **N'oubliez pas** que les dates se créent avec `new Date()`
6. **Pour les champs imbriqués**, utilisez la notation pointée : `'adresse.ville'`

---

**Bon apprentissage ! 🚀**
