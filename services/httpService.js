import axios from "axios";


export async function getData(url) {
  // console.log("cdschsbc", url)
  const response = await axios
      .get(`http://localhost:8000/get-headers`)
  return response;

}