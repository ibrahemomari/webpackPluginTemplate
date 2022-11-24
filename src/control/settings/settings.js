import settingsController from './settings.controller';

const settingsUI = {
  apiKey: '',
  _uiElements: {
    saveButton: document.getElementById('saveButton'),
    apiInput: document.getElementById('apiInput'),
  },

  _inputHandler() {
    this.apiKey = settingsUI._uiElements.apiInput.value;
    // todo :  we need more validation here
    if (!this.apiKey || this.apiKey.trim() === '') {
      return buildfire.dialog.toast({
        message: 'The api key not valid',
      });
    }
    settingsController.setSettings({ apiKey: this.apiKey });
  },

  init() {
    settingsController.getSettings.then(
      (res) => (settingsUI._uiElements.apiInput.value = res.apiKey)
    );
    this._uiElements.saveButton.addEventListener('click', this._inputHandler);
  },
};

settingsUI.init();
