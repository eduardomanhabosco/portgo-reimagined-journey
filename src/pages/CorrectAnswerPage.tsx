// src/pages/CorrectAnswerPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const CorrectAnswerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentQuestionIndex = 0, score = 0, levelName = "facil", questions = [] } = location.state || {};

  const handleContinue = () => {
    // Se houver próxima questão, volta para QuestionPage com o próximo índice
    if (questions.length > currentQuestionIndex + 1) {
      navigate(`/game/question/${levelName}`, {
        state: {
          currentQuestionIndex: currentQuestionIndex + 1,
          score,
          questions
        }
      });
    } else {
      // Se acabou, volta para seleção de nível
      navigate("/select-level");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 text-center p-4">
      <CheckCircle className="h-32 w-32 text-green-600 dark:text-green-400 mb-6 animate-bounce" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-700 dark:text-green-300">
        Resposta Correta!
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-xl">
        Parabéns, você acertou! Continue assim para dominar o português.
      </p>
      <Button
        onClick={handleContinue}
        size="lg"
        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg rounded-xl shadow-lg"
      >
        Continuar
      </Button>
    </div>
  );
};

export default CorrectAnswerPage;