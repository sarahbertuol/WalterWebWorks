# Lorena — convite digital · SOP

Rota: `/lorena` · Textos: `lib/lorena/content.ts` · Fase atual: **save the date** (`showDetails: false`)

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

6. **Redeploy** e faça um RSVP de teste — a aba `RSVP` aparece sozinha com cabeçalho.

**Totais rápidos** (cole numa célula livre):
- Confirmados (pessoas): `=SUMIF(RSVP!C:C;"Sim";RSVP!D:D)`
- Respostas "não": `=COUNTIF(RSVP!C:C;"Não")`

> Editou o script depois? *Implantar → Gerenciar implantações → editar → Nova versão*. A URL continua a mesma.

**Proteções já incluídas:** validação no servidor, campo-isca contra bots, segredo compartilhado, limite de 6 pessoas, e textos que começam com `= + - @` não viram fórmula na planilha.
**Plano B opcional:** preencha `rsvp.whatsapp` em `content.ts` (só números, com DDI, ex. `5511999999999`). Se a planilha falhar, o convidado vê um botão "Enviar pelo WhatsApp" com a resposta já escrita.

---

## 2. Imagem de compartilhamento (WhatsApp / Instagram / iMessage)

- Arquivo: `public/lorena/og.jpg` (1200×630, ~120 KB) — é o próprio cartão renderizado.
- Já configurada nos metadados (`app/lorena/layout.tsx`), com título e descrição.
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
