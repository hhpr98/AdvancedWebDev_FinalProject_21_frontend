import Swal from "sweetalert2";
import API from "../../Services/API";

export const getRefreshToken = (refreshTokenx, callBack) => {
  return fetch(API.REFRESH_TOKEN, {
    method: 'POST',
    body: `refreshToken=${refreshTokenx}`,
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