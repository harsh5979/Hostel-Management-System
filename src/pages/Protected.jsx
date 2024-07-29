
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/contextapi';

// const Privated = ({ element: Component }) => {
    
//   const { islogin } = useAuth();

//   return islogin ? Component : <Navigate to="/adminlogin" />;
// };

// export default Privated;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/contextapi';

const Privated = ({ element: Component, adminOnly = false }) => {
  const { islogin, user } = useAuth();

  if (!islogin) {
    return <Navigate to="/adminlogin" />;
  } 

  if (adminOnly && (!user || !user.isadmin)) {
    return <Navigate to="*" />;
  }

  return Component;
};

export default Privated;
