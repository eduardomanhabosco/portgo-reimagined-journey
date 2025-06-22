// src/pages/WrongAnswerPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

const WrongAnswerPage = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    // Em uma aplicação real, você poderia voltar para a mesma pergunta
    // ou dar uma nova. Para esta demo, volta para o game.
    navigate('/select-level');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 text-center p-4">
      <XCircle className="h-32 w-32 text-red-600 dark:text-red-400 mb-6 animate-shake" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-700 dark:text-red-300">
        Resposta Incorreta!
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-xl">
        Não desanime! Analise a questão e tente novamente para melhorar.
      </p>
      <Button
        onClick={handleTryAgain}
        size="lg"
        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg rounded-xl shadow-lg"
      >
        Tentar Novamente
      </Button>
    </div>
  );
};

export default WrongAnswerPage;