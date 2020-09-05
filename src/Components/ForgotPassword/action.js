import Swal from "sweetalert2";
import API from "../../Services/API";

export const sendMail = (email, callBack) => {
  return fetch(API.SEND_MAIL_FORGOT_PASSWORD, {
    method: 'POST',
    body: `email=${email}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res.status==="fail") {
        callBack(false, res.err);
      } 
      if(res.status==="sucess") {
        callBack(true,res.message);
      }
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
      callBack(false);
    });
};
export const verifyOTP = (otp,email) => {
  return fetch(API.VERIFY_OTP_FORGOT, {
    method: 'POST',
    body: `code=${otp}&email=${email}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
    // .then(response => response.json())
    // .then(res => {
    //   if (res.status==="fail") {
    //     callBack(false, res.err);
    //   }  
    //   if(res.status==="sucess") {
    //     callBack(true, "OK");
    //   }
    // })
    // .catch(error => {
    //   Swal.fire('Thông báo', error.message, 'error');
    //   callBack(false);
    // });
};

export const resetPassword = (email, newpassword, callBack) => {
  return fetch(API.RESET_PASSWORD, {
    method: 'POST',
    body: `email=${email}&newpassword=${newpassword}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
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