/**
 * 10 - Suppression de Documents (DELETE)
 *
 * Ce script montre comment supprimer des documents dans MongoDB.
 * On utilise deleteOne() pour un document et deleteMany() pour plusieurs.
 *
 * ⚠️ ATTENTION : La suppression est IRRÉVERSIBLE !
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
    const emprunts = db.collection('emprunts');

    // Afficher l'état initial
    console.log('📊 État INITIAL de la collection livres :');
    let tousLivres = await livres.find().toArray();
    console.log(`Nombre total de livres : ${tousLivres.length}`);
    tousLivres.forEach(livre => {
      console.log(`  - ${livre.titre} (${livre.auteur})`);
    });

    // === deleteOne : SUPPRIMER UN SEUL DOCUMENT ===
    console.log('\n🗑️ 1. Supprimer UN document avec deleteOne()');
    const result1 = await livres.deleteOne({ titre: 'Le Comte de Monte-Cristo' });
    console.log(`Documents supprimés : ${result1.deletedCount}`);

    if (result1.deletedCount === 0) {
      console.log('⚠️ Aucun document trouvé avec ce titre');
    }

    // === deleteOne : AVEC FILTRE PLUS COMPLEXE ===
    console.log('\n🗑️ 2. Supprimer le premier livre non disponible');
    const result2 = await livres.deleteOne({ disponible: false });
    console.log(`Documents supprimés : ${result2.deletedCount}`);

    if (result2.deletedCount === 1) {
      const livresSupprime = await livres.findOne({ disponible: false });
      console.log(`Il reste encore ${await livres.countDocuments({ disponible: false })} livre(s) non disponible(s)`);
    }

    // === AFFICHER L'ÉTAT APRÈS SUPPRESSIONS ===
    console.log('\n📊 État APRÈS suppressions simples :');
    tousLivres = await livres.find().toArray();
    console.log(`Nombre total de livres : ${tousLivres.length}`);

    // === deleteMany : SUPPRIMER PLUSIEURS DOCUMENTS ===
    console.log('\n🗑️ 3. Supprimer TOUS les livres de genre Fantasy');

    // D'abord, compter combien seront supprimés
    const countFantasy = await livres.countDocuments({ genre: 'Fantasy' });
    console.log(`Livres Fantasy à supprimer : ${countFantasy}`);

    const result3 = await livres.deleteMany({ genre: 'Fantasy' });
    console.log(`Documents supprimés : ${result3.deletedCount}`);

    // === deleteMany : AVEC CONDITION NUMÉRIQUE ===
    console.log('\n🗑️ 4. Supprimer les livres publiés avant 1900');
    const countAvant1900 = await livres.countDocuments({ anneePublication: { $lt: 1900 } });
    console.log(`Livres publiés avant 1900 : ${countAvant1900}`);

    const result4 = await livres.deleteMany({ anneePublication: { $lt: 1900 } });
    console.log(`Documents supprimés : ${result4.deletedCount}`);

    // === deleteMany : AVEC PLUSIEURS CONDITIONS ===
    console.log('\n🗑️ 5. Supprimer les livres non disponibles avec moins de 3 exemplaires');
    const result5 = await livres.deleteMany({
      disponible: false,
      nombreExemplaires: { $lt: 3 }
    });
    console.log(`Documents supprimés : ${result5.deletedCount}`);

    // === AFFICHER L'ÉTAT ACTUEL ===
    console.log('\n📊 État ACTUEL de la collection livres :');
    tousLivres = await livres.find().toArray();
    console.log(`Nombre total de livres restants : ${tousLivres.length}`);
    tousLivres.forEach(livre => {
      console.log(`  - ${livre.titre} (${livre.genre}, ${livre.anneePublication})`);
    });

    // === SUPPRIMER DES MEMBRES ===
    console.log('\n🗑️ 6. Supprimer un membre spécifique');
    const result6 = await membres.deleteOne({ nom: 'Bernard' });
    console.log(`Membres supprimés : ${result6.deletedCount}`);

    console.log('\n📊 Membres restants :');
    const tousMembres = await membres.find().toArray();
    tousMembres.forEach(membre => {
      console.log(`  - ${membre.prenom} ${membre.nom} (${membre.adresse.ville})`);
    });

    // === SUPPRIMER LES EMPRUNTS D'UN MEMBRE ===
    console.log('\n🗑️ 7. Supprimer tous les emprunts d\'un membre');
    const result7 = await emprunts.deleteMany({ membreNom: 'Martin' });
    console.log(`Emprunts supprimés : ${result7.deletedCount}`);

    // === ATTENTION : deleteMany({}) SUPPRIME TOUT ===
    console.log('\n⚠️ 8. ATTENTION - deleteMany({}) supprime TOUS les documents');
    console.log('Cette commande est dangereuse et ne sera PAS exécutée dans cet exemple');
    console.log('Syntaxe : db.collection.deleteMany({})');

    // === COMPTER LES DOCUMENTS RESTANTS ===
    console.log('\n📊 Résumé final des collections :');
    const countLivres = await livres.countDocuments();
    const countMembres = await membres.countDocuments();
    const countEmprunts = await emprunts.countDocuments();

    console.log(`  - Livres : ${countLivres} documents`);
    console.log(`  - Membres : ${countMembres} documents`);
    console.log(`  - Emprunts : ${countEmprunts} documents`);

    // === SUPPRIMER UNE COLLECTION COMPLÈTE ===
    console.log('\n🗑️ 9. Supprimer une collection complète');
    const resultDrop = await emprunts.drop();
    console.log(`Collection "emprunts" supprimée : ${resultDrop}`);

    // Vérifier les collections restantes
    console.log('\n📋 Collections restantes dans la base de données :');
    const collections = await db.listCollections().toArray();
    collections.forEach(col => {
      console.log(`  - ${col.name}`);
    });

    // === RÉINSÉRER DES DONNÉES POUR LES PROCHAINS TESTS ===
    console.log('\n📦 Réinsertion de quelques livres pour les prochains exercices...');
    await livres.insertMany([
      {
        titre: 'Le Petit Prince',
        auteur: 'Antoine de Saint-Exupéry',
        anneePublication: 1943,
        genre: 'Fiction',
        isbn: '978-2-07-061275-8',
        disponible: true,
        nombreExemplaires: 3
      },
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
        titre: 'Harry Potter à l\'école des sorciers',
        auteur: 'J.K. Rowling',
        anneePublication: 1997,
        genre: 'Fantasy',
        isbn: '978-2-07-054120-6',
        disponible: true,
        nombreExemplaires: 5
      }
    ]);
    console.log('✅ 3 livres réinsérés');

    console.log('\n📊 État FINAL de la collection livres :');
    tousLivres = await livres.find().toArray();
    console.log(`Nombre total de livres : ${tousLivres.length}`);
    tousLivres.forEach(livre => {
      console.log(`  - ${livre.titre}`);
    });

  } catch (error) {
    console.error('❌ Erreur :', error.message);
  } finally {
    await client.close();
    console.log('\n🔌 Connexion fermée');
  }
}

main();
