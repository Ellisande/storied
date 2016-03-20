class MetaData {
  constructor(line){
    if(!line){
      throw new Error(`Cannot create a meta object from nothing. Line: ${line}`);
    }
    const parsed = line.replace(/^(meta:|@)/i, '').split(' +');
    this.key = parsed[0];
    this.value = parsed[1];
    Object.freeze(this);
  }
  get data(){
    return {
      [this.key]: this.value
    };
  }
}

class Meta {
  constructor(metaData = {}){
    this.metaData = Object.assign({}, metaData);
    Object.freeze(this.metaData);
  }
  add(metaData){
    if(!(metaData instanceof MetaData)){
      throw new Error(`Can only add MetaData objects to meta. Excepted MetaData but was ${metaData}`);
    }
    const newData = Object.assign({}, this.metaData);
    newData[metaData.key] = newData[metaData.key] || [];
    newData[metaData.key] = [...newData[metaData.key], metaData.value];
    Object.freeze(newData[metaData.key]);
    return new Meta(newData);
  }
  toString(){
    return 'Meta:\n' + Object.keys(this.metaData).reduce((stringBuilder, key) => `${stringBuilder}@${key} ` + this.metaData[key].join(', ') + '\n', '').trim();
  }
};

export {
  Meta,
  MetaData
};
