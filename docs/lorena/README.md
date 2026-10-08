# Lorena — convite digital · SOP

Textos: `lib/lorena/content.ts` · Cidades e datas: `lib/lorena/editions.ts` · Fase atual: **save the date** (`showDetails: false`)

| Endereço | Edição |
|---|---|
| `convitelorena.vercel.app` | cartão com botões: Caxias do Sul · Novo Hamburgo |
| `convitelorena.vercel.app/caxias-dos-sul` | Caxias do Sul · 21 de Novembro |
| `convitelorena.vercel.app/novo-hamburgo` | Novo Hamburgo · 12 de Dezembro |
| `convitelorena.vercel.app/lista-de-presentes` | lista de presentes compartilhada (as duas cidades) |

**Nova cidade:** copie um bloco em `editions.ts`, troque o slug (vira a URL) e os dados, e gere a prévia `public/lorena/og-<slug>.jpg`. Local, endereço, horário, mapa e prazo do RSVP também ficam por cidade em `editions.ts`.

---

## 1. RSVP → Google Sheets (~15 min, uma vez)

1. **Planilha** — crie uma Google Sheet (ex.: *Brunch Lorena — RSVP*).
2. **Script** — na planilha: *Extensões → Apps Script*. Apague o conteúdo e cole `docs/lorena/rsvp-apps-script.gs`.
3. **Segredo** — troque `COLE_AQUI_O_SEGREDO` por uma senha longa aleatória (gere num gerenciador de senhas). Salve.
4. **Publicar** — *Implantar → Nova implantação → Tipo: App da Web*
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
   - Autorize o acesso quando o Google pedir → copie a **URL do app da Web** (`https://script.google.com/macros/s/…/exec`).
5. **Vercel** — *Project → Settings → Environment Variables* (Production):

   | Variável | Valor |
   |---|---|
   | `LORENA_RSVP_WEBHOOK` | URL do passo 4 |
   | `LORENA_RSVP_SECRET` | mesmo segredo do passo 3 |

6. **Redeploy** e faça um RSVP de teste — a aba `RSVP` aparece sozinha com cabeçalho (Recebido em · Cidade · Nome · Vem? · Pessoas · Observações).

**Totais rápidos** (cole numa célula livre):
- Confirmados, total: `=SUMIF(RSVP!D:D;"Sim";RSVP!E:E)`
- Confirmados por cidade: `=SUMIFS(RSVP!E:E;RSVP!D:D;"Sim";RSVP!B:B;"Novo Hamburgo")`
- Respostas "não": `=COUNTIF(RSVP!D:D;"Não")`
- Já colou o script antes desta versão? Cole o novo, apague a aba `RSVP` (sem respostas reais ainda) e publique uma nova versão.

> Editou o script depois? *Implantar → Gerenciar implantações → editar → Nova versão*. A URL continua a mesma.

**Proteções já incluídas:** validação no servidor, campo-isca contra bots, segredo compartilhado, limite de 6 pessoas, e textos que começam com `= + - @` não viram fórmula na planilha.
**Plano B opcional:** preencha `rsvp.whatsapp` em `content.ts` (só números, com DDI, ex. `5511999999999`). Se a planilha falhar, o convidado vê um botão "Enviar pelo WhatsApp" com a resposta já escrita.

---

## Lista de presentes (~2 min, uma vez)

As marcações ficam num banco **Upstash Redis** (gratuito), ligado à Vercel:

1. **Vercel** → projeto `walterwebworks` → aba **Storage** → **Create Database** → **Upstash for Redis** → plano **Free** → região mais próxima (ex.: São Paulo).
2. **Connect Project** → `walterwebworks` → marque **Production** e **Preview**. A Vercel cria sozinha `KV_REST_API_URL` e `KV_REST_API_TOKEN`.
3. **Redeploy** (ou promova o último preview). Pronto.

Sem o banco, a página mostra "A lista está sendo preparada" e não deixa marcar.

**Editar os itens:** `lib/lorena/gifts.ts`
- `examples: true` mostra o aviso "Itens de exemplo". Troque para `false` ao colocar a lista real.
- Cada item tem `id` (fixo, nunca mude depois de publicar), `name` e `note` (opcional).
- Fraldas: `total` = quantidade da meta; `unit` = "pacotes".

**Como funciona para o convidado**
- Toca no item → fica riscado para todo mundo. Pode desfazer no mesmo celular.
- Fraldas: escolhe quantos pacotes comprou → "Faltam Y de X" diminui.
- Duas pessoas no mesmo item ao mesmo tempo: só a primeira vale, e a outra é avisada.
- Desmarcar o item de outra pessoa pede confirmação ("use só se foi engano").

**Zerar tudo** (antes de divulgar, por exemplo): Vercel → Storage → banco → **Data Browser** → apague a chave `lorena:presentes:v1`.

---

## 2. Imagem de compartilhamento (WhatsApp / Instagram / iMessage)

- Arquivos: `public/lorena/og-<cidade>.jpg` (1200×630, ~120 KB cada) — o próprio cartão de cada cidade, com a data certa.
- Já configurada nos metadados (`lib/lorena/metadata.ts`), com título e descrição por cidade.
- A página está com `noindex` (convite privado, fora do Google).
- Testar a prévia: cole o link em <https://www.opengraph.xyz> ou mande para você mesma no WhatsApp.
- WhatsApp guarda a prévia em cache: se mandar o link antes de a imagem existir, teste com `?v=2` no fim.
- Quando os detalhes forem publicados, peça para regenerar a imagem (ela mostra "em breve, mais detalhes").

---

## 3. Endereço do convite

**Temporário (já preparado no código): `convitelorena.vercel.app`**
1. **Vercel** → projeto que publica este repositório → *Settings → Domains → Add* → `convitelorena.vercel.app`.
2. Pronto: a raiz desse endereço abre o convite. Não precisa de variável de ambiente.
   - Enquanto o PR não estiver em `main`, em *Domains → Edit* aponte o domínio para a branch `ccr-9f25ab4d-qpjh40`.

**Definitivo (ex.: `lorena.seudominio.com.br`)**

1. **Vercel** → *Project → Settings → Domains → Add* → `lorena.seudominio.com.br`.
2. **DNS** (onde o domínio está registrado) → registro **CNAME**: nome `lorena`, valor `cname.vercel-dns.com`.
3. **Vercel → Environment Variables** → `LORENA_HOST` = `lorena.seudominio.com.br`.
4. **Redeploy.** A raiz do subdomínio passa a abrir o convite, e os links de compartilhamento usam o subdomínio.

O site da Walter Web Works continua igual no domínio principal.

---

## Checklist para publicar os detalhes

- [ ] Preencher em `content.ts`: horário, local, endereço, `mapUrl`, tamanhos de fralda, `listUrl`, prazo do RSVP
- [ ] RSVP configurado (seção 1) e testado com uma resposta
- [ ] Trocar `showDetails` para `true`
- [ ] Atualizar o texto "em breve, mais detalhes" do hero (ou remover)
- [ ] Regenerar `og.jpg` e testar a prévia com `?v=2`
- [ ] Testar no celular: iPhone (Safari) e Android (Chrome)
