import React from 'react';

import { TextComponentInterface } from 'interfaces';

import 'assets/styles/components/TextComponents.scss';

const TextComponent = ({ message, classes }: TextComponentInterface) => (
  <div className={`main-text ${classes}`}>{message}</div>
);

export default TextComponent;
