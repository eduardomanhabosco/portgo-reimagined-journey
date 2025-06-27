// src/pages/RulesPage.tsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const RulesPage = () => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      {/* Botão Voltar */}
      <div className="absolute top-6 left-6 z-10">
        <Button asChild variant="ghost" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
          <Link to="/select-level">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a Seleção de Nível
          </Link>
        </Button>
      </div>

      <div className="text-center w-full max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Regras do <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">PortGO</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          O PortGO é um jogo de perguntas e respostas que abrange todo o conteúdo de Matemática do Ensino Fundamental e Médio, através do qual você pode estudar Matemática para o ENEM ou Vestibular em quanto se diverte no processo!
        </p>

        <div className="text-left space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Iniciando uma Partida:</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Ao iniciar uma nova partida, você seleciona o nível em que quer jogar e as perguntas serão sorteadas pelo sistema. A partir daí, você é desafiado a respondê-las!
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Ajudas Disponíveis:</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Caso encontre dificuldades em uma questão, você pode utilizar as ajudas disponibilizadas no menu a esquerda, essas ajudas são:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li><strong className="text-blue-600 dark:text-blue-400">CARTAS:</strong> Remove alternativas deixando apenas a correta e uma incorreta, aumentando suas chances de acertar para 50/50;</li>
            <li><strong className="text-green-600 dark:text-green-400">DICA:</strong> Você recebe uma dica sobre como desenvolver a questão, no formato de uma breve explicação ou uma fórmula matemática necessária para a resolução do problema;</li>
            <li><strong className="text-purple-600 dark:text-purple-400">TROCAR:</strong> A questão atual é substituída por outra de mesmo nível sobre um conteúdo diferente.</li>
          </ul>
          <p className="text-orange-600 dark:text-orange-400 font-semibold mt-4">
            ATENÇÃO: Toda ajuda só poderá ser usada uma vez por partida, mas não poderá utilizar duas ajudas na mesma questão.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Fases e Pontuação:</h2>
          <p className="text-gray-700 dark:text-gray-300">
            O jogo possui 4 fases de dificuldade crescente, estas são definidas por:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li><strong className="text-green-600 dark:text-green-400">1ª fase:</strong> 5 perguntas de nível fácil, 1.000 pontos por cada resposta certa</li>
            <li><strong className="text-blue-600 dark:text-blue-400">2ª fase:</strong> 5 perguntas de nível médio, 10.000 pontos por cada resposta certa</li>
            <li><strong className="text-red-600 dark:text-red-400">3ª fase:</strong> 5 perguntas de nível difícil, 100.000 pontos por cada resposta certa</li>
            <li><strong className="text-purple-600 dark:text-purple-400">4ª fase:</strong> 1 pergunta de nível difícil, 1.000.000 pontos</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Fim da Partida:</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Cada partida pode terminar de 4 maneiras diferentes:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li><strong className="text-green-600 dark:text-green-400">Vitória:</strong> Ao responder a última questão corretamente, você recebe 1.000.000 pontos</li>
            <li><strong className="text-red-600 dark:text-red-400">Derrota:</strong> Ao errar qualquer questão, você recebe metade dos pontos que conquistou</li>
            <li><strong className="text-blue-600 dark:text-blue-400">Desistência:</strong> Ao escolher não responder uma questão, você recebe todos os pontos que já conquistou</li>
            <li><strong className="text-gray-600 dark:text-gray-400">Inatividade:</strong> Ao ficar inativo por mais de 2 horas, você não recebe nenhum ponto</li>
          </ul>
        </div>

        <div className="mt-12">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg rounded-xl shadow-lg"
          >
            <Link to="/select-level">
              Entendi! Voltar para Jogar
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default RulesPage;