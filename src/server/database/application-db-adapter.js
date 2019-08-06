import storage from './database';

class ApplicationDBAdapter {
  constructor(dbInstance) {
    this.storage = dbInstance;
    this.storage.clearAndLoadDefaults();
  }

  init() {
    this.storage.clearAndLoadDefaults();
  }

  getUsers() {
    return this.storage.getUsers();
  }

  getMessages() {
    return this.storage.getMessages();
  }

  postMessage(message) {
    this.storage.postMessage(message);
  }

  clearMessages() {
    this.storage.clear();
  }
}

export default new ApplicationDBAdapter(storage);
