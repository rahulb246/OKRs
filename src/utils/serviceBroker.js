import axios from "axios";

const invokeRestApi = (url, config = {}) => {
  if (url === null) {
    window.console.error(
      "Error: url passed to Service Broker is null (or) undefined"
    );
  }

  if (url) {
    return axios({
      ...config,
      url
    });
  }
};

export default invokeRestApi;
