import fs from "fs";
import { models_idx } from "../assets/model_data.js";

const covertKeysToValues = () => {
  const newObj = {};
  for (let key in models_idx) {
    newObj[models_idx[key]] = key;
  }
  return newObj;
};

// save the value of a variable in a .txt file using node.js
const saveToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

// saveToFile("convert_keys.json", JSON.stringify(covertKeysToValues()));
