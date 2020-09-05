/* eslint-disable react/jsx-props-no-spreading */
// follow https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71

import React from 'react';
import { Route } from 'react-router-dom';

export const PublicRoute = ({
  component: Component,
  render,
  location,
  ...rest
}) => {
  const redirectBack = location.from || '/';
  const linkTo = pathname => ({ pathname, from: location.pathname });
  return (
    <Route
      {...rest}
      render={props => {

        if (render) return render({ ...props, linkTo, redirectBack });
        return <Component {...{ ...props, linkTo, redirectBack }} />;
      }}
    />
  );
};
