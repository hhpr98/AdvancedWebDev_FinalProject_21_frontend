import fetch from 'cross-fetch';
import API from '../../../../Services/API';

export const checkInfoMomoPayment = cb => {
    return fetch(API.GET_ALL_PAYMENT, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(res => {
            if (!res.length) {
                cb(false);
            } else {
                cb(res);
            }
        })
        .catch(error => {
            console.log(error);
            cb(false, 'Lỗi Mạng');
        })
        .finally(() => { });
};

export const updateStatusPayment = (data, cb) => {
    return fetch(API.UPDATE_STATUS_PAYMENT, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
        .then(response => response.json())
        .then(res => {
            if (!res.status) {
                cb(false);
            } else {
                cb(res);
            }
        })
        .catch(error => {
            console.log(error);
            cb(false, 'Lỗi Mạng');
        })
        .finally(() => { });
};
