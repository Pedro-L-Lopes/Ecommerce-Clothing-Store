import { api, requestConfig } from "../utils/config";

const insertClient = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/client/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const clientService = {
  insertClient,
};

export default clientService;
