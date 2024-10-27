const HOMEPAGE = 'https://www.google.com';

const webview = document.querySelector('#webview');
const colorButton = document.querySelector('.options__button--color');

colorButton.addEventListener('click', () => {
	console.log('zoom level:', webview.getZoomLevel());
	webview.executeJavaScript(`
    document.querySelectorAll('*').forEach(element => {
      element.style.color = 'red';
      element.style.fontFamily = 'Comic Sans MS';
    });
  `);
});

const zoomInButton = document.querySelector('.zoom--in');
const zoomOutButton = document.querySelector('.zoom--out');
const zoomPercent = document.querySelector('.zoom--percent');

const updateZoomPercentage = (level) => {
	const scale = Math.pow(1.2, level);
	const percentage = Math.round(scale * 100);
	zoomPercent.textContent = `${percentage}%`;
};

let currentZoomLevel = 0;
updateZoomPercentage(currentZoomLevel);

zoomInButton.addEventListener('click', () => {
	currentZoomLevel += 1;
	webview.setZoomLevel(currentZoomLevel);
	updateZoomPercentage(currentZoomLevel);
});

zoomOutButton.addEventListener('click', () => {
	currentZoomLevel -= 1;
	webview.setZoomLevel(currentZoomLevel);
	updateZoomPercentage(currentZoomLevel);
});

const searchButton = document.querySelector('#search-button');
const urlInput = document.querySelector('#url-input');

const hasScheme = (url) => url.startsWith('http://') || url.startsWith('https://');

searchButton.addEventListener('click', () => {
	let url = urlInput.value;
	if (!hasScheme(url)) url = 'http://' + url;
	webview.src = url;
});
