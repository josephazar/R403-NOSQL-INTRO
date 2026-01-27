# TD2 - API Airbnb Reviews

## Liste des Routes à Implémenter

| # | Méthode | Route | Arguments | Réponse Attendue |
|---|---------|-------|-----------|------------------|
| 1 | GET | `/api/reviews` | **Query**: `page` (défaut: 1), `limit` (défaut: 10) | `{ success: true, data: [...], pagination: { page, limit, total, totalPages } }` |
| 2 | GET | `/api/reviews/:id` | **Param**: `id` (ID du review) | `{ success: true, data: {...} }` ou `404` si non trouvé |
| 3 | GET | `/api/reviews/country/:country` | **Param**: `country` (nom du pays)<br>**Query**: `page`, `limit` | `{ success: true, data: [...], count, pagination }` |
| 4 | GET | `/api/reviews/property/:type` | **Param**: `type` (type de propriété)<br>**Query**: `page`, `limit` | `{ success: true, data: [...], count, pagination }` |
| 5 | GET | `/api/reviews/filter/price` | **Query**: `min` (prix min), `max` (prix max), `page`, `limit` | `{ success: true, data: [...], count, pagination }` |
| 6 | GET | `/api/reviews/filter/bedrooms` | **Query**: `min` (nombre min de chambres), `page`, `limit` | `{ success: true, data: [...], count, pagination }` |
| 7 | GET | `/api/reviews/filter/accommodates` | **Query**: `guests` (nombre de personnes), `page`, `limit` | `{ success: true, data: [...], count, pagination }` |
| 8 | GET | `/api/reviews/filter/availability` | **Query**: `days` (jours de disponibilité), `page`, `limit` | `{ success: true, data: [...], count, pagination }` |
| 9 | GET | `/api/reviews/search/name` | **Query**: `query` (texte à chercher), `page`, `limit` | `{ success: true, data: [...], count, pagination }` |
| 10 | GET | `/api/reviews/search/description` | **Query**: `query` (texte à chercher), `page`, `limit` | `{ success: true, data: [...], count, pagination }` |
| 11 | GET | `/api/reviews/filter/amenities` | **Query**: `amenities` (liste séparée par virgules), `page`, `limit` | `{ success: true, data: [...], count, searchedAmenities: [...], pagination }` |
| 12 | GET | `/api/reviews/filter/amenities-all` | **Query**: `amenities` (liste séparée par virgules), `page`, `limit` | `{ success: true, data: [...], count, requiredAmenities: [...], pagination }` |
| 13 | GET | `/api/reviews/filter/multi-country` | **Query**: `countries` (liste séparée par virgules), `page`, `limit` | `{ success: true, data: [...], count, countries: [...], pagination }` |
| 14 | GET | `/api/reviews/filter/logical-or` | **Query**: `page`, `limit` | `{ success: true, data: [...], count, query: "...", pagination }` |
| 15 | GET | `/api/reviews/filter/logical-and` | **Query**: `page`, `limit` | `{ success: true, data: [...], count, query: "...", pagination }` |
| 16 | GET | `/api/reviews/filter/exclude-property` | **Query**: `types` (liste séparée par virgules), `page`, `limit` | `{ success: true, data: [...], count, excludedTypes: [...], pagination }` |
| 17 | GET | `/api/reviews/filter/complex` | **Query**: `page`, `limit` | `{ success: true, data: [...], count, query: "...", pagination }` |
| 18 | GET | `/api/reviews/filter/review-scores` | **Query**: `minScore` (score minimum), `page`, `limit` | `{ success: true, data: [...], count, minScore, pagination }` |
| 19 | GET | `/api/reviews/filter/superhost` | **Query**: `page`, `limit` | `{ success: true, data: [...], count, pagination }` |
| 20 | GET | `/api/reviews/stats/by-country` | Aucun | `{ success: true, data: [{ country, count, averagePrice, minPrice, maxPrice }] }` |
| 21 | GET | `/api/reviews/stats/amenities` | Aucun | `{ success: true, data: [{ amenity, count }], totalUniqueAmenities }` |
| 22 | GET | `/api/reviews/filter/reviews-range` | **Query**: `min` (min reviews), `max` (max reviews), `page`, `limit` | `{ success: true, data: [...], count, pagination }` |
| 23 | PUT | `/api/reviews/:id` | **Param**: `id`<br>**Body**: `{ ...champs à modifier }` | `{ success: true, message: "Review updated successfully", modifiedCount }` |
| 24 | DELETE | `/api/reviews/:id` | **Param**: `id` | `{ success: true, message: "Review deleted successfully", deletedCount }` |
| - | POST | `/api/reviews` | **Body**: `{ _id, name, property_type, ... }` | `{ success: true, message: "Review created successfully", insertedId }` |

## Concepts MongoDB à Démontrer

- **Opérateurs de comparaison**: `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$nin`, `$ne`, `$exists`
- **Opérateurs logiques**: `$and`, `$or`, `$nor`, `$not`
- **Recherche regex**: `$regex`, `$options`
- **Opérations sur tableaux**: `$in`, `$all`, `$size`, `$elemMatch`
- **CRUD**: `insertOne`, `updateOne`, `deleteOne`, `find`, `findOne`
- **Pagination**: `skip()`, `limit()`
- **Tri et projection**: `sort()`, `project()`
- **Post-traitement JavaScript**: Agrégation sans pipeline MongoDB
