/**
 * 06 - Filtres Logiques
 *
 * Ce script montre les opérateurs logiques dans MongoDB :
 * - $and : ET logique (toutes les conditions doivent être vraies)
 * - $or : OU logique (au moins une condition doit être vraie)
 * - $nor : NI logique (aucune condition ne doit être vraie)
 * - $not : NON logique (inverse une condition)
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

    // === $and : ET LOGIQUE (implicite) ===
    console.log('🔍 1. Filtre $and implicite - Livres Fantasy ET disponibles');
    const livresFantasyDispo = await livres.find({
      genre: 'Fantasy',
      disponible: true
    }).toArray();
    console.log(`Nombre de livres : ${livresFantasyDispo.length}`);
    livresFantasyDispo.forEach(livre => {
      console.log(`  - ${livre.titre}`);
    });

    // === $and : ET LOGIQUE (explicite) ===
    console.log('\n🔍 2. Filtre $and explicite - Livres publiés après 1950 ET disponibles');
    const livresRecentsDispo = await livres.find({
      $and: [
        { anneePublication: { $gt: 1950 } },
        { disponible: true }
      ]
    }).toArray();
    console.log(`Nombre de livres : ${livresRecentsDispo.length}`);
    livresRecentsDispo.forEach(livre => {
      console.log(`  - ${livre.titre} (${livre.anneePublication})`);
    });

    // === $or : OU LOGIQUE ===
    console.log('\n🔍 3. Filtre $or - Livres Fantasy OU publiés avant 1950');
    const livresFantasyOuAnciens = await livres.find({
      $or: [
        { genre: 'Fantasy' },
        { anneePublication: { $lt: 1950 } }
      ]
    }).toArray();
    console.log(`Nombre de livres : ${livresFantasyOuAnciens.length}`);
    livresFantasyOuAnciens.forEach(livre => {
      console.log(`  - ${livre.titre} (${livre.genre}, ${livre.anneePublication})`);
    });

    // === COMBINAISON $and ET $or ===
    console.log('\n🔍 4. Combinaison - Livres (Fantasy OU Fiction) ET disponibles');
    const livresGenresDispo = await livres.find({
      $and: [
        {
          $or: [
            { genre: 'Fantasy' },
            { genre: 'Fiction' }
          ]
        },
        { disponible: true }
      ]
    }).toArray();
    console.log(`Nombre de livres : ${livresGenresDispo.length}`);
    livresGenresDispo.forEach(livre => {
      console.log(`  - ${livre.titre} (${livre.genre})`);
    });

    // === $or AVEC PLUSIEURS CHAMPS ===
    console.log('\n🔍 5. Filtre $or - Livres avec plus de 4 exemplaires OU non disponibles');
    const livresConditions = await livres.find({
      $or: [
        { nombreExemplaires: { $gt: 4 } },
        { disponible: false }
      ]
    }).toArray();
    console.log(`Nombre de livres : ${livresConditions.length}`);
    livresConditions.forEach(livre => {
      console.log(`  - ${livre.titre} : ${livre.nombreExemplaires} exemplaires, disponible: ${livre.disponible}`);
    });

    // === $nor : NI LOGIQUE ===
    console.log('\n🔍 6. Filtre $nor - Livres qui ne sont NI Fantasy NI Fiction');
    const livresNorGenres = await livres.find({
      $nor: [
        { genre: 'Fantasy' },
        { genre: 'Fiction' }
      ]
    }).toArray();
    console.log(`Nombre de livres : ${livresNorGenres.length}`);
    livresNorGenres.forEach(livre => {
      console.log(`  - ${livre.titre} (${livre.genre})`);
    });

    // === $not : NON LOGIQUE ===
    console.log('\n🔍 7. Filtre $not - Livres avec nombre d\'exemplaires PAS supérieur à 3');
    const livresNotGt3 = await livres.find({
      nombreExemplaires: { $not: { $gt: 3 } }
    }).toArray();
    console.log(`Nombre de livres : ${livresNotGt3.length}`);
    livresNotGt3.forEach(livre => {
      console.log(`  - ${livre.titre} : ${livre.nombreExemplaires} exemplaires`);
    });

    // === REQUÊTE COMPLEXE ===
    console.log('\n🔍 8. Requête complexe - Livres Fantasy disponibles avec 3+ exemplaires OU livres publiés avant 1950');
    const requeteComplexe = await livres.find({
      $or: [
        {
          $and: [
            { genre: 'Fantasy' },
            { disponible: true },
            { nombreExemplaires: { $gte: 3 } }
          ]
        },
        { anneePublication: { $lt: 1950 } }
      ]
    }).toArray();
    console.log(`Nombre de livres : ${requeteComplexe.length}`);
    requeteComplexe.forEach(livre => {
      console.log(`  - ${livre.titre} (${livre.genre}, ${livre.anneePublication}, ${livre.nombreExemplaires} ex.)`);
    });

    // === FILTRES SUR MEMBRES ===
    console.log('\n🔍 9. Membres de Paris OU Lyon');
    const membresVilles = await membres.find({
      $or: [
        { 'adresse.ville': 'Paris' },
        { 'adresse.ville': 'Lyon' }
      ]
    }).toArray();
    console.log(`Nombre de membres : ${membresVilles.length}`);
    membresVilles.forEach(membre => {
      console.log(`  - ${membre.prenom} ${membre.nom} (${membre.adresse.ville})`);
    });

    // === MEMBRES AVEC TÉLÉPHONE ET INSCRITS EN 2024 ===
    console.log('\n🔍 10. Membres avec téléphone ET inscrits en 2024');
    const membresConditions = await membres.find({
      $and: [
        { telephone: { $exists: true } },
        { dateInscription: { $gte: new Date('2024-01-01') } }
      ]
    }).toArray();
    console.log(`Nombre de membres : ${membresConditions.length}`);
    membresConditions.forEach(membre => {
      const dateFormatee = membre.dateInscription.toLocaleDateString('fr-FR');
      console.log(`  - ${membre.prenom} ${membre.nom} : ${membre.telephone} (inscrit le ${dateFormatee})`);
    });

    // === MEMBRES NI DE PARIS NI DE LYON ===
    console.log('\n🔍 11. Membres NI de Paris NI de Lyon');
    const membresAutresVilles = await membres.find({
      $nor: [
        { 'adresse.ville': 'Paris' },
        { 'adresse.ville': 'Lyon' }
      ]
    }).toArray();
    console.log(`Nombre de membres : ${membresAutresVilles.length}`);
    membresAutresVilles.forEach(membre => {
      console.log(`  - ${membre.prenom} ${membre.nom} (${membre.adresse.ville})`);
    });

  } catch (error) {
    console.error('❌ Erreur :', error.message);
  } finally {
    await client.close();
    console.log('\n🔌 Connexion fermée');
  }
}

main();
