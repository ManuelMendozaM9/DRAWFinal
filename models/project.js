const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const schema = Schema({
  _name: String,
  _applicationDate: String,
  _startDate: String,
  _description: String,
  _projectManager: {type: Schema.Types.ObjectId, ref: 'User'},
  _productOwner: {type: Schema.Types.ObjectId, ref: 'User'},
  _team: []
});

class Project{

  constructor(name, applicationDate, startDate, description, projectManager, productOwner, team){
    this._name = name;
    this._applicationDate = applicationDate;
    this._startDate = startDate;
    this._description = description;
    this._projectManager = projectManager;
    this._productOwner = productOwner;
    this._team = team;
  }

  get name(){
    return this._name;
  }

  set name(v){
    this._name = v;
  }

  get applicationDate(){
    return this._applicationDate;
  }

  set applicationDate(v){
    this._applicationDate = v;
  }

  get startDate(){
    return this._startDate;
  }

  set startDate(v){
    this._startDate = v;
  }

  get description(){
    return this._description;
  }

  set description(v){
    this._description = v;
  }

  get projectManager(){
    return this._projectManager;
  }

  set projectManager(v){
    this._projectManager = v;
  }

  get productOwner(){
    return this._productOwner;
  }

  set productOwner(v){
    this._productOwner = v;
  }

  get team(){
    return this._team;
  }

  set team(v){
    this._team = v;
  }
}

schema.plugin(mongoosePaginate);
schema.loadClass(Project);
module.exports = mongoose.model('Project', schema);
