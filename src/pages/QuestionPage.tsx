import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Lightbulb, RefreshCcw } from "lucide-react";
import questionsData from "@/data/questions.json";

interface Question {
  id: string;
  text: string;
  options: { key: string; value: string }[];
  correctAnswerKey: string;
  source: string;
}

type Level = "facil" | "medio" | "dificil";

// Função para embaralhar array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const QuestionPage = () => {
  const { levelName } = useParams<{ levelName: Level }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Puxa a pontuação salva ou começa em 0
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem("portgoScore");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    // Puxa usuário salvo
    const savedUser = localStorage.getItem("portgoUser");
    if (savedUser) setUser(JSON.parse(savedUser));
    // Embaralha as perguntas ao carregar o nível
    if (levelName && questionsData[levelName]) {
      setQuestions(shuffleArray(questionsData[levelName]));
      setCurrentQuestionIndex(0);
      setScore(localStorage.getItem("portgoScore") ? parseInt(localStorage.getItem("portgoScore")!, 10) : 0);
      setSelectedAnswer(null);
      setFeedbackGiven(false);
    }
  }, [levelName]);

  // Sempre que a pontuação mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem("portgoScore", score.toString());
  }, [score]);

  useEffect(() => {
    setSelectedAnswer(null);
    setFeedbackGiven(false);
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (key: string) => {
    if (feedbackGiven) return;
    setSelectedAnswer(key);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      alert("Por favor, selecione uma opção antes de submeter.");
      return;
    }
    setFeedbackGiven(true);

    if (currentQuestion && selectedAnswer === currentQuestion.correctAnswerKey) {
      setScore((prevScore) => {
        const newScore = prevScore + 10;
        if (user) saveUserScore(user, newScore);
        return newScore;
      });
      navigate("/correct-answer", {
        state: {
          currentQuestionIndex,
          score: score + 10,
          levelName,
          questions
        }
      });
    } else {
      navigate("/wrong-answer");
    }
  };

  // O botão de próxima questão só precisa resetar estados e avançar
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setFeedbackGiven(false);
      setSelectedAnswer(null);
    } else {
      navigate("/select-level");
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
        Carregando pergunta... ou sem perguntas disponíveis.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(135deg, #3b82f6 0px, #3b82f6 2px, transparent 2px, transparent 8px)', backgroundSize: '16px 16px' }}></div>

      {/* Header */}
      <div className="w-full max-w-3xl flex justify-between items-center bg-white/90 dark:bg-gray-800/90 p-6 rounded-2xl shadow-lg z-10 mb-6 border border-blue-200 dark:border-gray-700">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src="/PortGO_logo branco.png" alt="PortGO Logo" className="h-14 w-auto drop-shadow" />
            <span className="font-bold text-2xl text-blue-700 dark:text-blue-300"></span>
          </Link>
          {user && (
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Jogador: <span className="font-semibold">{user.name || user.email}</span>
            </div>
          )}
        </div>
        <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">
          Pontuação: <span className="font-bold">{score}</span>
        </span>
      </div>

      {/* Card da Pergunta */}
      <Card className="w-full max-w-3xl rounded-2xl p-8 flex flex-col gap-6 shadow-2xl z-10 bg-white/95 dark:bg-gray-800/95 border border-blue-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="text-base font-medium text-blue-600 dark:text-blue-400">
            Nível: <span className="font-semibold">{levelName || "Não Definido"}</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Fonte: <span className="font-semibold">{currentQuestion.source}</span>
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-gray-700 p-5 rounded-lg text-lg leading-relaxed text-gray-900 dark:text-gray-100 shadow-inner border border-blue-100 dark:border-gray-600">
          {currentQuestion.text}
        </div>

        {/* Opções */}
        <div className="grid gap-3 mt-2">
          {currentQuestion.options.map((option) => (
            <Button
              key={option.key}
              variant={selectedAnswer === option.key ? "default" : "outline"}
              className={`justify-start text-left py-4 px-5 rounded-lg text-base font-medium transition-colors
                ${selectedAnswer === option.key ? "bg-blue-600 text-white" : "border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600"}
                ${feedbackGiven && option.key === currentQuestion.correctAnswerKey ? "bg-green-500 text-white animate-pulse" : ""}
                ${feedbackGiven && selectedAnswer === option.key && selectedAnswer !== currentQuestion.correctAnswerKey ? "bg-red-500 text-white" : ""}
              `}
              onClick={() => handleOptionClick(option.key)}
              disabled={feedbackGiven}
            >
              <span className="font-bold w-6">{option.key})</span> {option.value}
            </Button>
          ))}
        </div>

        {/* Botão de Submeter/Próxima Pergunta */}
        <Button
          onClick={feedbackGiven ? handleNextQuestion : handleSubmitAnswer}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 text-lg rounded-xl shadow-lg font-semibold tracking-wide"
        >
          {feedbackGiven
            ? currentQuestionIndex < questions.length - 1
              ? "Próxima Pergunta"
              : "Finalizar"
            : "Submeter Resposta"}
        </Button>
      </Card>

      {/* Barra de Ações Inferior */}
      <div className="w-full max-w-3xl flex justify-around items-center bg-white/90 dark:bg-gray-800/90 p-4 mt-8 rounded-2xl shadow-lg z-10 border border-blue-200 dark:border-gray-700">
        <Button variant="ghost" className="flex flex-col items-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700">
          <BookOpen className="h-7 w-7" />
          <span className="text-xs mt-1 font-medium">Cartas</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700">
          <Lightbulb className="h-7 w-7" />
          <span className="text-xs mt-1 font-medium">Dica</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700">
          <RefreshCcw className="h-7 w-7" />
          <span className="text-xs mt-1 font-medium">Trocar</span>
        </Button>
      </div>
    </div>
  );
};

export default QuestionPage;