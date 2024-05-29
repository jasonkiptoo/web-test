import axios from "axios";

const url_be = process.env.BASE_URL

export async function getData(url) {
  console.log(url_be, "Fdfddfdf")
  const params = { "url": url };
  
  try {
    const response = await axios.post(`${url_be}`, params);
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
