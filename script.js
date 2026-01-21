let modal = document.getElementById("modal");
let fullscreen = false;

// Open modal by ID
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = "block";
}

// Close modal by ID
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = "none";
}

// Tabs
function openTab(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Fullscreen toggle
function toggleFullscreen(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const content = modal.querySelector(".modal-content");
  const title = modal.querySelector(".mechanic-title");
  const gif = modal.querySelector("img");
  // optional: description if exists
  const desc = modal.querySelector(".mechanic-description");

  if (!fullscreen) {
    title.style.display = "none";
    if(desc) desc.style.display = "none";
    if(gif) gif.style.display = "none";
    content.style.width = "95%";
    content.style.height = "90%";
  } else {
    title.style.display = "block";
    if(desc) desc.style.display = "block";
    if(gif) gif.style.display = "block";
    content.style.width = "80%";
    content.style.height = "auto";
  }

  fullscreen = !fullscreen;
}

function toggleGif(imgId, gifPath, previewPath) {
  const img = document.getElementById(imgId);
  const header = img.previousElementSibling;
  const icon = header.querySelector(".play-icon");
  if (!img || !icon) return;

  const isGif = img.src.includes(gifPath.split('/').pop());

  if (isGif) {
    img.src = previewPath;
    icon.textContent = "▶️"; // play icon
  } else {
    img.src = gifPath;
    icon.textContent = "⏸️"; // pause icon
  }
}

