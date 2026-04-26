/**
 * En production, on désactive console.error et console.warn
 * pour ne pas exposer les détails d'erreurs internes dans la console du navigateur.
 * En développement, tout reste visible normalement.
 */
if (import.meta.env.PROD) {
  console.error = () => {};
  console.warn  = () => {};
  console.log   = () => {};
}
