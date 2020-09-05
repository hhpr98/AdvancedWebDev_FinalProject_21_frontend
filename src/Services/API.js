import URL from './URL';


const API = {
  // authentication
  // customer
  LOGIN: `${URL}/auth/login`,
  GET_ALL_PARTNERS: `${URL}/partner/get-partners`,
  GET_ALL_RECEIVER: `${URL}/receivers`,
  SEND_OTP: `${URL}/OTP/send`,
  VERIFY_OTP: `${URL}/OTP/verify`,
  TRANSFER_IN_LOCAL: `${URL}/payments/payment-account/pay`,
  GET_LOCAL_ACC_INFO: `${URL}/infor/local`,
  CHANGE_PASSWORD: `${URL}/customers/change-password`,
  GET_PROFILE: email=> `${URL}/customers/${email}`,

  // employee
  LOGIN_EMPLOYEE: `${URL}/auth/admin-login`,
  // refresh token
  REFRESH_TOKEN: `${URL}/auth/refresh-token`,
  // get all account
  GET_ALL_ACCOUNT: `${URL}/payments/all`,


  // Transaction history
  // customer
  CUSTOMER_TRANSACTION: `${URL}/customers/history`,
  // employee + admin : one
  TRANSACTION_HISTORY: `${URL}/employees/history/customer`,
  // admin : (foreign one)
  FOREIGN_ONE: `${URL}/employees/history/foreign/one`,
  // admin : (foreign all)
  FOREIGN_ALL: `${URL}/employees/history/foreign/all`,


  // Payment
  RECHARGE_ACCOUNT: `${URL}/payments/add-money`,
  CREATE_NEW_SAVE_ACCOUNT: `${URL}/payments/save-account`,
  CREATE_A_CUSTOMER: `${URL}/customers`,

  // admin management
  GET_LIST_ADMIN: `${URL}/employees`,
  CREATE_NEW_ADMIN: `${URL}/employees`,
  DELETE_ADMIN: `${URL}/employees`,
  UPDATE_ADMIN: `${URL}/employees/update/name`,
  RESET_PASS_ADMIN: `${URL}/employees/update/password`,

  // forgot password 
  SEND_MAIL_FORGOT_PASSWORD: `${URL}/forgot/send`,
  VERIFY_OTP_FORGOT: `${URL}/forgot/verify`,
  RESET_PASSWORD: `${URL}/forgot/change`,

  // debt reminder
  CREATE_NEW_DEBT_REMINDER: `${URL}/debt-reminders/create`,
  GET_ALL_DEBT_REMINDER: `${URL}/debt-reminders/view`,
  DELETE_DEBT_REMINDER: `${URL}/debt-reminders/delete-debt`,

};

export default API;
