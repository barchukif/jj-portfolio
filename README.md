# J&J Portfolio

Plataforma web de apresentação profissional e curadoria técnica, criada para expor as competências, trajetórias e diferenciais dos integrantes do grupo de forma dinâmica e moderna.

A interface não tem conteúdo fixo no código: ela é gerada a partir de um banco de dados em nuvem. Novos membros, habilidades e projetos entram direto na base, sem alterar o visual do site.

**Site no ar:** [cole aqui o link do GitHub Pages, quando publicar]

## Integrantes
- [Nome do Integrante 1]
- [Nome do Integrante 2]

## Tecnologias
- HTML, CSS e JavaScript puro
- Supabase (PostgreSQL + API REST)
- supabase-js carregado via CDN

## Como funciona
1. Os dados ficam em duas tabelas no Supabase: `integrantes` e `itens_curadoria`.
2. O `app.js` consulta as duas tabelas de uma vez (cada integrante já vem com seus itens).
3. A página desenha um cartão para cada integrante, com habilidades e projetos.

## Estrutura do projeto
```
jj-portfolio/
├── index.html   # estrutura da página
├── style.css    # identidade visual (tema escuro, grid)
├── app.js       # conexão com o Supabase e geração dos cartões
└── README.md
```

## Banco de dados

**integrantes**: `id`, `nome`, `cargo`, `bio`, `foto_url`, `criado_em`

**itens_curadoria**: `id`, `integrante_id` (liga ao integrante), `tipo` (`habilidade` ou `projeto`), `titulo`, `descricao`, `link_url`, `criado_em`

A segurança é feita com RLS (Row Level Security): a chave pública usada no site só consegue **ler** os dados.

## Como rodar localmente
1. Clone o repositório.
2. Abra a pasta no VS Code.
3. Clique com o botão direito em `index.html` → **Open with Live Server**.

## Como adicionar conteúdo (sem mexer no código)
No painel do Supabase, abra o **Table Editor** e insira linhas em `integrantes` ou `itens_curadoria`. Ao recarregar a página, o conteúdo novo aparece.

## Versão atual: MVP (v0.1)
- Cartões de perfil por integrante
- Habilidades e projetos associados a cada pessoa
- Tema escuro, layout em grade e animação ao passar o mouse
- Escalabilidade validada: novo membro inserido direto no banco aparece sem alterar o código

## Próximas fases
- **Detalhamento:** página própria para cada integrante e cada projeto
- **Categorização:** agrupar habilidades e projetos por área ou categoria