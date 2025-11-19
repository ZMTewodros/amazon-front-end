import React from 'react';
import classes from './Layout.module.css';
import Header from '../Header/Header';
import LowerHeader from '../Header/LowerHeader';


function Layout( ) {
  return (
    <>
    <div className={classes.fixed}>
      <Header />
      <LowerHeader />
      </div>
      
      </>
    
  );
}

export default Layout;

