let modal = document.getElementById("modal");
let fullscreen = false;

// Open modal by ID
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = "block";
  document.body.style.overflow = "hidden"
}

// Close modal by ID
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    // Reset all mechanic-gif images back to their preview (static) state
    modal.querySelectorAll(".mechanic-gif[onclick]").forEach(img => {
      const match = img.getAttribute("onclick").match(/toggleGif\('[^']+',\s*'[^']+',\s*'([^']+)'\)/);
      if (match) img.src = match[1]; // match[1] is the previewPath argument
    });
    modal.style.display = "none";
  }
  document.body.style.overflow = "auto";
}

// Tabs — scoped to the modal containing the clicked button
function openTab(evt, tabName) {
  // Find the modal that contains this tab button
  const modal = evt.currentTarget.closest(".modal, .modal-content") 
             || document.body;

  // Hide all tabcontent within this modal only
  modal.querySelectorAll(".tabcontent").forEach(t => t.style.display = "none");

  // Remove active from all tablinks within this modal only
  modal.querySelectorAll(".tablinks").forEach(t => 
    t.className = t.className.replace(" active", "")
  );

  // Show the selected tab and mark button active
  const tab = document.getElementById(tabName);
  if (tab) tab.style.display = "block";
  evt.currentTarget.className += " active";
}

// Fullscreen code viewer
function toggleFullscreen(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  // Find the active tab by checking the JS style property directly —
  // avoids "display:block" vs "display: block" attribute spacing issues
  let codeEl = null;
  modal.querySelectorAll(".tabcontent").forEach(tab => {
    if (tab.style.display === "block" && !codeEl)
      codeEl = tab.querySelector("code");
  });
  // Fall back to first tab's code if nothing is visibly open yet
  if (!codeEl) codeEl = modal.querySelector(".tabcontent code");

  const title      = modal.querySelector(".mechanic-title");
  const titleText  = title ? title.textContent.trim() : "Code Viewer";
  const activeBtn  = modal.querySelector(".tablinks.active");
  const tabLabel   = activeBtn ? activeBtn.textContent.trim() : "";
  const viewerTitle = tabLabel ? `${titleText} — ${tabLabel}` : titleText;
  const code       = codeEl ? codeEl.textContent : "No code found in this tab.";

  openCodeViewer(viewerTitle, code);
}

function openCodeViewer(title, code) {
  const existing = document.getElementById("codeViewerOverlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "codeViewerOverlay";
  overlay.innerHTML = `
    <div class="cv-panel">
      <div class="cv-header">
        <span class="cv-title">${title}</span>
        <div class="cv-actions">
          <button class="cv-copy-btn" onclick="copyViewerCode(this)">Copy</button>
          <button class="cv-close-btn" onclick="closeCodeViewer()">✕ Close</button>
        </div>
      </div>
      <pre class="cv-pre"><code class="cv-code">${escapeHtml(code.trim())}</code></pre>
    </div>
  `;

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeCodeViewer();
  });

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => overlay.classList.add("cv-visible"));
}

function closeCodeViewer() {
  const overlay = document.getElementById("codeViewerOverlay");
  if (!overlay) return;
  overlay.classList.remove("cv-visible");
  overlay.addEventListener("transitionend", () => {
    overlay.remove();
    const anyModalOpen = [...document.querySelectorAll(".modal")]
      .some(m => m.style.display === "block");
    if (!anyModalOpen) document.body.style.overflow = "auto";
  }, { once: true });
}

function copyViewerCode(btn) {
  const code = document.querySelector(".cv-code");
  if (!code) return;
  navigator.clipboard.writeText(code.textContent).then(() => {
    btn.textContent = "Copied!";
    setTimeout(() => btn.textContent = "Copy", 2000);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&amp;/g,  "&")
    .replace(/&lt;/g,   "<")
    .replace(/&gt;/g,   ">")
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;");
}

// Escape key closes viewer
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.getElementById("codeViewerOverlay"))
    closeCodeViewer();
});


function toggleGif(imgId, gifPath, previewPath) {
  const img = document.getElementById(imgId);
  if (!img) return;

  const header = img.previousElementSibling;
  const icon = header ? header.querySelector(".play-icon") : null;

  const isGif = img.src.includes(gifPath.split('/').pop());

  if (isGif) {
    img.src = previewPath;
    if (icon) icon.textContent = "▶️";
  } else {
    img.src = gifPath;
    if (icon) icon.textContent = "⏸️";
  }
}

function toggleTechBreakdown() {
  const content = document.getElementById("techContent");

  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}

function toggleViewMode() {
  const systems = document.querySelector(".hidden-systems");
  systems.classList.toggle("show");
}

function enableHoverGif(id, gif, preview) {
  const img = document.getElementById(id);

  if (!img) return;

  img.addEventListener("mouseenter", () => img.src = gif);
  img.addEventListener("mouseleave", () => img.src = preview);
}

// Run it after page loads
window.addEventListener("DOMContentLoaded", () => {
  enableHoverGif("projectGif1", "gifs/startMachine.gif", "gifs/startMachine_preview.png");
  enableHoverGif("fpsGif", "gifs/fps.gif", "gifs/fps_preview.png");
});

function toggleViewMode2() {
  const systems = document.getElementById("fpsSystemGrid");
  systems.classList.toggle("show");
}

function toggleTechBreakdown2() {
  const content = document.getElementById("fpsTechContent");
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}

// Scroll progress bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  const bar = document.getElementById("scrollProgress");
  if (bar) bar.style.width = progress + "%";
});

function toggleCaseStudy() {
  const section = document.getElementById("machineCaseStudy");
  const button = document.querySelector(".case-toggle");

  const isOpen = section.classList.contains("show");

  section.classList.toggle("show");

  button.textContent = isOpen ? "View Advanced Case Study" : "Hide Advanced Case Study";
}