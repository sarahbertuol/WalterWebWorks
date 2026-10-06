import { editions, type EditionSlug } from "./editions";

/**
 * Lorena — editable copy, shared by every city edition.
 * Dates, venue and RSVP deadline come from editions.ts.
 * Anything in [brackets] or marked "a confirmar" is a placeholder.
 * Leave a URL / number empty ("") to hide the related button.
 */
export function getContent(slug: EditionSlug) {
  const e = editions[slug];
  return {
    slug,
    city: e.city,

    /**
     * Fase do convite.
     *  false → "save the date": só o cartão (como o impresso, "em breve, mais detalhes")
     *  true  → página completa: convite, data, local, fraldas, RSVP e fechamento
     */
    showDetails: false,

    meta: {
      title: `Brunch de Fraldas da Lorena · ${e.day} de ${e.month}`,
      description: `Save the date — Brunch de Fraldas da Lorena, ${e.day} de ${e.month}.`,
    },

    hero: {
      eyebrow: ["Save", "the Date"],
      title: ["Brunch", "de", "Fraldas"],
      connector: "da",
      name: "Lorena",
      day: e.day,
      month: e.month,
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
      day: e.day,
      month: e.month,
      note: "Guarde este dia no calendário e no coração.",
      time: e.time === "A confirmar" ? "Horário a confirmar" : e.time,
    },

    details: {
      label: "O brunch",
      title: "Onde & quando",
      items: [
        { term: "Dia", value: `${e.day} de ${e.month}` },
        { term: "Horário", value: e.time },
        { term: "Local", value: e.venue },
        { term: "Endereço", value: e.address },
      ],
      mapUrl: e.mapUrl as string,
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
      deadline: `Confirme sua presença até ${e.rsvpDeadline}.`,
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
      sending: "Enviando…",
      error: "Não conseguimos registrar sua resposta agora. Tente de novo em instantes.",
      /**
       * As respostas vão para a planilha do Google configurada em LORENA_RSVP_WEBHOOK
       * (ver docs/lorena/README.md). WhatsApp (só números, com DDI) é opcional:
       * se preenchido, vira plano B caso a planilha esteja fora do ar.
       */
      whatsapp: "",
    },

    closing: {
      line: `Até dia ${e.day}.`,
      name: "Lorena",
    },
  };
}

export type Content = ReturnType<typeof getContent>;
