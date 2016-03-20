import LineParser from './lineParser';
import _ from 'lodash';

class ExampleRowParser extends LineParser {
  constructor(line, lastSection){
    super(line, lastSection);
    if(this.lastSection !== 'examples'){
      throw new Error(`Found an example row defined outside the examples section. Expected examples section but was ${this.lastSection}`);
    }
    this.section = 'examples';
    const row = this.line.split('|').filter(i => !_.isEmpty(i));
    this.exampleRow = row;
  }

  static matches(line){
    return line ? line.match(/^\|[^\|]/i) : false;
  }
};

class ExampleHeaderParser extends LineParser {
  constructor(line, lastSection){
    super(line, lastSection);
    if(_.isEmpty(this.line)){
      throw new Error(`You cannot have an example table without at least one heading column. Expected a column starting with || followed by at least one word. Line: ${this.line}`);
    }
    this.section = 'examples';
    const headerRow = this.line.split(/\|+/).filter(i => !_.isEmpty(i));
    this.exampleRow = headerRow;
  }

  static matches(line){
    return line ? line.match(/^\|\|/i) : false;
  }
}

class ExampleParser extends LineParser{
  constructor(line, lastSection){
    super(line, lastSection);
    this.section = 'examples';
  }

  static matches(line){
    return line ? line.match(/^examples?:/i) : false;
  }
}

export {
  ExampleRowParser,
  ExampleParser,
  ExampleHeaderParser
};
