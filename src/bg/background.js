
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
        code: '$(document).ready(select_dispatcher);'
    });
    return;
});
