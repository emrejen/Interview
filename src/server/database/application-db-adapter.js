import storage from './database';

class ApplicationDBAdapter {
  constructor(dbInstance) {
    this.storage = dbInstance;
    this.storage.init();
  }

  init() {
    this.storage.init();
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
}

export default new ApplicationDBAdapter(storage);
