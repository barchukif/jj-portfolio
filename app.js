// ===== 1. Conexão =====
const SUPABASE_URL = 'https://gpcpymhusocgorfgdktf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_wGSHa5VnqqCp_4CQraj9CA_Hq8LtinA';

// O CDN cria a variável global "supabase", por isso o cliente se chama "db"
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ===== 2. Consulta =====
// Busca cada integrante já com seus itens (graças à ligação entre as tabelas)
async function buscarIntegrantes() {
  const { data, error } = await db
    .from('integrantes')
    .select('*, itens_curadoria(*)')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
}

// ===== 3. Funções de desenho =====
// Cria elementos usando textContent (mais seguro que innerHTML)
function el(tag, classe, texto) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  if (texto) e.textContent = texto;
  return e;
}

function criarCartao(membro) {
  const card = el('article', 'card');

  // Foto ou inicial
  if (membro.foto_url) {
    const img = el('img', 'avatar');
    img.src = membro.foto_url;
    img.alt = `Foto de ${membro.nome}`;
    card.append(img);
  } else {
    card.append(el('div', 'avatar avatar--inicial', membro.nome.charAt(0)));
  }

  card.append(
    el('h2', 'nome', membro.nome),
    el('p', 'cargo', membro.cargo || ''),
    el('p', 'bio', membro.bio || '')
  );

  const itens = membro.itens_curadoria || [];
  const habilidades = itens.filter(i => i.tipo === 'habilidade');
  const projetos = itens.filter(i => i.tipo === 'projeto');

  // Habilidades
  if (habilidades.length > 0) {
    card.append(el('h3', 'secao-titulo', 'Habilidades'));
    const tags = el('div', 'tags');
    habilidades.forEach(h => tags.append(el('span', 'tag', h.titulo)));
    card.append(tags);
  }

  // Projetos
  if (projetos.length > 0) {
    card.append(el('h3', 'secao-titulo', 'Projetos'));
    const lista = el('ul', 'projetos');

    projetos.forEach(p => {
      const li = el('li');

      if (p.link_url) {
        const a = el('a', null, p.titulo);
        a.href = p.link_url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        const strong = el('strong');
        strong.append(a);
        li.append(strong);
      } else {
        li.append(el('strong', null, p.titulo));
      }

      if (p.descricao) li.append(el('span', null, p.descricao));
      lista.append(li);
    });

    card.append(lista);
  }

  return card;
}

// ===== 4. Inicialização =====
async function iniciar() {
  const container = document.getElementById('integrantes');

  try {
    const integrantes = await buscarIntegrantes();
    container.innerHTML = '';

    if (integrantes.length === 0) {
      container.append(el('p', 'status', 'Nenhum integrante cadastrado ainda.'));
      return;
    }

    integrantes.forEach(m => container.append(criarCartao(m)));
  } catch (erro) {
    console.error('Erro ao carregar dados:', erro);
    container.innerHTML = '';
    container.append(el('p', 'status', 'Não foi possível carregar os dados. Veja o console (F12).'));
  }
}

iniciar();