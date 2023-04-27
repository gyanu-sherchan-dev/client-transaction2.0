import axios from "axios";

//apiUrl, initially set as below:
// const apiUrl = "http://localhost:8000/api/v1/user";
//but as we going to have multiple endpoint, let's create the rootUrl and for each endpoint we will add on relevant function respectively.
const rootUrl = "http://localhost:8000/api/v1";
const userUrl = rootUrl + "/user";
const transUrl = rootUrl + "/transaction";

// ------- User Section -------

//send data to server to add to DB
//export this function so that we can call from handle on Submit.
export const postUser = (formData) => {
  //we passed data, because we going to receive that formData
  //we gonna run try, catch block, why- because we going to make internet call, there is alot of things could go wrong, like: internet not working, server is dead and other reason

  try {
    // now in the try block, we going to use axios.post(apiUrl), we do not have apiUrl here so, lets create one variable up there,
    return axios.post(userUrl, formData); // whenever you make post request, you want to send that data as well. And also, lets return this promise pending, so that we can await and get the data, whatever server has make request or send data back to frontend
  } catch (error) {
    //if we have error, we always going to return the error
    return {
      status: "error",
      message: error.message,
    };
  }
};

//login user

export const loginUser = (formData) => {
  try {
    console.log(formData);
    return axios.post(userUrl + "/login", formData);
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// ------- Transaction Section -------

const getUserIdFromStorage = () => {
  const user = sessionStorage.getItem("user");
  if (user) {
    const userObj = JSON.parse(user);
    return userObj?._id;
  }
  return;
};

//post transaction
export const postTrans = async (formData) => {
  try {
    const userId = getUserIdFromStorage();
    if (!userId) {
      return {
        status: "error",
        message: "you must be logged in first",
      };
    }
    const { data } = await axios.post(transUrl, formData, {
      headers: {
        Authorization: getUserIdFromStorage(), //where do you get this userId, from session storage, see above to get id from ss
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
