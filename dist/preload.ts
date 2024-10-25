/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
window.addEventListener('DOMContentLoaded', function () {
	var replaceText = function (selector: string, text: string) {
		var element = document.getElementById(selector);
		if (element) element.innerText = text;
	};
	for (var _i = 0, _a = ['chrome', 'node', 'electron']; _i < _a.length; _i++) {
		var type = _a[_i];
		replaceText(''.concat(type, '-version'), process.versions[type] || 'unknown');
	}
});
