function openModal() {
  document.getElementById("modal").style.display = "block";
  document.body.classList.add("modal-open");
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.body.classList.remove("modal-open");

  // Reset GIF to preview when closing
  document.getElementById("startMachine").src = "gifs/startMachine_preview.png";
}

function playGif() {
  const gif = document.getElementById("startMachine");
  gif.src = "gifs/startMachine.gif";
}

// Tab functionality
function openTab(evt, tabName) {
  const tabcontents = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontents.length; i++) {
    tabcontents[i].style.display = "none";
  }

  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}
