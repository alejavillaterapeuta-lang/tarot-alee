// app.js - Main Application Logic for Tarot Learning App

document.addEventListener('DOMContentLoaded', () => {
  // Initialize App
  initCosmicCanvas();
  initAuth();
  initNavigation();
  initFormulaBuilder();
  initEncyclopedia();
  initJourneyView();
  initSpreads();
  initQuiz();
  initSearch();
  initLucide();
});

// Helper for Lucide icons
function initLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// -------------------------------------------------------------
// 1. COSMIC CANVAS (Twinkling stars & celestial particles)
// -------------------------------------------------------------
function initCosmicCanvas() {
  const canvas = document.getElementById('cosmic-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = [];
  const STAR_COUNT = Math.min(100, Math.floor((width * height) / 12000));

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      alpha: Math.random(),
      speed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Subtle gradient tint with user's Marrón Tierra
    const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width);
    grad.addColorStop(0, 'rgba(146, 107, 71, 0.16)');
    grad.addColorStop(1, 'rgba(19, 14, 10, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Stars in user's Dorado (#F3CC6C = 243, 204, 108)
    stars.forEach(star => {
      star.alpha += star.speed;
      if (star.alpha > 0.95 || star.alpha < 0.1) {
        star.speed = -star.speed;
      }
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(243, 204, 108, ${Math.max(0, star.alpha)})`;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }
  render();
}

// -------------------------------------------------------------
// 2. NAVIGATION & VIEW SWITCHING
// -------------------------------------------------------------
function initNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const views = document.querySelectorAll('.app-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetViewId = tab.dataset.view;

      tabs.forEach(t => {
        t.classList.remove('nav-tab-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('nav-tab-active');
      tab.setAttribute('aria-selected', 'true');

      views.forEach(v => {
        if (v.id === targetViewId) {
          v.classList.remove('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          v.classList.add('hidden');
        }
      });

      initLucide();
    });
  });

  // Global links to view specific tabs
  document.querySelectorAll('[data-goto-view]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const viewId = link.dataset.gotoView;
      const targetTab = document.querySelector(`.nav-tab[data-view="${viewId}"]`);
      if (targetTab) targetTab.click();
    });
  });
}

// -------------------------------------------------------------
// 3. EL VIAJE DEL LOCO (Arcanos Mayores en 3 Septenarios)
// -------------------------------------------------------------
function initJourneyView() {
  const container = document.getElementById('journey-cards-container');
  if (!container) return;

  const data = window.TAROT_DATA;
  if (!data) return;

  const foolCard = data.cards.find(c => c.id === 'el-loco');
  const foolContainer = document.getElementById('fool-banner-container');
  if (foolContainer && foolCard) {
    foolContainer.innerHTML = `
      <div onclick="openCardModal('el-loco')" class="cursor-pointer group relative overflow-hidden rounded-2xl tarot-glass p-6 md:p-8 border border-dorado/40 hover:border-dorado transition-all duration-300">
        <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-dorado/10 rounded-full blur-2xl group-hover:bg-dorado/20 transition-all"></div>
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="w-24 h-36 md:w-28 md:h-44 rounded-xl border-2 border-dorado/70 bg-gradient-to-b from-tierra-900 via-tierra-800 to-tierra-950 flex flex-col items-center justify-between p-3 shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">
            <span class="text-xs font-serif font-bold text-dorado">0</span>
            <div class="text-3xl my-auto">☀️</div>
            <span class="text-[10px] uppercase tracking-wider font-semibold text-crema text-center">El Loco</span>
          </div>
          <div class="flex-1 text-center md:text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-dorado/15 text-dorado border border-dorado/40 mb-2">
              <span>Punto Cero & El Viajero Cósmico</span>
            </div>
            <h3 class="text-2xl md:text-3xl font-serif font-bold text-crema group-hover:text-dorado transition-colors">
              0. El Loco • El Salto de Fe
            </h3>
            <p class="text-beige text-sm md:text-base mt-2 leading-relaxed">
              No pertenece a ningún septenario porque es el alma misma que recorre los tres niveles. 
              Representa el potencial infinito, el salto al vacío sin prejuicios y la inocencia que despierta a la vida.
            </p>
            <div class="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              <span class="px-2.5 py-0.5 rounded text-xs bg-tierra-900 text-crema border border-tierra-700">Inocencia</span>
              <span class="px-2.5 py-0.5 rounded text-xs bg-tierra-900 text-crema border border-tierra-700">Espontaneidad</span>
              <span class="px-2.5 py-0.5 rounded text-xs bg-tierra-900 text-crema border border-tierra-700">Libertad pura</span>
              <span class="px-2.5 py-0.5 rounded text-xs bg-dorado/20 text-dorado border border-dorado/40">Haz clic para estudiar</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render the 3 Septenaries
  const septenaries = [
    {
      num: 1,
      cards: data.cards.filter(c => c.septenary === 1),
      title: "Septenario 1 (I al VII)",
      sub: "El Plano Terrenal, el Ego y el Desarrollo Personal",
      desc: "Del Mago al Carro: El alma encarna en el plano material, aprende a usar sus dones (Mago), escucha su misterio (Sacerdotisa), goza la abundancia (Emperatriz), instaura orden (Emperador), asimila la moral social (Hierofante), toma decisiones éticas (Enamorados) y triunfa en el mundo exterior dominando sus impulsos (Carro).",
      accent: "from-dorado/20 to-tierra-500/20",
      badgeColor: "bg-dorado/20 text-dorado border-dorado/40",
      borderGlow: "group-hover:border-dorado"
    },
    {
      num: 2,
      cards: data.cards.filter(c => c.septenary === 2),
      title: "Septenario 2 (VIII al XIV)",
      sub: "El Viaje Interior, el Alma, el Inconsciente y las Crisis de Madurez",
      desc: "De la Fuerza a la Templanza: Tras conquistar el mundo, el héroe mira hacia adentro. Aprende a domar sus fieras con compasión (Fuerza), busca la luz en la soledad (Ermitaño), acepta los giros del destino (Rueda), asume la responsabilidad kármica (Justicia), se rinde al compás de espera (Colgado), vive la muerte del viejo yo (Muerte) y sana en la alquimia del alma (Templanza).",
      accent: "from-tierra-600/30 to-beige/20",
      badgeColor: "bg-tierra-800 text-crema border-tierra-600",
      borderGlow: "group-hover:border-crema"
    },
    {
      num: 3,
      cards: data.cards.filter(c => c.septenary === 3),
      title: "Septenario 3 (XV al XXI)",
      sub: "Las Pruebas Espirituales, la Sombra, la Caída de Falsedades y la Liberación",
      desc: "Del Diablo al Mundo: El tramo supremo de la iluminación. Confronta sus apegos más oscuros (Diablo), presencia el derrumbe de sus falsas certezas (Torre), recupera la fe pura (Estrella), atraviesa la noche oscura de sus miedos (Luna), renace a la verdad cristalina (Sol), responde al llamado espiritual definitivo (Juicio) y culmina danzando en la totalidad cósmica (Mundo).",
      accent: "from-tierra-500/30 to-dorado/20",
      badgeColor: "bg-tierra-900 text-beige border-tierra-700",
      borderGlow: "group-hover:border-dorado"
    }
  ];

  let html = '';
  septenaries.forEach(sep => {
    html += `
      <section class="tarot-glass rounded-2xl p-6 md:p-8 border border-tierra-700/80 mb-10">
        <div class="border-b border-tierra-800 pb-5 mb-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${sep.badgeColor} border mb-2">
            <span>NIVEL DE CONCIENCIA ${sep.num}</span>
          </div>
          <h3 class="text-2xl md:text-3xl font-serif font-bold text-crema tracking-wide">
            ${sep.title}
          </h3>
          <h4 class="text-base md:text-lg text-dorado font-medium mt-1">
            ${sep.sub}
          </h4>
          <p class="text-beige text-sm mt-3 leading-relaxed max-w-4xl">
            ${sep.desc}
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          ${sep.cards.map(c => `
            <div onclick="openCardModal('${c.id}')" class="group cursor-pointer bg-tierra-900/90 hover:bg-tierra-800/90 border border-tierra-700/80 ${sep.borderGlow} rounded-xl p-3 flex flex-col items-center justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl text-center">
              <div class="w-full flex justify-between items-center text-[10px] text-dorado font-serif font-bold">
                <span>${c.roman}</span>
                <span class="text-[9px] text-beige">${c.element.split('/')[0]}</span>
              </div>
              <div class="my-4 text-3xl group-hover:scale-110 transition-transform">
                ${getCardEmoji(c)}
              </div>
              <h5 class="text-xs font-serif font-bold text-crema group-hover:text-dorado line-clamp-1 mb-1">
                ${c.name.replace(/^[0-9IVXLC]+\.\s*/, '')}
              </h5>
              <p class="text-[10px] text-beige line-clamp-2 leading-tight">
                ${c.keywordsUpright.slice(0, 2).join(' • ')}
              </p>
              <div class="mt-3 w-full pt-2 border-t border-tierra-800 text-[10px] text-dorado font-medium flex items-center justify-center gap-1 group-hover:text-dorado-light">
                <span>Ver carta</span>
                <i data-lucide="chevron-right" class="w-3 h-3"></i>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  });

  container.innerHTML = html;
  initLucide();
}

function getCardEmoji(c) {
  if (c.id === 'el-loco') return '🎒';
  if (c.id === 'el-mago') return '🪄';
  if (c.id === 'la-sacerdotisa') return '📜';
  if (c.id === 'la-emperatriz') return '👑';
  if (c.id === 'el-emperador') return '🏛️';
  if (c.id === 'el-sumo-sacerdote') return '🗝️';
  if (c.id === 'los-enamorados') return '❤️';
  if (c.id === 'el-carro') return '🐎';
  if (c.id === 'la-fuerza') return '🦁';
  if (c.id === 'el-ermitano') return '🏮';
  if (c.id === 'la-rueda-de-la-fortuna') return '☸️';
  if (c.id === 'la-justicia') return '⚖️';
  if (c.id === 'el-colgado') return '🌿';
  if (c.id === 'la-muerte') return '🦋';
  if (c.id === 'la-templanza') return '🏺';
  if (c.id === 'el-diablo') return '⛓️';
  if (c.id === 'la-torre') return '⚡';
  if (c.id === 'la-estrella') return '⭐';
  if (c.id === 'la-luna') return '🌙';
  if (c.id === 'el-sol') return '☀️';
  if (c.id === 'el-juicio') return '📯';
  if (c.id === 'el-mundo') return '🌍';

  if (c.suit === 'bastos') return '🔥';
  if (c.suit === 'copas') return '💧';
  if (c.suit === 'espadas') return '🗡️';
  if (c.suit === 'oros') return '🪙';

  return '✨';
}

// -------------------------------------------------------------
// 4. LABORATORIO DE FÓRMULAS INTERACTIVO (Elemento + Número / Corte)
// -------------------------------------------------------------
let formulaState = {
  suit: 'bastos',
  mode: 'number', // 'number' or 'court'
  number: 1,
  courtRank: 'sota'
};

function initFormulaBuilder() {
  const suitButtons = document.querySelectorAll('.formula-suit-btn');
  const modeButtons = document.querySelectorAll('.formula-mode-btn');
  const numberSelector = document.getElementById('formula-number-selector');
  const courtSelector = document.getElementById('formula-court-selector');

  suitButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      suitButtons.forEach(b => b.classList.remove('ring-2', 'ring-amber-400', 'bg-slate-800'));
      btn.classList.add('ring-2', 'ring-amber-400', 'bg-slate-800');
      formulaState.suit = btn.dataset.suit;
      updateFormulaOutput();
    });
  });

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => {
        b.classList.remove('bg-amber-400/20', 'text-amber-300', 'border-amber-400/40');
        b.classList.add('text-slate-400', 'border-slate-700');
      });
      btn.classList.add('bg-amber-400/20', 'text-amber-300', 'border-amber-400/40');
      btn.classList.remove('text-slate-400', 'border-slate-700');

      formulaState.mode = btn.dataset.mode;
      if (formulaState.mode === 'number') {
        numberSelector.classList.remove('hidden');
        courtSelector.classList.add('hidden');
      } else {
        numberSelector.classList.add('hidden');
        courtSelector.classList.remove('hidden');
      }
      updateFormulaOutput();
    });
  });

  // Number chips
  document.querySelectorAll('.formula-num-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.formula-num-chip').forEach(c => {
        c.classList.remove('bg-amber-400', 'text-slate-950', 'font-bold');
        c.classList.add('bg-slate-800', 'text-slate-200');
      });
      chip.classList.add('bg-amber-400', 'text-slate-950', 'font-bold');
      chip.classList.remove('bg-slate-800', 'text-slate-200');
      formulaState.number = parseInt(chip.dataset.number);
      updateFormulaOutput();
    });
  });

  // Court chips
  document.querySelectorAll('.formula-court-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.formula-court-chip').forEach(c => {
        c.classList.remove('bg-amber-400', 'text-slate-950', 'font-bold');
        c.classList.add('bg-slate-800', 'text-slate-200');
      });
      chip.classList.add('bg-amber-400', 'text-slate-950', 'font-bold');
      chip.classList.remove('bg-slate-800', 'text-slate-200');
      formulaState.courtRank = chip.dataset.court;
      updateFormulaOutput();
    });
  });

  updateFormulaOutput();
}

function updateFormulaOutput() {
  const data = window.TAROT_DATA;
  if (!data) return;

  const currentSuit = data.suits.find(s => s.key === formulaState.suit);
  let targetCard = null;
  let formulaTitle = '';
  let partA = '';
  let partB = '';
  let equationResult = '';

  if (formulaState.mode === 'number') {
    const numInfo = data.numbers[formulaState.number];
    const cardId = (formulaState.number === 1 ? 'as' : formulaState.number) + '-de-' + formulaState.suit;
    targetCard = data.cards.find(c => c.id === cardId);

    formulaTitle = `${targetCard ? targetCard.name : `${formulaState.number} de ${currentSuit.name}`}`;
    partA = `
      <div class="text-xs font-semibold uppercase tracking-wider text-dorado">Paso 1: ¿Qué Elemento es?</div>
      <div class="text-lg font-serif font-bold text-crema mt-1 flex items-center gap-2">
        <span>${currentSuit.icon}</span>
        <span>${currentSuit.name} (${currentSuit.element})</span>
      </div>
      <p class="text-xs text-beige mt-1 leading-relaxed">
        <strong>Área de la vida:</strong> ${currentSuit.area}
      </p>
    `;
    partB = `
      <div class="text-xs font-semibold uppercase tracking-wider text-dorado">Paso 2: ¿Qué Número es?</div>
      <div class="text-lg font-serif font-bold text-crema mt-1">
        ${numInfo.name}: ${numInfo.phase}
      </div>
      <p class="text-xs text-beige mt-1 leading-relaxed">
        <strong>Fase del proceso:</strong> ${numInfo.desc}
      </p>
    `;
    equationResult = targetCard ? targetCard.formula : `${currentSuit.element} + ${numInfo.phase}`;
  } else {
    const courtInfo = data.courts[formulaState.courtRank];
    const cardId = formulaState.courtRank + '-de-' + formulaState.suit;
    targetCard = data.cards.find(c => c.id === cardId);

    formulaTitle = `${targetCard ? targetCard.name : `${courtInfo.rankName} de ${currentSuit.name}`}`;
    partA = `
      <div class="text-xs font-semibold uppercase tracking-wider text-dorado">Paso 1: ¿Qué Elemento es?</div>
      <div class="text-lg font-serif font-bold text-crema mt-1 flex items-center gap-2">
        <span>${currentSuit.icon}</span>
        <span>${currentSuit.name} (${currentSuit.element})</span>
      </div>
      <p class="text-xs text-beige mt-1 leading-relaxed">
        <strong>Área de la vida:</strong> ${currentSuit.area}
      </p>
    `;
    partB = `
      <div class="text-xs font-semibold uppercase tracking-wider text-dorado">Paso 2: ¿Qué Corte es?</div>
      <div class="text-lg font-serif font-bold text-crema mt-1">
        ${courtInfo.rankName.toUpperCase()} (${courtInfo.title})
      </div>
      <p class="text-xs text-beige mt-1 leading-relaxed">
        <strong>Actitud y Rol:</strong> ${courtInfo.attitude}
      </p>
    `;
    equationResult = targetCard ? targetCard.formula : `${currentSuit.element} + ${courtInfo.title}`;
  }

  const container = document.getElementById('formula-result-card');
  if (container && targetCard) {
    container.innerHTML = `
      <div class="p-6 md:p-8 bg-tierra-900/60">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-tierra-700/60 pb-5">
          <div>
            <span class="text-xs font-medium text-dorado bg-dorado/15 px-2.5 py-1 rounded-full border border-dorado/30">
              Fórmula Pedagógica Instantánea
            </span>
            <h4 class="text-2xl md:text-3xl font-serif font-bold text-crema mt-2">
              ${formulaTitle}
            </h4>
          </div>
          <button onclick="openCardModal('${targetCard.id}')" class="btn-gold inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-lg flex-shrink-0">
            <span>Ver Ficha Completa</span>
            <i data-lucide="external-link" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Formula Components Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div class="p-4 rounded-xl bg-tierra-900 border border-tierra-700">
            ${partA}
          </div>
          <div class="p-4 rounded-xl bg-tierra-900 border border-tierra-700">
            ${partB}
          </div>
        </div>

        <!-- Synthesized Formula Box -->
        <div class="p-5 rounded-xl bg-tierra-900 border border-dorado/50">
          <div class="text-xs font-semibold text-dorado uppercase tracking-wider flex items-center gap-2 mb-2">
            <i data-lucide="sparkles" class="w-4 h-4 text-dorado"></i>
            <span>Síntesis de la Ecuación</span>
          </div>
          <p class="text-base md:text-lg text-crema font-medium leading-relaxed">
            "${equationResult}"
          </p>
        </div>

        <!-- Visual Eye Clue -->
        <div class="mt-4 p-4 rounded-xl bg-tierra-900/90 border border-tierra-700">
          <div class="text-xs font-semibold text-dorado uppercase tracking-wider flex items-center gap-2 mb-1">
            <i data-lucide="eye" class="w-4 h-4 text-dorado"></i>
            <span>Paso 3: ¿Qué está haciendo el dibujo? (Lo que ven tus ojos literales)</span>
          </div>
          <p class="text-sm text-crema leading-relaxed mt-1">
            ${targetCard.whatEyesSee}
          </p>
        </div>
      </div>
    `;
    initLucide();
  }
}

// -------------------------------------------------------------
// 5. ENCICLOPEDIA DE LAS 78 CARTAS (Buscador y Filtros)
// -------------------------------------------------------------
let encyclopediaFilter = 'all';
let searchQuery = '';

function initEncyclopedia() {
  renderEncyclopediaCards();

  const filterChips = document.querySelectorAll('.encyclo-filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => {
        c.classList.remove('bg-amber-400', 'text-slate-950', 'font-bold');
        c.classList.add('bg-slate-800', 'text-slate-300');
      });
      chip.classList.add('bg-amber-400', 'text-slate-950', 'font-bold');
      chip.classList.remove('bg-slate-800', 'text-slate-300');

      encyclopediaFilter = chip.dataset.filter;
      renderEncyclopediaCards();
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderEncyclopediaCards();
    });
  }
}

function renderEncyclopediaCards() {
  const container = document.getElementById('cards-grid-container');
  const countBadge = document.getElementById('cards-count-badge');
  if (!container) return;

  const data = window.TAROT_DATA;
  if (!data) return;

  let filtered = data.cards.filter(card => {
    // Category Filter
    if (encyclopediaFilter === 'major' && !card.isMajor) return false;
    if (encyclopediaFilter === 'minor' && card.isMajor) return false;
    if (encyclopediaFilter === 'bastos' && card.suit !== 'bastos') return false;
    if (encyclopediaFilter === 'copas' && card.suit !== 'copas') return false;
    if (encyclopediaFilter === 'espadas' && card.suit !== 'espadas') return false;
    if (encyclopediaFilter === 'oros' && card.suit !== 'oros') return false;
    if (encyclopediaFilter === 'courts' && !card.courtRank) return false;
    if (encyclopediaFilter === 'sep1' && card.septenary !== 1) return false;
    if (encyclopediaFilter === 'sep2' && card.septenary !== 2) return false;
    if (encyclopediaFilter === 'sep3' && card.septenary !== 3) return false;

    // Search Query
    if (searchQuery) {
      const matchName = card.name.toLowerCase().includes(searchQuery);
      const matchKeywords = (card.keywordsUpright || []).some(k => k.toLowerCase().includes(searchQuery));
      const matchElement = (card.element || '').toLowerCase().includes(searchQuery);
      const matchVisual = (card.whatEyesSee || '').toLowerCase().includes(searchQuery);
      const matchMeaning = (card.uprightMeaning || '').toLowerCase().includes(searchQuery);

      if (!matchName && !matchKeywords && !matchElement && !matchVisual && !matchMeaning) {
        return false;
      }
    }

    return true;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} cartas`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center tarot-glass rounded-2xl p-8">
        <i data-lucide="search-x" class="w-12 h-12 mx-auto text-slate-500 mb-3"></i>
        <h4 class="text-lg font-serif text-slate-200">No encontramos cartas con ese filtro</h4>
        <p class="text-xs text-slate-400 mt-1">Intenta con otra palabra como "amor", "dinero", "viaje", "fuego", o "espadas".</p>
      </div>
    `;
    initLucide();
    return;
  }

  container.innerHTML = filtered.map(card => {
    let badge = '';
    if (card.isMajor) {
      badge = `<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-dorado/15 text-dorado border border-dorado/40">Mayor ${card.roman}</span>`;
    } else if (card.courtRank) {
      badge = `<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-tierra-700 text-crema border border-tierra-600">${card.courtTitle ? card.courtTitle.split('/')[0] : 'Corte'}</span>`;
    } else {
      badge = `<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-tierra-900 text-beige border border-tierra-800">${card.displayNumber} de ${card.suitName}</span>`;
    }

    return `
      <div onclick="openCardModal('${card.id}')" class="group cursor-pointer rounded-xl tarot-glass p-4 border border-tierra-700/80 hover:border-dorado transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            ${badge}
            <span class="text-sm">${getCardEmoji(card)}</span>
          </div>

          <h4 class="text-base font-serif font-bold text-crema group-hover:text-dorado transition-colors line-clamp-1">
            ${card.name}
          </h4>

          <div class="text-xs text-dorado font-medium mt-1 line-clamp-1">
            ${card.isMajor ? (card.septenaryName || 'Viajero Cósmico') : card.formula}
          </div>

          <p class="text-xs text-beige mt-2 line-clamp-2 leading-relaxed">
            ${card.whatEyesSee}
          </p>
        </div>

        <div class="mt-4 pt-3 border-t border-tierra-800 flex items-center justify-between text-[11px] text-beige">
          <span class="truncate max-w-[140px]">${(card.keywordsUpright || []).slice(0, 2).join(' • ')}</span>
          <span class="text-dorado group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-semibold">
            Ver <i data-lucide="arrow-right" class="w-3 h-3"></i>
          </span>
        </div>
      </div>
    `;
  }).join('');

  initLucide();
}

// -------------------------------------------------------------
// 6. MODAL DE ESTUDIO PROFUNDO (Ficha completa con Notas)
// -------------------------------------------------------------
window.openCardModal = function(cardId) {
  const data = window.TAROT_DATA;
  if (!data) return;

  const card = data.cards.find(c => c.id === cardId);
  if (!card) return;

  const modal = document.getElementById('card-modal');
  const modalContent = document.getElementById('card-modal-content');
  if (!modal || !modalContent) return;

  // Retrieve saved user notes from localStorage (per-user or guest)
  const user = getCurrentUser();
  const savedNoteKey = user ? `tarot_note_${user.id}_${card.id}` : `tarot_note_${card.id}`;
  const savedNote = localStorage.getItem(savedNoteKey) || localStorage.getItem(`tarot_note_${card.id}`) || '';

  let headerBadge = '';
  if (card.isMajor) {
    headerBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/40">Arcano Mayor ${card.roman} • ${card.septenaryName || 'El Viajero'}</span>`;
  } else if (card.courtRank) {
    headerBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-purple-400/20 text-purple-300 border border-purple-400/40">Carta de la Corte • ${card.suitName} (${card.element})</span>`;
  } else {
    headerBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-sky-400/20 text-sky-300 border border-sky-400/40">Arcano Menor • ${card.suitName} (${card.element})</span>`;
  }

  modalContent.innerHTML = `
    <!-- Modal Header -->
    <div class="p-6 md:p-8 border-b border-tierra-700/60 flex items-start justify-between gap-4">
      <div>
        <div class="mb-2">${headerBadge}</div>
        <h3 class="text-2xl md:text-4xl font-serif font-bold text-crema flex items-center gap-3">
          <span>${card.name}</span>
          <span class="text-3xl">${getCardEmoji(card)}</span>
        </h3>
        <p class="text-sm md:text-base text-dorado font-medium mt-1">
          ${card.isMajor ? card.septenaryTheme : card.formula}
        </p>
      </div>
      <button onclick="closeCardModal()" class="w-10 h-10 rounded-full bg-tierra-800 hover:bg-tierra-700 text-crema flex items-center justify-center transition-colors flex-shrink-0">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
    </div>

    <!-- Modal Body -->
    <div class="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
      <!-- 1. El Ojo Literal (Lo que ven tus ojos) -->
      <div class="p-5 rounded-2xl bg-tierra-900 border border-dorado/40">
        <div class="flex items-center gap-2 text-xs font-bold text-dorado uppercase tracking-wider mb-2">
          <i data-lucide="eye" class="w-4 h-4 text-dorado"></i>
          <span>¿QUÉ ESTÁ HACIENDO EL DIBUJO? (Lo que ven tus ojos literales)</span>
        </div>
        <p class="text-base text-crema font-medium leading-relaxed">
          ${card.whatEyesSee}
        </p>
        <p class="text-xs text-beige mt-2 italic">
          <strong>Detalle visual:</strong> ${card.visualObservation}
        </p>
      </div>

      <!-- 2. La Ecuación Pedagógica -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 rounded-xl bg-tierra-900/90 border border-tierra-700/80">
          <div class="text-xs font-bold text-dorado uppercase tracking-wider mb-1">
            ${card.isMajor ? 'Nivel de Conciencia' : '1. ¿Qué Elemento es?'}
          </div>
          <div class="text-sm font-semibold text-crema">
            ${card.isMajor ? card.septenaryName : `${card.suitName} (${card.element})`}
          </div>
          <p class="text-xs text-beige mt-1">
            ${card.isMajor ? card.septenaryTheme : card.elementArea}
          </p>
        </div>

        <div class="p-4 rounded-xl bg-tierra-900/90 border border-tierra-700/80">
          <div class="text-xs font-bold text-dorado uppercase tracking-wider mb-1">
            ${card.isMajor ? 'Arquetipo Esencial' : (card.courtRank ? '2. ¿Qué Corte es?' : '2. ¿Qué Número es?')}
          </div>
          <div class="text-sm font-semibold text-crema">
            ${card.isMajor ? (card.archetype || 'El Viajero Cósmico') : (card.courtTitle || card.phaseName)}
          </div>
          <p class="text-xs text-beige mt-1">
            ${card.isMajor ? card.learningFormula : (card.phaseDesc || '')}
          </p>
        </div>
      </div>

      <!-- 3. Al Derecho vs Invertida (Luz y Sombra) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-5 rounded-xl bg-tierra-900/90 border border-tierra-600">
          <div class="flex items-center gap-2 text-xs font-bold text-dorado uppercase tracking-wider mb-2">
            <i data-lucide="sun" class="w-4 h-4"></i>
            <span>Al Derecho (Luz / Acción Fluida)</span>
          </div>
          <p class="text-sm text-crema leading-relaxed">
            ${card.uprightMeaning}
          </p>
          <div class="mt-3 flex flex-wrap gap-1.5">
            ${(card.keywordsUpright || []).map(k => `
              <span class="px-2 py-0.5 rounded text-[11px] bg-tierra-800 text-crema border border-tierra-600">${k}</span>
            `).join('')}
          </div>
        </div>

        <div class="p-5 rounded-xl bg-tierra-900/90 border border-tierra-700">
          <div class="flex items-center gap-2 text-xs font-bold text-tierra-400 uppercase tracking-wider mb-2">
            <i data-lucide="moon" class="w-4 h-4"></i>
            <span>Invertida (Sombra / Resistencia)</span>
          </div>
          <p class="text-sm text-beige leading-relaxed">
            ${card.reversedMeaning}
          </p>
          <div class="mt-3 flex flex-wrap gap-1.5">
            ${(card.keywordsReversed || []).map(k => `
              <span class="px-2 py-0.5 rounded text-[11px] bg-tierra-950 text-beige border border-tierra-800">${k}</span>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- 4. Pregunta Reflexiva & Consejo de Lectura -->
      <div class="p-5 rounded-xl bg-tierra-900/90 border border-tierra-700 space-y-3">
        <div>
          <div class="text-xs font-bold text-dorado uppercase tracking-wider flex items-center gap-2">
            <i data-lucide="help-circle" class="w-4 h-4 text-dorado"></i>
            <span>Pregunta para la Consulta</span>
          </div>
          <p class="text-sm md:text-base text-crema font-serif italic mt-1">
            "${card.reflectiveQuestion}"
          </p>
        </div>
        <div class="pt-3 border-t border-tierra-800">
          <div class="text-xs font-bold text-beige uppercase tracking-wider flex items-center gap-2">
            <i data-lucide="compass" class="w-4 h-4 text-beige"></i>
            <span>Consejo Práctico del Tarot</span>
          </div>
          <p class="text-xs md:text-sm text-beige mt-1">
            ${card.advice}
          </p>
        </div>
      </div>

      <!-- 5. Diario Personal del Estudiante (LocalStorage / Cuenta) -->
      <div class="p-5 rounded-xl bg-tierra-900/80 border border-tierra-700/80">
        <div class="flex items-center justify-between gap-2 mb-2">
          <div class="text-xs font-bold text-crema uppercase tracking-wider flex items-center gap-2">
            <i data-lucide="book-open" class="w-4 h-4 text-dorado"></i>
            <span>Tus Notas Personales de Estudio</span>
          </div>
          <span id="note-save-status" class="text-[11px] text-dorado hidden">¡Guardado con éxito!</span>
        </div>
        <textarea id="card-note-input" rows="3" placeholder="Anota aquí tus percepciones, sincronicidades o lo que te transmite esta carta en tus lecturas reales..." class="w-full rounded-xl bg-tierra-950 border border-tierra-700 p-3 text-xs md:text-sm text-crema placeholder-tierra-500 focus:outline-none focus:border-dorado transition-colors">${savedNote}</textarea>
        <div class="mt-2 flex justify-end">
          <button onclick="saveCardNote('${card.id}')" class="btn-gold px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors">
            <i data-lucide="save" class="w-3.5 h-3.5"></i>
            <span>Guardar Nota en tu Diario</span>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  initLucide();

  // If Google Firebase is connected, sync the latest note from the cloud in real time
  if (firebaseDb && user && user.id) {
    try {
      firebaseDb.ref('tarot/users/' + user.id + '/notes/' + card.id).once('value', snapshot => {
        const val = snapshot.val();
        if (val && val.content) {
          const input = document.getElementById('card-note-input');
          if (input) input.value = val.content;
          localStorage.setItem(savedNoteKey, val.content);
        }
      });
    } catch (e) {}
  }
};

window.closeCardModal = function() {
  const modal = document.getElementById('card-modal');
  if (modal) modal.classList.add('hidden');
};

window.saveCardNote = function(cardId) {
  const input = document.getElementById('card-note-input');
  const status = document.getElementById('note-save-status');
  if (!input) return;

  const user = getCurrentUser();
  const noteKey = user ? `tarot_note_${user.id}_${cardId}` : `tarot_note_${cardId}`;

  localStorage.setItem(noteKey, input.value);

  // Sync to Google Firebase Realtime Database if connected
  if (firebaseDb && user && user.id) {
    try {
      firebaseDb.ref('tarot/users/' + user.id + '/notes/' + cardId).set({
        cardId: cardId,
        content: input.value,
        updatedAt: Date.now()
      });
    } catch (err) {
      console.log('Nota guardada localmente (Firebase no respondió):', err);
    }
  }

  if (status) {
    status.classList.remove('hidden');
    setTimeout(() => {
      status.classList.add('hidden');
    }, 2500);
  }
};

// -------------------------------------------------------------
// 7. MESA DE TIRADAS INTERACTIVA (Spreads Simulator)
// -------------------------------------------------------------
let spreadType = 'one';
let drawnCards = [];

function initSpreads() {
  const spreadTypeSelect = document.getElementById('spread-type-select');
  const drawBtn = document.getElementById('deal-cards-btn');

  if (spreadTypeSelect) {
    spreadTypeSelect.addEventListener('change', (e) => {
      spreadType = e.target.value;
      resetSpreadTable();
    });
  }

  if (drawBtn) {
    drawBtn.addEventListener('click', () => {
      dealSpread();
    });
  }
}

function resetSpreadTable() {
  drawnCards = [];
  const container = document.getElementById('spread-cards-container');
  const analysisContainer = document.getElementById('spread-analysis-container');
  if (container) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <i data-lucide="shuffle" class="w-10 h-10 mx-auto mb-2 text-slate-600"></i>
        <p class="text-sm font-medium">Presiona "Barajar y Tirar Cartas" para comenzar tu práctica.</p>
      </div>
    `;
    initLucide();
  }
  if (analysisContainer) {
    analysisContainer.innerHTML = '';
  }
}

function dealSpread() {
  const data = window.TAROT_DATA;
  if (!data) return;

  const container = document.getElementById('spread-cards-container');
  const analysisContainer = document.getElementById('spread-analysis-container');
  if (!container) return;

  // Shuffle deck
  const deck = [...data.cards].sort(() => Math.random() - 0.5);

  let positions = [];
  if (spreadType === 'one') {
    positions = [
      { name: "Carta del Día / Consejo", card: deck[0] }
    ];
  } else if (spreadType === 'three-time') {
    positions = [
      { name: "1. El Pasado (Causa de la situación)", card: deck[0] },
      { name: "2. El Presente (Momento actual)", card: deck[1] },
      { name: "3. El Futuro (Hacia dónde se dirige)", card: deck[2] }
    ];
  } else if (spreadType === 'three-challenge') {
    positions = [
      { name: "1. La Situación Actual", card: deck[0] },
      { name: "2. El Desafío u Obstáculo", card: deck[1] },
      { name: "3. El Consejo Práctico", card: deck[2] }
    ];
  } else if (spreadType === 'septenaries') {
    // Drawn cards specifically representing the 3 Septenaries
    const majorCards = data.cards.filter(c => c.isMajor && c.number > 0);
    const sep1 = majorCards.filter(c => c.septenary === 1).sort(() => Math.random() - 0.5)[0];
    const sep2 = majorCards.filter(c => c.septenary === 2).sort(() => Math.random() - 0.5)[0];
    const sep3 = majorCards.filter(c => c.septenary === 3).sort(() => Math.random() - 0.5)[0];
    positions = [
      { name: "Septenario 1: Tu Plano Terrenal (Ego)", card: sep1 },
      { name: "Septenario 2: Tu Viaje Interior (Alma)", card: sep2 },
      { name: "Septenario 3: Tu Prueba Espiritual (Liberación)", card: sep3 }
    ];
  }

  drawnCards = positions;

  // Render cards facedown initially
  container.innerHTML = positions.map((pos, idx) => `
    <div class="flex flex-col items-center">
      <span class="text-xs font-serif font-bold text-dorado mb-2 text-center">${pos.name}</span>
      <div id="spread-card-${idx}" onclick="flipSpreadCard(${idx})" class="perspective-1000 w-44 h-64 md:w-52 md:h-76 cursor-pointer group">
        <div class="card-inner w-full h-full">
          <!-- Back of Card -->
          <div class="card-back tarot-glass tarot-back-pattern border-2 border-tierra-600 rounded-2xl flex flex-col items-center justify-center p-4 shadow-2xl group-hover:border-dorado group-hover:scale-[1.02] transition-all">
            <div class="w-16 h-16 rounded-full border border-dorado/50 flex items-center justify-center text-dorado text-2xl shadow-inner">
              ✨
            </div>
            <span class="text-[11px] font-serif uppercase tracking-widest text-dorado mt-4 font-semibold">Toca para Voltear</span>
          </div>

          <!-- Front of Card -->
          <div class="card-front tarot-glass border-2 border-dorado rounded-2xl p-4 flex flex-col justify-between shadow-2xl bg-tierra-900 text-left">
            <div>
              <div class="flex justify-between items-center text-xs text-dorado font-serif font-bold">
                <span>${pos.card.displayNumber}</span>
                <span>${getCardEmoji(pos.card)}</span>
              </div>
              <h5 class="text-sm md:text-base font-serif font-bold text-crema mt-2 leading-tight">
                ${pos.card.name}
              </h5>
              <div class="text-[11px] text-dorado font-medium mt-1 line-clamp-1">
                ${pos.card.isMajor ? pos.card.septenaryName : pos.card.formula}
              </div>
            </div>

            <div class="text-[11px] text-beige bg-tierra-950 p-2.5 rounded-lg border border-tierra-800">
              <strong class="text-dorado block text-[10px] uppercase">¿Qué hace el dibujo?</strong>
              <p class="line-clamp-3 mt-0.5">${pos.card.whatEyesSee}</p>
            </div>

            <button onclick="event.stopPropagation(); openCardModal('${pos.card.id}')" class="btn-earth w-full py-1.5 rounded-lg text-[11px] font-semibold text-center transition-colors">
              Ficha completa
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Initial prompt for analysis
  if (analysisContainer) {
    analysisContainer.innerHTML = `
      <div class="tarot-glass p-6 md:p-8 rounded-2xl border border-tierra-700/80">
        <h4 class="text-lg font-serif font-bold text-dorado flex items-center gap-2">
          <i data-lucide="sparkles" class="w-5 h-5 text-dorado"></i>
          <span>Guía de Interpretación Paso a Paso</span>
        </h4>
        <p class="text-xs md:text-sm text-beige mt-2 leading-relaxed">
          Haz clic en cada una de las cartas para revelarlas. Conforme las voltees, aplica las 3 preguntas clave del aprendiz:
          <strong>1. ¿Qué Elemento es?</strong>, <strong>2. ¿Qué Número o Corte es?</strong>, y <strong>3. ¿Qué está haciendo el dibujo con tus propios ojos?</strong>
        </p>
      </div>
    `;
    initLucide();
  }
}

window.flipSpreadCard = function(idx) {
  const cardElem = document.getElementById(`spread-card-${idx}`);
  if (!cardElem) return;

  cardElem.classList.toggle('card-flipped');
  updateSpreadAnalysis();
};

function updateSpreadAnalysis() {
  const analysisContainer = document.getElementById('spread-analysis-container');
  if (!analysisContainer) return;

  // Check how many cards are flipped
  const flippedCards = [];
  drawnCards.forEach((pos, idx) => {
    const cardElem = document.getElementById(`spread-card-${idx}`);
    if (cardElem && cardElem.classList.contains('card-flipped')) {
      flippedCards.push(pos);
    }
  });

  if (flippedCards.length === 0) return;

  analysisContainer.innerHTML = `
    <div class="tarot-glass p-6 md:p-8 rounded-2xl border border-dorado/40 space-y-6">
      <div class="border-b border-tierra-800 pb-4">
        <span class="text-xs font-semibold text-dorado uppercase tracking-wider">Desglose de la Tirada</span>
        <h4 class="text-xl md:text-2xl font-serif font-bold text-crema mt-1">
          Lectura Aplicando el Método del Aprendiz
        </h4>
      </div>

      <div class="space-y-4">
        ${flippedCards.map(f => `
          <div class="p-4 rounded-xl bg-tierra-900 border border-tierra-700/80">
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-bold text-dorado uppercase">${f.name}</span>
              <span class="text-xs text-beige">${f.card.name}</span>
            </div>
            <div class="text-sm font-semibold text-crema mb-1">
              Fórmula: <span class="text-dorado font-normal">${f.card.isMajor ? f.card.learningFormula : f.card.formula}</span>
            </div>
            <div class="text-xs text-beige leading-relaxed mt-2">
              <strong>Lo que ven tus ojos:</strong> ${f.card.whatEyesSee}
            </div>
            <div class="text-xs text-dorado-light leading-relaxed mt-1">
              <strong>Interpretación:</strong> ${f.card.uprightMeaning}
            </div>
          </div>
        `).join('')}
      </div>

      ${flippedCards.length === drawnCards.length ? `
        <div class="p-4 rounded-xl bg-tierra-900 border border-dorado/40 text-crema text-sm leading-relaxed">
          <strong class="text-dorado block mb-1 font-serif text-base">✨ Síntesis e Integración del Consejo:</strong>
          Observa la historia que se teje entre las cartas reveladas. Fíjate si predomina la acción y el fuego, los sentimientos del agua, las dudas de las espadas o la materia de los oros. Ese equilibrio elemental te indicará con precisión dónde debes poner hoy tu energía consciente.
        </div>
      ` : ''}
    </div>
  `;
  initLucide();
}

// -------------------------------------------------------------
// 8. ENTRENADOR Y FLASHCARDS (Tarot Gym Quiz)
// -------------------------------------------------------------
let quizQuestions = [];
let currentQuizIndex = 0;
let quizScore = 0;

function initQuiz() {
  const startBtn = document.getElementById('start-quiz-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      startNewQuiz();
    });
  }
}

function startNewQuiz() {
  const data = window.TAROT_DATA;
  if (!data) return;

  quizQuestions = generateQuizQuestions(data);
  currentQuizIndex = 0;
  quizScore = 0;

  renderQuizStep();
}

function generateQuizQuestions(data) {
  const questions = [
    {
      type: "formula",
      question: "¿A qué área de la vida corresponde el elemento FUEGO (Bastos)?",
      options: [
        "Ganas, entusiasmo, pasión, trabajo, impulso y acción",
        "Sentimientos, amor, vínculos e intuición",
        "Pensamientos, dudas, debates y estrategias mentales",
        "Dinero, cuerpo, casa y seguridad material"
      ],
      correct: 0,
      explanation: "Los Bastos representan el Fuego: la fuerza vital, el entusiasmo, la voluntad y las ganas de ponerse en acción."
    },
    {
      type: "formula",
      question: "¿Qué fase del proceso representa el número 5 en los Arcanos Menores?",
      options: [
        "Estabilidad y pausa segura",
        "Crisis, conflicto o prueba de fuego necesaria",
        "Cosecha y soledad fructífera",
        "Inicio y semilla del proyecto"
      ],
      correct: 1,
      explanation: "El número 5 rompe la estabilidad cómoda del 4 trayendo crisis, tensión y fricción para obligar a madurar."
    },
    {
      type: "septenary",
      question: "¿A qué Septenario pertenece 'El Ermitaño' (IX)?",
      options: [
        "Septenario 1: El plano terrenal, el ego y el desarrollo personal",
        "Septenario 2: El viaje interior, el alma y las crisis de madurez",
        "Septenario 3: Las pruebas espirituales, la sombra y la liberación",
        "A ninguno, es una carta suelta sin nivel de conciencia"
      ],
      correct: 1,
      explanation: "El Ermitaño (IX) está en el Septenario 2 (VIII al XIV): simboliza el retiro hacia adentro para encender la luz del alma."
    },
    {
      type: "court",
      question: "¿Qué actitud y rol caracteriza a la REINA en cualquier palo del Tarot?",
      options: [
        "Curiosidad juvenil, empezar a aprender algo sin experiencia",
        "Impulso veloz, salir a buscar algo con prisa y dinamismo",
        "La Maestra Interior: sabiduría emocional profunda hacia adentro, nutre, sostiene y protege",
        "El Líder hacia el exterior: control, toma de decisiones y orden final"
      ],
      correct: 2,
      explanation: "La Reina es la maestría receptiva: comprende la energía hacia adentro con empatía, contención y serenidad."
    },
    {
      type: "visual",
      question: "En el 4 de Espadas, ¿qué está haciendo el dibujo literalmente con tus propios ojos?",
      options: [
        "Luchando con furia contra cinco rivales",
        "Descansando como una estatua en reposo sobre una tumba, en tregua obligada",
        "Llorando por tres copas derramadas en el suelo",
        "Haciendo malabares con monedas sobre el mar"
      ],
      correct: 1,
      explanation: "El 4 de Espadas muestra a un caballero acostado en descanso sagrado: reposo mental obligatorio y retiro temporal de la batalla."
    },
    {
      type: "formula",
      question: "Si combinas COPAS (Agua/Sentimientos) + NÚMERO 1 (Inicio/Semilla), ¿qué carta resulta?",
      options: [
        "5 de Copas",
        "As de Copas: Nacimiento de un sentimiento puro, apertura del corazón",
        "Rey de Copas: Madurez emocional",
        "3 de Copas: Fiesta comunitaria"
      ],
      correct: 1,
      explanation: "As = 1 (Semilla/Inicio) + Copas (Agua/Amor) = As de Copas, el brote inmaculado de un sentimiento o despertar afectivo."
    },
    {
      type: "court",
      question: "Si alguien actúa con 'impulso veloz, buscando conquistar metas pero puede pecar de precipitado', ¿qué corte representa?",
      options: [
        "Sota (Aprendiz)",
        "Caballo (El Conquistador / Movimiento)",
        "Reina (La Contención)",
        "Rey (El Líder)"
      ],
      correct: 1,
      explanation: "El Caballo es el conquistador en movimiento: pone las cosas a rodar a toda velocidad."
    },
    {
      type: "septenary",
      question: "¿Cuál de estos Arcanos pertenece al Septenario 3 (Pruebas espirituales y liberación)?",
      options: [
        "El Mago (I)",
        "El Carro (VII)",
        "La Torre (XVI)",
        "La Rueda de la Fortuna (X)"
      ],
      correct: 2,
      explanation: "La Torre (XVI) forma parte del Septenario 3: la caída de estructuras falsas por el rayo de la verdad liberadora."
    }
  ];

  return questions.sort(() => Math.random() - 0.5);
}

function renderQuizStep() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  if (currentQuizIndex >= quizQuestions.length) {
    // Quiz finished!
    container.innerHTML = `
      <div class="tarot-glass p-8 md:p-12 rounded-2xl border border-dorado/50 text-center max-w-xl mx-auto space-y-6">
        <div class="w-20 h-20 rounded-full bg-dorado/20 text-dorado flex items-center justify-center text-4xl mx-auto border border-dorado/40">
          🏆
        </div>
        <h4 class="text-2xl md:text-3xl font-serif font-bold text-crema">
          ¡Entrenamiento Completado!
        </h4>
        <p class="text-base text-beige">
          Has acertado <strong class="text-dorado font-bold text-xl">${quizScore}</strong> de <strong class="text-crema">${quizQuestions.length}</strong> preguntas.
        </p>
        <div class="p-4 rounded-xl bg-tierra-900 border border-tierra-700 text-xs md:text-sm text-crema leading-relaxed">
          ${quizScore >= 7 ? '¡Impresionante! Tienes las fórmulas elementales, los tres septenarios y las cartas de la corte grabadas con maestría.' : '¡Buen intento! Cada ronda de práctica afianza tu capacidad de leer las cartas intuitivamente sin depender de manuales.'}
        </div>
        <button onclick="startNewQuiz()" class="btn-gold px-6 py-3 rounded-xl uppercase tracking-wider text-xs shadow-lg transition-all">
          Practicar Otra Ronda
        </button>
      </div>
    `;
    return;
  }

  const q = quizQuestions[currentQuizIndex];
  container.innerHTML = `
    <div class="tarot-glass p-6 md:p-8 rounded-2xl border border-tierra-700/80 max-w-2xl mx-auto space-y-6">
      <div class="flex items-center justify-between text-xs text-beige border-b border-tierra-800 pb-3">
        <span class="font-semibold text-dorado">Pregunta ${currentQuizIndex + 1} de ${quizQuestions.length}</span>
        <span>Aciertos: ${quizScore}</span>
      </div>

      <h4 class="text-lg md:text-xl font-serif font-bold text-crema leading-relaxed">
        ${q.question}
      </h4>

      <div class="space-y-3" id="quiz-options-list">
        ${q.options.map((opt, oIdx) => `
          <button onclick="handleQuizAnswer(${oIdx})" class="w-full text-left p-4 rounded-xl bg-tierra-900/90 hover:bg-tierra-800 border border-tierra-700 hover:border-dorado text-crema text-xs md:text-sm transition-all flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-tierra-800 text-dorado font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">${String.fromCharCode(65 + oIdx)}</span>
            <span class="leading-relaxed">${opt}</span>
          </button>
        `).join('')}
      </div>

      <div id="quiz-feedback-box" class="hidden p-4 rounded-xl text-xs md:text-sm space-y-2"></div>
    </div>
  `;
}

window.handleQuizAnswer = function(chosenIdx) {
  const q = quizQuestions[currentQuizIndex];
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const optionsList = document.getElementById('quiz-options-list');
  if (!feedbackBox || !optionsList) return;

  const buttons = optionsList.querySelectorAll('button');
  buttons.forEach((b, i) => {
    b.disabled = true;
    b.classList.remove('hover:border-amber-400', 'hover:bg-slate-800/90');
    if (i === q.correct) {
      b.classList.add('bg-emerald-950/60', 'border-emerald-500', 'text-emerald-200');
    } else if (i === chosenIdx) {
      b.classList.add('bg-rose-950/60', 'border-rose-500', 'text-rose-200');
    }
  });

  const isCorrect = chosenIdx === q.correct;
  if (isCorrect) quizScore++;

  feedbackBox.className = `p-4 rounded-xl text-xs md:text-sm space-y-2 ${isCorrect ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-100' : 'bg-rose-950/40 border border-rose-500/40 text-rose-100'}`;
  feedbackBox.innerHTML = `
    <div class="font-bold flex items-center gap-1.5">
      ${isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}
    </div>
    <p class="leading-relaxed">${q.explanation}</p>
    <div class="pt-2">
      <button onclick="nextQuizQuestion()" class="btn-gold px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all">
        Siguiente Pregunta →
      </button>
    </div>
  `;
  feedbackBox.classList.remove('hidden');
};

window.nextQuizQuestion = function() {
  currentQuizIndex++;
  renderQuizStep();
};

// -------------------------------------------------------------
// 9. COPIA DE SEGURIDAD Y MIGRACIÓN DE NOTAS (Exportar / Importar)
// -------------------------------------------------------------
window.exportTarotNotes = function() {
  const notes = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('tarot_note_')) {
      notes[key] = localStorage.getItem(key);
    }
  }

  const notesCount = Object.keys(notes).length;
  if (notesCount === 0) {
    alert('Aún no has escrito notas en ninguna carta para exportar.');
    return;
  }

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `arcana_mis_notas_tarot_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

window.importTarotNotes = function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedNotes = JSON.parse(e.target.result);
      let count = 0;
      for (const [key, value] of Object.entries(importedNotes)) {
        if (key.startsWith('tarot_note_') && typeof value === 'string') {
          localStorage.setItem(key, value);
          count++;
        }
      }
      alert(`¡Copia de seguridad restaurada con éxito! Se importaron ${count} notas de estudio.`);
      location.reload();
    } catch (err) {
      alert('Error: El archivo seleccionado no tiene un formato válido de notas de Arcana.');
    }
  };
  reader.readAsText(file);
};

// -------------------------------------------------------------
// 10. SISTEMA DE AUTENTICACIÓN Y GOOGLE FIREBASE (Sincronización en la Nube)
// -------------------------------------------------------------
let firebaseApp = null;
let firebaseDb = null;

function initFirebase() {
  if (typeof firebase !== 'undefined' && window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.apiKey && !window.FIREBASE_CONFIG.apiKey.startsWith('PEGA_AQUI')) {
    try {
      if (!firebase.apps.length) {
        firebaseApp = firebase.initializeApp(window.FIREBASE_CONFIG);
      } else {
        firebaseApp = firebase.app();
      }
      firebaseDb = firebase.database();
      console.log('✨ Google Firebase conectado exitosamente a la base de datos.');
    } catch (e) {
      console.log('Esperando configuración de Google Firebase:', e);
    }
  }
}

function getCurrentUser() {
  const userJson = localStorage.getItem('arcana_current_user');
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch (e) {
    return null;
  }
}

function initAuth() {
  initFirebase();
  updateAuthUI();
}

function updateAuthUI() {
  const user = getCurrentUser();
  const guestBtn = document.getElementById('auth-guest-btn');
  const userPill = document.getElementById('auth-user-pill');
  const userNameSpan = document.getElementById('auth-user-name');

  if (user && user.name) {
    if (guestBtn) guestBtn.classList.add('hidden');
    if (userPill) userPill.classList.remove('hidden');
    if (userNameSpan) userNameSpan.textContent = user.name;
  } else {
    if (guestBtn) guestBtn.classList.remove('hidden');
    if (userPill) userPill.classList.add('hidden');
  }
}

window.openAuthModal = function(initialMode = 'register') {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  setAuthMode(initialMode);
};

window.closeAuthModal = function() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.add('hidden');
};

window.setAuthMode = function(mode) {
  const tabReg = document.getElementById('auth-tab-register');
  const tabLog = document.getElementById('auth-tab-login');
  const formReg = document.getElementById('auth-form-register');
  const formLog = document.getElementById('auth-form-login');

  if (mode === 'register') {
    if (tabReg) tabReg.className = "px-4 py-2 text-xs font-bold rounded-lg bg-amber-400 text-slate-950 transition-all";
    if (tabLog) tabLog.className = "px-4 py-2 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition-all";
    if (formReg) formReg.classList.remove('hidden');
    if (formLog) formLog.classList.add('hidden');
  } else {
    if (tabLog) tabLog.className = "px-4 py-2 text-xs font-bold rounded-lg bg-amber-400 text-slate-950 transition-all";
    if (tabReg) tabReg.className = "px-4 py-2 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition-all";
    if (formLog) formLog.classList.remove('hidden');
    if (formReg) formReg.classList.add('hidden');
  }
};

window.handleRegisterSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const pass = document.getElementById('reg-pass').value;

  if (!name || !email || !pass) {
    alert('Por favor completa todos los campos.');
    return;
  }

  // Load existing accounts or create table
  let accounts = [];
  try {
    accounts = JSON.parse(localStorage.getItem('arcana_registered_users') || '[]');
  } catch(err) { accounts = []; }

  if (accounts.some(u => u.email === email)) {
    alert('Este correo ya está registrado. Por favor inicia sesión.');
    setAuthMode('login');
    return;
  }

  const newUser = {
    id: 'user_' + Date.now(),
    name: name,
    email: email,
    password: pass,
    createdAt: new Date().toISOString(),
    role: "Buscador del Tarot"
  };

  accounts.push(newUser);
  localStorage.setItem('arcana_registered_users', JSON.stringify(accounts));
  localStorage.setItem('arcana_current_user', JSON.stringify(newUser));

  // Migrate any existing guest notes to this user
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('tarot_note_') && !key.startsWith(`tarot_note_user_`)) {
      const cardId = key.replace('tarot_note_', '');
      const noteVal = localStorage.getItem(key);
      localStorage.setItem(`tarot_note_${newUser.id}_${cardId}`, noteVal);
    }
  }

  alert(`¡Bienvenida/o, ${name}! Tu cuenta ha sido creada y tus notas quedarán guardadas en tu perfil.`);
  closeAuthModal();
  updateAuthUI();
  location.reload();
};

window.handleLoginSubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('log-email').value.trim().toLowerCase();
  const pass = document.getElementById('log-pass').value;

  let accounts = [];
  try {
    accounts = JSON.parse(localStorage.getItem('arcana_registered_users') || '[]');
  } catch(err) { accounts = []; }

  const foundUser = accounts.find(u => u.email === email && u.password === pass);
  if (!foundUser) {
    alert('Correo o contraseña incorrectos. Si aún no tienes cuenta, elige "Crear Cuenta".');
    return;
  }

  localStorage.setItem('arcana_current_user', JSON.stringify(foundUser));
  alert(`¡Hola de nuevo, ${foundUser.name}!`);
  closeAuthModal();
  updateAuthUI();
  location.reload();
};

window.openProfileModal = function() {
  const user = getCurrentUser();
  if (!user) {
    openAuthModal('login');
    return;
  }

  const modal = document.getElementById('profile-modal');
  const content = document.getElementById('profile-modal-content');
  if (!modal || !content) return;

  // Count user notes
  let noteCount = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(`tarot_note_${user.id}_`)) {
      noteCount++;
    }
  }

  content.innerHTML = `
    <div class="flex items-center justify-between border-b border-tierra-700/60 pb-4 mb-5">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-dorado text-tierra-950 font-bold flex items-center justify-center text-xl shadow-lg">
          ${user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 class="text-xl font-serif font-bold text-crema">${user.name}</h3>
          <p class="text-xs text-dorado font-medium">${user.email}</p>
        </div>
      </div>
      <button onclick="closeProfileModal()" class="w-8 h-8 rounded-full bg-tierra-800 text-crema flex items-center justify-center hover:bg-tierra-700 transition-colors">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-3 my-4">
      <div class="p-4 rounded-xl bg-tierra-900 border border-tierra-700/60 text-center">
        <span class="text-2xl font-serif font-black text-dorado block">${noteCount}</span>
        <span class="text-[11px] text-beige uppercase tracking-wider block mt-1">Notas en Cartas</span>
      </div>
      <div class="p-4 rounded-xl bg-tierra-900 border border-tierra-700/60 text-center">
        <span class="text-2xl font-serif font-black text-dorado block">78</span>
        <span class="text-[11px] text-beige uppercase tracking-wider block mt-1">Cartas del Viaje</span>
      </div>
    </div>

    <div class="p-4 rounded-xl bg-tierra-900/60 border border-tierra-700/60 text-xs text-crema leading-relaxed mb-6">
      <p class="flex items-center gap-2 text-dorado font-bold mb-1">
        <i data-lucide="shield-check" class="w-4 h-4"></i>
        <span>Perfil Activo y Seguro</span>
      </p>
      Todas tus interpretaciones y notas están asociadas a tu cuenta y se pueden respaldar en cualquier momento.
    </div>

    <div class="flex items-center justify-between gap-3 pt-3 border-t border-tierra-700/60">
      <button onclick="exportTarotNotes()" class="px-4 py-2 rounded-lg bg-tierra-800 hover:bg-tierra-700 text-crema text-xs font-semibold flex items-center gap-1.5 transition-colors">
        <i data-lucide="download" class="w-3.5 h-3.5 text-dorado"></i>
        <span>Exportar Notas</span>
      </button>
      <button onclick="logoutUser()" class="px-4 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/40 text-xs font-semibold flex items-center gap-1.5 transition-colors">
        <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
        <span>Cerrar Sesión</span>
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
  initLucide();
};

window.closeProfileModal = function() {
  const modal = document.getElementById('profile-modal');
  if (modal) modal.classList.add('hidden');
};

window.logoutUser = function() {
  if (confirm('¿Deseas cerrar tu sesión?')) {
    localStorage.removeItem('arcana_current_user');
    updateAuthUI();
    closeProfileModal();
    location.reload();
  }
};


