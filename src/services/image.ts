import { getBackendErrorMessage } from "../utils/error";
import apiChat from "./apiChat";

export const saveImageService = async (formData: FormData) => {
  try {
    const response = await apiChat.post("/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data.imageUrl;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Error uploading image:", getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
};
