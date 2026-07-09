export type QuizOption = { emoji: string; label: string };

export type QuizQuestion =
  | { id: number; type: "single"; question: string; helper?: string; options: QuizOption[] }
  | { id: number; type: "multi";   question: string; helper?: string; options: QuizOption[] }
  | { id: number; type: "contact"; question: string; helper?: string };

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "single",
    question: "Qual é a sua principal atividade?",
    options: [
      { emoji: "💪", label: "Personal trainer / Coach" },
      { emoji: "🧠", label: "Terapeuta / Psicólogo" },
      { emoji: "⚖️", label: "Advogado / Contador" },
      { emoji: "🎨", label: "Designer / Fotógrafo" },
      { emoji: "🔧", label: "Prestador de serviços" },
      { emoji: "✨", label: "Outro" },
    ],
  },
  {
    id: 2,
    type: "multi",
    question: "O que mais toma o seu tempo hoje?",
    helper: "Pode marcar mais de uma",
    options: [
      { emoji: "📅", label: "Agendamento de clientes" },
      { emoji: "💸", label: "Cobranças e pagamentos" },
      { emoji: "💬", label: "Responder WhatsApp" },
      { emoji: "📧", label: "Organizar e-mails" },
      { emoji: "📱", label: "Postar nas redes sociais" },
      { emoji: "🌐", label: "Atualizar meu site" },
      { emoji: "📋", label: "Controlar tarefas e projetos" },
    ],
  },
  {
    id: 3,
    type: "single",
    question: "Quantos clientes você atende por mês?",
    options: [
      { emoji: "👤", label: "Menos de 10" },
      { emoji: "👥", label: "Entre 10 e 30" },
      { emoji: "🏃", label: "Entre 30 e 100" },
      { emoji: "🚀", label: "Mais de 100" },
    ],
  },
  {
    id: 4,
    type: "multi",
    question: "Quais ferramentas você já usa?",
    helper: "Pode marcar mais de uma",
    options: [
      { emoji: "💬", label: "WhatsApp" },
      { emoji: "📅", label: "Google Agenda" },
      { emoji: "📸", label: "Instagram / TikTok" },
      { emoji: "📧", label: "Gmail / Outlook" },
      { emoji: "📊", label: "Planilha (Sheets / Excel)" },
      { emoji: "🤷", label: "Nenhuma específica" },
    ],
  },
  {
    id: 5,
    type: "single",
    question: "Qual frase descreve seu maior problema?",
    options: [
      { emoji: "🔁", label: "Passo tempo demais respondendo as mesmas perguntas" },
      { emoji: "💰", label: "Esqueço de cobrar clientes em dia" },
      { emoji: "📉", label: "Não consigo manter as redes sociais ativas" },
      { emoji: "🗂️", label: "Minha agenda vira bagunça com facilidade" },
      { emoji: "⏰", label: "Perco clientes por demorar no retorno" },
    ],
  },
  {
    id: 6,
    type: "single",
    question: "Quando você quer resolver isso?",
    options: [
      { emoji: "🔥", label: "Agora — tenho urgência!" },
      { emoji: "📆", label: "Nos próximos 30 dias" },
      { emoji: "🔍", label: "Só estou explorando por enquanto" },
    ],
  },
  {
    id: 7,
    type: "single",
    question: "Você já tem um site?",
    options: [
      { emoji: "✅", label: "Sim, tenho" },
      { emoji: "🕸️", label: "Tenho mas está abandonado" },
      { emoji: "❌", label: "Não tenho" },
    ],
  },
  {
    id: 8,
    type: "contact",
    question: "Por fim, como a gente te encontra?",
    helper: "Preencha pelo menos nome + WhatsApp ou e-mail",
  },
];
