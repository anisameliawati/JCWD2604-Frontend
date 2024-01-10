/** @format */

import axios from "axios";

export const axiosInstance = () => {
  return axios.create({
    baseURL: "http://localhost:2000",
  });
};

//api crud
//nambahin product
//edit product

//api key, user role , dll
