const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const schema = Schema({
  _name: String,
  _email: String,
  _password : String,
  _dateBirth: String,
  _curp: String,
  _rfc: String,
  _address: String,
  _abilities: String,
  _googleId: String,
  _linkedinId: String,
  _githubId: String
});

class User{

  constructor(name, email, password, dateBirth, curp, rfc, address, abilities, googleId, linkedinId, githubId){
    this._name = name;
    this._email = email;
    this._password = password;
    this._dateBirth = dateBirth;
    this._curp = _curp;
    this._rfc = rfc;
    this._address = address;
    this._abilities = abilities;
    this._googleId = googleId;
    this._linkedinId = linkedinId;
    this._githubId = githubId;
  }

  get name(){
    return this._name;
  }

  set name(v){
    this._name = v;
  }

  get email(){
    return this._email;
  }

  set email(v){
    this._email = v;
  }

  get password(){
    return this._password;
  }

  set password(v){
    this._password = v;
  }

  get dateBirth(){
    return this._dateBirth;
  }

  set dateBirth(v){
    this._dateBirth = v;
  }

  get curp(){
    return this._curp;
  }

  set curp(v){
    this._curp = v;
  }

  get rfc(){
    return this._rfc;
  }

  set rfc(v){
    this._rfc = v;
  }

  get address(){
    return this._address;
  }

  set address(v){
    this._address = v;
  }

  get abilities(){
    return this._abilities;
  }

  set abilities(v){
    this._abilities = v;
  }

  get googleId(){
    return this._googleId;
  }

  set googleId(v){
    this._googleId = v;
  }

  get linkedinId(){
    return this._linkedinId;
  }

  set linkedinId(v){
    this._linkedinId = v;
  }

  get githubId(){
    return this._githubId;
  }

  set githubId(v){
    this._githubId = v;
  }
}

// generating a hash
schema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
schema.methods.validPassword = (currentUser, password) => {
  return bcrypt.compareSync(password, currentUser.password);
};

schema.plugin(mongoosePaginate);
schema.loadClass(User);
module.exports = mongoose.model('User', schema);
