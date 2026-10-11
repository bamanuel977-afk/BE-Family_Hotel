const heroSlides = [...document.querySelectorAll(".hero-slide")];
const heroDots = document.getElementById("heroDots");
let heroIndex = 0;

heroSlides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Show hotel photo ${i + 1}`);
  if (i === 0) dot.classList.add("is-active");
  dot.addEventListener("click", () => showHero(i));
  heroDots.appendChild(dot);
});

function showHero(index) {
  heroIndex = index;
  heroSlides.forEach((slide, i) =>
    slide.classList.toggle("is-active", i === index),
  );
  [...heroDots.children].forEach((dot, i) =>
    dot.classList.toggle("is-active", i === index),
  );
}

setInterval(() => showHero((heroIndex + 1) % heroSlides.length), 5200);

document.querySelectorAll(".auto-gallery").forEach((gallery) => {
  const frames = [...gallery.querySelectorAll("img")];
  if (frames.length < 2) return;
  let index = 0;
  const wait = Number(gallery.dataset.interval) || 4000;
  setInterval(() => {
    frames[index].classList.remove("is-active");
    index = (index + 1) % frames.length;
    frames[index].classList.add("is-active");
  }, wait);
});

const foodSlides = [...document.querySelectorAll(".food-slide")];
let foodIndex = 0;
let foodTimer;

function showFood(index) {
  foodIndex = (index + foodSlides.length) % foodSlides.length;
  foodSlides.forEach((slide, i) =>
    slide.classList.toggle("is-active", i === foodIndex),
  );
}

function startFood() {
  foodTimer = setInterval(() => showFood(foodIndex + 1), 4300);
}

document.getElementById("foodNext").addEventListener("click", () => {
  showFood(foodIndex + 1);
  clearInterval(foodTimer);
  startFood();
});
document.getElementById("foodPrev").addEventListener("click", () => {
  showFood(foodIndex - 1);
  clearInterval(foodTimer);
  startFood();
});
startFood();

const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
document.getElementById("navLinks").addEventListener("click", (event) => {
  if (event.target.tagName === "A") nav.classList.remove("open");
});

function bindForm(formId, okId) {
  document.getElementById(formId).addEventListener("submit", (event) => {
    event.preventDefault();
    event.target.reset();
    document.getElementById(okId).hidden = false;
  });
}
bindForm("orderForm", "orderOk");
bindForm("bookForm", "bookOk");
