import fetch from 'cross-fetch';
import API from '../../Services/API';

export const getAllPayments = cb => {
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

export const getAllPaymentReport = () => {
    return fetch(API.GET_ALL_PAYMENT_REPORT, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(res => {
            if (!res.length) {
                return false;
            }
            return res;

        })
        .catch(error => {
            console.log(error);
            return false;
        })
        .finally(() => { });
};

export const countAllPayments = cb => {
    return fetch(API.COUNT_PAYMENTS, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(res => {
            if (!Number.isInteger(res)) {
                cb(false);
            } else {
                cb(res);
            }
        })
        .catch(error => {
            cb(false, 'Lỗi Mạng');
        })
        .finally(() => { });
};

export const countSucceededPayments = cb => {
    return fetch(API.COUNT_SUCCEEDED_PAYMENTS, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(res => {
            if (!Number.isInteger(res)) {
                cb(false);
            } else {
                cb(res);
            }
        })
        .catch(error => {
            cb(false, 'Lỗi Mạng');
        })
        .finally(() => { });
};

export const countFailedPayments = cb => {
    return fetch(API.COUNT_FAILED_PAYMENTS, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(res => {
            if (!Number.isInteger(res)) {
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

export const countTodayPayments = cb => {
    return fetch(API.COUNT_TODAY_PAYMENTS, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(res => {
            if (!Number.isInteger(res)) {
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

export const statisticTypePayment = cb => {
    return fetch(API.STATISTIC_TYPE_PAYMENT, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(res => {
            if (!res.data.length) {
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

export const setAdminResolved = (id, adminResolved) => {
    return fetch(API.SET_ADMIN_RESOLVED_PAYMENT_REPORT(id), {
        method: 'POST',
        body: `adminResolved=${adminResolved}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.json())
        .then(res => {
            if (res)
                return res;
            return false;
        })
        .catch(error => {
            console.log(error);
            return false;
        });
};