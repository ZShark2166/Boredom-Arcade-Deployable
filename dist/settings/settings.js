document.addEventListener('DOMContentLoaded', function () {
	const blankCloakerBtn = document.getElementById('blankcloaker');
	if (!blankCloakerBtn) return;

	blankCloakerBtn.addEventListener('click', function () {
		const win = window.open('about:blank', '_blank');
		if (!win) return;

		const currentUrl = window.location.href;

		const html = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
    <link rel="icon" type="image/png" href="/images/boredomlogo.png"/>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Cloaked Tab</title>
				<style>
					html, body {
						margin: 0;
						padding: 0;
						height: 100%;
						width: 100%;
						overflow: hidden;
						background-color: black;
					}
					iframe {
						width: 100%;
						height: 100%;
						border: none;
					}
					.overlay {
						position: fixed;
						top: 0;
						left: 0;
						width: 100%;
						height: 30px;
						background: #111;
						color: #fff;
						font-family: system-ui, sans-serif;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 10px;
						box-sizing: border-box;
					}
					.overlay span {
						font-size: 14px;
					}
				</style>
			</head>
			<body>
				<iframe src="${currentUrl}" sandbox="allow-same-origin allow-scripts allow-forms allow-popups"></iframe>
			</body>
			</html>
		`;

		win.document.open();
		win.document.write(html);
		win.document.close();

		setTimeout(() => {
			window.location.replace('https://classroom.google.com');
		}, 100);
	});
});
