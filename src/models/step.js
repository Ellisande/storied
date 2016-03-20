class Step {
  constructor(type, text){
    this.type = type;
    const typeMatcher = new RegExp(`^(${type}|[aA]nd) `, 'i');
    this.text = text.replace(typeMatcher, '');
  }
  get tokens(){
    return this.text.split(' ');
  }
  matches(otherText){
    return this.text === otherText;
  }
  toString(){
    return ' ' + this.text;
  }
};

Step.types = ['given', 'when', 'then'];
export default Step;
