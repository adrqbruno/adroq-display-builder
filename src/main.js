import { FORMATS } from "./constants.js";
import { state, DEFAULT_LAYERS } from "./state.js";
import { renderPreview } from "./preview.js";
import { renderPanel, PANELS } from "./controls.js";
import { exportPNG, exportHTML5 } from "./export.js";

// ── Per-format saved layers ───────────────────────────────────────────────────
const savedLayers = {};
export const formatImages = {};

function saveCurrent() {
  savedLayers[state.fmt.label] = JSON.parse(JSON.stringify(state.layers));
}

function loadFormat(fmt) {
  saveCurrent();
  state.fmt = fmt;
  if (savedLayers[fmt.label]) {
    state.layers = JSON.parse(JSON.stringify(savedLayers[fmt.label]));
  } else {
    state.layers = DEFAULT_LAYERS(fmt);
    if (formatImages[fmt.label]) state.layers.image.src = formatImages[fmt.label];
  }
}

// ── Format sidebar ────────────────────────────────────────────────────────────

function buildFormatSidebar() {
  const sidebar = document.getElementById("sidebar-left");
  const header  = document.getElementById("app-header");
  sidebar.innerHTML = "";
  sidebar.appendChild(header);

  ["IAB","Native"].forEach(cat => {
    const lbl = document.createElement("div");
    lbl.className = "format-group-label";
    lbl.textContent = cat === "IAB" ? "IAB Formats" : "Native";
    sidebar.appendChild(lbl);

    FORMATS.filter(f => f.cat===cat).forEach(fmt => {
      const item = document.createElement("div");
      item.className = "format-item" + (fmt.label===state.fmt.label ? " active" : "");
      item.innerHTML = `<strong>${fmt.label}</strong><span>${fmt.w}×${fmt.h}</span>`;
      item.onclick = () => {
        loadFormat(fmt);
        document.querySelectorAll(".format-item").forEach(el => el.classList.remove("active"));
        item.classList.add("active");
        refresh();
      };
      sidebar.appendChild(item);
    });

    const spacer = document.createElement("div");
    spacer.className = "format-spacer";
    sidebar.appendChild(spacer);
  });
}

// ── Tab bar ───────────────────────────────────────────────────────────────────

function buildTabs() {
  const bar = document.getElementById("tabs-bar");
  bar.innerHTML = "";
  Object.keys(PANELS).forEach(key => {
    const btn = document.createElement("button");
    btn.className = "tab-btn" + (key===state.activeTab ? " active" : "");
    btn.textContent = key;
    btn.onclick = () => {
      state.activeTab = key;
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderPanel(key);
    };
    bar.appendChild(btn);
  });
}

// ── Mode bar ──────────────────────────────────────────────────────────────────

function initModeBar() {
  const btns   = document.querySelectorAll(".mode-btn");
  const replay = document.getElementById("replay-btn");
  btns.forEach(btn => {
    btn.onclick = () => {
      state.mode = btn.dataset.mode;
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      replay.style.display = state.mode==="animated" ? "inline-block" : "none";
      triggerAnim();
    };
  });
  replay.onclick = triggerAnim;
}

function triggerAnim() {
  if (state.mode !== "animated") return;
  renderPreview(false);
  setTimeout(() => renderPreview(true), 50);
}

// ── Export + Reset ────────────────────────────────────────────────────────────

function initExportBar() {
  document.getElementById("btn-png").onclick   = exportPNG;
  document.getElementById("btn-html5").onclick = exportHTML5;
  document.getElementById("btn-bulk-upload").onclick = openBulkModal;
  document.getElementById("btn-reset").onclick = () => {
    state.layers = DEFAULT_LAYERS(state.fmt);
    delete savedLayers[state.fmt.label];
    refresh();
  };
}

// ── Bulk Upload ───────────────────────────────────────────────────────────────

let bulkFiles = [];

function openBulkModal() {
  const inp = document.createElement("input");
  inp.type = "file"; inp.accept = "image/*"; inp.multiple = true;
  inp.onchange = async e => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    bulkFiles = await Promise.all(files.map(f => new Promise(res => {
      const r = new FileReader();
      r.onload = ev => res({ name: f.name, src: ev.target.result });
      r.readAsDataURL(f);
    })));
    renderBulkRows();
    document.getElementById("bulk-modal-overlay").classList.add("open");
  };
  inp.click();
}

function renderBulkRows() {
  const container = document.getElementById("bulk-rows");
  container.innerHTML = "";
  bulkFiles.forEach((file, i) => {
    const row = document.createElement("div");
    row.className = "bulk-row";
    const thumb = document.createElement("img");
    thumb.className = "bulk-thumb"; thumb.src = file.src;
    const name = document.createElement("div");
    name.className = "bulk-filename"; name.textContent = file.name;
    const sel = document.createElement("select");
    sel.className = "bulk-select"; sel.dataset.fileIndex = i;
    const blank = document.createElement("option");
    blank.value = ""; blank.textContent = "— select format —";
    sel.appendChild(blank);
    FORMATS.forEach(fmt => {
      const opt = document.createElement("option");
      opt.value = fmt.label;
      opt.textContent = `${fmt.label} (${fmt.w}×${fmt.h})`;
      sel.appendChild(opt);
    });
    const lower = file.name.toLowerCase();
    FORMATS.forEach(fmt => {
      const key = fmt.label.toLowerCase().replace(/ /g,"_");
      if (lower.includes(key)||lower.includes(fmt.w+"x"+fmt.h)||lower.includes(fmt.w+"×"+fmt.h)) sel.value = fmt.label;
    });
    row.appendChild(thumb); row.appendChild(name); row.appendChild(sel);
    container.appendChild(row);
  });
}

function initBulkModal() {
  document.getElementById("bulk-cancel").onclick = () => {
    document.getElementById("bulk-modal-overlay").classList.remove("open");
    bulkFiles = [];
  };
  document.getElementById("bulk-apply").onclick = () => {
    document.querySelectorAll(".bulk-select").forEach(sel => {
      const fmtLabel = sel.value; if (!fmtLabel) return;
      const idx = Number(sel.dataset.fileIndex);
      formatImages[fmtLabel] = bulkFiles[idx].src;
      if (savedLayers[fmtLabel]) savedLayers[fmtLabel].image.src = bulkFiles[idx].src;
    });
    if (formatImages[state.fmt.label]) state.layers.image.src = formatImages[state.fmt.label];
    document.getElementById("bulk-modal-overlay").classList.remove("open");
    bulkFiles = [];
    refresh();
  };
  document.getElementById("bulk-modal-overlay").onclick = e => {
    if (e.target.id==="bulk-modal-overlay") {
      document.getElementById("bulk-modal-overlay").classList.remove("open");
      bulkFiles = [];
    }
  };
}

// ── Refresh ───────────────────────────────────────────────────────────────────

function refresh() {
  renderPreview(state.mode === "animated");
  renderPanel(state.activeTab);
}

// ── Init ──────────────────────────────────────────────────────────────────────

buildFormatSidebar();
buildTabs();
initModeBar();
initExportBar();
initBulkModal();
refresh();
