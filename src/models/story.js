import {Meta} from '../models/meta';
class Story {
  constructor(scenario){
    this.scenario = scenario;
    this.meta = new Meta();
    this.given = [];
    this.when = [];
    this.then = [];
    this.examples = [];
  }
  addStep(step){
    this[step.type].push(step);
  }
  get steps(){
    return [...this.given, ...this.when, ...this.then];
  }
  addMetaData(metaData){
    this.meta = this.meta.add(metaData);
  }
  toString(){
    const scenario = `Scenario: ${this.scenario}`;
    const meta = this.meta.toString();
    const given = 'Given' + this.given.join('\nAnd');
    const when = 'When' + this.when.join('\nAnd');
    const then = 'Then' + this.then.join('\nAnd');
    return `${scenario}\n${meta}\n${given}\n${when}\n${then}`;
  }
  validate(){
    return false;
  }
}

export default Story;
