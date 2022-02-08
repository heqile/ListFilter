function new_event() {
    return new Event("change", {"bubbles":false, "cancelable":false});
}

function select_dispatcher() {
    var event = new_event();
    let selectElement = $("select").not("[multiple]")
    selectElement.select2({width: '100%'});
    selectElement.on("select2:open", function(){
        document.querySelector('.select2-search__field').focus();  // why not using jquery: https://github.com/select2/select2/issues/5993
    });
    selectElement.on('change', function(){
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
