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

})(jQuery);
