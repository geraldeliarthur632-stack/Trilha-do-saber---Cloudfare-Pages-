import React, { useState, useEffect, useRef } from 'react';
import { soundEffects } from '../services/soundEffects';
import { speechNarrator } from '../services/speechNarrator';
import {
  Rocket,
  BookOpen,
  Gamepad2,
  Trophy,
  Camera,
  GraduationCap,
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  X,
  CheckCircle2,
  Globe,
  Zap,
  HelpCircle,
  Play,
  Pause,
} from 'lucide-react';

interface FirstTimeTutorialModalProps {
  isOpen: boolean;
  userName?: string;
  onComplete: () => void;
  onClose?: () => void;
}

interface TutorialStep {
  title: string;
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  narrationText: string;
  icon: React.ReactNode;
  iconBg: string;
  previewCard?: {
    title: string;
    items: { icon: string; label: string; detail: string }[];
  };
}

export const FirstTimeTutorialModal: React.FC<FirstTimeTutorialModalProps> = ({
  isOpen,
  userName = 'Estudante',
  onComplete,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoNarrate, setAutoNarrate] = useState(true);

  const steps: TutorialStep[] = [
    {
      title: 'Boas-vindas',
      badge: 'Passo 1 de 7',
      badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      headline: `Olá, ${userName}! Bem-vindo à Trilha do Saber! 👋`,
      description:
        'Sua plataforma inteligente de estudos escolares alinhada à BNCC. Aqui você aprende com explicações claras da IA, resumos no caderno, jogos educativos e desafios interativos.',
      narrationText: `Olá, ${userName}! Seja muito bem-vindo à Trilha do Saber. Este aplicativo foi criado especialmente para acompanhar os estudos da sua série escolar, com explicações da IA, caderno de resumos, desafios e jogos interativos. Vamos fazer um tour rápido para você conhecer cada ferramenta!`,
      icon: <Sparkles className="w-8 h-8 text-white" />,
      iconBg: 'bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500',
      previewCard: {
        title: 'O que você vai encontrar aqui:',
        items: [
          { icon: '🚀', label: 'Jornada com Explicação', detail: 'Teoria com voz da IA antes de cada exercício' },
          { icon: '📖', label: 'Caderno de Resumos', detail: 'Conceitos, fórmulas e regras práticas' },
          { icon: '🎮', label: 'Jogos & Raciocínio', detail: 'Caça-palavras, xadrez, tabuada e duelos' },
        ],
      },
    },
    {
      title: 'Jornada de Aprendizado',
      badge: 'Passo 2 de 7',
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
      headline: 'Aulas com Explicação Teórica & Voz da IA 📖',
      description:
        'Escolha qualquer matéria (Matemática, Português, Ciências, etc.). A IA explica todo o conteúdo passo a passo com áudio na velocidade rápida antes de você responder às questões de fixação!',
      narrationText:
        'Na Jornada de Aprendizado, você escolhe qualquer matéria. A inteligência artificial explica todo o conteúdo com texto e voz clara antes de você fazer as questões. Assim você aprende a teoria primeiro e depois treina com exercícios práticos!',
      icon: <Rocket className="w-8 h-8 text-white" />,
      iconBg: 'bg-gradient-to-tr from-purple-600 to-indigo-600',
      previewCard: {
        title: 'Como funciona a sua aula:',
        items: [
          { icon: '🔊', label: '1. Ouça a Explicação', detail: 'Voz da IA narrando a teoria e as regras' },
          { icon: '💡', label: '2. Exemplos Resolvidos', detail: 'Como resolver problemas passo a passo' },
          { icon: '✍️', label: '3. Pratique Questões', detail: 'Fixe o aprendizado com gabarito imediato' },
        ],
      },
    },
    {
      title: 'Caderno Digital',
      badge: 'Passo 3 de 7',
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      headline: 'Caderno Digital de Resumos das Matérias 📚',
      description:
        'Todos os resumos essenciais da sua série organizados por disciplina. Consulte definições, fórmulas matemáticas, regras gramaticais e exemplos sempre que precisar estudar para provas.',
      narrationText:
        'O Caderno Digital guarda resumos didáticos completos de todas as disciplinas da sua série escolar. Você pode consultar regras, dicas de como fazer e exemplos resolvidos a qualquer momento para revisar antes das suas provas.',
      icon: <BookOpen className="w-8 h-8 text-white" />,
      iconBg: 'bg-gradient-to-tr from-emerald-600 to-teal-600',
      previewCard: {
        title: 'Recursos do seu Caderno:',
        items: [
          { icon: '📐', label: 'Fórmulas & Regras', detail: 'Organizadas por matéria e tópicos BNCC' },
          { icon: '🧠', label: 'Como Se Faz', detail: 'Métodos práticos para não errar nos testes' },
          { icon: '✨', label: 'Sempre Disponível', detail: 'Acesse quando e onde quiser' },
        ],
      },
    },
    {
      title: 'Jogos Educativos',
      badge: 'Passo 4 de 7',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      headline: 'Central de Jogos & Desafios da Mente 🧩',
      description:
        'Aprender também é diversão! Exercite seu raciocínio com o Caça-Palavras dinâmico, Quebra-Cabeça de pares dos bichos, Jogo da Memória, Treino da Tabuada e o Desafio Relâmpago de 60 segundos!',
      narrationText:
        'Na aba Explorar, você encontra jogos educativos como Caça-Palavras, Quebra-Cabeça de pares, Jogo da Memória e treino da Tabuada. É uma forma divertida de exercitar o raciocínio e a memória enquanto aprende!',
      icon: <Gamepad2 className="w-8 h-8 text-white" />,
      iconBg: 'bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500',
      previewCard: {
        title: 'Jogos disponíveis para você:',
        items: [
          { icon: '🔍', label: 'Caça-Palavras', detail: 'Toque e risque palavras temáticas' },
          { icon: '⚡', label: 'Desafio Relâmpago', detail: 'Responda o máximo em 60 segundos' },
          { icon: '🔢', label: 'Treino da Tabuada', detail: 'Tabuadas do 1 ao 10 com placar' },
        ],
      },
    },
    {
      title: 'Xadrez & Duelo',
      badge: 'Passo 5 de 7',
      badgeColor: 'bg-slate-200 text-slate-800 border-slate-300',
      headline: 'Academia de Xadrez & Duelo do Conhecimento ♟️',
      description:
        'Descubra como cada peça do xadrez se movimenta com nosso guia interativo e desafie amigos ou familiares no Duelo de Conhecimento 1 contra 1 no mesmo aparelho!',
      narrationText:
        'Explore a Academia de Xadrez com explicações de cada peça e movimentos, ou dispute o Duelo do Saber contra um colega no mesmo aparelho para ver quem acerta mais rápido!',
      icon: <span className="text-3xl">♟️</span>,
      iconBg: 'bg-gradient-to-tr from-slate-700 to-slate-950',
      previewCard: {
        title: 'Estratégia e Competição:',
        items: [
          { icon: '👑', label: 'Guia das Peças', detail: 'Aprenda como Peão, Cavalo e Torre andam' },
          { icon: '⚔️', label: 'Duelo 1v1 Local', detail: 'Disputa de conhecimento para 2 jogadores' },
          { icon: '🏆', label: 'Pontos & Ranking', detail: 'Bônus de velocidade para quem responde rápido' },
        ],
      },
    },
    {
      title: 'Assistentes de IA',
      badge: 'Passo 6 de 7',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      headline: 'Explicador IA, Tradutor & Criar Prova por Foto 📸',
      description:
        'Tire foto do caderno ou livro para tirar dúvidas instantâneas, gere testes por foto, traduza textos em doze línguas com pronúncia e pesquise temas para trabalhos escolares.',
      narrationText:
        'Use os Assistentes de IA para tirar foto de temas ou cadernos e receber explicações detalhadas, traduzir textos e fotos em até doze línguas com pronúncia, ou pesquisar trabalhos escolares completos.',
      icon: <Camera className="w-8 h-8 text-white" />,
      iconBg: 'bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-700',
      previewCard: {
        title: 'Ferramentas de Inteligência Artificial:',
        items: [
          { icon: '📸', label: 'Explicador por Foto', detail: 'Explicação detalhada do seu caderno ou livro' },
          { icon: '🌐', label: 'Tradutor IA', detail: 'Tradução com pronúncia em 12 idiomas' },
          { icon: '📝', label: 'Criar Prova com IA', detail: 'Gere testes para praticar e tirar nota 10' },
        ],
      },
    },
    {
      title: 'Boletim & Conquistas',
      badge: 'Passo 7 de 7',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      headline: 'Boletim de Notas, Calendário & Troféus 🏆',
      description:
        'Monitore sua nota estimada por matéria, marque lembretes de provas no calendário e suba de nível acumulando XP para desbloquear troféus e insígnias especiais!',
      narrationText:
        'Acompanhe seu desempenho no Boletim com estimativas de notas por matéria, organize datas de provas no Calendário e acumule pontos XP para subir de nível e desbloquear insígnias especiais. Tudo pronto para começar!',
      icon: <Trophy className="w-8 h-8 text-white" />,
      iconBg: 'bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-500',
      previewCard: {
        title: 'Seu Painel de Evolução:',
        items: [
          { icon: '📊', label: 'Boletim Escolar', detail: 'Estimativa de notas de 0 a 10 por matéria' },
          { icon: '📅', label: 'Calendário de Provas', detail: 'Organize suas revisões com antecedência' },
          { icon: '⭐', label: 'Níveis e Troféus', detail: 'Conquiste emblemas conforme estuda todo dia' },
        ],
      },
    },
  ];

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  // Speak current step narration automatically if enabled
  useEffect(() => {
    if (!isOpen) {
      speechNarrator.stop();
      setIsSpeaking(false);
      return;
    }

    if (autoNarrate && currentStep?.narrationText) {
      const timer = setTimeout(() => {
        speechNarrator.stop();
        speechNarrator.speak(
          currentStep.narrationText,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false),
          undefined,
          1.5
        );
      }, 200);

      return () => {
        clearTimeout(timer);
        speechNarrator.stop();
        setIsSpeaking(false);
      };
    }
  }, [isOpen, currentStepIndex, autoNarrate]);

  if (!isOpen) return null;

  const handleNext = () => {
    soundEffects.playClick();
    speechNarrator.stop();
    setIsSpeaking(false);
    if (isLastStep) {
      soundEffects.playVictoryFanfare();
      onComplete();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    soundEffects.playClick();
    speechNarrator.stop();
    setIsSpeaking(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleToggleAudio = () => {
    soundEffects.playClick();
    if (isSpeaking) {
      speechNarrator.stop();
      setIsSpeaking(false);
      setAutoNarrate(false);
    } else if (currentStep?.narrationText) {
      setAutoNarrate(true);
      speechNarrator.speak(
        currentStep.narrationText,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        undefined,
        1.5
      );
    }
  };

  const handleSkip = () => {
    soundEffects.playClick();
    speechNarrator.stop();
    setIsSpeaking(false);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider border ${currentStep.badgeColor}`}>
              {currentStep.badge}
            </span>
            <span className="text-xs font-bold text-slate-500">Tutorial de Início</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio narration toggle button */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer text-xs font-bold ${
                isSpeaking
                  ? 'bg-rose-100 text-rose-700 animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title={isSpeaking ? 'Pausar áudio' : 'Ouvir explicação com voz da IA'}
            >
              {isSpeaking ? (
                <>
                  <Pause className="w-4 h-4 text-rose-600" />
                  <span className="text-[11px] font-black hidden sm:inline">Pausar</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <span className="text-[11px] font-black hidden sm:inline">Ouvir IA</span>
                </>
              )}
            </button>

            {/* Skip tutorial button */}
            <button
              onClick={handleSkip}
              className="px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition text-xs font-bold cursor-pointer"
              title="Pular tutorial"
            >
              Pular
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 shrink-0 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Hero Icon & Title */}
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl ${currentStep.iconBg} flex items-center justify-center shadow-lg shrink-0`}>
              {currentStep.icon}
            </div>
            <div className="space-y-1 min-w-0">
              <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {currentStep.headline}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {currentStep.description}
              </p>
            </div>
          </div>

          {/* Audio Indicator banner when speaking */}
          {isSpeaking && (
            <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between gap-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                <span className="text-[11px] font-bold text-indigo-900">
                  Voz da IA narrando a 1.5x...
                </span>
              </div>
              <div className="flex items-center gap-1 h-3">
                <span className="w-1 h-2 bg-indigo-600 rounded-full animate-bounce delay-75" />
                <span className="w-1 h-4 bg-purple-600 rounded-full animate-bounce delay-150" />
                <span className="w-1 h-2.5 bg-indigo-600 rounded-full animate-bounce delay-100" />
              </div>
            </div>
          )}

          {/* Feature Highlights Preview Box */}
          {currentStep.previewCard && (
            <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-2.5 shadow-2xs">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                {currentStep.previewCard.title}
              </h3>
              <div className="space-y-2">
                {currentStep.previewCard.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-2xl bg-white border border-slate-200/70 flex items-center gap-3 shadow-2xs"
                  >
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-black text-slate-900 leading-tight">
                        {item.label}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`px-4 py-2.5 rounded-2xl border font-bold text-xs flex items-center gap-1 transition ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100 active:scale-95 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundEffects.playClick();
                  setCurrentStepIndex(idx);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentStepIndex
                    ? 'w-6 bg-indigo-600'
                    : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                title={`Ir para o passo ${idx + 1}`}
                aria-label={`Passo ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs text-white flex items-center gap-1.5 transition active:scale-95 shadow-md cursor-pointer ${
              isLastStep
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/30'
                : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-600/30'
            }`}
          >
            <span>{isLastStep ? 'Começar a Estudar 🚀' : 'Próximo'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
