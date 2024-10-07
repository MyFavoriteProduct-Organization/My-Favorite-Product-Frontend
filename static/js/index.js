const darkBtn = document.getElementById('dark-btn');
const lightBtn = document.getElementById('light-btn');
const html = document.documentElement;

darkBtn.addEventListener('click', () => {
  html.classList.add('dark');
  localStorage.setItem('theme', 'dark');
});

lightBtn.addEventListener('click', () => {
   html.classList.remove('dark');
   localStorage.setItem('theme', 'light');
});

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  html.classList.add('dark');
}else {
    html.classList.remove('dark');
}