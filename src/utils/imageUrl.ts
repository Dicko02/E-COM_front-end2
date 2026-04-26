/**
 * Construit l'URL complète d'une image produit.
 *
 * Le back-end stocke soit :
 *  - un nom de fichier seul  : "product-123.jpg"
 *  - une URL complète déjà   : "http://localhost:5000/uploads/product-123.jpg"
 *
 * On retourne toujours une URL complète utilisable dans un <img src>.
 */
const API_ORIGIN = (import.meta as any).env?.VITE_API_BASE_URL
  ? (import.meta as any).env.VITE_API_BASE_URL.replace('/api', '')
  : 'http://localhost:5000';

export function getImageUrl(image?: string | null): string {
  if (!image) return '';

  // Déjà une URL complète
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  // Nom de fichier seul → on préfixe avec l'origine du serveur
  return `${API_ORIGIN}/uploads/${image}`;
}
