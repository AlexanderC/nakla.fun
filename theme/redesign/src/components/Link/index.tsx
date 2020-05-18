import React from 'react';

import { LinkInterface } from 'interfaces';

import 'assets/styles/components/Link.scss';

const Link = ({ to, children, blank }: LinkInterface) => (
  <a href={to} target={blank ? '_blank' : undefined} className="nav-link">
    {children}
  </a>
);

export default Link;
