import _ from 'lodash';

class Examples {
  constructor(variableNames = [], rows = []){
    this.varNames = [...variableNames];
    this.rows = [...rows];
  }
  getRow(index){
    if(index >= this.length){
      return {};
    }
    const row = this.rows[index];
    return this.varNames.reduce((rowObject, varName, varIndex) => Object.assign({}, rowObject, {[varName]: row[varIndex]}), {});
  }
  addRow(values){
    const arrayOfValues = _.toArray(values);
    if(this.headings === 0 && arrayOfValues.length > this.headings.length){
      throw new Error(`Too many values were provided in the field. Expected one for each of the ${this.headings.length} columns [${this.headings}] but got [${arrayOfValues}]`);
    }
    if(!this.headings){
      return new Examples(arrayOfValues);
    }
    return new Examples(this.varNames, [...this.rows, arrayOfValues]);
  }
  get headings(){
    return [...this.varNames];
  }
  get length() {
    return this.rows.length;
  }
  forEach(cb){
    this.rows.forEach((row, index) => cb(this.getRow(index)));
  }
  toString(){
    return '\nExamples:\n|' + this.rows.reduce((fullString, row) => `${fullString}| ${row.join(' | ')} \n`, '');
  }
}

export default Examples;
