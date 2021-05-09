/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { myPadStart, chunker } from '../../../tools';

import './style.scss';

const CardDetails = ({ number, name, expiresMonth }) => {
   return (
      <section className="card-details">
         <div className="card-details-row">
            <div>
               <span style={{ fontSize: 20 }}>Số Tài khoản</span>
               <p className="big">{number}</p>
            </div>
         </div>

         <div className="card-details-row card-details-row-1-2">
            <div>
               <span style={{ fontSize: 16 }}>Chủ thẻ</span>
               <p style={{ fontSize: 16 }}>{name || "Khách hàng"}</p>
            </div>
            <div>
               <span style={{ fontSize: 16 }}>Ngày cấp</span>
               <p style={{ fontSize: 16 }}>
                  {moment(expiresMonth).format("L")}
               </p>
            </div>
         </div>
      </section>
   );
};

CardDetails.propTypes = {
   number: PropTypes.string,
   expiresMonth: PropTypes.string,
};

export default CardDetails;
