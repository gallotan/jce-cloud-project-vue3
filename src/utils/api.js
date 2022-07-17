let headersList = {
  "Content-Type": "application/json",
};
export const getPredictedPrice = (payload) => {
  console.log("*AWS LAMBDA CALL - GET PRICE PREDICTION, SENT:*");
  console.log(payload)

  return fetch(
    `https://1mwuf0aj60.execute-api.us-east-1.amazonaws.com/dev-env`,
    {
      method: "POST",
      body: JSON.stringify({ data: payload }),
      headers: headersList,
    }
  );
};

export const savePredictions = (payload) => {
  return fetch(
    `http://ec2-107-20-62-9.compute-1.amazonaws.com/addPrediction`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: headersList,
    }
  );
};

export const getPredictions = (user_id) => {


  return fetch(
    `http://ec2-107-20-62-9.compute-1.amazonaws.com/getPredictions`,
    {
      method: "POST",
      body: JSON.stringify({"user_id": user_id}),
      headers: headersList,
    }
  );
};

export const uploadImage = (file) => {

  const df = new FormData();
  df.append('image_file', file, file.name);


  return fetch(
    `http://ec2-107-20-62-9.compute-1.amazonaws.com/uploadImage`,
    {
      method: "POST",
      body: df,
    }
  );
};
