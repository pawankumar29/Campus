
// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const PrivateRoute = (props) => {
//   const isAuthenticated = localStorage.getItem('isAuthenticated');
//   const {Component}=props;
//   return (
//       isAuthenticated === 'true'
//         ? <Component  />
//         : <Redirect to='#' />
//     )}
  



// export default PrivateRoute;

// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = localStorage.getItem('isAuthenticated');
//   return (
//     <Route {...rest} render={(props) => (
//       isAuthenticated === 'true'
//         ? <Component {...props} />
//         : <Redirect to='#' />
//     )} />
//   );
// };

// export default PrivateRoute;


import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  console.log("is--->",isAuthenticated);
  return (
    <Route {...rest} element={(
      isAuthenticated === 'true'
        ? <Component />
        : <Navigate to='/Login' replace />
    )} />
  );
};

export default PrivateRoute;

