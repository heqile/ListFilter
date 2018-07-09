
function select_dispatcher() {
	$("select").select2();
	// init event
	var event = create_event();
	$("select").on('change', function(){
		// if event has never been dispatched
		if(!event['target']) {
			// dispatch 'change' event to 'select' element in order to trigger callback function
			$("select")[0].dispatchEvent(event);
			// create a new event for next trigger
			event = create_event();
		}
	});
}

function create_event() {
	event = document.createEvent('HTMLEvents');
	event.initEvent('change', true, true);
	return event
}
