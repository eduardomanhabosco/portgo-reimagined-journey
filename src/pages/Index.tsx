import { useAuth } from "@/contexts/AuthContext";
import DashboardPage from "./DashboardPage";
import PublicHomePage from "./PublicHomePage";

const Index = () => {
  const { isAuthenticated } = useAuth();

  // Se o usuário estiver autenticado, mostra o Dashboard.
  // Caso contrário, mostra a página inicial pública.
  return isAuthenticated ? <DashboardPage /> : <PublicHomePage />;
};

export default Index;