# Encantos Flores e Chocolates — landing page

Landing page comercial da **Encantos Flores e Chocolates** (Bom Conselho — PE).
HTML, CSS e JavaScript puros, sem build e sem dependências externas. Pronta para publicar na Vercel (ou em qualquer hospedagem estática).

---

## Como rodar localmente

```bash
cd encantos
python3 -m http.server 8080
# abra http://localhost:8080
```

Precisa ser servida por HTTP (as fontes locais não carregam via `file://`).

## Como publicar na Vercel

1. `vercel` na pasta `encantos/` (ou aponte o projeto para esta pasta no painel).
2. Framework: **Other**. Build command: nenhum. Output directory: a própria pasta.

---

## ⚠️ ARQUIVOS AUSENTES — fotografias reais

**Nenhuma foto de produto da Encantos foi fornecida.** Os materiais recebidos foram
5 capturas de tela (dados do WhatsApp Business, dois posts do Instagram e duas
referências de layout de outras floriculturas).

O que foi aproveitado dos arquivos reais:

| Arquivo | Origem | Uso |
|---|---|---|
| `assets/img/logo.png` | logotipo oficial recortado da foto de perfil (250×250, fundo transparente) | nav, hero, sobre, rodapé |
| `assets/img/favicon-64.png`, `apple-touch-icon.png`, `icon-512.png` | gerados a partir do logo | ícones do navegador |
| `assets/img/og-image.jpg` | gerado com o logo real + dados confirmados | prévia ao compartilhar o link |

**Nenhuma imagem de IA foi usada, e nenhuma foto de produto foi inventada.** Onde
entraria fotografia, a página usa composições gráficas próprias (gradientes da
paleta da marca + desenho botânico em SVG), pensadas para ficarem bonitas vazias
e serem substituídas em um minuto.

### Fotos que faltam (é só salvar o arquivo, sem mexer no código)

Salve as imagens em `assets/img/fotos/` com **exatamente** estes nomes:

| Arquivo | Onde aparece | Enquadramento sugerido |
|---|---|---|
| `hero.jpg` | topo da página | composição vertical: buquê + chocolate + embalagem |
| `buques.jpg` | destaques | buquê montado, em pé |
| `chocolates.jpg` | destaques | chocolates, foto horizontal |
| `presentes.jpg` | destaques | presentes/itens da loja |
| `arranjos.jpg` | destaques | arranjo de mesa |
| `combinacoes.jpg` | destaques | flor + chocolate + cartão juntos |
| `chocolate-destaque.jpg` | seção Chocolates | foto quadrada, fundo escuro |
| `coroas.jpg` | seção Coroas de flores | coroa montada, foto vertical |
| `galeria-1.jpg` … `galeria-6.jpg` | galeria | 6 fotos variadas do que sai da loja |
| `fachada.jpg` | localização | fachada da loja |
| `sobre.jpg` | sobre | interior da loja ou alguém montando um buquê |

Aceita `.jpg`, `.webp`, `.png` ou `.jpeg`. Assim que o arquivo existir, a foto entra
sozinha no lugar da arte — sem editar HTML.

Dicas: foto na vertical para os slots altos, luz natural, fundo limpo, mínimo de
1600px no lado maior. Depois de adicionar, vale converter para `.webp` para a
página ficar mais leve.

**Opcional — manifesto.** Se quiser evitar as requisições de sondagem, crie
`assets/img/fotos/fotos.json` listando os arquivos:

```json
["hero.jpg", "buques.webp", "galeria-1.jpg"]
```

---

## ⚠️ Avaliações — nada foi inventado

A seção "Quem recebe, sente" **não tem depoimentos falsos**. Ela está pronta para
receber avaliações reais: o modelo comentado está em `index.html`, marcado como
`PLACEHOLDER — INSERIR AVALIAÇÃO REAL`. Peça de 3 a 5 avaliações reais (nome,
texto e autorização de uso) e troque o bloco.

---

## Dados usados na página

Só entrou o que estava confirmado nos materiais enviados:

- **Serviços:** flores, buquês, arranjos, chocolates, presentes e **coroas de flores** (velórios e homenagens)
- **Entrega:** Bom Conselho, Terezinha, Brejão, Lagoa do São José e Igreja Nova — outras localidades, consultar
- **Domingo:** a loja não abre e não há vendas; saem apenas as entregas já fechadas e agendadas até sábado
- **Endereço:** Rua Sete de Setembro, 91 — Bom Conselho/PE (ao lado do Escritório de Contabilidade de Lúcia Moura)
- **WhatsApp:** (87) 98145-4522 → `https://wa.me/5587981454522`
- **Instagram:** [@encantos_flores_e_chocolates](https://www.instagram.com/encantos_floresechocolates/)
- **Horários:** segunda a sexta 08h–18h (sem fechar para almoço), sábado 08h–17h, domingo com entregas

Não foram inventados preços, catálogo, número de clientes, avaliações, tempo de
mercado, raio de entrega nem cidades atendidas. Onde a informação não estava
confirmada, a página direciona para o WhatsApp.

**Antes de publicar**, confira o `<link rel="canonical">` e a `og:image` no
`index.html`: o domínio está como `https://encantosfloresechocolates.com.br/` e
precisa ser trocado pelo domínio real.

---

## Estrutura

```
encantos/
├── index.html
├── assets/
│   ├── css/
│   │   ├── fonts.css          # @font-face das fontes locais
│   │   └── style.css          # tokens + todo o estilo
│   ├── js/main.js             # nav, menu, revelações, pétalas, troca de fotos
│   ├── fonts/                 # EB Garamond + Jost (subconjuntos, SIL OFL)
│   └── img/
│       ├── logo.png           # logo real da marca
│       ├── og-image.jpg
│       └── fotos/             # ← as fotos reais entram aqui
└── README.md
```

## Decisões técnicas

- **Sem framework, sem GSAP, sem jQuery.** Animações em CSS + IntersectionObserver.
- **Fontes locais** (EB Garamond + Jost, subconjuntos latin/latin-ext). Evita a
  dependência do Google Fonts e melhora o carregamento.
  *Cormorant Garamond foi descartada: o glifo do circunflexo renderiza deslocado
  (“Você”, “Buquês”), o que inviabiliza seu uso em português.*
- **Progressive enhancement:** as revelações só escondem conteúdo quando há JS
  (classe `.js` no `<html>`). Sem JS, a página aparece inteira.
- `prefers-reduced-motion` desliga pétalas, parallax, marquee e transições.
- **CTA de WhatsApp** aparece na nav (desktop), em barra fixa (mobile), e em cada
  seção, sempre com mensagem já preenchida conforme o contexto.
- SEO: title/description, Open Graph, Twitter Card e JSON-LD `Florist` com os
  dados reais.

## Verificado

- Sem scroll horizontal em 390px e 1440px.
- Sem erros de JavaScript no console.
- Nenhuma imagem quebrada: o HTML não referencia arquivo inexistente.
- Acentuação portuguesa conferida glifo a glifo.
