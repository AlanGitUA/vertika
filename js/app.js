/* ── CONFIGURACIÓN ───────────────────────
     Cambia este número por el tuyo real.
     Formato: código de país + número, sin + ni espacios.
     Ejemplo Chile: 56912345678
  ─────────────────────────────────────────── */
  const WHATSAPP_NUMBER = '56912345678';

  /* colores de placeholder para las colecciones (en caso de no tener foto de portada) */
  const COLLECTION_COVERS = {
    'Poleras':     'img/colecciones/poleras.svg',
    'Polerones':   'img/colecciones/polerones.svg',
    'Pantalones':  'img/colecciones/pantalones.svg',
    'Accesorios':  'img/colecciones/accesorios.svg',
  };

  let products = [];
  let currentFilter = 'Todos';
  let selectedSize   = null;
  let currentProduct = null;

  /* ── FORMAT PRECIO ── */
  function fmtPrice(n) {
    return '$' + n.toLocaleString('es-CL') + ' CLP';
  }

  /* ── WSP LINK ── */
  function wspLink(product, size) {
    const chosenSize = size || 'Sin seleccionar';
    const msg = encodeURIComponent(`Hola Vertika! Quiero talla ${chosenSize}`);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  }

  /* ── RENDER COLECCIONES ── */
  function renderCollections(products) {
    const cats = [...new Set(products.map(p => p.category))];
    const grid = document.getElementById('collections-grid');
    grid.innerHTML = cats.map(cat => {
      const cover = COLLECTION_COVERS[cat] || products.find(p => p.category === cat)?.img || '';
      const count = products.filter(p => p.category === cat).length;
      return `
        <a class="collection-card reveal" href="#productos" onclick="filterCategory('${cat}')">
          <img class="collection-card-img" src="${cover}" alt="${cat}" loading="lazy" />
          <div class="collection-card-overlay">
            <span class="collection-label">${count} ${count === 1 ? 'prenda' : 'prendas'}</span>
            <span class="collection-name">${cat}</span>
          </div>
        </a>`;
    }).join('');
    setTimeout(observeReveal, 60);
  }

  /* ── RENDER FILTROS ── */
  function renderFilters(products) {
    const cats = ['Todos', ...new Set(products.map(p => p.category))];
    const hasSale = products.some(p => p.badge === 'sale');
    if (hasSale) cats.push('Sale');
    document.getElementById('filter-bar').innerHTML = cats.map(c =>
      `<button class="filter-btn ${c === 'Todos' ? 'active' : ''}" onclick="filterCategory('${c}')">${c}</button>`
    ).join('');
  }

  /* ── FILTER ── */
  function filterCategory(cat) {
    currentFilter = cat;
    document.querySelectorAll('.filter-btn').forEach(b =>
      b.classList.toggle('active', b.textContent === cat)
    );
    renderProducts(cat);
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
  }

  /* ── RENDER PRODUCTS ── */
  function renderProducts(filter = 'Todos') {
    let list = products;
    if (filter === 'Sale') list = products.filter(p => p.badge === 'sale');
    else if (filter !== 'Todos') list = products.filter(p => p.category === filter);

    document.getElementById('product-count').textContent = list.length + ' prendas';

    document.getElementById('products-grid').innerHTML = list.map(p => {
      const badgeHtml = p.badge
        ? `<span class="product-badge ${p.badge === 'sale' ? 'badge-sale' : 'badge-nuevo'}">${p.badge === 'sale' ? 'Sale' : 'Nuevo'}</span>`
        : '';
      const origHtml = p.originalPrice
        ? `<span class="product-price-original">${fmtPrice(p.originalPrice)}</span>`
        : '';

      return `
        <div class="product-card reveal" onclick="openModal(${p.id})">
          <div class="product-img-wrap">
            <img class="product-img"       src="${p.img}"      alt="${p.name}" loading="lazy" />
            <img class="product-img-hover" src="${p.imgHover}" alt="${p.name}" loading="lazy" />
            ${badgeHtml}
            <div class="product-want" onclick="event.stopPropagation()">
              <a class="want-btn" href="${wspLink(p, p.sizes[0])}" target="_blank" rel="noopener">
                <svg class="wsp-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                ¡La quiero!
              </a>
            </div>
          </div>
          <div class="product-info">
            <p class="product-category">${p.category}</p>
            <p class="product-name">${p.name}</p>
            <div class="product-price-wrap">
              <span class="product-price">${fmtPrice(p.price)}</span>
              ${origHtml}
            </div>
          </div>
        </div>`;
    }).join('');

    setTimeout(observeReveal, 60);
  }

  /* ── MODAL ── */
  function openModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    currentProduct = p;
    selectedSize   = p.sizes[0];

    document.getElementById('modal-img').src          = p.img;
    document.getElementById('modal-img').alt          = p.name;
    document.getElementById('modal-img-hover').src    = p.imgHover;
    document.getElementById('modal-img-hover').alt    = p.name;
    document.getElementById('modal-category').textContent = p.category;
    document.getElementById('modal-name').textContent     = p.name;
    document.getElementById('modal-price').textContent    = fmtPrice(p.price);

    const origEl = document.getElementById('modal-price-orig');
    origEl.textContent = p.originalPrice ? fmtPrice(p.originalPrice) : '';

    document.getElementById('modal-desc').textContent = p.desc;

    document.getElementById('modal-details').innerHTML =
      Object.entries(p.details)
        .map(([k,v]) => `${k.toUpperCase()}&nbsp;&nbsp;<span>${v}</span>`)
        .join('<br>');

    document.getElementById('modal-sizes').innerHTML =
      p.sizes.map((s, i) =>
        `<button class="size-pill ${i === 0 ? 'selected' : ''}" onclick="selectModalSize(this,'${s}')">${s}</button>`
      ).join('');

    updateModalWspLink();

    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function selectModalSize(btn, size) {
    document.querySelectorAll('#modal-sizes .size-pill').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedSize = size;
    updateModalWspLink();
  }

  function updateModalWspLink() {
    if (!currentProduct) return;
    document.getElementById('modal-want-btn').href = wspLink(currentProduct, selectedSize);
  }

  function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* click fuera del modal lo cierra */
  document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  /* ESC cierra el modal */
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ── SCROLL REVEAL ── */
  function observeReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 75);
          io.unobserve(e.target);
        }
      });
    }, { threshold: .1 });
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));
  }

  /* ── INIT — carga products.json ── */
 fetch('data/products.json')
    .then(r => r.json())
    .then(data => {
      products = data;
      renderCollections(data);
      renderFilters(data);
      renderProducts('Todos');
      observeReveal();
    })
    .catch(err => {
      console.error('Error cargando products.json:', err);
      document.getElementById('products-grid').innerHTML =
        '<p style="color:var(--muted);font-style:italic;grid-column:1/-1;text-align:center;padding:3rem 0;">No se pudo cargar los productos. ¿Estás corriendo un servidor local?<br><small style="font-family:Space Mono,monospace;font-size:.65rem;letter-spacing:.1em;">Ver README.md para instrucciones.</small></p>';
    });

const popup = document.getElementById("promo-popup");
  const closeBtn = document.querySelector(".popup-close");
  const whatsappBtn = document.querySelector(".popup-btn");



  // Mostrar popup después de 2 segundos
  setTimeout(() => {
    popup.style.display = "flex";
  }, 2000);

  // Cerrar popup
  closeBtn.onclick = () => {
    popup.style.display = "none";
  };

  // Botón WhatsApp
  whatsappBtn.onclick = (e) => {
    e.preventDefault();
    const message = "Hola Vertika! Tengo un código de descuento";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };