chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ctrl + click -> activate filter
		$( 'select' ).on( 'click', function( event ) {
		    if ( event.ctrlKey ) {
		        $(document).ready(function(){ $("select").select2(); $("select").change(function(){eval($("select").attr("onchange"));});});
		    }
		} );

	}
	}, 10);
});
