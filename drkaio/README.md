# Dr. Kaio Galindo — landing page

Landing page de marca pessoal médica (Geriatria e Gerontologia), em HTML, CSS e
JavaScript puros. Sem build, sem dependências externas. Pronta para a Vercel.

---

## Como rodar localmente

```bash
cd drkaio
python3 -m http.server 8080
# abra http://localhost:8080
```

Precisa ser servida por HTTP — as fontes locais não carregam via `file://`.

## Como publicar na Vercel

Arraste a pasta (ou o zip) em [vercel.com/new](https://vercel.com/new).
Framework: **Other**. Sem build command, sem output directory.

---

## A identidade saiu dos próprios banners

Nada foi inventado visualmente. A paleta foi **amostrada pixel a pixel** dos três
banners originais:

| Token | Cor | De onde veio |
|---|---|---|
| `--teal-800` | `#044E4E` | cor exata do nome "Dr. Kaio Galindo" no banner |
| `--teal-700` → `--teal-500` | `#00605A` → `#00857A` | degradê do botão do banner |
| `--teal-400` | `#00A290` | turquesa original (usado só onde não há texto) |
| `--ivory` | `#FCF6F0` | fundo dos três banners |
| `--coral-esc` | `#A3543C` | linhas coral do banner hero |

Tipografia: **Playfair Display** (serifada de alto contraste, mesma família visual
do lettering dos banners) + **Manrope** (sans para navegação, rótulos e textos).
Ambas locais, em subconjuntos latin/latin-ext.

### Os três banners
- **Hero** → identidade e posicionamento
- **Mentoria** → dimensão educacional
- **Consulta** → conversão

Usados como peças finais, sem recriação, sem filtro e sem recorte do rosto no
desktop.

### Tratamento responsivo dos banners
Os banners são 1536×683 (2,25:1). Num celular de 390px isso daria 174px de altura,
com o texto ilegível. A solução:

- **Desktop (≥1024px):** o banner completo, como veio.
- **Mobile:** um recorte quadrado (900×900) enquadrado no Dr. Kaio, gerado a
  partir do banner original, e a tipografia renderizada em HTML acima dele.

O `<h1>` existe no HTML nos dois casos. No desktop ele fica escondido
visualmente (não com `display:none`), então continua valendo para leitores de
tela e para o buscador, já que ali quem mostra o nome é a imagem.

---

## ⚠️ Pendências — confirmar com o Dr. Kaio

1. **Domínio.** O `<link rel="canonical">` e a `og:image` estão com
   `https://drkaiogalindo.com.br/` como espaço reservado. Trocar pelo domínio real
   antes de divulgar.
2. **Instagram do Idoso Bem Cuidado.** O briefing trouxe o perfil como
   `@idosobemcuidado`, sem URL. A página usa
   `https://www.instagram.com/idosobemcuidado`, que é a forma padrão do handle —
   vale confirmar que o perfil existe nesse endereço.
3. **CRM e RQE.** Não foram fornecidos e **não foram inventados**. A publicidade
   médica no Brasil costuma exigir esses registros; quando o Dr. Kaio informar, o
   lugar natural é o rodapé, ao lado do nome.
4. **Mentoria.** Sem URL própria e sem detalhes de programa, o CTA leva ao
   WhatsApp com mensagem pré-preenchida — como o briefing autorizou. Se a mentoria
   ganhar página, é trocar o `href`.
5. **Capas dos ebooks.** Não vieram. Em vez de inventar capa, os dois materiais
   têm tratamento tipográfico com o símbolo KG em marca-d'água.

## O que não existe na página

Nenhum depoimento, avaliação, estatística, número de pacientes, anos de
experiência, preço, endereço, convênio, duração de mentoria, resultado clínico
ou promessa de tratamento. Onde faltou informação, a página omite em vez de
preencher.

Os links `http://` do briefing (Instagram e Facebook) foram gravados como
`https://` — mesmo destino, conexão segura.

---

## Estrutura

```
drkaio/
├── index.html
├── assets/
│   ├── css/  fonts.css · style.css
│   ├── js/   main.js
│   ├── fonts/  Playfair Display + Manrope (SIL OFL)
│   └── img/
│       ├── banner-hero / mentoria / consulta .webp        (desktop)
│       ├── banner-*-mobile.webp                           (recortes 1:1)
│       ├── logo.png · logo-nav.png · logo-claro.png       (logo oficial)
│       ├── simbolo*.png                                   (marca-d'água e ícones)
│       └── favicon-64.png · apple-touch-icon.png
└── README.md
```

O logo veio com fundo cinza chapado. Ele foi recortado por saturação e
luminância, gerando versão transparente para fundo claro, versão clara para as
seções teal e o símbolo isolado para marca-d'água e favicon. A arte não foi
redesenhada nem recolorida.

## Verificado

- 390px e 1440px: sem scroll horizontal, sem erro de console.
- Contraste de texto em AA em todos os pares (o fim do degradê do botão foi
  escurecido de `#00A290` para `#00857A` — o branco ficava em 3,2:1).
- Todos os links externos conferidos; `_blank` sempre com `rel="noopener"`.
- Um único `<h1>`, hierarquia de títulos sequencial, todas as imagens com `alt`.
- `prefers-reduced-motion` desliga as revelações e transições.
- Sem JavaScript a página aparece inteira (classe `.js` no `<html>`).
