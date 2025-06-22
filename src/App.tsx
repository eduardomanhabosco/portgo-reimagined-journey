import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import GamePage from "./pages/GamePage";
import LevelSelectionPage from "./pages/LevelSelectionPage"; // Importar a nova página de seleção de níveis
import QuestionPage from "./pages/QuestionPage"; // Importar QuestionPage
import CorrectAnswerPage from "./pages/CorrectAnswerPage"; // Importar CorrectAnswerPage
import WrongAnswerPage from "./pages/WrongAnswerPage"; // Importar WrongAnswerPage
import { AuthProvider } from "./contexts/AuthContext";
import RankingPage from "./pages/RankingPage";
import SettingsPage from "./pages/SettingsPage"; // Importe a página

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider> {/* Envolva suas rotas aqui */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
             <Route path="/settings" element={<SettingsPage />} />
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/select-level" element={<LevelSelectionPage />} />
            <Route path="/game/question/:levelName" element={<QuestionPage />} />
            <Route path="/correct-answer" element={<CorrectAnswerPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/wrong-answer" element={<WrongAnswerPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;