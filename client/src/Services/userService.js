import axios from "axios";
import {
  registrationStart,
  registrationEnd,
  loginStart,
  loginFailure,
  loginSuccess,
  loadSuccess,
  loadFailure,
  loadStart,
  fetchingStart,
  fetchingFinish,
} from "../Redux/Slices/userSlice";
import { openAlert } from "../Redux/Slices/alertSlice";
import setBearer from "../Utils/setBearer";
const baseUrl = "http://localhost:3001/user/";

const createUserInAuth0 = async (email, password) => {
  const url = `https://dev-ttuyoovn5gvuwmps.us.auth0.com/dbconnections/signup`;
  const data = {
    client_id: 'H9S3HnLFfsu2Pj0Kmca6Cuv0toUT88IP',
    email,
    password,
    connection: 'Username-Password-Authentication', 
  };
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating user in Auth0:', error);
  }
};

export const register = async (
  { name, surname, email, password, repassword },
  dispatch
) => {
  dispatch(registrationStart());
  if (password !== repassword) {
    dispatch(
      openAlert({
        message: "Your passwords does not match!",
        severity: "error",
      })
    );
  } else {
    try {
      await createUserInAuth0(email, password);

      const res = await axios.post(`${baseUrl}register`, {
        name,
        surname,
        email,
        password,
      });

      if (!res) {
        throw new Error('No response from server');
      }

      if (!res.data) {
        throw new Error('No data in response');
      }

      dispatch(
        openAlert({
          message: res.data.message,
          severity: "success",
          nextRoute: "/login",
          duration: 1500,
        })
      );
    } catch (error) {
      console.error('Error creating user in Auth0:', error.response?.data || error);

      dispatch(
        openAlert({
          message: error?.response?.data?.errMessage
            ? error.response.data.errMessage
            : error.message,
          severity: "error",
        })
      );
    }
  }
  dispatch(registrationEnd());
};

export const login = async ({ email, password }, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(baseUrl + "login", { email, password });
    const { user, message } = res.data;
    localStorage.setItem("token", user.token);
    setBearer(user.token);
    console.log('Token:', user.token); // Add this line
    dispatch(loginSuccess({ user }));
    dispatch(
      openAlert({
        message,
        severity: "success",
        duration: 500,
        nextRoute: "/boards",
      })
    );
  } catch (error) {
    dispatch(loginFailure());
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const loadUser = async (dispatch) => {
  dispatch(loadStart());
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return dispatch(loadFailure());
  }

  setBearer(token);
  try {
    const res = await axios.get(baseUrl + "get-user");
    if (res.status !== 200) {
      throw new Error('Failed to load user');
    }
    dispatch(loadSuccess({ user: res.data }));
  } catch (error) {
    console.error('Error loading user:', error);
    if (error.response && error.response.status === 401) {
      // If the server responded with a 401 Unauthorized error, clear the local storage and redirect to login
      localStorage.clear();
      window.location.href = '/login';
    }
    dispatch(loadFailure());
  }
};

export const getUserFromEmail = async (email, dispatch) => {
  dispatch(fetchingStart());
  if (!email) {
    dispatch(
      openAlert({
        message: "Please write an email to invite",
        severity: "warning",
      })
      );
      dispatch(fetchingFinish());
      return null;
    }
    
  try {
    const res = await axios.post(baseUrl + "get-user-with-email", { email });
    dispatch(fetchingFinish());
    return res.data;
  } catch (error) {
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
        ? error.response.data.errMessage
        : error.message,
        severity: "error",
      })
      );
     dispatch(fetchingFinish());
     return null;
  }
};
