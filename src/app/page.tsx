"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Home, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tipos de categorias
type Category = "Superação" | "Motivacional" | "Trabalho" | "Família" | "Viagem" | "Bem-estar" | "Religião" | "Foco" | "Treino" | "Estudos";

// Interface para as frases
interface Quote {
  text: string;
  author: string;
  category: Category;
  image: string;
}

// Base de frases motivacionais com imagens reais do Unsplash
const quotes: Quote[] = [
  // Superação
  {
    text: "A força não vem da capacidade física, mas de uma vontade indomável.",
    author: "Mahatma Gandhi",
    category: "Superação",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop"
  },
  {
    text: "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    author: "Robert Collier",
    category: "Superação",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop"
  },
  
  // Motivacional
  {
    text: "Acredite em si mesmo e tudo será possível.",
    author: "Anônimo",
    category: "Motivacional",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop"
  },
  {
    text: "O único lugar onde o sucesso vem antes do trabalho é no dicionário.",
    author: "Vidal Sassoon",
    category: "Motivacional",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop"
  },
  
  // Trabalho
  {
    text: "Escolha um trabalho que você ame e não terá que trabalhar um único dia.",
    author: "Confúcio",
    category: "Trabalho",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&h=800&fit=crop"
  },
  {
    text: "A persistência é o caminho do êxito.",
    author: "Charles Chaplin",
    category: "Trabalho",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop"
  },
  
  // Família
  {
    text: "A família é o porto seguro onde sempre podemos voltar.",
    author: "Anônimo",
    category: "Família",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=800&fit=crop"
  },
  {
    text: "O amor de uma família é a maior bênção da vida.",
    author: "Anônimo",
    category: "Família",
    image: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=1200&h=800&fit=crop"
  },
  
  // Viagem
  {
    text: "Viajar é a única coisa que você compra e te faz mais rico.",
    author: "Anônimo",
    category: "Viagem",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop"
  },
  {
    text: "A vida é uma jornada, não um destino.",
    author: "Ralph Waldo Emerson",
    category: "Viagem",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=800&fit=crop"
  },
  
  // Bem-estar
  {
    text: "Cuide do seu corpo, é o único lugar que você tem para viver.",
    author: "Jim Rohn",
    category: "Bem-estar",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop"
  },
  {
    text: "A paz interior começa no momento em que você escolhe não permitir que outra pessoa controle suas emoções.",
    author: "Pema Chödrön",
    category: "Bem-estar",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&h=800&fit=crop"
  },
  
  // Religião
  {
    text: "A fé move montanhas.",
    author: "Mateus 17:20",
    category: "Religião",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&h=800&fit=crop"
  },
  {
    text: "Entregue suas preocupações a Deus, Ele cuidará de você.",
    author: "1 Pedro 5:7",
    category: "Religião",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1200&h=800&fit=crop"
  },
  
  // Foco
  {
    text: "Concentre-se no que você pode controlar e deixe o resto ir.",
    author: "Anônimo",
    category: "Foco",
    image: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=1200&h=800&fit=crop"
  },
  {
    text: "Onde está sua atenção, está sua vida.",
    author: "Anônimo",
    category: "Foco",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop"
  },
  
  // Treino
  {
    text: "Seu corpo pode suportar quase tudo. É sua mente que você precisa convencer.",
    author: "Anônimo",
    category: "Treino",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop"
  },
  {
    text: "A dor que você sente hoje será a força que você sentirá amanhã.",
    author: "Anônimo",
    category: "Treino",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop"
  },
  
  // Estudos
  {
    text: "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
    author: "Nelson Mandela",
    category: "Estudos",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=800&fit=crop"
  },
  {
    text: "Quanto mais você lê, mais coisas você saberá. Quanto mais você aprende, mais lugares você irá.",
    author: "Dr. Seuss",
    category: "Estudos",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop"
  }
];

// Interface para entradas do diário
interface DiaryEntry {
  id: string;
  date: string;
  mood: string;
  note: string;
  categories: Category[];
}

export default function YFCOApp() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | "Todas">("Todas");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [currentView, setCurrentView] = useState<"quotes" | "diary">("quotes");
  const [newDiaryNote, setNewDiaryNote] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedDiaryCategories, setSelectedDiaryCategories] = useState<Category[]>([]);

  const categories: (Category | "Todas")[] = ["Todas", "Superação", "Motivacional", "Trabalho", "Família", "Viagem", "Bem-estar", "Religião", "Foco", "Treino", "Estudos"];

  // Filtrar frases por categoria
  const filteredQuotes = selectedCategory === "Todas" 
    ? quotes 
    : quotes.filter(q => q.category === selectedCategory);

  const currentQuote = filteredQuotes[currentQuoteIndex];

  // Navegação entre frases
  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % filteredQuotes.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + filteredQuotes.length) % filteredQuotes.length);
  };

  // Favoritar frase
  const toggleFavorite = () => {
    const globalIndex = quotes.indexOf(currentQuote);
    setFavorites(prev => 
      prev.includes(globalIndex) 
        ? prev.filter(i => i !== globalIndex)
        : [...prev, globalIndex]
    );
  };

  const isFavorite = favorites.includes(quotes.indexOf(currentQuote));

  // Adicionar entrada no diário
  const addDiaryEntry = () => {
    if (newDiaryNote.trim() && selectedMood && selectedDiaryCategories.length > 0) {
      const entry: DiaryEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('pt-BR'),
        mood: selectedMood,
        note: newDiaryNote,
        categories: selectedDiaryCategories
      };
      setDiaryEntries([entry, ...diaryEntries]);
      setNewDiaryNote("");
      setSelectedMood("");
      setSelectedDiaryCategories([]);
    }
  };

  // Recomendações personalizadas baseadas no diário
  const getPersonalizedQuotes = () => {
    if (diaryEntries.length === 0) return quotes.slice(0, 3);
    
    const userCategories = diaryEntries.flatMap(e => e.categories);
    const categoryCounts = userCategories.reduce((acc, cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topCategories = Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cat]) => cat as Category);
    
    return quotes.filter(q => topCategories.includes(q.category)).slice(0, 5);
  };

  const personalizedQuotes = getPersonalizedQuotes();

  // Alternar categoria do diário
  const toggleDiaryCategory = (cat: Category) => {
    setSelectedDiaryCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Mobile-First */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">YFCO</h1>
            <div className="flex gap-1 sm:gap-2">
              <Button
                variant={currentView === "quotes" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("quotes")}
                className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
              >
                <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Frases</span>
              </Button>
              <Button
                variant={currentView === "diary" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("diary")}
                className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
              >
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Diário</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="pb-6">
        {currentView === "quotes" ? (
          <div className="space-y-4 sm:space-y-6">
            {/* Filtro de Categorias - Mobile Scroll Horizontal */}
            <div className="px-4 pt-4">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentQuoteIndex(0);
                    }}
                    className="rounded-full whitespace-nowrap text-xs sm:text-sm flex-shrink-0"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Card Principal da Frase - Mobile Optimized */}
            <div className="px-4">
              <Card className="overflow-hidden shadow-lg">
                <div 
                  className="relative h-[70vh] sm:h-[500px] md:h-[600px] flex items-center justify-center bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentQuote.image})` }}
                >
                  {/* Overlay escuro para melhor legibilidade */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
                  
                  {/* Conteúdo da Frase */}
                  <div className="relative z-10 text-center px-6 sm:px-8 md:px-12 max-w-3xl">
                    <p className="text-lg sm:text-2xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-relaxed drop-shadow-2xl">
                      "{currentQuote.text}"
                    </p>
                    <p className="text-sm sm:text-lg md:text-xl text-white/90 font-medium drop-shadow-lg">
                      — {currentQuote.author}
                    </p>
                    <div className="mt-4 sm:mt-6">
                      <span className="inline-block bg-white/20 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white text-xs sm:text-sm font-medium">
                        {currentQuote.category}
                      </span>
                    </div>
                  </div>

                  {/* Botões de Navegação - Mobile Optimized */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevQuote}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full w-10 h-10 sm:w-12 sm:h-12"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextQuote}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full w-10 h-10 sm:w-12 sm:h-12"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Button>

                  {/* Botão de Favoritar */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFavorite}
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full w-10 h-10 sm:w-12 sm:h-12"
                  >
                    <Heart 
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
                    />
                  </Button>
                </div>
              </Card>

              {/* Indicador de Posição */}
              <div className="text-center mt-3 text-gray-600 text-sm">
                {currentQuoteIndex + 1} / {filteredQuotes.length}
              </div>
            </div>

            {/* Frases Favoritas - Mobile Grid */}
            {favorites.length > 0 && (
              <div className="px-4">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Suas Favoritas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {favorites.slice(0, 4).map((index) => (
                    <Card key={index} className="p-3 sm:p-4 hover:shadow-lg transition-shadow">
                      <p className="text-xs sm:text-sm text-gray-700 mb-2">"{quotes[index].text}"</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">— {quotes[index].author}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="px-4 pt-4">
            <Tabs defaultValue="new" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="new" className="text-xs sm:text-sm">Nova Entrada</TabsTrigger>
                <TabsTrigger value="history" className="text-xs sm:text-sm">Histórico</TabsTrigger>
              </TabsList>

              {/* Nova Entrada no Diário */}
              <TabsContent value="new" className="space-y-4 sm:space-y-6">
                <Card className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Como você está se sentindo hoje?</h2>
                  
                  {/* Seletor de Humor */}
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Seu humor:</label>
                    <div className="flex flex-wrap gap-2">
                      {["😊 Feliz", "😌 Calmo", "💪 Motivado", "😔 Triste", "😰 Ansioso", "🤔 Reflexivo"].map((mood) => (
                        <Button
                          key={mood}
                          variant={selectedMood === mood ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedMood(mood)}
                          className="rounded-full text-xs sm:text-sm"
                        >
                          {mood}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Seletor de Categorias */}
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Áreas de interesse hoje:</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.filter(c => c !== "Todas").map((cat) => (
                        <Button
                          key={cat}
                          variant={selectedDiaryCategories.includes(cat as Category) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleDiaryCategory(cat as Category)}
                          className="rounded-full text-xs sm:text-sm"
                        >
                          {cat}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Área de Texto */}
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Suas reflexões:</label>
                    <textarea
                      value={newDiaryNote}
                      onChange={(e) => setNewDiaryNote(e.target.value)}
                      placeholder="Escreva sobre seu dia, seus pensamentos, seus objetivos..."
                      className="w-full h-32 p-3 sm:p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
                    />
                  </div>

                  <Button 
                    onClick={addDiaryEntry}
                    disabled={!newDiaryNote.trim() || !selectedMood || selectedDiaryCategories.length === 0}
                    className="w-full text-sm sm:text-base"
                  >
                    Salvar Entrada
                  </Button>
                </Card>

                {/* Recomendações Personalizadas */}
                {diaryEntries.length > 0 && (
                  <Card className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Frases Personalizadas Para Você</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Baseado nos seus interesses e reflexões:</p>
                    <div className="space-y-3 sm:space-y-4">
                      {personalizedQuotes.map((quote, idx) => (
                        <div key={idx} className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                          <p className="text-xs sm:text-sm text-gray-700 mb-2">"{quote.text}"</p>
                          <div className="flex justify-between items-center">
                            <p className="text-[10px] sm:text-xs text-gray-500">— {quote.author}</p>
                            <span className="text-[10px] sm:text-xs bg-gray-200 px-2 py-1 rounded-full">{quote.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </TabsContent>

              {/* Histórico do Diário */}
              <TabsContent value="history">
                <Card className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Suas Reflexões</h2>
                  {diaryEntries.length === 0 ? (
                    <p className="text-gray-500 text-center py-8 text-sm">Nenhuma entrada ainda. Comece a escrever!</p>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {diaryEntries.map((entry) => (
                        <div key={entry.id} className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs sm:text-sm font-medium text-gray-600">{entry.date}</span>
                            <span className="text-base sm:text-lg">{entry.mood}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">{entry.note}</p>
                          <div className="flex flex-wrap gap-2">
                            {entry.categories.map((cat) => (
                              <span key={cat} className="text-[10px] sm:text-xs bg-gray-200 px-2 py-1 rounded-full">
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
}
