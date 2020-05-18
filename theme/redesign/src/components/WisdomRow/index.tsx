import React, { FC } from 'react';
import { WisdomInterface } from 'interfaces';

type wisdomContent = { wisdom: string; author: string };

type Props = {
  current: WisdomInterface['content'];
};

const Row: FC<Props> = ({ current }) => {
  return (
    <>
      {current.map((elem: wisdomContent) => {
        const onlyOneWisdom = current.length <= 1;
        const wisdomLength = elem.wisdom.length;
        const noAuthor = elem.author.length === 0 ? true : false;
        const classes = `wisdom-row ${onlyOneWisdom ? 'single' : ''} ${
          wisdomLength >= 70 ? 'small' : ''
        }`;

        return (
          <div className={classes} key={elem.wisdom}>
            <span>{elem.wisdom}</span>{' '}
            <p className={`wisdom-author ${noAuthor ? 'no-author' : ''}`}>{elem.author}</p>
          </div>
        );
      })}
    </>
  );
};

export default Row;
