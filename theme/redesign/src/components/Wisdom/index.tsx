import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from 'components/Spinner';
import Row from 'components/WisdomRow';
import { StoreInterface } from 'interfaces';

import 'assets/styles/components/Wisdom.scss';

const Wisdom = () => {
  const [animations, setAnimations] = useState({
    start: false,
    inProgress: false,
    finished: false,
  });
  const [classes, setClasses] = useState('animation-end');
  const {
    wisdoms,
    wisdomsMap: { current, next },
  } = useSelector((s: StoreInterface) => s);
  const history = useHistory();

  useEffect(() => {
    if (current && next) {
      if (animations.start) {
        setClasses('animation-start');
        setTimeout(() => {
          setAnimations({ ...animations, start: false, inProgress: true });
        }, 400);
      }

      if (animations.inProgress) {
        history.push(`/wisdoms/${next.id.toString()}`);
        setAnimations({ ...animations, inProgress: false, finished: true });
      }

      if (animations.finished) {
        setClasses('animation-end');
        setAnimations({ ...animations, finished: false });
      }
    }
  }, [animations, history, wisdoms, next, current]);

  const handleClick = () => {
    setAnimations({ ...animations, start: true });
  };

  if (current) {
    return (
      <div
        className={`wisdom ${classes}`}
        style={{
          backgroundImage: `url(${current.image})`,
        }}
      >
        <div className="wisdom-content">
          <div className="one-wisdom-wrapper" onClick={() => handleClick()}>
            <Row current={current.content} />
          </div>
        </div>
      </div>
    );
  }

  return <Spinner />;
};

export default Wisdom;
