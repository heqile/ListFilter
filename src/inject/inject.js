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

function domain_control() {
    var store = chrome.storage.local;
    store.get("list", function (result) {
        list = result.list;
        if (list && typeof(list) !== "object") {
            store.remove("list");
            console.log("Oops, something is wrong with the data!");
            return;
        }
        else if (!list) {
            return;
        }
        for (i = 0; i < list.length; i++) {
            var regex = new RegExp(list[i].domain);
            if (document.URL.match(regex)) {
                $(document).ready(select_dispatcher);
                return;
            }
        }
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.handler === "listFilter")
          $(document).ready(function() {
            select_dispatcher(); 
        });
    }
);