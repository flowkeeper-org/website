(async function ($) {
	$('.download-more').each(function(i, el) {
		const moreButton = $(el);
		const moreTable = $('#' + el.id.replace('-more-', '-table-'));
		// console.log('Each', moreButton, moreTable);
		moreButton.on('click', function(e) {
			e.preventDefault();
			// console.log('Clicked', el);
			moreTable.toggle("fast");
		});
		moreTable.hide();
	});

	//fetch("https://api.github.com/repos/flowkeeper-org/fk-desktop/releases/latest")
	fetch("https://api.github.com/repos/flowkeeper-org/fk-desktop/releases/218292687")
		.then(resp => resp.json())
		.then(json => {
			const release = json['name'];
			const version = json['tag_name'].replace('v', '');
			const assetPrefix = 'flowkeeper-' + version.replaceAll('.', '-') + '-';
			// console.log('version', assetPrefix);
			const when = json['published_at'].split('T')[0];
			const dict = {};
			$(`#downloads-title`).text(`Download Flowkeeper ${release}`);
			$(`#downloads-subtitle`).text(`Released on ${when}`);
			$(`#downloads-whatsnew`).attr('href', `/${release}`);
			const notes = json['body'];
			json['assets'].forEach(asset => {
				const url = asset['browser_download_url'];
				const name = asset['name'].replaceAll(' ', '-').replaceAll('.', '-').toLowerCase();
				const elementSuffix = name.replaceAll(assetPrefix, '');
				const size = asset['size'];
				const count = asset['download_count'];
				$(`#link-${elementSuffix}`).attr('href', url);
				let sizeText = `${Math.round(size / 1024 / 1024)}MB`;
				if (count > 1000) {
					sizeText += `, ${count} downloads`;
				}
				$(`#size-${elementSuffix}`).text(`(${sizeText})`);
				dict[asset['name'].replace(`flowkeeper-${version}`, 'download-more-link')] = {'url': url, 'size': sizeText, 'count': count};
			});

			$('.download-more-link').each(function(i, el) {
				const moreLink = $(el);
				const moreSize = moreLink.siblings()[0];  // This is <span>Loading...</span> in os.html
				const existing = dict[el.id];
				// console.log('Found', existing, el.id);
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

(async function ($) {
	const links = {};

	$('.download-more-warning').each(function(i, el) {
		const m = el.id.match(/download-more-warning-(windows-.+)\..+/);
		if (m) {
			links[m[1]] = $(el);
		}
	});

	fetch('https://flowkeeper-org.github.io/av-scan/vt-scan-results/v0.10.0-warnings.json')
		.then(resp => resp.json())
		.then(json => {
			// First, merge standalone EXE results into installer EXE
			Object.keys(json).forEach(asset => {
				const m = asset.match(/(flowkeeper-.+-windows-.+)-installer\.exe/);
				if (m) {
					const standalone = `${m[1]}-standalone.exe`;
					if (json[standalone]) {
						// console.log(`Will merge ${standalone} into ${asset}`)
						const source = json[standalone];
						const target = json[asset];
						Object.keys(source).forEach(av => {
							if (!target[av]) {
								target[av] = source[av];
							}
						});
					}
				}
			});

			// Now create links based on the merged data
			Object.keys(json).forEach(asset => {
				const m = asset.match(/flowkeeper-.+-(windows-.+)\..+/);
				if (m && links[m[1]] && Object.keys(json[asset]).length > 0) {
					const microsoftDetected = json[asset]['Microsoft'];
					const warningLink = links[m[1]];
					const date = new Date(Object.values(json[asset])[0]['date']).toLocaleString();
					warningLink.attr('href', `#modal-${m[1]}`);
					warningLink.css('color', microsoftDetected ? 'orange' : '#1E90FF');
					$(warningLink.children()[microsoftDetected ? 0 : 1]).hide();
					warningLink.click(function (e) {
						e.preventDefault();
						let html = '';
						Object.keys(json[asset]).forEach(av => {
							const result = json[asset][av];
							html += `<li><strong ${av === 'Microsoft' ? 'style="color: red;"' : ''}>${av}</strong>: ${result['details']}</li>`
						});
						Swal.fire({
						    title: "Antivirus false positives",
						    html: `<p class="align-left" style="font-size: 1rem; font-weight: 300;">
According to VirusTotal scan on the ${date}, some of the antiviruses detect this file as malware: 
<ul class="align-left" style="font-size: 1rem; font-weight: 300;">${html}</ul>
<p class="align-left" style="font-size: 1rem; font-weight: 300;">If you use one of those products, 
then we recommend you to download an alternative Flowkeeper build.</p>
<p class="align-left" style="font-size: 1rem; font-weight: 300;">We apologize for this inconvenience! 
We constantly report those false positives to the corresponding software vendors, but we fight an uphill
battle, as there are literally hundreds of those, and their malware detection heuristics change 
constantly.</p>`,
						    icon: microsoftDetected ? "warning" : "info",
							buttonsStyling: false,
						});
					});
					warningLink.show();
				}
			});
		});
})(jQuery);
