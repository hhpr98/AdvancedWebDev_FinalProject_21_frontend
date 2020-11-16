import API from '../../Services/API';

export const getForeignTransactionOne = (token, dateFrom, dateTo, bankId) => {
    return fetch(API.FOREIGN_ONE, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            from: dateFrom,
            to: dateTo,
            bankid: Number(bankId)
        })
    })
};

export const getForeignTransactionAll = (token, dateFrom, dateTo) => {
    return fetch(API.FOREIGN_ALL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            from: dateFrom,
            to: dateTo
        })
    })
};