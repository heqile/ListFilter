chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ctrl + click -> activate filter
			$('select').on('click', function(event) {
			    if (event.ctrlKey) {
					$(document).ready(select_dispatcher);
			    }
			} );
		}
	}, 10);
});
