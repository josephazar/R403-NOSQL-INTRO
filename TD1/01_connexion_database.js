/**
 * 01 - Connexion et Création de Base de Données
 *
 * Ce script montre comment se connecter à MongoDB et créer une base de données
 * pour un système de gestion de bibliothèque.
 *
 * Pour exécuter ce script :
 * 1. Installer MongoDB localement ou utiliser MongoDB Atlas
 * 2. Installer le driver MongoDB : npm install mongodb
 * 3. Exécuter : node 01_connexion_database.js
 */

const { MongoClient } = require('mongodb');

// URL de connexion MongoDB (local)
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Nom de la base de données
const dbName = 'bibliotheque';

async function main() {
  try {
    // Connexion au serveur MongoDB
    await client.connect();
    console.log('✅ Connecté avec succès au serveur MongoDB');

    // Sélection de la base de données
    const db = client.db(dbName);
    console.log(`✅ Base de données "${dbName}" sélectionnée`);

    // La base de données est créée automatiquement lors de la première insertion
    // Afficher toutes les bases de données existantes
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();

    console.log('\n📚 Bases de données existantes :');
    dbs.databases.forEach(db => {
      console.log(`  - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });

    // Note : La base "bibliotheque" n'apparaîtra qu'après l'insertion d'un premier document
    console.log('\n💡 Note : La base "bibliotheque" sera visible après la première insertion de données');

  } catch (error) {
    console.error('❌ Erreur :', error);
  } finally {
    // Fermeture de la connexion
    await client.close();
    console.log('\n🔌 Connexion fermée');
  }
}

main();
