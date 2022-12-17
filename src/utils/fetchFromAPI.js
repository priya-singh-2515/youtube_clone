import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  // method: 'GET',
  // // url: BASE_URL,
  params: { regionCode: "IN", maxResults: "50" },
  headers: {
    // 'X-RapidAPI-Key': 'fc17cf771cmsh0bdf8e91187317bp14f657jsn90dc5f0a9093',
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};
export const fetchFromAPI = async (url) => {
  //  const response = await axios.get(`$(BASE_URL)/${url}`,options);
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};
