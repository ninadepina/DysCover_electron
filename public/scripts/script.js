// keep dropdown open when clicking button
document.addEventListener('DOMContentLoaded', () => {
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
});
