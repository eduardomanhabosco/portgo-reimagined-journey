import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const buttonClass =
  "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all";

const GamePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 text-center p-4">
      <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        Bem-vindo ao Jogo!
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl">
       Pronto para Aprender e Jogar? Vamos começar sua jornada no PortGO!</p>
      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
        <Button asChild size="lg" className={buttonClass}>
          <Link to="/select-level">Começar Jogo</Link>
        </Button>
        <Button asChild size="lg" className={buttonClass}>
          <Link to="/">Voltar para o Início</Link>
        </Button>
      </div>
    </div>
  );
};

export default GamePage;