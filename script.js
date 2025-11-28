const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("bottom-shade");
  } else {
    header.classList.remove("bottom-shade");
  }
});
