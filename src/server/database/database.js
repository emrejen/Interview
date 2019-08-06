import aUser from '../users/user';
import aMessage from '../messages/message';

class Storage {
  constructor() {
    this.clearAndLoadDefaults();
  }

  clearAndLoadDefaults() {
    this.users = [];
    this.messages = [];
    for (let i = 0; i < 7; ++i) {
      this.messages.push(aMessage());
    }
    for (let i = 0; i < 5; ++i) {
      this.users.push(aUser());
    }
  }

  getUsers() {
    return this.users;
  }

  getMessages() {
    return this.messages;
  }

  postMessage(message) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

}

export default new Storage();
