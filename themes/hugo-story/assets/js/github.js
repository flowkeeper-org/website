(async function ($) {

	var $window = $(window);

	fetch("https://api.github.com/repos/flowkeeper-org/fk-desktop/releases/latest").then(resp => {
		console.log('Fetched release', resp.json());
	});

	// // Styles.
	// $(
	// 	'<style>' +
	// 	'.demo-animate-all:not(.gallery), .demo-animate-all:not(.gallery) *, .demo-animate-all:not(.gallery) *:before, .demo-animate-all:not(.gallery) *:after { transition: all 0.5s ease-in-out; }' +
	// 	'.demo-controls .property .classes { display: none; }' +
	// 	'.demo-controls .property[data-requires] { display: none; }' +
	// 	'.demo-controls .property[data-requires].active { display: inline; }' +
	// 	'.demo-controls .property .tooltip { position: relative; }' +
	// 	'.demo-controls .property .tooltip:before { content: \'Click to change!\'; font-size: 0.7rem; position: absolute; bottom: 100%; left: 0; background: #47D3E5; color: #ffffff; line-height: 1; white-space: nowrap; font-weight: bold; border-radius: 0.125rem; padding: 0.325rem 0.425rem; animation: demo-controls-tooltip 1.5s forwards; animation-delay: 1s; opacity: 0; }' +
	// 	'.demo-controls .property .tooltip:after { content: \'\'; position: absolute; bottom: calc(100% - 0.25rem); left: 0.5rem; border-left: solid 0.5rem transparent; border-right: solid 0.5rem transparent; border-top: solid 0.5rem #47D3E5; width: 0.5rem; height: 0.5rem; animation: demo-controls-tooltip 1.5s forwards; animation-delay: 1s; opacity: 0; }' +
	// 	'@keyframes demo-controls-tooltip {' +
	// 	'0% { opacity: 0; transform: translateY(0); }' +
	// 	'10% { opacity: 1; transform: translateY(0.125rem); }' +
	// 	'20% { opacity: 1; transform: translateY(-0.125rem); }' +
	// 	'30% { opacity: 1; transform: translateY(0.125rem); }' +
	// 	'40% { opacity: 1; transform: translateY(-0.125rem); }' +
	// 	'50% { opacity: 1; transform: translateY(0.125rem); }' +
	// 	'60% { opacity: 1; transform: translateY(0); }' +
	// 	'90% { opacity: 1; }' +
	// 	'100% { opacity: 0; }' +
	// 	'}' +
	// 	'</style>'
	// ).appendTo($('head'));

})(jQuery);
