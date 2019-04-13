
let _guid = 1;

const newGUID = function newGUID () {
  return _guid++;
};

export default newGUID;
