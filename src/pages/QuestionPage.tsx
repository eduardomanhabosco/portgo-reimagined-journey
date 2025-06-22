import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import apiClient from "@/api";
import { toast } from "sonner";
import { useTheme } from "@/components/ThemeProvider"; // 1. Importar o hook de tema

interface Question { id: string; text: string; options: { key: string; value: string }[]; correct_answer_key: string; source: string; }
type Level = "facil" | "medio" | "dificil";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
  return arr;
}

const QuestionPage = () => {
  const { theme } = useTheme(); // 2. Usar o hook para pegar o tema atual
  const { levelName } = useParams<{ levelName: Level }>();
  const navigate = useNavigate();
  const { auth, updateUserScore } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!levelName) return;
    setLoading(true);
    apiClient.get<Question[]>(`/questions/${levelName}`)
      .then(response => { setQuestions(shuffleArray(response.data)); setCurrentQuestionIndex(0); })
      .catch(error => console.error("Erro ao buscar questões:", error))
      .finally(() => setLoading(false));
  }, [levelName]);

  useEffect(() => { setSelectedAnswer(null); setIsSubmitting(false); }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (key: string) => { if (isSubmitting) return; setSelectedAnswer(key); };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || isSubmitting) return;
    setIsSubmitting(true);
    const isCorrect = selectedAnswer === currentQuestion.correct_answer_key;

    if (isCorrect) {
      toast.success("Resposta correta! +10 pontos.", { duration: 2000 });
      if (auth.user) {
        const newScore = auth.user.score + 10;
        updateUserScore(newScore);
        try { await apiClient.put(`/users/${auth.user.id}/score`, { score: newScore }); }
        catch (error) { console.error("Erro ao sincronizar pontuação:", error); }
      }
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) { setCurrentQuestionIndex(prev => prev + 1); }
        else { alert("Parabéns! Você completou todas as questões deste nível!"); navigate("/select-level"); }
      }, 1500);
    } else {
      navigate("/wrong-answer");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">Carregando questões...</div>;
  if (!currentQuestion) return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">Nenhuma questão encontrada. <Link to="/select-level" className="text-blue-600 hover:underline ml-2">Voltar</Link></div>;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-3xl flex justify-between items-center bg-white/90 dark:bg-gray-800/90 p-4 rounded-2xl shadow-lg mb-6">
        <div>
          <Link to="/">            <img
              src={theme === 'dark' ? '/PortGO_logo branco.png' : '/PortGO_logo preto.png'}
              alt="PortGO Logo"
              className="h-24 w-auto"
            /></Link>
          {auth.user && <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Jogador: <span className="font-semibold">{auth.user.name}</span></div>}
        </div>
        <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">Pontuação: <span className="font-bold">{auth.user?.score ?? 0}</span></span>
      </div>
      <Card className="w-full max-w-3xl rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="font-medium text-blue-600">Nível: <span className="font-semibold">{levelName}</span></div>
          <div>Fonte: <span className="font-semibold">{currentQuestion.source}</span></div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/50 p-5 rounded-lg text-lg leading-relaxed text-gray-800 dark:text-gray-100">{currentQuestion.text}</div>
        <div className="grid gap-3 mt-2">
            {currentQuestion.options.map((option) => (
              <Button
                key={option.key}
                variant={selectedAnswer === option.key ? "default" : "outline"}
                className={`justify-start text-left h-auto py-3 text-base font-medium transition-colors dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 ${selectedAnswer === option.key ? 'bg-blue-600 text-white' : ''} ${isSubmitting && option.key === currentQuestion.correct_answer_key ? 'bg-green-500 text-white animate-pulse' : ''} ${isSubmitting && selectedAnswer === option.key && selectedAnswer !== currentQuestion.correct_answer_key ? 'bg-red-500 text-white' : ''}`}
                onClick={() => handleOptionClick(option.key)}
                disabled={isSubmitting}
              >
                <span className="font-bold w-6">{option.key})</span> {option.value}
              </Button>
            ))}
        </div>
        <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer || isSubmitting} className="mt-6 w-full py-4 text-lg">
            {isSubmitting ? "Verificando..." : "Submeter Resposta"}
        </Button>
      </Card>
    </div>
  );
};
export default QuestionPage;