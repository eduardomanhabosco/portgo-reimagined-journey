// src/components/Header.tsx
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"; // Importe o Link

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-xl group-hover:scale-105 transition-transform">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                PortGO
              </h1>
              <p className="text-xs text-blue-600 font-medium">Português Online</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Início
            </a>
            <a href="#exercicios" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Exercícios
            </a>
            <a href="#ranking" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Ranking
            </a>
            <a href="#sobre" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Sobre
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              <Link to="/login"> {/* Botão "Entrar" agora leva para /login */}
                <User className="h-4 w-4 mr-2" />
                Entrar
              </Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
              <Link to="/login"> {/* Botão "Começar Agora" agora leva para /login */}
                Começar Agora
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg border border-blue-100">
            <nav className="flex flex-col space-y-3 px-4">
              <a href="#inicio" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                Início
              </a>
              <a href="#exercicios" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                Exercícios
              </a>
              <a href="#ranking" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                Ranking
              </a>
              <a href="#sobre" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                Sobre
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-blue-100">
                <Button asChild variant="ghost" className="text-blue-600 justify-start">
                  <Link to="/login"> {/* Botão "Entrar" no menu mobile */}
                    <User className="h-4 w-4 mr-2" />
                    Entrar
                  </Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <Link to="/login"> {/* Botão "Começar Agora" no menu mobile */}
                    Começar Agora
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};