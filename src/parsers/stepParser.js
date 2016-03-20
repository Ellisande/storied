import LineParser from './lineParser';
import Step from '../models/step';
const determineSection = line => {
  const newSection = Step.types.find(type => line.match(new RegExp(`^${type}`, 'i')));
  if (!newSection) {
    throw new Error(`Could not determine the new section for ${line}`);
  }
  return newSection;
};

class StepParser extends LineParser {
  constructor(line, lastSection) {
    super(line, lastSection);
    if (!StepParser.matches(this.line)) {
      throw new Error(`Attempted to parse a line as a step, but it wasn\'t. Line: ${this.line}`);
    }
    if (this.line.match(/^and/i)) {
      this.section = lastSection;
    } else {
      this.section = determineSection(this.line);
    }
    this.step = new Step(this.section, this.line);
  }
  static matches(line) {
    return line ? line.match(/^(given|when|then|and)/i) : false;
  }
};


export default StepParser;
