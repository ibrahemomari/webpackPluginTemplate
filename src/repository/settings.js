import Setting from '../entities/setting';
import { AuthManager } from '../shared';

export default class Settings {
  /**
   * Get database tag
   * @returns {string}
   */
  static get TAG() {
    return 'settings';
  }

  /**
   * get settings data
   * @returns {Promise}
   */
  static get() {
    return new Promise((resolve, reject) => {
      buildfire.datastore.get(Settings.TAG, (err, res) => {
        if (err) return reject(err);
        if (!res || !res.data || Object.keys(res.data).length === 0) {
          const data = new Setting();
          data.createdBy = AuthManager.currentUser.userId;
          Settings.save(data);
          resolve(data);
        } else {
          resolve(res.data);
        }
      });
    });
  }

  /**
   *
   * @param {Object} data
   * @returns {Promise}
   */
  static save(data) {
    return new Promise((resolve, reject) => {
      data.lastUpdatedBy = AuthManager.currentUser.userId;
      buildfire.datastore.save(data, Settings.TAG, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }
}
