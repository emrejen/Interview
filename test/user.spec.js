import { expect } from 'chai';
import aUser from '../src/server/users/user';

describe('User creator', () => {
  it('should create a user with appropriate properties', () => {
    const user = aUser();
    ['age', 'name', 'last', 'gender', 'id'].forEach(key => expect(user).to.have.own.property(key));
  });
});
