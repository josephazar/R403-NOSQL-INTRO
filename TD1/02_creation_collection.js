/**
 * 02 - Création de Collections
 *
 * Ce script montre comment créer des collections dans MongoDB.
 * Une collection est l'équivalent d'une table en SQL.
 *
 * Collections pour notre bibliothèque :
 * - livres : informations sur les livres
 * - membres : informations sur les membres
 * - emprunts : historique des emprunts
 */

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'bibliotheque';

async function main() {
  try {
    await client.connect();
    console.log('✅ Connecté au serveur MongoDB');

    const db = client.db(dbName);

    // Méthode 1 : Création IMPLICITE (automatique lors de l'insertion)
    console.log('\n📦 Méthode 1 : Création implicite');
    console.log('Les collections seront créées automatiquement lors de la première insertion');

    // Méthode 2 : Création EXPLICITE (avec ou sans validation)
    console.log('\n📦 Méthode 2 : Création explicite sans validation');

    // Création simple
    await db.createCollection('livres');
    console.log('✅ Collection "livres" créée');

    // Méthode 3 : Création avec VALIDATION de schéma
    console.log('\n📦 Méthode 3 : Création avec validation de schéma');

    await db.createCollection('membres', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['nom', 'prenom', 'email'],
          properties: {
            nom: {
              bsonType: 'string',
              description: 'Le nom doit être une chaîne de caractères et est obligatoire'
            },
            prenom: {
              bsonType: 'string',
              description: 'Le prénom doit être une chaîne de caractères et est obligatoire'
            },
            email: {
              bsonType: 'string',
              pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
              description: 'Email doit être valide et est obligatoire'
            },
            dateInscription: {
              bsonType: 'date',
              description: 'Date d\'inscription'
            }
          }
        }
      }
    });
    console.log('✅ Collection "membres" créée avec validation de schéma');

    // Création de la collection emprunts
    await db.createCollection('emprunts');
    console.log('✅ Collection "emprunts" créée');

    // Lister toutes les collections
    console.log('\n📋 Collections dans la base de données :');
    const collections = await db.listCollections().toArray();
    collections.forEach(col => {
      console.log(`  - ${col.name}`);
    });

  } catch (error) {
    console.error('❌ Erreur :', error.message);
  } finally {
    await client.close();
    console.log('\n🔌 Connexion fermée');
  }
}

main();
