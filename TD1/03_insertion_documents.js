/**
 * 03 - Insertion de Documents
 *
 * Ce script montre comment insérer des documents dans MongoDB.
 * On utilise insertOne() pour un document et insertMany() pour plusieurs.
 */

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'bibliotheque';

async function main() {
  try {
    await client.connect();
    console.log('✅ Connecté au serveur MongoDB\n');

    const db = client.db(dbName);

    // === INSERTION SIMPLE : insertOne() ===
    console.log('📝 Insertion d\'un seul document avec insertOne()');

    const livre1 = {
      titre: 'Le Petit Prince',
      auteur: 'Antoine de Saint-Exupéry',
      anneePublication: 1943,
      genre: 'Fiction',
      isbn: '978-2-07-061275-8',
      disponible: true,
      nombreExemplaires: 3,
      emplacements: ['Rayon A', 'Rayon B']
    };

    const resultInsertOne = await db.collection('livres').insertOne(livre1);
    console.log(`✅ Livre inséré avec l'ID : ${resultInsertOne.insertedId}`);

    // === INSERTION MULTIPLE : insertMany() ===
    console.log('\n📝 Insertion de plusieurs documents avec insertMany()');

    const livres = [
      {
        titre: '1984',
        auteur: 'George Orwell',
        anneePublication: 1949,
        genre: 'Science-fiction',
        isbn: '978-0-452-28423-4',
        disponible: true,
        nombreExemplaires: 2
      },
      {
        titre: 'Les Misérables',
        auteur: 'Victor Hugo',
        anneePublication: 1862,
        genre: 'Roman',
        isbn: '978-2-253-09633-4',
        disponible: true,
        nombreExemplaires: 4
      },
      {
        titre: 'Harry Potter à l\'école des sorciers',
        auteur: 'J.K. Rowling',
        anneePublication: 1997,
        genre: 'Fantasy',
        isbn: '978-2-07-054120-6',
        disponible: false, // Tous les exemplaires sont empruntés
        nombreExemplaires: 5
      },
      {
        titre: 'Le Seigneur des Anneaux',
        auteur: 'J.R.R. Tolkien',
        anneePublication: 1954,
        genre: 'Fantasy',
        isbn: '978-2-266-15410-5',
        disponible: true,
        nombreExemplaires: 3
      }
    ];

    const resultInsertMany = await db.collection('livres').insertMany(livres);
    console.log(`✅ ${resultInsertMany.insertedCount} livres insérés`);
    console.log('IDs des documents insérés :');
    Object.values(resultInsertMany.insertedIds).forEach((id, index) => {
      console.log(`  ${index + 1}. ${id}`);
    });

    // === INSERTION DE MEMBRES ===
    console.log('\n📝 Insertion de membres');

    const membres = [
      {
        nom: 'Dupont',
        prenom: 'Marie',
        email: 'marie.dupont@email.com',
        dateInscription: new Date('2024-01-15'),
        adresse: {
          rue: '15 rue de la Paix',
          ville: 'Paris',
          codePostal: '75002'
        },
        telephone: '0601020304'
      },
      {
        nom: 'Martin',
        prenom: 'Pierre',
        email: 'pierre.martin@email.com',
        dateInscription: new Date('2024-02-20'),
        adresse: {
          rue: '8 avenue des Champs',
          ville: 'Lyon',
          codePostal: '69001'
        }
      },
      {
        nom: 'Bernard',
        prenom: 'Sophie',
        email: 'sophie.bernard@email.com',
        dateInscription: new Date('2023-11-10'),
        adresse: {
          rue: '22 boulevard Victor Hugo',
          ville: 'Marseille',
          codePostal: '13001'
        },
        telephone: '0612345678'
      }
    ];

    const resultMembres = await db.collection('membres').insertMany(membres);
    console.log(`✅ ${resultMembres.insertedCount} membres insérés`);

    // Afficher le nombre total de documents
    console.log('\n📊 Résumé des collections :');
    const countLivres = await db.collection('livres').countDocuments();
    const countMembres = await db.collection('membres').countDocuments();
    console.log(`  - Livres : ${countLivres} documents`);
    console.log(`  - Membres : ${countMembres} documents`);

  } catch (error) {
    console.error('❌ Erreur :', error.message);
  } finally {
    await client.close();
    console.log('\n🔌 Connexion fermée');
  }
}

main();
