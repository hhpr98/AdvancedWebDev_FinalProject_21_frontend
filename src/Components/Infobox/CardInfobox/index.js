/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import '../style.scss';
import './style.scss';

import CardLogos from '../CardLogos';
import CardDetails from '../CardDetails';
import AccountName from '../AccountName';
import AccountSummary from '../AccountSummary';

const CardInfobox = ({
   number,
   expiresMonth,
   balance,
   name,
   accountName
}) => {
   return (
      <section className="module infobox card-infobox">
         <header>
            <CardLogos type={accountName === 'Tài khoản thanh toán' ? "visa" : 'save'} />
            <CardDetails number={number} name={name} expiresMonth={expiresMonth} />
         </header>

         <AccountName accountName={accountName} />
         <AccountSummary balance={balance} income7Days={3500} expenses7Days={1500} />

      </section>
   );
};

CardInfobox.propTypes = {
   number: PropTypes.string,
   expiresMonth: PropTypes.string,
   expiresYear: PropTypes.number,
   balance: PropTypes.number,
   income7Days: PropTypes.number,
   expenses7Days: PropTypes.number,
   currentUrl: PropTypes.string
};

export default CardInfobox;
