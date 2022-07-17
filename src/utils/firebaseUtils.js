import db from "../firebase/firebaseInit";

export const savePredictions = (user, optionsPayload, predictedPrice) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("predictions").add({
        userId: user.uid,
        options: optionsPayload,
        predictedPrice: predictedPrice,

      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
