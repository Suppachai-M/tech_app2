const companyList = document.getElementById("companyList");
const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("closeBtn");
const overlayLogo = document.getElementById("overlayLogo");
const overlayTitle = document.getElementById("overlayTitle");
const overlayDesc = document.getElementById("overlayDesc");
const overlayLink = document.getElementById("overlayLink");

function openOverlay() {
  overlay.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeOverlay() {
  overlay.classList.remove("open");
  document.body.classList.remove("modal-open");
}

function handleOverlayClick(event) {
  if (event.target === overlay) {
    closeOverlay();
  }
}

function createCompanyCard(company) {
  const article = document.createElement("article");
  article.className = "card"; // ✅ ใช้ CSS .card

  const logo = document.createElement("img");
  logo.src = company.img;
  logo.alt = company.name;

  const title = document.createElement("h2");
  title.textContent = company.name;

  const desc = document.createElement("p");
  desc.textContent = company.desc;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "รายละเอียด";

  button.addEventListener("click", function () {
    overlayTitle.textContent = company.name;
    overlayDesc.textContent = company.desc;
    overlayLogo.src = company.img;
    overlayLogo.alt = company.name;
    overlayLink.href = company.url;
    openOverlay();
  });

  article.appendChild(logo);
  article.appendChild(title);
  article.appendChild(desc);
  article.appendChild(button);

  return article;
}

function loadCompanies() {
  fetch("companies.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((company) => {
        const card = createCompanyCard(company);
        companyList.appendChild(card);
      });
    })
    .catch((error) => console.error("Error loading companies:", error));
}

closeButton.addEventListener("click", closeOverlay);
overlay.addEventListener("click", handleOverlayClick);

loadCompanies();
