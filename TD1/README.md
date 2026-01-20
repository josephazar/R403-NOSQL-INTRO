# TD1 - Introduction à MongoDB

Ce dossier contient des scripts de démonstration pour apprendre MongoDB à travers un scénario de gestion de bibliothèque.

## 📚 Thème : Gestion de Bibliothèque

Tous les exemples utilisent un système de gestion de bibliothèque avec :
- **Livres** : titre, auteur, année de publication, genre, ISBN, disponibilité, nombre d'exemplaires
- **Membres** : nom, prénom, email, date d'inscription, adresse
- **Emprunts** : historique des emprunts de livres

---

## 🚀 Installation et Configuration

### Prérequis
1. **MongoDB** installé localement (ou utiliser MongoDB Atlas)
2. **Node.js** installé (version 14 ou supérieure)

### Installation des dépendances
```bash
cd TD1
npm install
```

---

## 📝 Liste des Scripts

### Script 01 : Connexion et Création de Base de Données
**Fichier :** `01_connexion_database.js`

**Concepts couverts :**
- Connexion à MongoDB avec le driver Node.js
- Création d'une base de données
- Lister les bases de données existantes

**Exécution :**
```bash
npm run 01
# ou
node 01_connexion_database.js
```

---

### Script 02 : Création de Collections
**Fichier :** `02_creation_collection.js`

**Concepts couverts :**
- Création implicite (automatique lors de l'insertion)
- Création explicite simple
- Création avec validation de schéma
- Lister les collections

**Exécution :**
```bash
npm run 02
```

---

### Script 03 : Insertion de Documents
**Fichier :** `03_insertion_documents.js`

**Concepts couverts :**
- `insertOne()` : insérer un seul document
- `insertMany()` : insérer plusieurs documents
- Documents avec champs imbriqués (objets et tableaux)
- Comptage de documents avec `countDocuments()`

**Exécution :**
```bash
npm run 03
```

---

### Script 04 : Lecture de Documents (READ)
**Fichier :** `04_lecture_documents.js`

**Concepts couverts :**
- `find()` : lire tous les documents
- `findOne()` : lire un seul document
- Filtres simples
- Projection (sélectionner certains champs)
- Tri avec `sort()`
- Limitation avec `limit()`
- Comptage avec `countDocuments()`
- Lecture de champs imbriqués

**Exécution :**
```bash
npm run 04
```

---

### Script 05 : Filtres Basiques
**Fichier :** `05_filtres_basiques.js`

**Concepts couverts :**
- Égalité simple
- `$gt` : plus grand que
- `$gte` : plus grand ou égal
- `$lt` : plus petit que
- `$lte` : plus petit ou égal
- Combinaison de filtres (plages)
- `$in` : valeur dans une liste
- `$nin` : valeur pas dans une liste
- `$ne` : différent de
- `$exists` : champ existe ou non

**Exécution :**
```bash
npm run 05
```

---

### Script 06 : Filtres Logiques
**Fichier :** `06_filtres_logiques.js`

**Concepts couverts :**
- `$and` : ET logique (implicite et explicite)
- `$or` : OU logique
- `$nor` : NI logique
- `$not` : NON logique
- Combinaisons complexes de filtres

**Exécution :**
```bash
npm run 06
```

---

### Script 07 : Filtres avec Expressions Régulières (Regex)
**Fichier :** `07_filtres_regex.js`

**Concepts couverts :**
- `$regex` : recherche de motifs dans du texte
- Option `$options: 'i'` : insensible à la casse
- Recherche de préfixe (`^`)
- Recherche de suffixe (`$`)
- Recherche de mot complet (`\b`)
- Alternatives (`|`)
- Recherche sur champs imbriqués

**Exécution :**
```bash
npm run 07
```

---

### Script 08 : Mise à Jour de Documents (UPDATE)
**Fichier :** `08_mise_a_jour_documents.js`

**Concepts couverts :**
- `updateOne()` : mettre à jour un document
- `updateMany()` : mettre à jour plusieurs documents
- `$set` : modifier ou ajouter un champ
- `$inc` : incrémenter/décrémenter une valeur
- `$unset` : supprimer un champ
- Mise à jour de champs imbriqués
- Upsert : créer si n'existe pas
- Combinaison d'opérateurs

**Exécution :**
```bash
npm run 08
```

---

### Script 09 : Opérations sur les Tableaux (Arrays)
**Fichier :** `09_operations_arrays.js`

**Concepts couverts :**
- `$push` : ajouter un élément à un tableau
- `$push` avec `$each` : ajouter plusieurs éléments
- `$addToSet` : ajouter un élément unique
- `$pull` : retirer des éléments
- `$pop` : retirer le premier ou dernier élément
- Filtrage : `$in`, `$all`, `$size`
- `$elemMatch` : élément correspondant à plusieurs conditions
- `$slice` : limiter la taille d'un tableau

**Exécution :**
```bash
npm run 09
```

---

### Script 10 : Suppression de Documents (DELETE)
**Fichier :** `10_suppression_documents.js`

**Concepts couverts :**
- `deleteOne()` : supprimer un document
- `deleteMany()` : supprimer plusieurs documents
- Suppression avec filtres
- `drop()` : supprimer une collection complète
- ⚠️ Attention à `deleteMany({})` qui supprime tout

**Exécution :**
```bash
npm run 10
```

---

## 📋 Ordre d'Exécution Recommandé

Pour suivre le TD de manière logique, exécutez les scripts dans l'ordre :

```bash
npm run 01  # Connexion et création de base
npm run 02  # Création de collections
npm run 03  # Insertion de données
npm run 04  # Lecture (READ)
npm run 05  # Filtres basiques
npm run 06  # Filtres logiques
npm run 07  # Filtres regex
npm run 08  # Mise à jour (UPDATE)
npm run 09  # Opérations sur tableaux
npm run 10  # Suppression (DELETE)
```

Ou exécuter tous les scripts d'un coup :
```bash
npm run all
```

---

## 📂 Structure des Fichiers

```
TD1/
├── 01_connexion_database.js      # Connexion et création de DB
├── 02_creation_collection.js     # Création de collections
├── 03_insertion_documents.js     # Insertion (CREATE)
├── 04_lecture_documents.js       # Lecture (READ)
├── 05_filtres_basiques.js        # Filtres de comparaison
├── 06_filtres_logiques.js        # Opérateurs logiques ($and, $or, etc.)
├── 07_filtres_regex.js           # Recherche textuelle avec regex
├── 08_mise_a_jour_documents.js   # Mise à jour (UPDATE)
├── 09_operations_arrays.js       # Manipulation de tableaux
├── 10_suppression_documents.js   # Suppression (DELETE)
├── exercices/
│   └── EXERCICES.md              # Exercices pratiques avec questions
├── package.json                  # Configuration npm
└── README.md                     # Ce fichier
```

---

## 🎯 Exercices Pratiques

Un fichier d'exercices complet est disponible dans le dossier `exercices/` :

```bash
cat exercices/EXERCICES.md
```

Les exercices couvrent tous les concepts vus dans les scripts de démonstration et proposent un scénario complet avec :
- Données à insérer (tables markdown)
- Questions progressives (de facile à intermédiaire)
- Tous les concepts CRUD et de filtrage

---

## 💡 Conseils d'Utilisation

1. **Lisez les commentaires** dans chaque script - ils expliquent ce que fait chaque requête
2. **Exécutez les scripts un par un** pour bien comprendre chaque concept
3. **Modifiez les exemples** pour expérimenter
4. **Consultez les résultats** affichés dans la console
5. **Faites les exercices** après avoir compris les démonstrations

---

## 🔗 Ressources Complémentaires

- [Documentation officielle MongoDB](https://www.mongodb.com/docs/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/current/)
- [Présentation HTML](../slides/nosql/mongodb-introduction.html) (ouvrir dans un navigateur)

---

## 🛠️ Configuration MongoDB

### MongoDB Local
```bash
# Démarrer MongoDB
mongod

# Se connecter au shell MongoDB
mongosh
```

### MongoDB Atlas (Cloud)
Modifiez l'URL de connexion dans chaque script :
```javascript
const url = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority';
```

---

## ❓ Problèmes Fréquents

### Erreur : "MongoServerError: Authentication failed"
→ Vérifiez que MongoDB est bien démarré (`mongod`)

### Erreur : "Cannot find module 'mongodb'"
→ Installez les dépendances : `npm install`

### Erreur : "connect ECONNREFUSED"
→ MongoDB n'est pas démarré ou n'écoute pas sur le bon port

---

**Bon apprentissage ! 🚀**
