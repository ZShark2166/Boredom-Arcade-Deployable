document.addEventListener('DOMContentLoaded', function () {
	const blankCloakerBtn = document.getElementById('blankcloaker');
	if (blankCloakerBtn) {
		blankCloakerBtn.addEventListener('click', function () {
			const win = window.open('about:blank', '_blank');
			if (win) {
				win.document.open();
				win.document.write(document.documentElement.outerHTML);
				win.document.close();
				win.focus();
				setTimeout(function () {
					window.close();
				}, 100);
			}
		});
	}
});
