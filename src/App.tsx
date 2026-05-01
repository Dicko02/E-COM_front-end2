import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";

import { Header } from "./components/Complements/Header";
import { Footer } from "./components/Complements/Footer";
import { CookieConsent } from "./components/Complements/CookieConsent";
import { Sidebar } from "./components/Complements/Sidebar";
import { PrivateRoute } from "./utils/PrivateRoute";

// Pages Client
import { AccueilPage } from "./pages/Accueil.page";
import { ConnexionPage } from "./pages/Connexion.page";
import { InscriptionPage } from "./pages/Inscription.page";
import { ProduitsPage } from "./pages/Produits.page";
import { ProduitDetailPage } from "./pages/ProduitDetail.page";
import { PanierPage } from "./pages/Panier.page";
import { CommandesPage } from "./pages/Commandes.page";
import { CommandeDetailPage } from "./pages/CommandeDetail.page";
import { CommandeConfirmationPage } from "./pages/CommandeConfirmation.page";
import { PaiementConfirmationPage } from "./pages/PaiementConfirmation.page";

// Pages Admin
import { DashboardPage } from "./pages/Admin/Dashboard.page";
import { ProduitsAdminPage } from "./pages/Admin/ProduitsAdmin.page";
import { CreateProduitPage } from "./pages/Admin/CreateProduit.page";
import { EditProduitPage } from "./pages/Admin/EditProduit.page";
import { CategoriesAdminPage } from "./pages/Admin/CategoriesAdmin.page";
import { CommandesAdminPage } from "./pages/Admin/CommandesAdmin.page";
import { ClientsAdminPage } from "./pages/Admin/ClientsAdmin.page";

import { EditCategoriePage } from "./pages/Admin/EditCategorie.page";
import { NotFoundPage } from "./pages/NotFound.page";
import { LegalPage } from "./pages/Legal.page";
import { TermsPage } from "./pages/Terms.page";
import { PrivacyPage } from "./pages/Privacy.page";
import { CookiesPage } from "./pages/Cookies.page";
import { ContactPage } from "./pages/Contact.page";

// Composant interne pour accéder à useLocation
const AppLayout = () => {
  const location = useLocation();
  // Pages sans header/footer
  const standalonePages = ['/connexion', '/inscription'];
  const isStandalone = standalonePages.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {!isStandalone && <Header />}

      {/* Layout avec Sidebar pour les pages admin */}
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 w-full overflow-x-hidden">
          <Routes>
            {/* Public */}
            <Route path="/connexion" element={<ConnexionPage />} />
            <Route path="/inscription" element={<InscriptionPage />} />

            {/* Client */}
            <Route path="/" element={<AccueilPage />} />
            <Route path="/produits" element={<ProduitsPage />} />
            <Route path="/produits/:id" element={<ProduitDetailPage />} />
            <Route path="/panier" element={<PrivateRoute><PanierPage /></PrivateRoute>} />
            <Route path="/commandes" element={<PrivateRoute><CommandesPage /></PrivateRoute>} />
            <Route path="/commandes/confirmation/:id" element={<PrivateRoute><CommandeConfirmationPage /></PrivateRoute>} />
            <Route path="/paiement/confirmation/:orderId" element={<PrivateRoute><PaiementConfirmationPage /></PrivateRoute>} />
            <Route path="/commandes/:id" element={<PrivateRoute><CommandeDetailPage /></PrivateRoute>} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<PrivateRoute adminOnly><DashboardPage /></PrivateRoute>} />
            <Route path="/admin/produits" element={<PrivateRoute adminOnly><ProduitsAdminPage /></PrivateRoute>} />
            <Route path="/admin/produits/nouveau" element={<PrivateRoute adminOnly><CreateProduitPage /></PrivateRoute>} />
            <Route path="/admin/categories" element={<PrivateRoute adminOnly><CategoriesAdminPage /></PrivateRoute>} />
            <Route path="/admin/commandes" element={<PrivateRoute adminOnly><CommandesAdminPage /></PrivateRoute>} />
            <Route path="/admin/clients" element={<PrivateRoute adminOnly><ClientsAdminPage /></PrivateRoute>} />
            <Route path="/admin/produits/modifier/:id" element={<PrivateRoute adminOnly><EditProduitPage /></PrivateRoute>} />
            <Route path="/admin/categories/edit/:id" element={<PrivateRoute adminOnly><EditCategoriePage /></PrivateRoute>} />

            {/* Pages légales */}
            <Route path="/mentions-legales" element={<LegalPage />} />
            <Route path="/conditions-generales" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>

      {!isStandalone && <Footer />}
    </div>
  );
};

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <BrowserRouter>
            <AppLayout />
            <CookieConsent />
          </BrowserRouter>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
