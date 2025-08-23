let actionStack = [];

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log("Cordova is ready");

  document.addEventListener("backbutton", onBackKeyDown, false);

  showPage('home');
}

// Action stack functions
function pushAction(action) {
  actionStack.push(action);
  console.log("Action Stack:", actionStack);
}

function onBackKeyDown(e) {
  if (actionStack.length > 0) {
    e.preventDefault();
    let lastAction = actionStack.pop();
    if (typeof lastAction === "function") {
      lastAction();
    }
  } else {
    navigator.app.exitApp();
  }
}

// ---------- Page navigation ----------
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

function openPage(pageId) {
  const currentPage = document.querySelector(".page.active");
  if (currentPage && currentPage.id !== pageId) {
    pushAction(function () {
      showPage(currentPage.id);
    });
    showPage(pageId);
  }
}

// ---------- Modal ----------
function openModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
  pushAction(closeModal);
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// ---------- Sidebar ----------
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
  } else {
    sidebar.classList.add("active");
    pushAction(() => sidebar.classList.remove("active")); // Back button closes sidebar
  }
}
