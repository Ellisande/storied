import LineParser from './lineParser';
import {MetaData} from '../models/meta';
class MetaDataParser extends LineParser {
  constructor(line, lastSection){
    super(line, lastSection);
    if(this.lastSection !== 'meta'){
      throw new Error(`Meta marked @ found outside of a meta section. Line: ${line}`);
    }
    this.section = 'meta';
    this.meta = new MetaData(line);
  }

  static matches(line){
    return line ? line.match(/^@/i) : false;
  }
};

class MetaParser extends LineParser{
  constructor(line, lastSection){
    super(line, lastSection);
    this.section = 'meta';
  }

  static matches(line){
    return line ? line.match(/^meta/i) : false;
  }
}

export {
  MetaDataParser,
  MetaParser
};
