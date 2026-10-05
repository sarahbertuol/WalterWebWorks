/**
 * Lorena — editable copy.
 * Anything in [brackets] or marked "a confirmar" is a placeholder:
 * replace it here and the whole page updates. Leave a URL / number
 * empty ("") to hide the related button.
 */
export const content = {
  meta: {
    title: "Brunch de Fraldas da Lorena · 21 de Novembro",
    description: "Save the date — Brunch de Fraldas da Lorena, 21 de Novembro.",
  },

  hero: {
    eyebrow: ["Save", "the Date"],
    title: ["Brunch", "de", "Fraldas"],
    connector: "da",
    name: "Lorena",
    day: "21",
    month: "Novembro",
    note: "em breve, mais detalhes",
  },

  invitation: {
    label: "O convite",
    lead: "Com o coração cheio, convidamos você para uma manhã especial à espera da",
    name: "Lorena",
    body: "Um brunch para celebrar a chegada dela, entre flores, mesa posta e as pessoas que mais amamos.",
  },

  date: {
    label: "A data",
    day: "21",
    month: "Novembro",
    note: "Guarde este dia no calendário e no coração.",
    time: "Horário a confirmar",
  },

  details: {
    label: "O brunch",
    title: "Onde & quando",
    items: [
      { term: "Dia", value: "21 de Novembro" },
      { term: "Horário", value: "A confirmar" },
      { term: "Local", value: "[Nome do local]" },
      { term: "Endereço", value: "[Endereço completo]" },
    ],
    mapUrl: "", // ex.: "https://maps.google.com/?q=..."
    mapLabel: "Ver no mapa",
  },

  day: {
    label: "Um pouquinho sobre o dia",
    quote: "Uma manhã leve, sem pressa, feita para receber a Lorena com carinho.",
    body: "Vamos nos reunir em volta da mesa para um brunch — comida boa, conversa boa e muito amor por quem está chegando.",
  },

  gifts: {
    label: "Fraldas & mimos",
    title: "Um presentinho",
    body: "Sua presença já é o presente mais bonito. Se quiser trazer um mimo, a Lorena vai adorar receber fraldas.",
    sizesLabel: "Tamanhos sugeridos",
    sizes: "A confirmar",
    listUrl: "", // link para lista de presentes, se houver
    listLabel: "Ver lista de presentes",
  },

  rsvp: {
    label: "RSVP",
    title: "Você vem celebrar com a gente?",
    deadline: "Confirme sua presença até [data a definir].",
    fields: {
      name: "Nome",
      attending: "Você vem?",
      yes: "Sim, estarei lá",
      no: "Infelizmente não poderei",
      guests: "Número de pessoas",
      notes: "Observações",
      notesHint: "Restrições alimentares, um recado para a Lorena…",
    },
    submit: "Confirmar presença",
    thanksYes: "Que alegria! Sua presença foi anotada com carinho.",
    thanksNo: "Agradecemos por avisar — vamos sentir sua falta.",
    /** WhatsApp destino (só números, com DDI). Vazio = só confirma na tela. */
    whatsapp: "",
  },

  closing: {
    line: "Até dia 21.",
    name: "Lorena",
  },
} as const;
