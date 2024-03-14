(async function ($) {
	fetch("https://api.github.com/repos/flowkeeper-org/fk-desktop/releases/latest")
		.then(resp => resp.json())
		.then(json => {
			const release = json['name'];
			$(`#downloads-title`).text(`Download Flowkeeper ${release}`);
			const notes = json['body'];
			json['assets'].forEach(asset => {
				const url = asset['browser_download_url'];
				const name = asset['name'];
				const size = asset['size'];
				const count = asset['download_count'];
				$(`#link-${name}`).href(url);
				let sizeText = `${Math.round(size / 1024 / 1024)}MB`;
				if (count > 10) {
					sizeText += `, ${count} downloads`;
				}
				$(`#size-${name}`).text(`(${sizeText})`);
			});
		});
})(jQuery);
