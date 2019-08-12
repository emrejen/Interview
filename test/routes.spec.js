import HttpStatus from 'http-status-codes';
import 'babel-polyfill';
import request from 'supertest';
import { expect } from 'chai';
import Chance from 'chance';
import InterviewServer from '../src/server/Interview-server';
import aMessage from '../src/server/messages/message';
import dao from '../src/server/database/application-db-adapter';
import Urls from '../src/server/urls-definitions';

const anAuthConfiguration = { 'x-authentication-token': 'very-secrete-token' };
async function createAndPostMessage(chance, baseUrl) {
  const id = chance.guid();
  const message = encodeURIComponent(aMessage().message);
  const result = await request(baseUrl)
    .post(`/messages/${id}/${message}`)
    .set(anAuthConfiguration);
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

  const aBadReqest = () => {
    return request(baseUrl).get(Urls.DEFAULT);
  }

  const aGoodRequest = url => {
    return request(baseUrl)
      .get(url)
      .set(anAuthConfiguration);
  }

  const aGoodPostRequest = url => {
    return request(baseUrl)
      .get(url)
      .set(anAuthConfiguration);    
  }

  it('shold not crach', () => {
    expect(app).to.be.an.instanceof(InterviewServer);
  });

  it('should throw an exception is missing mandatory authentication header', async () => {
    const result = await aBadReqest();
    expect(result.status).to.equal(HttpStatus.FORBIDDEN);
  });

  it('should have the correct authentication header present', async () => {
    const result = await aGoodRequest(Urls.DEFAULT);
    expect(result.status).to.equal(HttpStatus.OK);
  });

  it('should have a server running', async () => {
    const result = await aGoodRequest(Urls.DEFAULT);
    expect(result.status).to.equal(HttpStatus.OK);
    expect(result.text).to.equal('Hello World');
  });

  it('should reply with a list of users', async () => {
    const result = await aGoodRequest(Urls.USERS);
    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');
    expect(result.status).to.equal(HttpStatus.OK);
    expect(result.body.users).to.have.length(5);
  });

  it('should view the list of messages', async () => {
    const result = await aGoodRequest(Urls.MESSAGES);
    expect(result.body.messages.length).to.equal(7);
    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');
    expect(result.body.messages).to.have.length(7);
  });

  it('should be able to post a new message', async () => {
    const result = await createAndPostMessage(chance, baseUrl);
    expect(result.status).to.equal(HttpStatus.CREATED);
  });

  it.skip('should be able to view the new message', async (done) => {
    const theMessage = aMessage();
    const actualMessage = encodeURIComponent(theMessage.message);
    const urlForPostingMessage = `/messages/${theMessage.user.id}/${actualMessage}`;
    const agent = request(baseUrl);

    const viewMessagesReply = await agent.get(Urls.MESSAGES).set(anAuthConfiguration);
    const initialLength = viewMessagesReply.body.messages.length;
    await agent.post(urlForPostingMessage).set(anAuthConfiguration);
    const viewMessagesAfterPost = await agent.get(Urls.MESSAGES).set(anAuthConfiguration);
    const allMessages = viewMessagesAfterPost.body.messages;
    const lastMessage = allMessages[allMessages.length - 1];
    expect(allMessages).to.have.length(initialLength + 1);
    expect(lastMessage.message).to.equal(theMessage.message);
    expect(lastMessage.user.id).to.equal(theMessage.user.id);
    done();
  });

  it('should be able to clear all messages', (done) => {
    aGoodRequest(Urls.MESSAGES)
      .then(result => {
        expect(result.body.messages.length).to.equal(7);
        return Promise.resolve();
      }).then(() => {
        return request(baseUrl).post(Urls.CLEAR).set(anAuthConfiguration);
      }).then(() => {
        return request(baseUrl).get(Urls.MESSAGES).set(anAuthConfiguration);
      }).then(response => {
        expect(response.body.messages.length).to.equal(0);
        done();
      }).catch((e) => console.error(e));
  });
});
