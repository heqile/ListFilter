
this.manifest = {
    "name": "ListFilter",
    "icon": "../../icons/icon48.png",
    "settings": [
        {
            "tab": i18n.get("Configuration"),
            "group": i18n.get("ActiveList"),
            "name": "domain",
            "type": "text",
            "label": i18n.get("Domain"),
            "text": i18n.get("Enter a domain name")
        },
        {
            "tab": i18n.get("Configuration"),
            "group": i18n.get("ActiveList"),
            "name": "insert",
            "type": "button",
            "text": i18n.get("Insert")
        },
        {
            "tab": i18n.get("Configuration"),
            "group": i18n.get("ActiveList"),
            "name": "activatedList",
            "type": "listBox",
            "label": "ActivatedList:"
        },
        {
            "tab": i18n.get("Configuration"),
            "group": i18n.get("ActiveList"),
            "name": "remove",
            "type": "button",
            "text": i18n.get("Remove")
        }
    ],
    // "alignment": [
    //     [
    //         "username",
    //         "password"
    //     ],
    //     [
    //         "noti_volume",
    //         "sound_volume"
    //     ]
    // ]
};
