import {Meta} from '../models/meta';
import Examples from '../models/examples';
class Story {
  constructor(scenario){
    this.scenario = scenario;
    this.meta = new Meta();
    this.given = [];
    this.when = [];
    this.then = [];
    this.examples = new Examples();
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
  addExampleRow(row){
    this.examples = this.examples.addRow(row);
  }
  toString(){
    const scenario = `Scenario: ${this.scenario}`;
    const meta = this.meta.toString();
    const given = 'Given' + this.given.join('\nAnd');
    const when = 'When' + this.when.join('\nAnd');
    const then = 'Then' + this.then.join('\nAnd');
    const examples = this.examples.toString();
    return `${scenario}\n${meta}\n${given}\n${when}\n${then}\n${examples}`;
  }
  validate(){
    return false;
  }
}

export default Story;
