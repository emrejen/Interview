import { expect } from 'chai';
import aUser from '../src/server/users/user';

describe('User creator', () => {
  it('should create a user with appropriate properties', () => {
    const user = aUser();
    expect(user).to.have.all.keys('age', 'name', 'last', 'gender', 'id');
  });
});
