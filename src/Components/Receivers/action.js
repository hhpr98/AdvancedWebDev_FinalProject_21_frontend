import API from "../../Services/API"

export const getAllReceiver = (token) =>{
    return fetch(API.GET_ALL_RECEIVER, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })

  }

  export const editReceiver = (token, accountNumber, type, memorizeName) =>{
    return fetch(API.GET_ALL_RECEIVER, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
          accountnumber: accountNumber,
          type: type,
          memoryname: memorizeName
      })
    })
  }

  export const deleteReceiver = (token, accountNumber) =>{
    return fetch(API.GET_ALL_RECEIVER, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
          accountnumber: accountNumber
      })
    })
  }

  export const addReceiver = (token, accountNumber, memorizeName, type) =>{
    return fetch(API.GET_ALL_RECEIVER, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
          accountnumber: accountNumber,
          memoryname: memorizeName,
          type: type
      })
    })
  }