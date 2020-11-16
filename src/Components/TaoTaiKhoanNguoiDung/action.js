import API from '../../Services/API';

export const createANewCustomer = (token, name, email, phone, address, password) => {
    return fetch(API.CREATE_A_CUSTOMER, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phonenumber: phone,
            address: address,
            password: password
        })
    })
};