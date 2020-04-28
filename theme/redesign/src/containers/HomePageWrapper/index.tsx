import React from 'react';
import { useSelector } from 'react-redux';

import TextComponent from 'components/TextComponent';

import { StoreInterface } from 'interfaces';

const HomePageWrapper = () => {
  const { homePageMessages, steps } = useSelector((s: StoreInterface) => s);

  if (steps % 2 === 0) {
    return null;
  }

  return <TextComponent message={homePageMessages[steps]} classes={`step-${steps}`} />;
};

export default HomePageWrapper;
