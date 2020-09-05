import Swal from "sweetalert2";
import API from "../../Services/API";

export const login = (email, password, callBack) => {
  return fetch(API.LOGIN, {
    method: 'POST',
    body: `email=${email}&password=${password}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res.accessToken) {
        callBack(res);
      } else {
        callBack(false);
      }
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
      callBack(false);
    });
};
export const loginEmployee = (email, password, callBack) => {
  return fetch(API.LOGIN_EMPLOYEE, {
    method: 'POST',
    body: `email=${email}&password=${password}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => response.json())
    .then(res => {
      
      if (res.accessToken) {
        callBack(res);
      } else {
        callBack(false);
      }
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
      callBack(false);
    });
};
