import axios from "axios";


export async function getData(url) {
  // console.log("cdschsbc", url)
  const response = await axios
      .get(`https://e-tims.onrender.com/get-headers`, url)
  return response;

}