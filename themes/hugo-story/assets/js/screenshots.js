
/**
 * Based on https://www.html-code-generator.com/javascript/detect-browser
 */
const getOS = () => {
    const ua = navigator.userAgent;

    const osMatchers = [
        {
            name: 'Windows',
            regex: /Windows NT ([0-9.]+)/,
        },
        {
            name: 'MacOS',
            regex: /Mac OS X ([0-9._]+)/,
        },
        {
            name: 'iOS',
            regex: /OS ([\d._]+) like Mac OS X/,
        },
        {
            name: 'iPadOS',
            regex: /iPad.*OS ([\d._]+)/,
        },
        { name: 'Android', regex: /Android ([0-9.]+)/ },
        { name: 'FreeBSD', regex: /FreeBSD/ },
        { name: 'OpenBSD', regex: /OpenBSD/ },
        { name: 'NetBSD', regex: /NetBSD/ },
        { name: 'Solaris', regex: /SunOS/ },
        {
            name: 'Linux',
            regex: /Linux/,
        },
        {
            name: 'Chrome OS',
            regex: /CrOS/
        }
    ];

    for (const os of osMatchers) {
        const match = ua.match(os.regex);
        if (match) {
            switch (os.name) {
                case 'MacOS':
                case 'iOS':
                case 'iPadOS':
                    return 'macos';
                case 'Linux':
                case 'FreeBSD':
                case 'OpenBSD':
                case 'NetBSD':
                case 'Solaris':
                    return 'linux';
                default:
                    return 'windows';	// The safest default given the number of downloads
            }
        }
    }

    return 'windows';
};

(async function ($) {

	function getGalleries() {
		return $('a[id^=gallery-]');
	}

	function getScreenshots() {
		return $('a[id^=screenshot-]');
	}

	function getThumbnails() {
		return $('img[id^=thumbnail-]');
	}

	function getSelectedGallery() {
		return $('a[id^=gallery-].primary');
	}

	function onClick(e) {
		e.preventDefault();
		let oldSelection = $(e.target);
		let newSelection = $(getSelectedGallery());
		let oldOs = newSelection.text();
		let newOs = oldSelection.text();
		if (oldOs == newOs) {
			return;
		}
		
		newSelection.removeClass('primary');
		oldSelection.addClass('primary');
		
		getThumbnails().attr('src', function(i, src) { 
			return src.replace(oldOs, newOs);
		});
		getScreenshots().attr('href', function(i, href) { 
			return href.replace(oldOs, newOs);
		});
		
		$('span#' + oldSelection.attr('id').replace('gallery', 'generator')).show();
		$('span#' + newSelection.attr('id').replace('gallery', 'generator')).hide();
	}

	function attachListener() {
		$(this).click(onClick);
	}
	
	getGalleries().each(attachListener);

	$(`#gallery-${getOS()}`).click();
})(jQuery);
