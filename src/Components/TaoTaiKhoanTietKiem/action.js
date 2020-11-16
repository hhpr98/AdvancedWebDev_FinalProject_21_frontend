import API from '../../Services/API';

export const createNewSaveAccount = (token, email, balance, expired, rate) => {
    return fetch(API.CREATE_NEW_SAVE_ACCOUNT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            email: email,
            balance: Number(balance),
            expired: Number(expired),
            rate: Number(rate)
        })
    })
};