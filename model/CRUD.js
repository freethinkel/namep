function CRUD (mongo, workSchema, colName) {
  this.workModel = mongo.model(colName, workSchema);
  this.collectionName = colName;
}

CRUD.prototype.create = async function (dataObj, validationParam) {
  console.log('create');
  if (dataObj.hasOwnProperty('_id')) {
    delete dataObj._id;
  }
  try {
    if (arguments.length > 1) {
      const validator = {};
      Object.defineProperty(validator, validationParam, {value: dataObj[validationParam], enumerable: true});
      const user = await this.workModel.findOne(validator);
      // if (user) return Promise.reject(new Error(`Error with creating in ${this.collectionName}s collection new entry. Entry with ${validationParam} not unique.`));
    }
    
    return this.workModel(dataObj).save();

  } catch (error) {
    throw error;
  }
};


CRUD.prototype.readByParam = function (paramName, paramValue) {
  try {
    const searchObj = {};
    searchObj[paramName] = paramValue;

    return this.workModel.findOne(searchObj);
  } catch (error) {
    throw error;
  }
};

CRUD.prototype.readById = function (id) {
  return this.workModel.findById(id);
};

CRUD.prototype.readAllEntries = function () {
  return this.workModel.find();
};

CRUD.prototype.update = async function (id, dataObj) {
  try {
    const entry = await this.workModel.findById(id);
    for (key in dataObj) {
      if (key !== '_id' && key !== '__v') entry[key] = dataObj[key];
    }
    return entry.save();

  } catch (error) {
    throw error;
  }
};

CRUD.prototype.delete = async function (id) {
  try {
    const entry = await this.workModel.findById(id);
    return entry.remove()
  } catch (error) {
    throw error
  }
};

module.exports = CRUD;