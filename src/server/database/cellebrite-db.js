import aUser from '../users/user';
import aMessage from '../messages/message';

class CelebriteDB {
  constructor() {
    this.init();
  }

  init() {
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
}

export default new CelebriteDB();
