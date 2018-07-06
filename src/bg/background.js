
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
        code: '$(document).ready(function(){ $("select").select2(); $("select").change(function(){eval($("select").attr("onchange"));});});'
        // file: 'src/inject/inject.js'
    });
    return;
});
