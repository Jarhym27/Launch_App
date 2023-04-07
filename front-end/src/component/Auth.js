import axios from 'axios';
import Cookie from 'js-cookie';

const url = 'http:localhost:3001/'

const setCookie = (key, value) => {
  Cookie.set(
    key,
    value,
    {
      expires: 300,
      secure: true,
      sameSite: 'strict',
      path: '/',
    },
  );
};

const getCookie = (key) => Cookie.get(key);

const removeCookie = (key) => Cookie.remove(key);

const checkCookie = (key) => {
  if (getCookie(key)) return true;
  return false;
};

const returnCurrentUser = () => (checkCookie('user') ? JSON.parse(getCookie('user')) : {});

// const authentication = (credentials) => axios.post(JSON.stringify(credentials),
// {
//   headers: { 'Content-Type': 'application/json' },
// },
// ).then((response) => {
// const { token, user } = response.data;
//   setCookie('token', token);
//   setCookie('user', JSON.stringify(user));
// return response.data;
// }).catch((error) => {
// if (error.response) {
//   return error.response.data;
// }
// return { status: 'failure', error: 'Check Your Connection' };
// });

// const getWithToken = () => axios.get(
// `/`,
// {
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${getCookie('token')}`,
//   },
// },
// ).then((response) => response);

// const reqWithToken = (method, endpoint, obj) => {
// axios({
//   method,
//   url: `${url}${endpoint}`,
//   data: JSON.stringify(obj),
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${getCookie('token')}`,
//   },
// });
// };

// const deleteWithToken = async (ep) => {
// axios.delete(
//   `${url}${ep}`,
//   {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${getCookie('token')}`,
//     },
//   },

// );
// };
export {
  setCookie, getCookie, removeCookie, checkCookie, returnCurrentUser, 
//   authentication, getWithToken, reqWithToken, deleteWithToken,
};

