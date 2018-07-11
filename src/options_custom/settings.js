
window.addEvent("domready", function () {
new FancySettings.initWithManifest(function (settings) {
        var display_element = settings.manifest.activatedList.element;
        update_display(display_element);
    
        chrome.storage.onChanged.addListener(function() {
            update_display(display_element);
        });

        new Request.JSON({
            url: chrome.extension.getURL('domain_config/config.txt'),
            onFailure: function(xhr){
                alert('Error with code: '+(xhr.status));
            },
            onSuccess: function(object){
                syncho_storage(display_element, object, "init");
            }
        }).send();

        settings.manifest.insert.addEvent("action", function () {
            syncho_storage(display_element, settings.manifest.domain.element.value, "insert");
        })

        settings.manifest.remove.addEvent("action", function () {
            syncho_storage(display_element, display_element.selectedIndex, "remove");
        })
    });
});

function syncho_storage(display_element, input, operation) {
    store = chrome.storage.local;
    var disabled = false;
    if (operation === "init") {
        if (input && typeOf(input) === "object") {
            disabled = true;
            var domains = [];
            input.domain.forEach(function(item){
                domains.push(domain_object(item, disabled));
            });
            if (typeOf(domains) !== "array") {
                return;
            }
            list = domains;
        }
        store.set({"list": list}, function(){});
    }
    else {
        list = store.get("list", function(result){
            list = result.list;
            if (typeOf(list) !== "array") {
                store.remove("list", function(){});
                alert("Oops, something is wrong with the data!");
                list = [];
            }
            if (operation === "insert") {
                if (input && typeOf(input) === "string") {
                    var domain = new domain_object(input, disabled)
                    for (i = 0; i < list.length; i++) {
                        if (list[i].domain === input) {
                            return;
                        }
                    }
                    list.push(domain);
                }
            }
            else if (operation === "remove") {
                if (input < 0) {
                    return;
                }
                list.splice(input, 1);
            }
            store.set({"list": list}, function(){});
        });
    }
}

function update_display(select_element, disabled) {
    store = chrome.storage.local;
    store.get("list", function(result){
        list = result.list;
        if (typeOf(list) === "array") {
            select_element.empty();
            var l = list.length;
            var option;
            for (i = 0; i < l; i++) {
                option = new Option(list[i].domain, i);
                option.disabled = list[i].disabled
                select_element.append(option);
            }
        }
    });
}

function domain_object(domain, disabled) {
    return {"domain": domain, "disabled": disabled}
}
