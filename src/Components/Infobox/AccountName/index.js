import React from 'react';

import './style.scss';

const AccountName = (props) => {
   const {accountName} = props;
   return (
      <section className="account-name">
         <h3 style={{color: 'red', fontSize: 22}}>{accountName || "Tài Khoản thanh toán"}</h3>
      </section>
   );
};

export default AccountName;
