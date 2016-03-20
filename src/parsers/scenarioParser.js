import LineParser from './lineParser';

class ScenarioParser extends LineParser {
  constructor(line, lastSection) {
    super(line, lastSection);
    if (!ScenarioParser.matches(this.line)) {
      throw new Error('Attempted to parse a line as a scenario, but it wasn\'t');
    }
    this.section = 'scenario';
    this.scenario = line.replace(/^scenario: /i, '');
  }
  static matches(line){
    return line ? line.match(/^scenario:/i) : false;
  }
}

export default ScenarioParser;
