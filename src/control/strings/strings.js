// This is the entry point of your plugin's design control.
// Feel free to require any local or npm modules you've installed.
//
// var buildfire = require('buildfire')
import stringsUI from "./js/stringsUI";
import "../../shared/strings/api";
import stringsConfig from '../../shared/strings/config';

let strings;
function loadLanguage(lang) {
    stringsContainer.classList.add("hidden");
    strings = new buildfire.services.Strings(lang, stringsConfig);
    strings.init().then(() => {
        if (strings.id) {
            showNewLanguageState(strings.id);
        } else {
            createLanguage("en-us");
        }
        strings.inject();
    });
    stringsUI.init("stringsContainer", strings, stringsConfig);
}
loadLanguage("en-us");

function showNewLanguageState(show) {
    if (show) {
        saveButton.classList.remove("hidden");
        stringsContainer.classList.remove("hidden");
    } else {
        saveButton.classList.add("hidden");
        stringsContainer.classList.add("hidden");
    }
}

function createLanguage(language) {
    stringsContainer.disabled = true;
    strings.createLanguage(language, () => {
        stringsContainer.disabled = false;
        strings.init().then(() => {
            showNewLanguageState(strings.id);
            strings.inject();
        });
    });
    return false;
}

function deleteLanguage() {
    buildfire.notifications.confirm(
        { message: "Are you sure you want to remove support fo this language?", confirmButton: { type: "danger" } },
        (e, r) => {
            if (r.selectedButton.key === "confirm") {
                strings.deleteLanguage(() => {
                    loadLanguage(langOptions.value);
                });
            }
        }
    );
}

function save() {
    strings.save(() => {
        buildfire.messaging.sendMessageToWidget({ scope: "strings" });
    });
}

document.querySelector('#saveButton').addEventListener('click', save);
