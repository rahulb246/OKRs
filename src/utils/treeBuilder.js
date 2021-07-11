import _ from "lodash";

// builds tree(nested list) like structure from objArr which has array elements with parentID
const objArrayToTree = (objArr, propConfig) => {
  const { key, parent } = propConfig;
  const keyedObjArr = _.mapKeys(objArr, key);
  var tree = {};
  _.each(keyedObjArr, function (v) {
    if (!v[parent]) {
      tree[v[key]] = v;
    } else {
      if (keyedObjArr[v[parent]]) {
        if (!keyedObjArr[v[parent]].children)
          keyedObjArr[v[parent]].children = [];
        keyedObjArr[v[parent]].children.push(v);
      }
    }
  });
  return tree;
};

export default objArrayToTree;
