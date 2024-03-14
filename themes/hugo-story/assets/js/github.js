(async function ($) {
	fetch("https://api.github.com/repos/flowkeeper-org/fk-desktop/releases/latest")
		.then(resp => resp.json())
		.then(json => {
			const release = json['name'];
			const when = json['published_at'].split('T')[0];
			$(`#downloads-title`).text(`Download Flowkeeper ${release}`);
			$(`#downloads-subtitle`).text(`Released on ${when}`);
			const notes = json['body'];
			json['assets'].forEach(asset => {
				const url = asset['browser_download_url'];
				const name = asset['name'].replaceAll(' ', '-').replaceAll('.', '-').toLowerCase();
				const size = asset['size'];
				const count = asset['download_count'];
				$(`#link-${name}`).attr('href', url);
				let sizeText = `${Math.round(size / 1024 / 1024)}MB`;
				if (count > 1000) {
					sizeText += `, ${count} downloads`;
				}
				$(`#size-${name}`).text(`(${sizeText})`);
			});
		});
})(jQuery);
