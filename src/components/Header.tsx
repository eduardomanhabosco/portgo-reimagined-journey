// src/components/Header.tsx
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <Link to="/">
              <img
                src="/PortGO_logo branco.png" // Caminho para o logo na pasta public
                alt="PortGO Logo"
                className="h-24 w-auto group-hover:scale-150 transition-transform" // Aumentado para h-20 (80px)
              />
            </Link>
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
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                Entrar
              </Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
              <Link to="/signup">
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
                  <Link to="/login">
                    <User className="h-4 w-4 mr-2" />
                    Entrar
                  </Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <Link to="/login">
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