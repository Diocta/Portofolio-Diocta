const kindNames = {
  projects: "Proyek",
  experiences: "Pengalaman",
  skills: "Keahlian",
  achievements: "Prestasi",
};

const configNotice = document.getElementById("config-notice");
const loginPanel = document.getElementById("login-panel");
const passwordRecoveryPanel = document.getElementById(
  "password-recovery-panel",
);
const deniedPanel = document.getElementById("access-denied");
const workspace = document.getElementById("admin-workspace");
const loginMessage = document.getElementById("login-message");
const workspaceMessage = document.getElementById("workspace-message");
const contentKind = document.getElementById("content-kind");
const contentList = document.getElementById("content-list");
const contentForm = document.getElementById("content-form");
const contentFields = document.getElementById("content-fields");
const editorTitle = document.getElementById("editor-title");
const editorHint = document.getElementById("editor-hint");
const publishedInput = document.getElementById("content-published");

let supabaseClient;
let currentUser;
let currentRecords = [];
let editingRecord;

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function setMessage(element, message, isError = false) {
  element.textContent = message;
  element.classList.toggle("is-error", isError);
}

function showPanel(panel) {
  [loginPanel, passwordRecoveryPanel, deniedPanel, workspace].forEach(
    (item) => {
      item.hidden = item !== panel;
    },
  );
}

function isPasswordRecoveryCallback() {
  return (
    new URLSearchParams(window.location.hash.slice(1)).get("type") ===
    "recovery"
  );
}

function splitLines(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function listValue(value) {
  if (!Array.isArray(value)) return "";
  return value
    .map((item) =>
      typeof item === "string" ? item : item.label || item.url || "",
    )
    .filter(Boolean)
    .join("\n");
}

function fieldMarkup(name, label, value = "", options = {}) {
  const wideClass = options.wide ? " is-wide" : "";
  if (options.type === "file") {
    return `
      <div class="admin-field${wideClass}">
        <label for="field-${name}">${escapeHTML(label)}</label>
        <input id="field-${name}" name="${name}" type="file" accept="image/jpeg,image/png,image/webp" ${options.multiple ? "multiple" : ""} />
        <small>Maksimal 10 MB per gambar. Format JPG, PNG, atau WebP.</small>
      </div>
    `;
  }

  if (options.type === "textarea") {
    return `
      <div class="admin-field${wideClass}">
        <label for="field-${name}">${escapeHTML(label)}</label>
        <textarea id="field-${name}" name="${name}" ${options.required ? "required" : ""}>${escapeHTML(value)}</textarea>
        ${options.hint ? `<small>${escapeHTML(options.hint)}</small>` : ""}
      </div>
    `;
  }

  return `
    <div class="admin-field${wideClass}">
      <label for="field-${name}">${escapeHTML(label)}</label>
      <input id="field-${name}" name="${name}" type="${options.type || "text"}" value="${escapeHTML(value)}" ${options.required ? "required" : ""} />
      ${options.hint ? `<small>${escapeHTML(options.hint)}</small>` : ""}
    </div>
  `;
}

function getFieldDefinitions(kind, content = {}) {
  if (kind === "projects") {
    return [
      {
        name: "title",
        label: "Nama proyek",
        value: content.title,
        required: true,
      },
      {
        name: "year",
        label: "Tahun",
        value:
          content.year || content.title?.match(/(?:19|20)\d{2}/)?.[0] || "",
        type: "number",
        required: true,
      },
      {
        name: "image",
        label: "URL/path gambar saat ini",
        value: content.image,
        wide: true,
      },
      { name: "imageFile", label: "Unggah gambar proyek", type: "file" },
      {
        name: "tags",
        label: "Tag teknologi",
        value: (content.tags || []).join(", "),
        hint: "Pisahkan dengan koma.",
        wide: true,
      },
      {
        name: "shortDesc",
        label: "Ringkasan",
        value: content.shortDesc,
        type: "textarea",
        wide: true,
        required: true,
      },
      {
        name: "fullDesc",
        label: "Deskripsi lengkap",
        value: content.fullDesc,
        type: "textarea",
        wide: true,
      },
      {
        name: "features",
        label: "Fitur utama",
        value: listValue(content.features),
        type: "textarea",
        hint: "Satu fitur per baris.",
        wide: true,
      },
      {
        name: "technologies",
        label: "Teknologi",
        value: (content.technologies || [])
          .map((item) => `${item.category}: ${item.items}`)
          .join("\n"),
        type: "textarea",
        hint: "Satu kategori per baris, format: Hardware: ESP32, sensor.",
        wide: true,
      },
      {
        name: "challenges",
        label: "Tantangan dan solusi",
        value: content.challenges,
        type: "textarea",
        wide: true,
      },
      {
        name: "role",
        label: "Peran",
        value: listValue(content.role),
        type: "textarea",
        hint: "Satu peran per baris.",
        wide: true,
      },
      {
        name: "githubUrl",
        label: "URL GitHub",
        value: content.githubUrl === "#" ? "" : content.githubUrl,
        type: "url",
      },
      {
        name: "demoUrl",
        label: "URL demo",
        value: content.demoUrl === "#" ? "" : content.demoUrl,
        type: "url",
      },
    ];
  }

  if (kind === "experiences") {
    return [
      {
        name: "type",
        label: "Jenis pengalaman",
        value: content.type || "PENGALAMAN",
        required: true,
      },
      {
        name: "period",
        label: "Periode",
        value: content.period,
        required: true,
      },
      {
        name: "position",
        label: "Posisi/peran",
        value: content.position,
        required: true,
      },
      {
        name: "organization",
        label: "Perusahaan/organisasi",
        value: content.organization,
        required: true,
      },
      {
        name: "summary",
        label: "Ringkasan",
        value: content.summary,
        type: "textarea",
        wide: true,
        required: true,
      },
      {
        name: "responsibilities",
        label: "Tugas/kontribusi",
        value: listValue(content.responsibilities),
        type: "textarea",
        hint: "Satu poin per baris.",
        wide: true,
      },
      {
        name: "evidence",
        label: "Label bukti yang sudah ada",
        value: listValue(content.evidence),
        type: "textarea",
        hint: "Satu label atau URL per baris. Gambar baru dapat diunggah di bawah.",
        wide: true,
      },
      {
        name: "evidenceFiles",
        label: "Unggah foto/bukti",
        type: "file",
        multiple: true,
        wide: true,
      },
    ];
  }

  if (kind === "skills") {
    return [
      {
        name: "category",
        label: "Kategori keahlian",
        value: content.category,
        required: true,
      },
      {
        name: "items",
        label: "Daftar keahlian",
        value: listValue(content.items),
        type: "textarea",
        hint: "Satu skill per baris.",
        wide: true,
        required: true,
      },
    ];
  }

  return [
    {
      name: "title",
      label: "Nama prestasi/sertifikat",
      value: content.title,
      required: true,
    },
    {
      name: "organizer",
      label: "Penyelenggara",
      value: content.organizer,
      required: true,
    },
    { name: "year", label: "Tahun", value: content.year, required: true },
    {
      name: "image",
      label: "URL/path gambar saat ini",
      value: content.image,
      wide: true,
    },
    { name: "imageFile", label: "Unggah gambar/sertifikat", type: "file" },
    {
      name: "shortDesc",
      label: "Ringkasan",
      value: content.shortDesc,
      type: "textarea",
      wide: true,
      required: true,
    },
    {
      name: "fullDesc",
      label: "Deskripsi lengkap",
      value: content.fullDesc,
      type: "textarea",
      wide: true,
    },
  ];
}

function renderEditor(record) {
  editingRecord = record;
  const kind = contentKind.value;
  const content = record?.content || {};
  const definitions = getFieldDefinitions(kind, content);

  contentFields.innerHTML = `
    <div class="admin-fields-grid">
      ${definitions.map((definition) => fieldMarkup(definition.name, definition.label, definition.value, definition)).join("")}
    </div>
  `;
  editorTitle.textContent = record
    ? `Edit ${kindNames[kind].toLocaleLowerCase("id")}`
    : `Tambah ${kindNames[kind].toLocaleLowerCase("id")}`;
  publishedInput.checked = record ? record.published : true;
  contentForm.hidden = false;
  editorHint.hidden = true;
  contentForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getRecordYear(record) {
  const content = record.content || {};
  const explicitYear = Number.parseInt(content.year, 10);
  if (Number.isFinite(explicitYear) && explicitYear > 0) return explicitYear;

  const source = record.kind === "experiences" ? content.period : content.title;
  const years = String(source || "").match(/(?:19|20)\d{2}/g) || [];
  return years.reduce((latest, year) => Math.max(latest, Number(year)), 0);
}

function renderRecordList() {
  if (!currentRecords.length) {
    contentList.innerHTML = `<p class="admin-list-empty">Belum ada data ${kindNames[contentKind.value].toLocaleLowerCase("id")} di database.</p>`;
    return;
  }

  contentList.innerHTML = currentRecords
    .map((record) => {
      const title =
        record.content.title ||
        record.content.position ||
        record.content.category ||
        "Konten tanpa judul";
      const detail = record.published
        ? "Tampil di website"
        : "Draft / disembunyikan";
      return `
        <article class="admin-list-item${editingRecord?.id === record.id ? " is-selected" : ""}">
          <div class="admin-item-copy"><strong>${escapeHTML(title)}</strong><span>${escapeHTML(detail)}</span></div>
          <button type="button" data-edit-id="${escapeHTML(record.id)}">Edit</button>
          <button type="button" data-delete-id="${escapeHTML(record.id)}" aria-label="Hapus ${escapeHTML(title)}">Hapus</button>
        </article>
      `;
    })
    .join("");
}

async function loadRecords() {
  setMessage(workspaceMessage, "Memuat data...");
  const { data, error } = await supabaseClient
    .from("portfolio_items")
    .select("id, kind, content, sort_order, published, updated_at")
    .eq("kind", contentKind.value)
    .order("sort_order", { ascending: true });

  if (error) {
    setMessage(workspaceMessage, error.message, true);
    return;
  }

  currentRecords = (data || []).sort((first, second) => {
    const firstYear = getRecordYear(first);
    const secondYear = getRecordYear(second);
    return secondYear - firstYear || first.sort_order - second.sort_order;
  });
  renderRecordList();
  setMessage(workspaceMessage, `${currentRecords.length} data dimuat.`);
}

async function verifyAdminAndEnter(session) {
  currentUser = session?.user;
  if (!currentUser) {
    showPanel(loginPanel);
    return;
  }

  const { data, error } = await supabaseClient
    .from("portfolio_admins")
    .select("user_id")
    .eq("user_id", currentUser.id)
    .maybeSingle();

  if (error || !data) {
    showPanel(deniedPanel);
    return;
  }

  showPanel(workspace);
  document.getElementById("admin-user-email").textContent = currentUser.email;
  await loadRecords();
}

function parseFormContent(formData, previousContent = {}) {
  const kind = contentKind.value;
  const get = (name) => String(formData.get(name) || "").trim();

  if (kind === "projects") {
    const technologies = splitLines(get("technologies")).map((line) => {
      const separator = line.indexOf(":");
      return separator < 0
        ? { category: "Teknologi", items: line }
        : {
            category: line.slice(0, separator).trim(),
            items: line.slice(separator + 1).trim(),
          };
    });
    return {
      ...previousContent,
      title: get("title"),
      year: get("year"),
      shortDesc: get("shortDesc"),
      image: get("image"),
      tags: get("tags")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      fullDesc: get("fullDesc"),
      features: splitLines(get("features")),
      technologies,
      challenges: get("challenges"),
      role: splitLines(get("role")),
      githubUrl: get("githubUrl") || "#",
      demoUrl: get("demoUrl") || "#",
    };
  }

  if (kind === "experiences") {
    const evidence = splitLines(get("evidence")).map((line) => {
      const existingEvidence = (previousContent.evidence || []).find(
        (item) =>
          typeof item === "object" &&
          (item.label === line || item.url === line),
      );
      return existingEvidence || line;
    });

    return {
      ...previousContent,
      type: get("type"),
      period: get("period"),
      position: get("position"),
      organization: get("organization"),
      summary: get("summary"),
      responsibilities: splitLines(get("responsibilities")),
      evidence,
    };
  }

  if (kind === "skills") {
    return {
      ...previousContent,
      category: get("category"),
      items: splitLines(get("items")),
    };
  }

  return {
    ...previousContent,
    title: get("title"),
    organizer: get("organizer"),
    year: get("year"),
    image: get("image"),
    shortDesc: get("shortDesc"),
    fullDesc: get("fullDesc"),
  };
}

async function uploadMedia(file, kind) {
  if (!file) return null;
  if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) {
    throw new Error("Pilih gambar JPG, PNG, atau WebP maksimal 10 MB.");
  }

  const extension = file.name.split(".").pop().toLowerCase();
  const path = `${kind}/${crypto.randomUUID()}.${extension}`;
  const { data, error } = await supabaseClient.storage
    .from("portfolio-media")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw error;
  return supabaseClient.storage.from("portfolio-media").getPublicUrl(data.path)
    .data.publicUrl;
}

function nextContentId(kind) {
  const localRecords = {
    projects: projectsData,
    experiences: experienceData,
    skills: skillsData,
    achievements: achievementsData,
  }[kind];
  const ids = [
    ...localRecords,
    ...currentRecords.map((record) => record.content),
  ].map((record) => Number(record.id) || 0);
  return Math.max(0, ...ids) + 1;
}

async function saveContent(event) {
  event.preventDefault();
  setMessage(workspaceMessage, "Menyimpan data...");

  try {
    const formData = new FormData(contentForm);
    const content = parseFormContent(formData, editingRecord?.content || {});
    const imageFile = formData.get("imageFile");
    if (imageFile instanceof File && imageFile.size) {
      content.image = await uploadMedia(imageFile, contentKind.value);
    }

    if (contentKind.value === "experiences") {
      const evidenceFiles = formData
        .getAll("evidenceFiles")
        .filter((file) => file instanceof File && file.size);
      for (const file of evidenceFiles) {
        const url = await uploadMedia(file, "experiences");
        content.evidence.push({ label: file.name, url });
      }
    }

    content.id = editingRecord?.content.id ?? nextContentId(contentKind.value);
    const minimumOrder = currentRecords.length
      ? Math.min(...currentRecords.map((record) => record.sort_order))
      : 0;
    const record = {
      kind: contentKind.value,
      content,
      sort_order: editingRecord?.sort_order ?? minimumOrder - 1,
      published: publishedInput.checked,
      updated_at: new Date().toISOString(),
    };

    const result = editingRecord
      ? await supabaseClient
          .from("portfolio_items")
          .update(record)
          .eq("id", editingRecord.id)
      : await supabaseClient.from("portfolio_items").insert(record);

    if (result.error) throw result.error;
    contentForm.reset();
    contentForm.hidden = true;
    editorHint.hidden = false;
    editingRecord = undefined;
    setMessage(workspaceMessage, "Data berhasil disimpan.");
    await loadRecords();
  } catch (error) {
    setMessage(workspaceMessage, error.message || "Data gagal disimpan.", true);
  }
}

async function deleteContent(id) {
  const record = currentRecords.find((item) => item.id === id);
  const title =
    record?.content.title ||
    record?.content.position ||
    record?.content.category ||
    "data ini";
  if (!window.confirm(`Hapus ${title}? Tindakan ini tidak dapat dibatalkan.`))
    return;

  const { error } = await supabaseClient
    .from("portfolio_items")
    .delete()
    .eq("id", id);
  if (error) {
    setMessage(workspaceMessage, error.message, true);
    return;
  }

  editingRecord = undefined;
  contentForm.hidden = true;
  editorHint.hidden = false;
  setMessage(workspaceMessage, "Data berhasil dihapus.");
  await loadRecords();
}

async function importInitialContent() {
  const { count, error: countError } = await supabaseClient
    .from("portfolio_items")
    .select("id", { count: "exact", head: true });

  if (countError) {
    setMessage(workspaceMessage, countError.message, true);
    return;
  }
  if (count > 0) {
    setMessage(
      workspaceMessage,
      "Database sudah berisi data. Impor awal dihentikan agar tidak menggandakan atau menimpa konten.",
      true,
    );
    return;
  }

  const initialRows = [
    ...projectsData.map((content, index) => ({
      kind: "projects",
      content,
      sort_order: index,
      published: true,
    })),
    ...experienceData.map((content, index) => ({
      kind: "experiences",
      content,
      sort_order: index,
      published: !String(content.summary || "")
        .toLowerCase()
        .includes("lorem ipsum"),
    })),
    ...skillsData.map((content, index) => ({
      kind: "skills",
      content,
      sort_order: index,
      published: true,
    })),
    ...achievementsData.map((content, index) => ({
      kind: "achievements",
      content,
      sort_order: index,
      published: true,
    })),
  ];

  const { error } = await supabaseClient
    .from("portfolio_items")
    .insert(initialRows);
  if (error) {
    setMessage(workspaceMessage, error.message, true);
    return;
  }

  setMessage(
    workspaceMessage,
    `${initialRows.length} data awal berhasil diimpor.`,
  );
  await loadRecords();
}

async function signOut() {
  await supabaseClient.auth.signOut();
  showPanel(loginPanel);
}

function initializeAdmin() {
  const config = window.PORTFOLIO_SUPABASE;
  if (!config?.url?.trim() || !config?.anonKey?.trim()) {
    configNotice.hidden = false;
    return;
  }

  if (!window.supabase?.createClient) {
    configNotice.hidden = false;
    configNotice.querySelector("strong").textContent =
      "Library Supabase tidak termuat.";
    configNotice.querySelector("span").textContent =
      "Periksa koneksi internet atau pemblokir CDN, lalu muat ulang halaman.";
    return;
  }

  supabaseClient = window.supabase.createClient(
    config.url.trim(),
    config.anonKey.trim(),
  );
  configNotice.hidden = true;
  showPanel(loginPanel);

  supabaseClient.auth.getSession().then(({ data, error }) => {
    if (error) setMessage(loginMessage, error.message, true);
    if (isPasswordRecoveryCallback()) {
      showPanel(passwordRecoveryPanel);
    } else if (data.session) {
      void verifyAdminAndEnter(data.session);
    }
  });

  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") showPanel(loginPanel);
    if (event === "PASSWORD_RECOVERY") showPanel(passwordRecoveryPanel);
  });
}

document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!supabaseClient) return;
    const email = document.getElementById("admin-email").value.trim();
    const password = document.getElementById("admin-password").value;
    setMessage(loginMessage, "Memeriksa akun...");
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(loginMessage, error.message, true);
      return;
    }
    await verifyAdminAndEnter(data.session);
  });

document
  .getElementById("request-password-reset")
  .addEventListener("click", async () => {
    if (!supabaseClient) return;
    const email = document.getElementById("admin-email").value.trim();
    if (!email) {
      setMessage(
        loginMessage,
        "Masukkan email akun admin terlebih dahulu.",
        true,
      );
      document.getElementById("admin-email").focus();
      return;
    }

    setMessage(loginMessage, "Mengirim tautan untuk mengatur password...");
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${window.location.pathname}`,
    });
    setMessage(
      loginMessage,
      error
        ? error.message
        : "Jika akun tersedia, tautan pengaturan password akan dikirim ke email.",
      Boolean(error),
    );
  });

document
  .getElementById("password-recovery-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const password = document.getElementById("new-admin-password").value;
    const confirmPassword = document.getElementById(
      "confirm-admin-password",
    ).value;
    const message = document.getElementById("password-recovery-message");

    if (password !== confirmPassword) {
      setMessage(message, "Password dan konfirmasi belum sama.", true);
      return;
    }

    setMessage(message, "Menyimpan password...");
    const { error } = await supabaseClient.auth.updateUser({ password });
    if (error) {
      setMessage(message, error.message, true);
      return;
    }

    window.history.replaceState(null, "", window.location.pathname);
    const { data } = await supabaseClient.auth.getSession();
    if (data.session) await verifyAdminAndEnter(data.session);
  });

document.getElementById("denied-signout").addEventListener("click", signOut);
document.getElementById("signout-button").addEventListener("click", signOut);
document
  .getElementById("import-content")
  .addEventListener("click", importInitialContent);
document
  .getElementById("add-content")
  .addEventListener("click", () => renderEditor(null));
document.getElementById("cancel-edit").addEventListener("click", () => {
  contentForm.hidden = true;
  editorHint.hidden = false;
  editingRecord = undefined;
});
contentForm.addEventListener("submit", saveContent);

contentKind.addEventListener("change", () => {
  editingRecord = undefined;
  contentForm.hidden = true;
  editorHint.hidden = false;
  void loadRecords();
});

contentList.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-id]");
  const deleteButton = event.target.closest("[data-delete-id]");
  if (editButton) {
    const record = currentRecords.find(
      (item) => item.id === editButton.dataset.editId,
    );
    if (record) renderEditor(record);
  }
  if (deleteButton) void deleteContent(deleteButton.dataset.deleteId);
});

document.addEventListener("DOMContentLoaded", initializeAdmin);
