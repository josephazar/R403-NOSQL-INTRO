/**
 * 09 - Opérations sur les Tableaux (Arrays)
 *
 * Ce script montre comment manipuler les tableaux dans MongoDB :
 * - $push : ajouter un élément à un tableau
 * - $pull : retirer des éléments d'un tableau
 * - $addToSet : ajouter un élément unique
 * - $pop : retirer le premier ou dernier élément
 * - Filtres sur les tableaux : $elemMatch, $size, $all
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

    // D'abord, créer une collection d'emprunts pour les exemples
    const emprunts = db.collection('emprunts');

    // Créer quelques emprunts avec historique
    console.log('📦 Préparation - Création d\'emprunts avec historique');
    await emprunts.deleteMany({});
    await emprunts.insertMany([
      {
        membreNom: 'Dupont',
        livresEmpruntes: ['Le Petit Prince', '1984'],
        historique: [
          { action: 'emprunt', livre: 'Le Petit Prince', date: new Date('2024-01-10') },
          { action: 'emprunt', livre: '1984', date: new Date('2024-01-15') }
        ]
      },
      {
        membreNom: 'Martin',
        livresEmpruntes: ['Harry Potter à l\'école des sorciers'],
        historique: [
          { action: 'emprunt', livre: 'Harry Potter à l\'école des sorciers', date: new Date('2024-01-20') }
        ]
      }
    ]);
    console.log('✅ Emprunts créés\n');

    // === $push : AJOUTER UN ÉLÉMENT À UN TABLEAU ===
    console.log('📥 1. $push - Ajouter un emprunt à l\'historique de Dupont');
    const result1 = await emprunts.updateOne(
      { membreNom: 'Dupont' },
      {
        $push: {
          historique: {
            action: 'retour',
            livre: 'Le Petit Prince',
            date: new Date('2024-01-25')
          }
        }
      }
    );
    console.log(`Documents modifiés : ${result1.modifiedCount}`);

    let empruntDupont = await emprunts.findOne({ membreNom: 'Dupont' });
    console.log(`Nombre d'entrées dans l'historique : ${empruntDupont.historique.length}`);

    // === $push avec $each : AJOUTER PLUSIEURS ÉLÉMENTS ===
    console.log('\n📥 2. $push avec $each - Ajouter plusieurs livres empruntés');
    const result2 = await emprunts.updateOne(
      { membreNom: 'Martin' },
      {
        $push: {
          livresEmpruntes: {
            $each: ['Les Misérables', 'Le Seigneur des Anneaux']
          }
        }
      }
    );
    console.log(`Documents modifiés : ${result2.modifiedCount}`);

    let empruntMartin = await emprunts.findOne({ membreNom: 'Martin' });
    console.log(`Livres empruntés par Martin : ${empruntMartin.livresEmpruntes.join(', ')}`);

    // === $addToSet : AJOUTER UN ÉLÉMENT UNIQUE ===
    console.log('\n📥 3. $addToSet - Ajouter un livre uniquement s\'il n\'existe pas déjà');
    const result3a = await emprunts.updateOne(
      { membreNom: 'Martin' },
      { $addToSet: { livresEmpruntes: 'Les Misérables' } }
    );
    console.log(`Premier ajout (existe déjà) - Documents modifiés : ${result3a.modifiedCount}`);

    const result3b = await emprunts.updateOne(
      { membreNom: 'Martin' },
      { $addToSet: { livresEmpruntes: '1984' } }
    );
    console.log(`Deuxième ajout (nouveau) - Documents modifiés : ${result3b.modifiedCount}`);

    empruntMartin = await emprunts.findOne({ membreNom: 'Martin' });
    console.log(`Livres empruntés par Martin : ${empruntMartin.livresEmpruntes.join(', ')}`);

    // === $pull : RETIRER DES ÉLÉMENTS D'UN TABLEAU ===
    console.log('\n📤 4. $pull - Retirer un livre de la liste d\'emprunts');
    const result4 = await emprunts.updateOne(
      { membreNom: 'Dupont' },
      { $pull: { livresEmpruntes: 'Le Petit Prince' } }
    );
    console.log(`Documents modifiés : ${result4.modifiedCount}`);

    empruntDupont = await emprunts.findOne({ membreNom: 'Dupont' });
    console.log(`Livres encore empruntés par Dupont : ${empruntDupont.livresEmpruntes.join(', ')}`);

    // === $pull avec CONDITION ===
    console.log('\n📤 5. $pull avec condition - Retirer les actions d\'emprunt d\'un livre spécifique');
    const result5 = await emprunts.updateOne(
      { membreNom: 'Dupont' },
      {
        $pull: {
          historique: {
            livre: 'Le Petit Prince'
          }
        }
      }
    );
    console.log(`Documents modifiés : ${result5.modifiedCount}`);

    empruntDupont = await emprunts.findOne({ membreNom: 'Dupont' });
    console.log(`Entrées restantes dans l'historique : ${empruntDupont.historique.length}`);

    // === $pop : RETIRER LE PREMIER OU DERNIER ÉLÉMENT ===
    console.log('\n📤 6. $pop - Retirer le dernier livre emprunté');
    const result6 = await emprunts.updateOne(
      { membreNom: 'Martin' },
      { $pop: { livresEmpruntes: 1 } } // 1 = dernier, -1 = premier
    );
    console.log(`Documents modifiés : ${result6.modifiedCount}`);

    empruntMartin = await emprunts.findOne({ membreNom: 'Martin' });
    console.log(`Livres empruntés par Martin : ${empruntMartin.livresEmpruntes.join(', ')}`);

    // === AJOUTER UN CHAMP TABLEAU À UN LIVRE ===
    console.log('\n📥 7. Ajouter des tags à des livres');
    await livres.updateOne(
      { titre: 'Le Petit Prince' },
      { $set: { tags: ['classique', 'jeunesse', 'philosophie'] } }
    );

    await livres.updateOne(
      { titre: '1984' },
      { $set: { tags: ['dystopie', 'classique', 'politique'] } }
    );
    console.log('✅ Tags ajoutés');

    // === FILTRAGE : $in POUR LES TABLEAUX ===
    console.log('\n🔍 8. Filtrer les livres ayant le tag "classique"');
    const livresClassiques = await livres.find({
      tags: 'classique'
    }).toArray();
    console.log(`Livres classiques trouvés : ${livresClassiques.length}`);
    livresClassiques.forEach(livre => {
      console.log(`  - ${livre.titre} (tags: ${livre.tags?.join(', ') || 'aucun'})`);
    });

    // === FILTRAGE : $all (tous les éléments présents) ===
    console.log('\n🔍 9. Filtrer les livres ayant TOUS les tags spécifiés');
    const livresMultiplesTags = await livres.find({
      tags: { $all: ['classique', 'dystopie'] }
    }).toArray();
    console.log(`Livres avec tags "classique" ET "dystopie" : ${livresMultiplesTags.length}`);
    livresMultiplesTags.forEach(livre => {
      console.log(`  - ${livre.titre}`);
    });

    // === FILTRAGE : $size (taille du tableau) ===
    console.log('\n🔍 10. Filtrer les livres ayant exactement 3 tags');
    const livres3Tags = await livres.find({
      tags: { $size: 3 }
    }).toArray();
    console.log(`Livres avec 3 tags : ${livres3Tags.length}`);
    livres3Tags.forEach(livre => {
      console.log(`  - ${livre.titre} : ${livre.tags.join(', ')}`);
    });

    // === FILTRAGE : $elemMatch (élément correspondant à plusieurs conditions) ===
    console.log('\n🔍 11. Filtrer l\'historique avec $elemMatch');
    const empruntsAvecRetour = await emprunts.find({
      historique: {
        $elemMatch: {
          action: 'retour',
          date: { $gte: new Date('2024-01-20') }
        }
      }
    }).toArray();
    console.log(`Emprunts avec un retour après le 2024-01-20 : ${empruntsAvecRetour.length}`);
    empruntsAvecRetour.forEach(emprunt => {
      console.log(`  - Membre : ${emprunt.membreNom}`);
    });

    // === AJOUTER AVEC LIMITE DE TAILLE ===
    console.log('\n📥 12. $push avec $slice - Garder seulement les 3 dernières entrées');
    await emprunts.updateOne(
      { membreNom: 'Dupont' },
      {
        $push: {
          historique: {
            $each: [
              { action: 'emprunt', livre: 'Test 1', date: new Date() },
              { action: 'emprunt', livre: 'Test 2', date: new Date() },
              { action: 'emprunt', livre: 'Test 3', date: new Date() }
            ],
            $slice: -3 // Garder les 3 derniers
          }
        }
      }
    );
    console.log('✅ Historique mis à jour avec limite');

    empruntDupont = await emprunts.findOne({ membreNom: 'Dupont' });
    console.log(`Nombre d'entrées dans l'historique de Dupont : ${empruntDupont.historique.length}`);

    // === AFFICHER L'ÉTAT FINAL ===
    console.log('\n📊 État final de la collection emprunts :');
    const tousEmprunts = await emprunts.find().toArray();
    tousEmprunts.forEach(emprunt => {
      console.log(`\n  ${emprunt.membreNom}`);
      console.log(`    Livres actuellement empruntés : ${emprunt.livresEmpruntes.join(', ')}`);
      console.log(`    Historique : ${emprunt.historique.length} entrées`);
    });

  } catch (error) {
    console.error('❌ Erreur :', error.message);
  } finally {
    await client.close();
    console.log('\n🔌 Connexion fermée');
  }
}

main();
