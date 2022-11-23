import Settings from '../../repository/settings';

export default {
  // get data
  getSettings: Settings.get(),

  // set data
  setSettings: (data) => Settings.save(data),
};
