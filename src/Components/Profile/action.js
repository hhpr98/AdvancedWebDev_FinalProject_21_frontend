import Swal from "sweetalert2";
import API from "../../Services/API";

export const changePassword = (token, oldpassword,newpassword, callBack) => {
  return fetch(API.CHANGE_PASSWORD, {
    method: 'POST',
    body: `oldpassword=${oldpassword}&newpassword=${newpassword}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res.status==="fail") {
        callBack(false, res.err);
      }  
      if(res.status==="success") {
        callBack(true, "Đổi mật khẩu thành công");
      }
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
      callBack(false);
    });
};

export const getInfoUser = (token, email, callBack) => {
  return fetch(API.GET_PROFILE(email), {
    method: 'GET',
    headers: {
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