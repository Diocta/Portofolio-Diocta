// ============================================
// FUNGSI UNTUK RENDER DATA DI HALAMAN DETAIL
// Halaman projects.html dan achievements.html
// sudah menggunakan HTML hardcoded
// ============================================

// Fungsi untuk mendapatkan SVG icon berdasarkan nama
function getAchievementIcon(iconName) {
  const icons = {
    medal:
      '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>',
    certificate:
      '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
    innovation:
      '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
    code: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',
    graduation:
      '<rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline>',
    research:
      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
    community:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="17" y1="11" x2="23" y2="11"></line>',
    academic:
      '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
  };
  return icons[iconName] || icons.medal;
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getContentYear(item, kind) {
  const content = item.content || item;
  const explicitYear = Number.parseInt(content.year, 10);
  if (Number.isFinite(explicitYear) && explicitYear > 0) return explicitYear;

  const searchableText =
    kind === "experiences"
      ? String(content.period || "")
      : String(content.title || "");
  const years = searchableText.match(/(?:19|20)\d{2}/g) || [];
  return years.reduce((latest, year) => Math.max(latest, Number(year)), 0);
}

function sortContentByYear(items, kind) {
  return [...items].sort(
    (first, second) =>
      getContentYear(second, kind) - getContentYear(first, kind),
  );
}

function renderProjectCard(project) {
  const tags = project.tags
    .map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`)
    .join("");

  return `
    <a href="project-detail.html?id=${encodeURIComponent(project.id)}" class="project-card reveal-item">
      <div class="project-image">
        <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)}" loading="lazy" />
      </div>
      <div class="project-content">
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.shortDesc)}</p>
        <div class="project-tags">${tags}</div>
      </div>
      <span class="project-card-arrow" aria-hidden="true">↗</span>
    </a>
  `;
}

function renderProjects() {
  ["projects-preview", "projects-all"].forEach((containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const orderedProjects = sortContentByYear(projectsData, "projects");
    const limit = Number(container.dataset.limit) || orderedProjects.length;
    container.innerHTML = orderedProjects
      .slice(0, limit)
      .map(renderProjectCard)
      .join("");
  });
}

function renderHeroCarousel() {
  const carousel = document.getElementById("hero-carousel");
  const slideHost = document.getElementById("hero-carousel-slide");
  const scanline = document.getElementById("hero-scanline");
  const label = document.getElementById("hero-slide-label");
  const picker = document.getElementById("hero-slide-picker");
  const frame = document.getElementById("hero-carousel-frame");

  if (!carousel || !slideHost || !scanline || !label || !picker || !frame) {
    return;
  }

  const latestProjects = sortContentByYear(projectsData, "projects").slice(
    0,
    2,
  );
  const latestAchievements = sortContentByYear(
    achievementsData,
    "achievements",
  ).slice(0, 2);
  const slides = [
    {
      key: "profile",
      label: "PROFIL",
      duration: 9000,
      content: `
        <article class="hero-slide hero-profile-slide" aria-roledescription="slide" aria-label="Profil Diocta">
          <figure class="hero-visual hero-profile-visual">
            <img src="assets/profil.png" alt="Foto profil Diocta Brian Cesario" />
            <figcaption><span>PROFILE / ABOUT</span><strong>IoT &amp; Embedded Systems</strong></figcaption>
          </figure>
          <div class="hero-profile-card">
            <img src="assets/profil.png" alt="" />
            <div><span>Student at SMK Telkom Sidoarjo</span><strong>Diocta Brian Cesario</strong></div>
          </div>
        </article>
      `,
    },
    {
      key: "projects",
      label: "PROYEK TERBARU",
      duration: 6000,
      content: `
        <article class="hero-slide hero-pair-slide" aria-roledescription="slide" aria-label="Dua proyek terbaru">
          ${latestProjects
            .map(
              (project, index) => `
                <figure class="hero-visual hero-pair-card">
                  <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)}" />
                  <figcaption><span>PROYEK / 0${index + 1}</span><strong>${escapeHTML(project.title)}</strong></figcaption>
                </figure>
              `,
            )
            .join("")}
        </article>
      `,
    },
    {
      key: "achievements",
      label: "PRESTASI TERBARU",
      duration: 7000,
      content: `
        <article class="hero-slide hero-pair-slide hero-achievement-slide" aria-roledescription="slide" aria-label="Dua prestasi terbaru">
          ${latestAchievements
            .map(
              (achievement, index) => `
                <figure class="hero-visual hero-pair-card">
                  <img src="${escapeHTML(achievement.image)}" alt="${escapeHTML(achievement.title)}" />
                  <figcaption><span>PRESTASI / ${escapeHTML(achievement.year)}</span><strong>${escapeHTML(achievement.title)}</strong></figcaption>
                </figure>
              `,
            )
            .join("")}
        </article>
      `,
    },
  ];

  let activeIndex = 0;
  let timerId;
  let isPaused = false;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  picker.innerHTML = slides
    .map(
      (slide, index) =>
        `<button class="hero-slide-choice" type="button" data-hero-index="${index}" aria-pressed="false" aria-label="Tampilkan ${escapeHTML(slide.label.toLocaleLowerCase("id"))}"><span class="hero-slide-choice-mark"></span><span>${escapeHTML(slide.label)}</span></button>`,
    )
    .join("");

  const scheduleNext = () => {
    window.clearTimeout(timerId);
    if (reducedMotion || isPaused) return;
    timerId = window.setTimeout(
      () => showSlide(activeIndex + 1),
      slides[activeIndex].duration,
    );
  };

  function showSlide(nextIndex) {
    activeIndex = (nextIndex + slides.length) % slides.length;
    const slide = slides[activeIndex];

    slideHost.classList.remove("is-entering");
    slideHost.innerHTML = slide.content;
    label.textContent = slide.label;
    picker.querySelectorAll("[data-hero-index]").forEach((button, index) => {
      button.setAttribute("aria-pressed", String(index === activeIndex));
    });

    scanline.classList.remove("is-scanning");
    scanline.style.setProperty("--hero-slide-duration", `${slide.duration}ms`);
    void scanline.offsetWidth;
    if (!reducedMotion) scanline.classList.add("is-scanning");
    void slideHost.offsetWidth;
    slideHost.classList.add("is-entering");
    scheduleNext();
  }

  const pause = () => {
    isPaused = true;
    window.clearTimeout(timerId);
    scanline.classList.add("is-paused");
  };

  const resume = () => {
    if (!isPaused) return;
    isPaused = false;
    scanline.classList.remove("is-scanning", "is-paused");
    void scanline.offsetWidth;
    if (!reducedMotion) scanline.classList.add("is-scanning");
    scheduleNext();
  };

  picker.addEventListener("click", (event) => {
    const button = event.target.closest("[data-hero-index]");
    if (button) showSlide(Number(button.dataset.heroIndex));
  });

  carousel.querySelectorAll("[data-hero-step]").forEach((button) => {
    button.addEventListener("click", () => {
      showSlide(activeIndex + Number(button.dataset.heroStep));
    });
  });

  frame.addEventListener("mouseenter", pause);
  frame.addEventListener("mouseleave", resume);
  frame.addEventListener("focusin", pause);
  frame.addEventListener("focusout", (event) => {
    if (!frame.contains(event.relatedTarget)) resume();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pause();
    else resume();
  });

  let touchStartX = null;
  frame.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true },
  );
  frame.addEventListener(
    "touchend",
    (event) => {
      if (touchStartX === null) return;
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 48) showSlide(activeIndex + (deltaX < 0 ? 1 : -1));
      touchStartX = null;
    },
    { passive: true },
  );

  showSlide(0);
}

function renderProjectSpotlight() {
  const spotlight = document.getElementById("project-spotlight");
  const picker = document.getElementById("spotlight-picker");
  if (!spotlight || !picker || !projectsData.length) return;
  const orderedProjects = sortContentByYear(projectsData, "projects");

  const media = document.getElementById("spotlight-media");
  const title = document.getElementById("spotlight-title");
  const description = document.getElementById("spotlight-description");
  const tags = document.getElementById("spotlight-tags");
  const detailLink = document.getElementById("spotlight-link");
  let activeIndex = 0;

  const renderActiveProject = () => {
    const project = orderedProjects[activeIndex];
    media.classList.remove("is-changing");
    media.innerHTML = `
      <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)}" />
      <figcaption><span>FIELD NOTES</span><span>${escapeHTML(project.tags.slice(0, 3).join(" / "))}</span></figcaption>
    `;
    void media.offsetWidth;
    media.classList.add("is-changing");
    title.textContent = project.title;
    description.textContent = project.shortDesc;
    tags.innerHTML = project.tags
      .map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`)
      .join("");
    detailLink.href = `project-detail.html?id=${encodeURIComponent(project.id)}`;

    picker
      .querySelectorAll("[data-spotlight-index]")
      .forEach((button, index) => {
        button.setAttribute("aria-pressed", String(index === activeIndex));
      });
  };

  picker.innerHTML = orderedProjects
    .map(
      (project, index) =>
        `<button class="spotlight-step" type="button" data-spotlight-index="${index}" aria-pressed="false" aria-label="Pilih proyek ${escapeHTML(project.title)}"><span>${escapeHTML(project.title)}</span></button>`,
    )
    .join("");

  picker.addEventListener("click", (event) => {
    const button = event.target.closest("[data-spotlight-index]");
    if (!button) return;
    activeIndex = Number(button.dataset.spotlightIndex);
    renderActiveProject();
  });

  spotlight.querySelectorAll("[data-spotlight-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const step = Number(button.dataset.spotlightStep);
      activeIndex =
        (activeIndex + step + orderedProjects.length) % orderedProjects.length;
      renderActiveProject();
    });
  });

  renderActiveProject();
}

function initializeProjectFilters() {
  const searchInput = document.getElementById("project-search");
  const filterSelect = document.getElementById("project-filter");
  const emptyState = document.getElementById("project-empty");
  const projectGrid = document.getElementById("projects-all");

  if (!searchInput || !filterSelect || !projectGrid) return;

  [...new Set(projectsData.flatMap((project) => project.tags))]
    .sort((first, second) => first.localeCompare(second))
    .forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag;
      option.textContent = tag;
      filterSelect.append(option);
    });

  const updateResults = () => {
    const query = searchInput.value.trim().toLocaleLowerCase("id");
    const selectedTag = filterSelect.value;
    const cards = [...projectGrid.querySelectorAll(".project-card")];
    let hasVisibleResults = false;

    cards.forEach((card) => {
      const matchesQuery = card.textContent
        .toLocaleLowerCase("id")
        .includes(query);
      const cardTags = [...card.querySelectorAll(".tag")].map(
        (tag) => tag.textContent,
      );
      const matchesTag = !selectedTag || cardTags.includes(selectedTag);
      card.hidden = !(matchesQuery && matchesTag);
      if (!card.hidden) hasVisibleResults = true;
    });

    if (emptyState) emptyState.hidden = hasVisibleResults;
  };

  searchInput.addEventListener("input", updateResults);
  filterSelect.addEventListener("change", updateResults);
  updateResults();
}

function renderAchievementCard(achievement) {
  return `
    <article class="achievement-card reveal-item">
      <div class="achievement-image">
        <img src="${escapeHTML(achievement.image)}" alt="${escapeHTML(achievement.title)}" loading="lazy" />
      </div>
      <div class="achievement-content">
        <p class="achievement-year">${escapeHTML(achievement.year)}</p>
        <h3>${escapeHTML(achievement.title)}</h3>
        <p class="achievement-organizer">${escapeHTML(achievement.organizer)}</p>
        <p class="achievement-desc">${escapeHTML(achievement.shortDesc)}</p>
      </div>
    </article>
  `;
}

function renderAchievements() {
  ["achievements-preview", "achievements-all"].forEach((containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const orderedAchievements = sortContentByYear(
      achievementsData,
      "achievements",
    );
    const limit = Number(container.dataset.limit) || orderedAchievements.length;
    container.innerHTML = orderedAchievements
      .slice(0, limit)
      .map(renderAchievementCard)
      .join("");
  });
}

function renderSkills() {
  const container = document.getElementById("skills-grid");
  if (!container) return;

  container.innerHTML = skillsData
    .map(
      (category) => `
        <section class="skill-category reveal-item">
          <h3 class="category-title">${escapeHTML(category.category)}</h3>
          <div class="skill-items">
            ${category.items.map((skill) => `<span class="skill-badge">${escapeHTML(skill)}</span>`).join("")}
          </div>
        </section>
      `,
    )
    .join("");
}

function renderExperienceCard(experience) {
  const responsibilities = experience.responsibilities
    .map((item) => `<li>${escapeHTML(item)}</li>`)
    .join("");
  const evidence = experience.evidence
    .map((item, index) => {
      if (typeof item === "string") {
        return `
          <div class="evidence-placeholder" role="img" aria-label="${escapeHTML(item)}">
            <span class="evidence-index">0${index + 1}</span>
            <span>${escapeHTML(item)}</span>
            <small>GANTI DENGAN FOTO / BUKTI</small>
          </div>
        `;
      }

      return `
        <a class="evidence-image" href="${escapeHTML(item.url)}" target="_blank" rel="noreferrer">
          <img src="${escapeHTML(item.url)}" alt="${escapeHTML(item.label || "Bukti pengalaman")}" loading="lazy" />
          <span>${escapeHTML(item.label || "Lihat bukti")}</span>
        </a>
      `;
    })
    .join("");

  return `
    <article class="experience-entry reveal-item">
      <div class="experience-marker" aria-hidden="true"><span></span></div>
      <div class="experience-main">
        <div class="experience-heading">
          <div>
            <p class="eyebrow">${escapeHTML(experience.type)} <span class="placeholder-label">SELESAI</span></p>
            <h2>${escapeHTML(experience.position)}</h2>
            <p class="experience-organization">${escapeHTML(experience.organization)}</p>
          </div>
          <span class="experience-period">${escapeHTML(experience.period)}</span>
        </div>
        <p class="experience-summary">${escapeHTML(experience.summary)}</p>
        <ul class="experience-responsibilities">${responsibilities}</ul>
        <div class="experience-evidence">${evidence}</div>
      </div>
    </article>
  `;
}

function renderExperiences() {
  const container = document.getElementById("experience-list");
  if (!container) return;
  container.innerHTML = experienceData.map(renderExperienceCard).join("");
}

let supabaseSdkPromise;

function loadSupabaseSdk() {
  if (window.supabase?.createClient) return Promise.resolve(window.supabase);
  if (supabaseSdkPromise) return supabaseSdkPromise;

  supabaseSdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.onload = () => {
      if (window.supabase?.createClient) resolve(window.supabase);
      else reject(new Error("Supabase client tidak tersedia."));
    };
    script.onerror = () => reject(new Error("Supabase client gagal dimuat."));
    document.head.append(script);
  });

  return supabaseSdkPromise;
}

async function loadPublishedContent() {
  const config = window.PORTFOLIO_SUPABASE;
  if (!config?.url?.trim() || !config?.anonKey?.trim()) return false;

  try {
    const sdk = await loadSupabaseSdk();
    const client = sdk.createClient(config.url.trim(), config.anonKey.trim());
    const { data, error } = await client
      .from("portfolio_items")
      .select("kind, content, sort_order")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    if (!data?.length) return false;

    const remoteContent = {
      projects: [],
      experiences: [],
      skills: [],
      achievements: [],
    };

    data.forEach((row) => {
      if (Object.hasOwn(remoteContent, row.kind)) {
        remoteContent[row.kind].push(row.content);
      }
    });

    projectsData = remoteContent.projects;
    experienceData = remoteContent.experiences;
    skillsData = remoteContent.skills;
    achievementsData = remoteContent.achievements;
    return true;
  } catch (error) {
    console.warn(
      "Konten Supabase tidak dapat dimuat; memakai data lokal.",
      error,
    );
    return false;
  }
}

// Fungsi untuk render detail project
function renderProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = parseInt(urlParams.get("id"));

  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    window.location.href = "projects.html";
    return;
  }

  // Update title
  document.title = `${project.title} - Diocta`;

  // Update project title
  const titleElement = document.getElementById("project-title");
  if (titleElement) titleElement.textContent = project.title;

  // Update tags
  const tagsElement = document.getElementById("project-tags");
  if (tagsElement) {
    tagsElement.innerHTML = project.tags
      .map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`)
      .join("");
  }

  // Update image
  const imageContainer = document.querySelector(".project-image-large");
  if (imageContainer && project.image) {
    imageContainer.innerHTML = `<img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)}">`;
  }

  // Update description
  const descElement = document.getElementById("project-description");
  if (descElement) {
    const paragraphs = (project.fullDesc || "")
      .split(/\n\s*\n/)
      .map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`)
      .join("");
    let html = `<h2>Deskripsi Proyek</h2>${paragraphs}`;

    if (project.features) {
      html += `
        <h3>Fitur Utama</h3>
        <ul>${project.features.map((feature) => `<li>${escapeHTML(feature)}</li>`).join("")}</ul>
      `;
    }

    if (project.technologies) {
      html += `<h3>Teknologi yang Digunakan</h3><ul>`;
      project.technologies.forEach((tech) => {
        html += `<li><strong>${escapeHTML(tech.category)}:</strong> ${escapeHTML(tech.items)}</li>`;
      });
      html += `</ul>`;
    }

    if (project.challenges) {
      html += `
        <h3>Tantangan &amp; Solusi</h3>
        <p>${escapeHTML(project.challenges)}</p>
      `;
    }

    if (project.role) {
      html += `<h3>Peran dalam Proyek</h3><ul>`;
      project.role.forEach((role) => {
        html += `<li>${escapeHTML(role)}</li>`;
      });
      html += `</ul>`;
    }

    if (project.results) {
      html += `<h3>Hasil</h3><p>${escapeHTML(project.results)}</p>`;
    }

    descElement.innerHTML = html;
  }

  // Update links
  const linksContainer = document.querySelector(".project-detail-links");
  if (linksContainer) {
    const links = [
      { url: project.githubUrl, label: "Kode sumber" },
      { url: project.demoUrl, label: "Lihat demo" },
    ].filter((link) => link.url && link.url !== "#");

    linksContainer.innerHTML = links
      .map(
        (link) =>
          `<a href="${escapeHTML(link.url)}" class="btn btn-secondary" target="_blank" rel="noreferrer">${escapeHTML(link.label)} <span aria-hidden="true">↗</span></a>`,
      )
      .join("");
    linksContainer.hidden = links.length === 0;
  }
}

// Initialize saat halaman dimuat
document.addEventListener("DOMContentLoaded", async function () {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  await loadPublishedContent();
  renderProjects();
  renderHeroCarousel();
  renderProjectSpotlight();
  renderAchievements();
  renderExperiences();
  renderSkills();
  initializeProjectFilters();

  if (document.getElementById("project-title")) renderProjectDetail();
  window.refreshPortfolioReveals();
});
