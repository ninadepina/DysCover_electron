const sliders = [
	{ id: '#slider-zoom', styleProp: 'zoom', unit: '', factor: 100 },
	{ id: '#slider-size', styleProp: 'fontSize', unit: '%', factor: 1 },
	{ id: '#slider-line', styleProp: 'lineHeight', unit: '%', factor: 1 },
	{ id: '#slider-contrast', styleProp: 'filter', unit: '%', prefix: 'contrast(', suffix: ')' },
	{ id: '#slider-saturation', styleProp: 'filter', unit: '%', prefix: 'saturate(', suffix: ')' }
];
const filters = { contrast: '100%', saturate: '100%' };

document.addEventListener('DOMContentLoaded', () => {
	// dropdown toggle logic
	const optionButtons = document.querySelectorAll('.option-button');
	const optionContents = document.querySelectorAll('.option-content');

	optionButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const content = button.nextElementSibling;
			content.classList.toggle('option-content--visible');
			e.stopPropagation();
		});
	});

	document.addEventListener('click', (e) => {
		optionContents.forEach((content) => {
			if (!content.contains(e.target)) {
				content.classList.remove('option-content--visible');
			}
		});
	});

	// update style in webview
	const webview = document.querySelector('#webview');

	const updateStyle = (slider, styleProp, unit, prefix = '', suffix = '') => {
		const value = slider.value;
		slider.nextElementSibling.querySelector('span').textContent = value;

		if (styleProp === 'zoom') {
			webview.executeJavaScript(`document.body.style.zoom = ${value / 100}`);
		} else if (styleProp === 'filter') {
			const filterString = Object.entries(filters)
				.map(([key, val]) => `${key}(${val})`)
				.join(' ');
			webview.executeJavaScript(`document.body.style.filter = "${filterString}"`);
		} else {
			webview.executeJavaScript(`
				document.querySelectorAll('*').forEach(el => {
					el.style.${styleProp} = "${value}${unit}";
				});
			`);
		}
	};

	const updateFilter = (type, value) => {
		filters[type] = `${value}%`;
		const filterString = Object.entries(filters)
			.map(([key, val]) => `${key}(${val})`)
			.join(' ');
		webview.executeJavaScript(`document.body.style.filter = "${filterString}"`);
	};

	sliders.forEach(({ id, styleProp, unit, prefix, suffix }) => {
		const slider = document.querySelector(id);
		slider.addEventListener('input', () => {
			if (styleProp === 'filter') updateFilter(prefix.replace('(', ''), slider.value);
			updateStyle(slider, styleProp, unit, prefix, suffix);
		});
	});
});
