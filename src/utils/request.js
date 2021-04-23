import axios from 'axios'

export const makePOSTRequest = async (body,endpoint) =>{
    const res = await axios({
        method: "post",
        url: endpoint,
        baseURL: "http://localhost:3000",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: body,
        withCredentials: true
      });
      return res
}
export const makeGetRequest = async (params,endpoint) =>{
    try{
      const res = await axios({
        method: "get",
        url: "http://localhost:3000"+endpoint+params,
        // baseURL: "http://localhost:3000",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      return res
    }catch(err){
        return {status:500,msg:err.message,data:null}
      }
}