import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { resetRedirect } from 'store/actions';

import 'assets/styles/components/404.scss';

const Page404 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetRedirect());
  }, [dispatch]);

  return (
    <div className="page-404-wrapper">
      <div className="title">404</div>
      <div className="subtitle">Page not found</div>
      <Link to="/home" className="link-not-found">
        Home
      </Link>
    </div>
  );
};

export default Page404;
