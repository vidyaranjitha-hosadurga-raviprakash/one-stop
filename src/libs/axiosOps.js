import axios from "axios";

export const fetchData = async (url) => {
  return await axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("fetchData: error while fetching the data =", error);
    });
};

export const postData = async (url, data) => {
  await axios
    .post(url, data)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateData = async (url, data) => {
  await axios
    .put(url, data)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteData = async (url) => {
  return await axios
    .delete(url)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
