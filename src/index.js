import Story from './models/story';
import StepParser from './parsers/stepParser';
import ScenarioParser from './parsers/scenarioParser';
import {MetaDataParser, MetaParser} from './parsers/metaParser';
import {ExampleRowParser, ExampleHeaderParser, ExampleParser} from './parsers/examplesParser';

const parsers = [StepParser, ScenarioParser, MetaParser, MetaDataParser, ExampleRowParser, ExampleHeaderParser, ExampleParser];

var fs = require('fs');
fs.readFile(process.cwd() + '/test/stories/test.story', function(err, data) {
  if (err) {
    throw err;
  }
  var array = data.toString().split('\n');
  var myStory;
  var lastSection;
  array.forEach(line => {
    if(!line || line.length === 0){
      return;
    }
    const parser = parsers.find(currentParser => currentParser.matches(line));
    if(!parser){
      throw new Error(`Could not find a parser for this line. Check your syntax and try again. Line: ${line}`);
    }
    const parsedLine = new parser(line, lastSection);
    if(parsedLine.scenario){
      myStory = new Story(parsedLine.scenario);
    }
    if(parsedLine.meta){
      myStory.addMetaData(parsedLine.meta);
    }
    if(parsedLine.step){
      myStory.addStep(parsedLine.step);
    }
    if(parsedLine.exampleRow){
      myStory.addExampleRow(parsedLine.exampleRow);
    }
    lastSection = parsedLine.section;
  });
  console.log(myStory.toString());
});
