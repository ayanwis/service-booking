import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { getItem } from "./session";

const makeRequest = async (method, endPoint, data, authorization) => {
  try {
    let headers = {};
    // If need authorization and token not found then return with error
    if (authorization && !getItem("access_token"))
      throw new Error("No token found.");

    // If need authorization then send the token in headers
    if (authorization)
      headers = {
        Authorization: `Bearer ${getItem("access_token")}`,
        "Cache-Control": "no-cache",
      };

    return await axios({
      url: BASE_URL + endPoint,
      method,
      data,
      headers: {
        ...headers,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// GET
export const getService = async (endPoint, authorization = false) =>
  makeRequest("GET", endPoint, null, authorization);

// POST
export const postService = async (endPoint, reqest, authorization = false) =>
  makeRequest("POST", endPoint, reqest, authorization);

// PUT
export const putService = async (endPoint, reqest, authorization = false) =>
  makeRequest("PUT", endPoint, reqest, authorization);

// PATCH
export const patchService = async (endPoint, reqest, authorization = false) =>
  makeRequest("PATCH", endPoint, reqest, authorization);

// DELETE
export const deleteService = async (endPoint, authorization = false) =>
  makeRequest("DELETE", endPoint, null, authorization);
