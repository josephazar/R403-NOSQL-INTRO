/**
 * 08 - Mise à Jour de Documents (UPDATE)
 *
 * Ce script montre comment mettre à jour des documents dans MongoDB.
 * On utilise updateOne() pour un document et updateMany() pour plusieurs.
 *
 * Opérateurs principaux :
 * - $set : modifier ou ajouter un champ
 * - $unset : supprimer un champ
 * - $inc : incrémenter/décrémenter une valeur
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

    // === $set : MODIFIER UN CHAMP ===
    console.log('✏️ 1. Modifier avec $set - Marquer "1984" comme non disponible');
    const result1 = await livres.updateOne(
      { titre: '1984' }, // WHERE
      { $set: { disponible: false } }
    );
    console.log(`Documents modifiés : ${result1.modifiedCount}`);

    // Vérification
    const livre1984 = await livres.findOne({ titre: '1984' });
    console.log(`Vérification : 1984 est ${livre1984.disponible ? 'disponible' : 'non disponible'}`);

    // === $set : AJOUTER UN NOUVEAU CHAMP ===
    console.log('\n✏️ 2. Ajouter un nouveau champ - Ajouter "langue" au Petit Prince');
    const result2 = await livres.updateOne(
      { titre: 'Le Petit Prince' },
      { $set: { langue: 'Français' } }
    );
    console.log(`Documents modifiés : ${result2.modifiedCount}`);

    const petitPrince = await livres.findOne({ titre: 'Le Petit Prince' });
    console.log(`Vérification : Langue = ${petitPrince.langue}`);

    // === $set : MODIFIER PLUSIEURS CHAMPS ===
    console.log('\n✏️ 3. Modifier plusieurs champs - Mettre à jour "Les Misérables"');
    const result3 = await livres.updateOne(
      { titre: 'Les Misérables' },
      {
        $set: {
          disponible: false,
          nombreExemplaires: 3,
          langue: 'Français'
        }
      }
    );
    console.log(`Documents modifiés : ${result3.modifiedCount}`);

    // === $set : MODIFIER UN CHAMP IMBRIQUÉ ===
    console.log('\n✏️ 4. Modifier un champ imbriqué - Changer la ville d\'un membre');
    const result4 = await membres.updateOne(
      { nom: 'Dupont' },
      { $set: { 'adresse.ville': 'Bordeaux' } }
    );
    console.log(`Documents modifiés : ${result4.modifiedCount}`);

    const membreDupont = await membres.findOne({ nom: 'Dupont' });
    console.log(`Vérification : ${membreDupont.prenom} ${membreDupont.nom} habite maintenant à ${membreDupont.adresse.ville}`);

    // === $inc : INCRÉMENTER UNE VALEUR ===
    console.log('\n✏️ 5. Incrémenter avec $inc - Augmenter le nombre d\'exemplaires de "Harry Potter"');
    const result5 = await livres.updateOne(
      { titre: /Harry Potter/i },
      { $inc: { nombreExemplaires: 2 } } // Ajouter 2 exemplaires
    );
    console.log(`Documents modifiés : ${result5.modifiedCount}`);

    const harryPotter = await livres.findOne({ titre: /Harry Potter/i });
    console.log(`Vérification : Nombre d'exemplaires = ${harryPotter.nombreExemplaires}`);

    // === $inc : DÉCRÉMENTER UNE VALEUR ===
    console.log('\n✏️ 6. Décrémenter avec $inc - Diminuer le nombre d\'exemplaires du "Seigneur des Anneaux"');
    const result6 = await livres.updateOne(
      { titre: /Seigneur des Anneaux/i },
      { $inc: { nombreExemplaires: -1 } } // Retirer 1 exemplaire
    );
    console.log(`Documents modifiés : ${result6.modifiedCount}`);

    const seigneur = await livres.findOne({ titre: /Seigneur des Anneaux/i });
    console.log(`Vérification : Nombre d'exemplaires = ${seigneur.nombreExemplaires}`);

    // === $unset : SUPPRIMER UN CHAMP ===
    console.log('\n✏️ 7. Supprimer un champ avec $unset - Retirer le champ "langue" de "1984"');
    const result7 = await livres.updateOne(
      { titre: '1984' },
      { $unset: { langue: '' } }
    );
    console.log(`Documents modifiés : ${result7.modifiedCount}`);

    const livre1984Maj = await livres.findOne({ titre: '1984' });
    console.log(`Vérification : Champ "langue" existe ? ${livre1984Maj.langue !== undefined}`);

    // === updateMany : METTRE À JOUR PLUSIEURS DOCUMENTS ===
    console.log('\n✏️ 8. Mettre à jour plusieurs documents - Ajouter "langue: Français" à tous les livres français');
    const result8 = await livres.updateMany(
      {
        $or: [
          { auteur: /Victor Hugo/i },
          { auteur: /Saint-Exupéry/i }
        ]
      },
      { $set: { langue: 'Français' } }
    );
    console.log(`Documents modifiés : ${result8.modifiedCount}`);

    // === updateMany : METTRE À JOUR TOUS LES DOCUMENTS ===
    console.log('\n✏️ 9. Ajouter un champ à tous les livres - Ajouter "dateAjout"');
    const result9 = await livres.updateMany(
      {},
      { $set: { dateAjout: new Date('2024-01-01') } }
    );
    console.log(`Documents modifiés : ${result9.modifiedCount}`);

    // === UPSERT : UPDATE OU INSERT ===
    console.log('\n✏️ 10. Upsert - Mettre à jour ou créer si n\'existe pas');
    const result10 = await livres.updateOne(
      { titre: 'Le Comte de Monte-Cristo' },
      {
        $set: {
          auteur: 'Alexandre Dumas',
          anneePublication: 1844,
          genre: 'Roman',
          isbn: '978-2-253-09633-5',
          disponible: true,
          nombreExemplaires: 2
        }
      },
      { upsert: true } // Créer le document s'il n'existe pas
    );
    console.log(`Document créé : ${result10.upsertedCount}`);
    console.log(`Document modifié : ${result10.modifiedCount}`);

    // === COMBINAISON D'OPÉRATEURS ===
    console.log('\n✏️ 11. Combinaison - Modifier plusieurs champs avec différents opérateurs');
    const result11 = await livres.updateOne(
      { titre: 'Le Petit Prince' },
      {
        $set: { disponible: true },
        $inc: { nombreExemplaires: 1 }
      }
    );
    console.log(`Documents modifiés : ${result11.modifiedCount}`);

    const petitPrinceMaj = await livres.findOne({ titre: 'Le Petit Prince' });
    console.log(`Vérification : disponible=${petitPrinceMaj.disponible}, exemplaires=${petitPrinceMaj.nombreExemplaires}`);

    // === AFFICHER L'ÉTAT FINAL ===
    console.log('\n📊 État final de la collection livres :');
    const tousLivres = await livres.find().toArray();
    tousLivres.forEach(livre => {
      console.log(`\n  ${livre.titre} (${livre.auteur})`);
      console.log(`    Disponible: ${livre.disponible}, Exemplaires: ${livre.nombreExemplaires}`);
      console.log(`    Langue: ${livre.langue || 'Non spécifiée'}`);
    });

  } catch (error) {
    console.error('❌ Erreur :', error.message);
  } finally {
    await client.close();
    console.log('\n🔌 Connexion fermée');
  }
}

main();
