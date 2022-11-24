import Entries from '../repository/entries';

export default {
  getEntry(entryId) {
    return Entries.getById(entryId);
  },
  searchEntries(options = {}) {
    options.sort = { createdOn: -1 };
    return Entries.search(options);
  },
  createEntry(entry) {
    return Entries.insert(entry);
  },
  updateEntry(entryId, entry) {
    return Entries.update(entryId, entry);
  },
  deleteEntry(entryId) {
    return Entries.delete(entryId);
  },
};
