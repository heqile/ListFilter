function new_event() {
    return new Event("change", {"bubbles":false, "cancelable":false});
}

function select_dispatcher() {
    var event = new_event();
    $("select").select2({width: '100%'});
    $("select").on('change', function(){
        let not_dispatched = (event.target === null);
        if (not_dispatched) {
            // dispatch 'change' event to original element in order to trigger callback function
            this.dispatchEvent(event);
            // create a new event for next trigger
            event = new_event();
        }
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.handler === "listFilter") {
            select_dispatcher();
        }
    }
);