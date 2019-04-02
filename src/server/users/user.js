import Chance from 'chance';

const chance = new Chance();
const aUser = () => ({
  id: chance.guid(),
  age: chance.age(),
  name: chance.name(),
  last: chance.last(),
  gender: chance.gender(),
});

export default aUser;
