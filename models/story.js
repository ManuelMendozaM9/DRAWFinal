const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const schema = Schema({
  _product_owner_id : Schema.Types.ObjectId,
  _project_id: Schema.Types.ObjectId,
  _narrative : String,
  _state : String,
  _priority : String,
  _size : Number,
  _how : String,
  _i_want : String,
  _so_that : String,
  _criteria : String,
  _since : String,
  _when : String,
  _so : String
});

class Story{

  constructor(product_owner_id, project_id, narrative, state, priority, size, how, i_want, so_that, criteria, since, when, so){
    this._product_owner_id = product_owner_id;
    this._project_id = project_id;
    this._narrative = narrative;
    this._state = state;
    this._priority = priority;
    this._size = size;
    this._how = how;
    this._i_want = i_want;
    this._so_that = so_that;
    this._criteria = criteria;
    this._since = since;
    this._when = when;
    this._so = so;
  }

  get product_owner_id(){
    return this._product_owner_id;
  }

  set product_owner_id(v){
    this._product_owner_id = v;
  }

  get project_id(){
    return this._project_id;
  }

  set project_id(v){
    this._project_id = v;
  }

  get narrative(){
    return this._narrative;
  }

  set narrative(v){
    this._narrative = v;
  }

  get state(){
    return this._state;
  }

  set state(v){
    this._state = v;
  }

  get priority(){
    return this._priority;
  }

  set priority(v){
    this._priority = v;
  }

  get size(){
    return this._size;
  }

  set size(v){
    this._size = v;
  }

  get how(){
    return this._how;
  }

  set how(v){
    this._how = v;
  }

  get i_want(){
    return this._i_want;
  }

  set i_want(v){
    this._i_want = v;
  }

  get so_that(){
    return this._so_that;
  }

  set so_that(v){
    this._so_that = v;
  }

  get criteria(){
    return this._criteria;
  }

  set criteria(v){
    this._criteria = v;
  }

  get since(){
    return this._since;
  }

  set since(v){
    this._since = v;
  }

  get when(){
    return this._when;
  }

  set when(v){
    this._when = v;
  }

  get so(){
    return this._so;
  }

  set so(v){
    this._so = v;
  }
}

schema.plugin(mongoosePaginate);
schema.loadClass(Story);
module.exports = mongoose.model('Story', schema);
