import React from 'react';
import { Link } from 'react-router-dom';
import CustomLink from 'components/Link';

import 'assets/styles/containers/Navigation.scss';

const Navigation = () => (
  <div className="navigation-wrapper">
    <div className="navigation-overlay"></div>
    <div className="navigation-content">
      <Link to="/home" className="navigation-title">
        #titaniumwisdom
      </Link>
      <div className="navigation-controls">
        <CustomLink to="https://github.com/AlexanderC/nakla.fun/graphs/contributors" blank>
          Лица
        </CustomLink>
        <CustomLink to="https://github.com/AlexanderC/nakla.fun/issues/new" blank>
          Хочу Добавить!
        </CustomLink>
      </div>
    </div>
  </div>
);

export default Navigation;
