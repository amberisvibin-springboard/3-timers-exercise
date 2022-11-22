import { useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

function useAxios(baseUrl) {
  const [items, setItems] = useState([]);
  async function getItem(endpoint) {
    // console.log(endpoint);
    let response;
    if (endpoint) {
      response = await axios.get(baseUrl + endpoint);
    } else {
      response = await axios.get(baseUrl);
    }

    setItems((items) => [...items, { ...response.data, id: uuid() }]);
  }

  return [items, getItem];
}

export default useAxios;
