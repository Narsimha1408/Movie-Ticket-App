import axiosInstance from "./index.js";

//theatre api calls based on server routes

export const RegisterTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "api/theatre/add-theatre",
      payload,
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const UpdateTheatre = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "api/theatre/update-theatre",
      payload,
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const DeleteTheatre = async (payload) => {
  try {
    const response = await axiosInstance.delete("api/theatre/delete-theatre", {
      data: payload,
    }); //always send payload as {data: payload} in config to send body. //note: config is second parameter of req
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//getting all theatres once user is on his profile page and theatres tab

export const GetAllTheatres = async (payload) => {
  try {
    console.log(payload);
    const response = await axiosInstance.get(
      "api/theatre/get-all-theatres-by-owner",
      { params: payload },
    ); //always send payload in params while using axios get req
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//getting all the theatres of multiple users for admin page

export const GetAllTheatresForAdmin = async (payload) => {
  try {
    const response = await axiosInstance.get(
      "api/theatre/get-all-theatres-for-admin",
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
