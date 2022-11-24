import Entry from '../entities/entry';
import { AuthManager } from '../shared';

export default class Entries {
  /**
   * get database collection name
   */
  static get TAG() {
    return 'entries';
  }

  /**
   * get entry by id
   * @param {String} id
   * @returns {Promise}
   */
  static getById(id) {
    return new Promise((resolve, reject) => {
      buildfire.publicData.getById(id, Entries.TAG, (err, res) => {
        if (err) return reject(err);
        const data = new Entry(res.data).toJSON();
        resolve(data);
      });
    });
  }

  /**
   * search for entries (get all entries)
   * @param {Object} options
   * @returns {Promise}
   */
  static search(options = {}) {
    return new Promise((resolve, reject) => {
      buildfire.publicData.search(options, Entries.TAG, (err, res) => {
        if (err) return reject(err);
        res = res.map((e) => {return new Entry({ ...e.data, id: e.id }).toJSON()});
        resolve(res);
      });
    });
  }

  /**
   * add a new entry
   * @param {Object} entry
   * @returns {Promise}
   */
  static insert(entry) {
    return new Promise((resolve, reject) => {
      entry.createdBy = AuthManager.currentUser.userId;
      entry.createdOn = new Date();
      buildfire.publicData.insert(entry, Entries.TAG, false, (err, res) => {
        if (err) return reject(err);
        resolve(new Entry({ ...res.data, id: res.id }).toJSON());
      });
    });
  }

  /**
   * update existing entry
   * @param {String} entryId
   * @param {Object} entry
   * @returns {Promise}
   */
  static update(entryId, entry) {
    return new Promise((resolve, reject) => {
      entry.lastUpdatedBy = AuthManager.currentUser.userId;
      entry.lastUpdatedOn = new Date();
      buildfire.publicData.update(entryId, entry, Entries.TAG, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  /**
   * delete entry
   * @param {String} entryId
   * @returns {Promise}
   */
  static delete(entryId) {
    return new Promise((resolve, reject) => {
      buildfire.publicData.delete(entryId, Entries.TAG, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }
}
