/**
 * 07 - Filtres avec Expressions Régulières (Regex)
 *
 * Ce script montre comment utiliser les expressions régulières pour :
 * - Rechercher des motifs dans du texte
 * - Recherches insensibles à la casse
 * - Rechercher des préfixes, suffixes, sous-chaînes
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

    // === RECHERCHE SIMPLE AVEC $regex ===
    console.log('🔍 1. Recherche simple - Titres contenant "Le"');
    const livresAvecLe = await livres.find({
      titre: { $regex: 'Le' }
    }).toArray();
    console.log(`Nombre de livres : ${livresAvecLe.length}`);
    livresAvecLe.forEach(livre => {
      console.log(`  - ${livre.titre}`);
    });

    // === RECHERCHE INSENSIBLE À LA CASSE ===
    console.log('\n🔍 2. Recherche insensible à la casse - Titres contenant "le" (minuscule ou majuscule)');
    const livresAvecLeInsensible = await livres.find({
      titre: { $regex: 'le', $options: 'i' }
    }).toArray();
    console.log(`Nombre de livres : ${livresAvecLeInsensible.length}`);
    livresAvecLeInsensible.forEach(livre => {
      console.log(`  - ${livre.titre}`);
    });

    // === RECHERCHE DE PRÉFIXE (commence par) ===
    console.log('\n🔍 3. Recherche de préfixe - Titres commençant par "Le"');
    const livresCommencantParLe = await livres.find({
      titre: { $regex: '^Le', $options: 'i' }
    }).toArray();
    console.log(`Nombre de livres : ${livresCommencantParLe.length}`);
    livresCommencantParLe.forEach(livre => {
      console.log(`  - ${livre.titre}`);
    });

    // === RECHERCHE DE SUFFIXE (finit par) ===
    console.log('\n🔍 4. Recherche de suffixe - Titres se terminant par "s"');
    const livresFinissantParS = await livres.find({
      titre: { $regex: 's$', $options: 'i' }
    }).toArray();
    console.log(`Nombre de livres : ${livresFinissantParS.length}`);
    livresFinissantParS.forEach(livre => {
      console.log(`  - ${livre.titre}`);
    });

    // === RECHERCHE DE MOT COMPLET ===
    console.log('\n🔍 5. Recherche de mot complet - Auteurs contenant "Hugo"');
    const livresHugo = await livres.find({
      auteur: { $regex: '\\bHugo\\b', $options: 'i' }
    }).toArray();
    console.log(`Nombre de livres : ${livresHugo.length}`);
    livresHugo.forEach(livre => {
      console.log(`  - ${livre.titre} par ${livre.auteur}`);
    });

    // === RECHERCHE AVEC PLUSIEURS ALTERNATIVES ===
    console.log('\n🔍 6. Recherche alternatives - Auteurs contenant "Hugo" OU "Orwell"');
    const livresAuteurs = await livres.find({
      auteur: { $regex: 'Hugo|Orwell', $options: 'i' }
    }).toArray();
    console.log(`Nombre de livres : ${livresAuteurs.length}`);
    livresAuteurs.forEach(livre => {
      console.log(`  - ${livre.titre} par ${livre.auteur}`);
    });

    // === RECHERCHE DE MOTIFS COMPLEXES ===
    console.log('\n🔍 7. Recherche complexe - Titres avec un nombre');
    const livresAvecNombre = await livres.find({
      titre: { $regex: '\\d' }
    }).toArray();
    console.log(`Nombre de livres : ${livresAvecNombre.length}`);
    livresAvecNombre.forEach(livre => {
      console.log(`  - ${livre.titre}`);
    });

    // === RECHERCHE SUR MEMBRES - EMAIL ===
    console.log('\n🔍 8. Recherche sur membres - Emails se terminant par "email.com"');
    const membresEmail = await membres.find({
      email: { $regex: '@email\\.com$', $options: 'i' }
    }).toArray();
    console.log(`Nombre de membres : ${membresEmail.length}`);
    membresEmail.forEach(membre => {
      console.log(`  - ${membre.prenom} ${membre.nom} : ${membre.email}`);
    });

    // === RECHERCHE PAR NOM DE FAMILLE ===
    console.log('\n🔍 9. Recherche par nom - Noms contenant "dup"');
    const membresNom = await membres.find({
      nom: { $regex: 'dup', $options: 'i' }
    }).toArray();
    console.log(`Nombre de membres : ${membresNom.length}`);
    membresNom.forEach(membre => {
      console.log(`  - ${membre.prenom} ${membre.nom}`);
    });

    // === RECHERCHE DANS UN CHAMP IMBRIQUÉ ===
    console.log('\n🔍 10. Recherche dans champ imbriqué - Adresses contenant "rue"');
    const membresRue = await membres.find({
      'adresse.rue': { $regex: 'rue', $options: 'i' }
    }).toArray();
    console.log(`Nombre de membres : ${membresRue.length}`);
    membresRue.forEach(membre => {
      console.log(`  - ${membre.prenom} ${membre.nom} : ${membre.adresse.rue}`);
    });

    // === RECHERCHE DE PLUSIEURS MOTS (n'importe quel ordre) ===
    console.log('\n🔍 11. Recherche flexible - Titres contenant "Harry" ET "Potter"');
    const livresMotsCles = await livres.find({
      $and: [
        { titre: { $regex: 'Harry', $options: 'i' } },
        { titre: { $regex: 'Potter', $options: 'i' } }
      ]
    }).toArray();
    console.log(`Nombre de livres : ${livresMotsCles.length}`);
    livresMotsCles.forEach(livre => {
      console.log(`  - ${livre.titre}`);
    });

    // === RECHERCHE AVEC CARACTÈRES SPÉCIAUX ===
    console.log('\n🔍 12. Recherche avec apostrophe - Titres contenant "l\'"');
    const livresApostrophe = await livres.find({
      titre: { $regex: "l'", $options: 'i' }
    }).toArray();
    console.log(`Nombre de livres : ${livresApostrophe.length}`);
    livresApostrophe.forEach(livre => {
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
