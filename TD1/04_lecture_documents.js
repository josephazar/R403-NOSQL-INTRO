/**
 * 04 - Lecture de Documents (READ)
 *
 * Ce script montre comment lire des documents dans MongoDB.
 * On utilise find() pour plusieurs documents et findOne() pour un seul.
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
    const livres = db.collection('livres');
    const membres = db.collection('membres');

    // === LECTURE DE TOUS LES DOCUMENTS : find() ===
    console.log('📖 1. Lire TOUS les livres avec find()');
    const tousLesLivres = await livres.find().toArray();
    console.log(`Nombre de livres : ${tousLesLivres.length}`);
    tousLesLivres.forEach(livre => {
      console.log(`  - ${livre.titre} par ${livre.auteur}`);
    });

    // === LECTURE D'UN SEUL DOCUMENT : findOne() ===
    console.log('\n📖 2. Lire UN livre avec findOne()');
    const unLivre = await livres.findOne({ titre: 'Le Petit Prince' });
    if (unLivre) {
      console.log('Livre trouvé :');
      console.log(`  Titre : ${unLivre.titre}`);
      console.log(`  Auteur : ${unLivre.auteur}`);
      console.log(`  Année : ${unLivre.anneePublication}`);
      console.log(`  ISBN : ${unLivre.isbn}`);
      console.log(`  Disponible : ${unLivre.disponible ? 'Oui' : 'Non'}`);
    }

    // === LECTURE AVEC FILTRE SIMPLE ===
    console.log('\n📖 3. Lire les livres disponibles');
    const livresDisponibles = await livres.find({ disponible: true }).toArray();
    console.log(`Livres disponibles : ${livresDisponibles.length}`);
    livresDisponibles.forEach(livre => {
      console.log(`  - ${livre.titre} (${livre.nombreExemplaires} exemplaires)`);
    });
    
    // select titre from livres where ...
    // === LECTURE AVEC PROJECTION (sélectionner certains champs) ===
    console.log('\n📖 4. Lire uniquement le titre et l\'auteur des livres');
    const titresEtAuteurs = await livres.find(
      {}, // WHERE
      { projection: { titre: 1, auteur: 1, _id: 0 } }
    ).toArray();
    titresEtAuteurs.forEach(livre => {
      console.log(`  - ${livre.titre} par ${livre.auteur}`);
    });

    // === LECTURE AVEC TRI ===
    console.log('\n📖 5. Lire les livres triés par année de publication');
    const livresTries = await livres.find()
      .sort({ anneePublication: 1 }) // 1 = croissant, -1 = décroissant
      .toArray();
    livresTries.forEach(livre => {
      console.log(`  - ${livre.anneePublication} : ${livre.titre}`);
    });

    // === LECTURE AVEC LIMITE ===
    console.log('\n📖 6. Lire les 3 premiers livres seulement');
    const premiersLivres = await livres.find().limit(3).toArray();
    premiersLivres.forEach((livre, index) => {
      console.log(`  ${index + 1}. ${livre.titre}`);
    });

    // === COMPTER LES DOCUMENTS ===
    console.log('\n📖 7. Compter les documents');
    const totalLivres = await livres.countDocuments();
    const livresFantasy = await livres.countDocuments({ genre: 'Fantasy' });
    console.log(`  Total de livres : ${totalLivres}`);
    console.log(`  Livres Fantasy : ${livresFantasy}`);

    // === LECTURE DE MEMBRES ===
    console.log('\n📖 8. Lire les membres');
    const tousMembres = await membres.find().toArray();
    console.log(`Nombre de membres : ${tousMembres.length}`);
    tousMembres.forEach(membre => {
      console.log(`  - ${membre.prenom} ${membre.nom} (${membre.email})`);
      console.log(`    Ville : ${membre.adresse.ville}`);
    });

    // === LECTURE AVEC CHAMP IMBRIQUÉ ===
    console.log('\n📖 9. Lire les membres de Paris');
    const membresParis = await membres.find({ 'adresse.ville': 'Paris' }).toArray();
    console.log(`Membres à Paris : ${membresParis.length}`);
    membresParis.forEach(membre => {
      console.log(`  - ${membre.prenom} ${membre.nom}`);
    });

  } catch (error) {
    console.error('❌ Erreur :', error.message);
  } finally {
    await client.close();
    console.log('\n🔌 Connexion fermée');
  }
}

main();
