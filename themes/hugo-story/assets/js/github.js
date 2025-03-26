(async function ($) {
	$('.download-more').each(function(i, el) {
		const moreButton = $(el);
		const moreTable = $('#' + el.id.replace('-more-', '-table-'));
		console.log('Each', moreButton, moreTable);
		moreButton.on('click', function(e) {
			e.preventDefault();
			console.log('Clicked', el);
			moreTable.toggle("fast");
		});
		moreTable.hide();
	});

	// fetch("https://api.github.com/repos/flowkeeper-org/fk-desktop/releases/latest")
	fetch("https://api.github.com/repos/flowkeeper-org/fk-desktop/releases/207595463")
		.then(resp => resp.json())
		.then(json => {
			const release = json['name'];
			const version = json['tag_name'].replace('v', '');
			const when = json['published_at'].split('T')[0];
			const dict = {};
			$(`#downloads-title`).text(`Download Flowkeeper ${release}`);
			$(`#downloads-subtitle`).text(`Released on ${when}`);
			$(`#downloads-whatsnew`).attr('href', `/${release}`);
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
				dict[asset['name'].replace(`flowkeeper-${version}`, 'download-more-link')] = {'url': url, 'size': sizeText, 'count': count};
			});
			console.log('Received', dict);
			$('.download-more-link').each(function(i, el) {
				const moreLink = $(el);
				const moreSize = moreLink.siblings()[0];
				const existing = dict[el.id];
				console.log('Found', existing, el.id);
				if (existing) {
					moreLink.attr("href", existing['url']);
					moreSize.innerHTML = `(${existing['size']})`;
				} else {
					moreLink.hide();
					moreSize.innerHTML = 'N/A';
				}
			});
		});
})(jQuery);
