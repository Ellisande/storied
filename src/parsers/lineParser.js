class LineParser {
  constructor(line, lastSection) {
    this.line = line;
    this.lastSection = lastSection;
    this.meta = undefined;
    this.step = undefined;
    this.scenario = undefined;
    this.section = undefined;
  }
  static matches(line) {
    return line !== undefined;
  }
};

export default LineParser;
