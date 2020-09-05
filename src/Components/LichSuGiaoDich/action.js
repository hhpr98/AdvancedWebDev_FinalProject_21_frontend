import Swal from "sweetalert2";
import API from '../../Services/API';

export const getCustomerTransactionForEmployee = (token, accountnumber, callBack) => {
    return fetch(API.TRANSACTION_HISTORY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`
        },
        body: `accountnumber=${accountnumber}`,
    })
        .then(response => response.json())
        .then(res => {

            if (res.status === "success") {
                Swal.fire('Thành công', "Tra cứu thành công", 'success');
                callBack(res.data);
            } else {
                // Swal.fire('Response status', res.status, 'error');
                res.err === "account number is not exists." ? Swal.fire("Lỗi!", "Tài khoản không tồn tại.", "error") : Swal.fire('Response err', res.err, 'error');
                callBack(false);
            }
        })
        .catch(error => {
            Swal.fire('Thông báo', error.message, 'error');
            callBack(false);
        });
};