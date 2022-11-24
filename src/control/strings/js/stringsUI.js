const stringsUI = {
  container: null,
  strings: null,
  stringsConfig: null,
  _debouncers: {},
  debounce(key, fn) {
    if (this._debouncers[key]) clearTimeout(this._debouncers[key]);
    this._debouncers[key] = setTimeout(fn, 10);
  },
  init(containerId, strings, stringsConfig) {
    this.strings = strings;
    this.stringsConfig = stringsConfig;
    this.container = document.getElementById(containerId);
    this.container.innerHTML = "";
    for (let key in this.stringsConfig) {
      this.buildSection(this.container, key, this.stringsConfig[key]);
    }

    stringsUI._setupTinyMCE();
  },
  _setupTinyMCE() {
    if (!tinymce) return;
    tinymce.remove();
    tinymce.init({
      selector: ".bfwysiwyg",
      min_height: 100,
      content_css: [
        "https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
        "https://www.tiny.cloud/css/codepen.min.css",
      ],
      setup: function (ed) {
        ed.on("change", function (e) {
          stringsUI.debounce(e.target.id, () => {
            if (!ed.targetElm) return;
            stringsUI.onSave(e.target.id, ed.getContent());
          });
        });
      },
    });
  },
  onSave(prop, value) {
    this.strings.set(prop, value);
  },

  createAndAppend(elementType, innerHTML, classArray, parent) {
    const e = document.createElement(elementType);
    e.innerHTML = innerHTML;
    classArray.forEach((c) => e.classList.add(c));
    parent.appendChild(e);
    return e;
  },
  createIfNotEmpty(elementType, innerHTML, classArray, parent) {
    if (innerHTML) return this.createAndAppend(elementType, innerHTML, classArray, parent);
  },

  buildSection(container, sectionProp, sectionObj) {
    const sec = this.createAndAppend("section", "", ['margin-bottom-thirty'], container);
    this.createIfNotEmpty("div", sectionObj.title, ["section-title"], sec);
    this.createIfNotEmpty("div", sectionObj.subtitle, ["subTitle"], sec);
    for (let key in sectionObj.labels) this.buildLabel(sec, sectionProp + "." + key, sectionObj.labels[key]);
    container.appendChild(sec);
  },
  buildLabel(container, prop, labelObj) {
    let labelClassArray = ['item', 'clearfix', 'row', 'margin-top-twenty'];
    if (!labelObj.defaultValue) labelClassArray.push("subSectionTitle", "text--black");

    const div = this.createAndAppend("div", "", labelClassArray, container);
    const labelContainer = this.createAndAppend('div', '', ['labels', 'col-md-3', 'padding-right-zero', 'pull-left'], div);
    this.createAndAppend("span", labelObj.title, [], labelContainer);

    let inputClassArray = ['main', 'col-md-9', 'padding-left-zero', 'pull-right'];
    if (!labelObj.defaultValue) inputClassArray.push("hidden");

    const inputContainer = this.createAndAppend('div', '', inputClassArray, div);
    let inputElement;
    const id = prop;
    const inputType = labelObj.inputType ? labelObj.inputType.toLowerCase() : "";

    if (labelObj.inputType && ["textarea", "wysiwyg"].indexOf(inputType) >= 0) {
      inputElement = this.createAndAppend("textarea", "", ["form-control", "bf" + inputType], inputContainer);
    } else {
      inputElement = this.createAndAppend("input", "", ["form-control"], inputContainer);
      inputElement.type = labelObj.inputType || "text";
    }

    inputElement.id = id;

    inputElement.autocomplete = 'off';
    inputElement.placeholder = labelObj.placeholder || "";

    if (labelObj.maxLength > 0) inputElement.maxLength = labelObj.maxLength;

    inputElement.required = labelObj.required;

    inputElement.setAttribute("bfString", prop);

    if (inputType === "wysiwyg") {
      //handled outside by tinyMCE
    } else {
      inputElement.onkeyup = (e) => {
        stringsUI.debounce(prop, () => {
          if (inputElement.checkValidity()) {
            inputElement.classList.remove("bg-danger");
            stringsUI.onSave(prop, inputElement.value || inputElement.innerHTML);
          } else inputElement.classList.add("bg-danger");
        });
        e.stopPropagation();
      };
    }

    return inputElement;
  },

  scrape() {
    const obj = {};

    this.container.querySelectorAll("*[bfString]").forEach((e) => {
      const s = e.getAttribute("bfString").split(".");

      if (!obj[s[0]]) obj[s[0]] = {};

      if (e.type === "TEXTAREA") obj[s[0]][s[1]] = e.innerHTML;
      else obj[s[0]][s[1]] = e.value;
    });
    return obj;
  },
};

export default stringsUI;
