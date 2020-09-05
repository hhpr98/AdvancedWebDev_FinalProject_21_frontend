import fetch from 'cross-fetch';
import API from '../../Services/API';
import URL from '../../Services/URL';

export const getAllPartners = (token) => {
  return fetch(API.GET_ALL_PARTNERS, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
    
};

export const transferToPartner = (token, partner_id, to_number, amount, description, type_fee) => {
  return fetch(`${URL}/partner/transfer/${Number(partner_id)}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      to: Number(to_number),
      amount: Number(amount),
      description: description,
      type: Number(type_fee)
    })
  })
}

export const getAllReceivers = (token) => {
  return fetch(API.GET_ALL_RECEIVER, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  })
}

export const sendCustomerOTP = (token) => {
  return fetch(API.SEND_OTP, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  })
}

export const verifyCustomerOTP = (token, code) => {
  return fetch(API.VERIFY_OTP, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      code: code
    })
  })
}

export const transferInLocal = (token, to_number, amount, description, type) =>{
  return fetch(API.TRANSFER_IN_LOCAL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      receivernumber: to_number,
      amount: Number(amount),
      description: description,
      type: String(type)
    })
  })
}

export const getAccountInfo = (token, partner_id, account_number) => {
  return fetch(`${URL}/partner/info/${Number(partner_id)}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      stk: account_number,
    })
  })
}

export const getLocalAccountInfo = (token, account_number) => {
  return fetch(API.GET_LOCAL_ACC_INFO, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      accountnumber: account_number,
    })
  })
}