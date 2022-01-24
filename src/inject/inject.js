chrome.runtime.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            domain_control();
        }
    }, 10);
});

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