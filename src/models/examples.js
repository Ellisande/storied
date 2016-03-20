import _ from 'lodash';

class Examples {
  constructor(variableNames, rows = []){
    if(!variableNames || variableNames.length === 0){
      throw new Error(`An array of variable names is required to create an examples table. Expected an array, got: ${variableNames}`);
    }
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
    if(arrayOfValues.length > this.headings.length){
      throw new Error(`Too many values were provided in the field. Expected one for each of the ${this.headings.length} columns [${this.headings}] but got [${arrayOfValues}]`);
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
}

export default Examples;
