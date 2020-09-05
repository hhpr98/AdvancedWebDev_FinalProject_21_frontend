import Swal from "sweetalert2";
import API from '../../Services/API';

export const addMoneyForCustomer = (token, accNo, amount) => {
    // Swal.fire("Account number", accNo, "info");
    return fetch(API.RECHARGE_ACCOUNT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            accountnumber: accNo,
            amount
        })
    });
};