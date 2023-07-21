import axios from "axios";

const userLogin = async ({ userDetails, loginUserResponse }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/token`,
      {
        userDetails,
      }
    );

    console.log("response of login", response);
    if (loginUserResponse) {
      loginUserResponse(response);
    }
    loginUserResponse(response);
    console.log("response of login", response);
  } catch (error) {
    if (loginUserResponse) {
      loginUserResponse(error.response.data);
    }
    console.log("error", error);
  }
};

export default userLogin;
