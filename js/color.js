const toggleSwitch = document.querySelector(".dark-mode-icon");
const darkMoon = document.querySelector(".dark-moon");
const lightMoon = document.querySelector(".light-moon");

let darkMode = false; // light

if (window.localStorage.theme) {
  if (window.localStorage.theme === "dark") {
    darkMode = true;
    document.documentElement.setAttribute("data-theme", "dark");
    darkMoon.style.display = "block";
    lightMoon.style.display = "none";
  } else if (window.localStorage.theme === "light") {
    darkMode = false;
    document.documentElement.setAttribute("data-theme", "light");
    darkMoon.style.display = "none";
    lightMoon.style.display = "block";
  }
}

function switchTheme() {
  darkMode = !darkMode; // toggle the mode status variable
  if (darkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
    window.localStorage.theme = "dark";
    darkMoon.style.display = "block";
    lightMoon.style.display = "none";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    window.localStorage.theme = "light";
    darkMoon.style.display = "none";
    lightMoon.style.display = "block";
  }
}

toggleSwitch.addEventListener("click", switchTheme);
