import { expect } from 'chai';
import aMessage from '../src/server/messages/message';

describe('Message creator', () => {
  it('should create a message', () => {
    expect(aMessage()).to.have.own.property('message');
    expect(aMessage()).to.have.own.property('user');
  });
  it('message should contain 10 words', () => {
    const words = aMessage().message.split(' ');
    expect(words).to.have.length(7);
  });
});
