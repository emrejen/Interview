import HttpStatus from 'http-status-codes';
import 'babel-polyfill';
import request from 'supertest';
import { expect } from 'chai';
import Chance from 'chance';
import InterviewServer from '../src/Interview-server';
import aMessage from '../src/server/messages/message';
import dao from '../src/server/database/application-db-adapter';
import Urls from '../src/server/urls-definitions';

async function createAndPostMessage(chance, baseUrl) {
  const id = chance.guid();
  const message = encodeURIComponent(aMessage().message);
  const result = await request(baseUrl).post(`/messages/${id}/${message}`);
  return result;
}

describe('Chat Interview application', () => {
  const chance = new Chance();
  const baseUrl = 'http://localhost:3000';
  const app = new InterviewServer();
  app.start();

  beforeEach(() => {
    dao.init();
  });

  after(done => {
    app.shutdown();
    done();
  });

  it('shold not crach', () => {
    expect(app).to.be.an.instanceof(InterviewServer);
  });

  it('should have a server running', async () => {
    const result = await request(baseUrl).get(Urls.DEFAULT);
    expect(result.status).to.equal(HttpStatus.OK);
    expect(result.text).to.equal('Hello World');
  });

  it('should reply with a list of users', async () => {
    const result = await request(baseUrl).get(Urls.USERS);
    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');
    expect(result.status).to.equal(HttpStatus.OK);
    expect(result.body.users).to.have.length(5);
  });

  it('should view the list of messages', async () => {
    const result = await request(baseUrl).get(Urls.MESSAGES);
    expect(result.body.messages.length).to.equal(7);
    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');
    expect(result.body.messages).to.have.length(7);
  });

  it('should be able to post a new message', async () => {
    const result = await createAndPostMessage(chance, baseUrl);
    expect(result.status).to.equal(HttpStatus.CREATED);
  });

  it('should be able to view the new message', async () => {
    const theMessage = aMessage();
    const actualMessage = encodeURIComponent(theMessage.message);
    const urlForPostingMessage = `/messages/${theMessage.user.id}/${actualMessage}`;
    const agent = request(baseUrl);

    const viewMessagesReply = await agent.get(Urls.MESSAGES);
    const initialLength = viewMessagesReply.body.messages.length;
    await agent.post(urlForPostingMessage);
    const viewMessagesAfterPost = await agent.get(Urls.MESSAGES);
    const allMessages = viewMessagesAfterPost.body.messages;
    const lastMessage = allMessages[allMessages.length - 1];
    expect(allMessages).to.have.length(initialLength + 1);
    expect(lastMessage.message).to.equal(theMessage.message);
    expect(lastMessage.user.id).to.equal(theMessage.user.id);
  });

  it('should be able to clear all messages', (done) => {
    request(baseUrl)
      .get(Urls.MESSAGES)
      .then(result => {
        expect(result.body.messages.length).to.equal(7);
        return Promise.resolve();
      }).then(() => {
        return request(baseUrl).post(Urls.CLEAR);
      }).then(() => {
        return request(baseUrl).get(Urls.MESSAGES);
      }).then(response => {
        expect(response.body.messages.length).to.equal(0);
        done();
      }).catch((e) => console.error(e));
  });
});
