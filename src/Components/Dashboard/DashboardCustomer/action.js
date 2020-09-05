import Swal from "sweetalert2";
import API from "../../../Services/API";

export const getAllAccount = (token, callBack) => {
  return fetch(API.GET_ALL_ACCOUNT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res.status==="success") {
        callBack(res.data);
      } else {
        callBack(false);
      }
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
      callBack(false);
    });
};
