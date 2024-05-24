import axios from "axios";


export async function getData(url) {
  const params = {"url":url}
  const response = await axios
      .post(`http://localhost:8000/get-headers`, params ).then((res)=>{console.log(res, "Rerererer")}).catch((err)=>{console.err(err)})
  return response;

}