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

## Fotografias

As fotos reais da Encantos estão em `assets/img/fotos/`, recortadas para a
proporção de cada espaço e convertidas para WebP (1,4 MB no total).

| Arquivo | Onde aparece | Conteúdo |
|---|---|---|
| `hero.webp` | topo da página | Ediane Feitosa com buquê (crédito visível na foto) |
| `buques.webp` | destaques | o mesmo buquê, em close |
| `chocolates.webp` | destaques | caixa com vinho e chocolates |
| `presentes.webp` | destaques | cesta com pelúcias, caneca e chocolates |
| `combinacoes.webp` | destaques | buquê de rosas com Ferrero |
| `chocolate-destaque.webp` | seção Chocolates | cesta de chocolates e vinho |
| `coroas.webp` | seção Coroas de flores | coroa montada |
| `fachada.webp` | localização | fachada da loja |
| `sobre.webp` | sobre | letreiro da loja |

O logotipo (`logo.png`), o favicon e a imagem de Open Graph foram gerados a
partir da foto de perfil oficial.

**Como trocar ou acrescentar uma foto:** salve o arquivo em
`assets/img/fotos/` com o nome do espaço e acrescente o nome em
`assets/img/fotos/fotos.json`. Sem o manifesto a página ainda encontra a foto
sozinha, só faz algumas requisições a mais.

### ⚠️ O que ainda falta

Duas partes estão **prontas, porém desativadas** por falta de imagem. Voltam
descomentando o bloco no `index.html` (as instruções estão no próprio comentário):

1. **Card "Arranjos"** nos destaques — falta uma foto de arranjo de mesa.
   Ao reativar, ajuste também a grade em `style.css` (procure por
   "grade dos destaques").
2. **Seção "Galeria"** — precisa de 6 fotos (`galeria-1` … `galeria-6`).
   Sugestões: vitrine da loja, alguém montando um buquê, detalhe da
   embalagem, chocolates avulsos, arranjo pronto, entrega saindo.

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
