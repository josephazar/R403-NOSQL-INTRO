/**
 * 05 - Filtres Basiques
 *
 * Ce script montre les opérateurs de filtrage de base dans MongoDB :
 * - Égalité
 * - $gt, $gte, $lt, $lte (comparaisons)
 * - $in, $nin (dans/pas dans une liste)
 * - $ne (différent de)
 * - $exists (champ existe ou non)
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

    // === ÉGALITÉ SIMPLE ===
    console.log('🔍 1. Filtre d\'égalité simple');
    const livresFantasy = await livres.find({ genre: 'Fantasy' }).toArray();
    console.log(`Livres de genre Fantasy : ${livresFantasy.length}`);
    livresFantasy.forEach(livre => {
      console.log(`  - ${livre.titre}`);
    });

    // === $gt : PLUS GRAND QUE (greater than) ===
    console.log('\n🔍 2. Filtre $gt - Livres publiés après 1950');
    const livresApres1950 = await livres.find({
      anneePublication: { $gt: 1950 }
    }).toArray();
    console.log(`Nombre de livres : ${livresApres1950.length}`);
    livresApres1950.forEach(livre => {
      console.log(`  - ${livre.titre} (${livre.anneePublication})`);
    });

    // === $gte : PLUS GRAND OU ÉGAL (greater than or equal) ===
    console.log('\n🔍 3. Filtre $gte - Livres avec 3 exemplaires ou plus');
    const livresNombreux = await livres.find({
      nombreExemplaires: { $gte: 3 }
    }).toArray();
    console.log(`Nombre de livres : ${livresNombreux.length}`);
    livresNombreux.forEach(livre => {
      console.log(`  - ${livre.titre} : ${livre.nombreExemplaires} exemplaires`);
    });

    // === $lt : PLUS PETIT QUE (less than) ===
    console.log('\n🔍 4. Filtre $lt - Livres publiés avant 1950');
    const livresAvant1950 = await livres.find({
      anneePublication: { $lt: 1950 }
    }).toArray();
    console.log(`Nombre de livres : ${livresAvant1950.length}`);
    livresAvant1950.forEach(livre => {
      console.log(`  - ${livre.titre} (${livre.anneePublication})`);
    });

    // === $lte : PLUS PETIT OU ÉGAL (less than or equal) ===
    console.log('\n🔍 5. Filtre $lte - Livres avec 2 exemplaires ou moins');
    const livresRares = await livres.find({
      nombreExemplaires: { $lte: 2 }
    }).toArray();
    console.log(`Nombre de livres : ${livresRares.length}`);
    livresRares.forEach(livre => {
      console.log(`  - ${livre.titre} : ${livre.nombreExemplaires} exemplaires`);
    });

    // === COMBINAISON : ENTRE DEUX VALEURS ===
    console.log('\n🔍 6. Combinaison - Livres publiés entre 1940 et 1960');
    const livresAnnees40_60 = await livres.find({
      anneePublication: { $gte: 1940, $lte: 1960 }
    }).toArray();
    console.log(`Nombre de livres : ${livresAnnees40_60.length}`);
    livresAnnees40_60.forEach(livre => {
      console.log(`  - ${livre.titre} (${livre.anneePublication})`);
    });

    // === $in : DANS UNE LISTE ===
    console.log('\n🔍 7. Filtre $in - Livres de genre Fantasy ou Fiction');
    const livresGenres = await livres.find({
      genre: { $in: ['Fantasy', 'Fiction'] }
    }).toArray();
    console.log(`Nombre de livres : ${livresGenres.length}`);
    livresGenres.forEach(livre => {
      console.log(`  - ${livre.titre} (${livre.genre})`);
    });

    // === $nin : PAS DANS UNE LISTE ===
    console.log('\n🔍 8. Filtre $nin - Livres qui ne sont pas Fantasy ni Fiction');
    const autresGenres = await livres.find({
      genre: { $nin: ['Fantasy', 'Fiction'] }
    }).toArray();
    console.log(`Nombre de livres : ${autresGenres.length}`);
    autresGenres.forEach(livre => {
      console.log(`  - ${livre.titre} (${livre.genre})`);
    });

    // === $ne : DIFFÉRENT DE ===
    console.log('\n🔍 9. Filtre $ne - Livres NON disponibles');
    const livresNonDisponibles = await livres.find({
      disponible: { $ne: true }
    }).toArray();
    console.log(`Nombre de livres : ${livresNonDisponibles.length}`);
    livresNonDisponibles.forEach(livre => {
      console.log(`  - ${livre.titre}`);
    });

    // === $exists : CHAMP EXISTE ===
    console.log('\n🔍 10. Filtre $exists - Livres avec un champ "emplacements"');
    const livresAvecEmplacements = await livres.find({
      emplacements: { $exists: true }
    }).toArray();
    console.log(`Nombre de livres : ${livresAvecEmplacements.length}`);
    livresAvecEmplacements.forEach(livre => {
      console.log(`  - ${livre.titre} : ${livre.emplacements?.join(', ') || 'N/A'}`);
    });

    // === $exists : CHAMP N'EXISTE PAS ===
    console.log('\n🔍 11. Filtre $exists - Livres SANS champ "emplacements"');
    const livresSansEmplacements = await livres.find({
      emplacements: { $exists: false }
    }).toArray();
    console.log(`Nombre de livres : ${livresSansEmplacements.length}`);
    livresSansEmplacements.forEach(livre => {
      console.log(`  - ${livre.titre}`);
    });

    // === FILTRES SUR MEMBRES ===
    console.log('\n🔍 12. Membres inscrits après le 1er janvier 2024');
    const membresRecents = await membres.find({
      dateInscription: { $gte: new Date('2024-01-01') }
    }).toArray();
    console.log(`Nombre de membres : ${membresRecents.length}`);
    membresRecents.forEach(membre => {
      const dateFormatee = membre.dateInscription.toLocaleDateString('fr-FR');
      console.log(`  - ${membre.prenom} ${membre.nom} (${dateFormatee})`);
    });

    // === FILTRES SUR CHAMPS IMBRIQUÉS ===
    console.log('\n🔍 13. Membres avec un numéro de téléphone');
    const membresAvecTel = await membres.find({
      telephone: { $exists: true }
    }).toArray();
    console.log(`Nombre de membres : ${membresAvecTel.length}`);
    membresAvecTel.forEach(membre => {
      console.log(`  - ${membre.prenom} ${membre.nom} : ${membre.telephone}`);
    });

  } catch (error) {
    console.error('❌ Erreur :', error.message);
  } finally {
    await client.close();
    console.log('\n🔌 Connexion fermée');
  }
}

main();
