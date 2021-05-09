/* eslint-disable import/no-duplicates */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import cardChipImg from './card-chip.png';
import visaImg from './visa-logo.png';

const CardLogos = props => {
   const cardType = props.type;

   return (
      <section className="card-logos">
         <img src={cardChipImg} alt="Credit card chip" />
         {
            cardType === 'visa' ? (<img src={visaImg} alt="Credit card logo" />):(
               <div/>
            )
         }
         
      </section>
   );
};

CardLogos.propTypes = {
   type: PropTypes.string
};

export default CardLogos;
