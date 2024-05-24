import axios from "axios";

export async function getData(url) {
  const params = { "url": url };
  
  try {
    const response = await axios.post(`http://localhost:8000/get-headers`, params);
    // Extract data from the response
    const data = response.data;
    // Log the response for debugging
    console.log(data, "Received data from server");
    return data; // Return the extracted data
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it in the caller function
  }
}
