import Chance from 'chance';
import aUser from '../users/user';

const chance = new Chance();

const aMessage = (user = aUser()) => ({ message: chance.sentence({ words: 7 }), user });

export default aMessage;
