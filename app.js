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
  document.title = `${project.title} - IoT Developer`;

  // Update project title
  const titleElement = document.getElementById("project-title");
  if (titleElement) titleElement.textContent = project.title;

  // Update tags
  const tagsElement = document.getElementById("project-tags");
  if (tagsElement) {
    tagsElement.innerHTML = project.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");
  }

  // Update image
  const imageContainer = document.querySelector(".project-image-large");
  if (imageContainer && project.image) {
    imageContainer.innerHTML = `<img src="${project.image}" alt="${project.title}" style="width:100%; height:100%; object-fit:cover;">`;
  }

  // Update description
  const descElement = document.getElementById("project-description");
  if (descElement) {
    let html = `
            <h2>Deskripsi Project</h2>
            <p>${project.fullDesc}</p>
        `;

    if (project.features) {
      html += `
                <h3>Fitur Utama:</h3>
                <ul>
                    ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
                </ul>
            `;
    }

    if (project.technologies) {
      html += `<h3>Teknologi yang Digunakan:</h3><ul>`;
      project.technologies.forEach((tech) => {
        html += `<li><strong>${tech.category}:</strong> ${tech.items}</li>`;
      });
      html += `</ul>`;
    }

    if (project.challenges) {
      html += `
                <h3>Tantangan & Solusi:</h3>
                <p>${project.challenges}</p>
            `;
    }

    if (project.role) {
      html += `<h3>Peran Dalam Project:</h3><ul>`;
      project.role.forEach((role) => {
        html += `<li>${role}</li>`;
      });
      html += `</ul>`;
    }

    descElement.innerHTML = html;
  }

  // Update links
  const linksContainer = document.querySelector(".project-detail-links");
  if (linksContainer) {
    linksContainer.innerHTML = `
            <a href="${project.githubUrl}" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                View on GitHub
            </a>
            <a href="${project.demoUrl}" class="btn btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Demo
            </a>
        `;
  }
}

// Initialize saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  console.log("✓ app.js initialized");

  // Hanya render project detail jika di halaman project-detail.html
  if (
    document.getElementById("project-title") ||
    window.location.search.includes("id=")
  ) {
    renderProjectDetail();
  }
});
