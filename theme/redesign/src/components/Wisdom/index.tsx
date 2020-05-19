import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from 'components/Spinner';
import Row from 'components/WisdomRow';
import { StoreInterface } from 'interfaces';

import 'assets/styles/components/Wisdom.scss';

const BASE_IMAGE_URL = 'https://raw.githubusercontent.com/AlexanderC/nakla.fun/master/stories/images/';

const Wisdom = () => {
  const [animations, setAnimations] = useState({
    start: false,
    inProgress: false,
    finished: false,
  });
  const [classes, setClasses] = useState('animation-end');
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const {
    wisdoms,
    wisdomsMap: { current, next, prev },
  } = useSelector((s: StoreInterface) => s);
  const history = useHistory();

  const handleChangeWisdom = (direction: 'prev' | 'next') => {
    setDirection(direction);
    setAnimations({ ...animations, start: true });
  };

  useEffect(() => {
    const changeWisdom = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') {
        handleChangeWisdom('prev');
      }
      if (e.code === 'ArrowRight') {
        handleChangeWisdom('next');
      }
    };
    document.addEventListener('keydown', changeWisdom);
    return () => document.removeEventListener('keydown', changeWisdom);
  });

  useEffect(() => {
    if (current && next && prev) {
      const isPrev = direction === 'prev';

      if (animations.start) {
        setClasses(`animation-start-${isPrev ? 'prev' : 'next'}`);
        setTimeout(() => {
          setAnimations({ ...animations, start: false, inProgress: true });
        }, 400);
      }

      if (animations.inProgress) {
        history.push(`/wisdoms/${isPrev ? prev.id.toString() : next.id.toString()}`);
        setAnimations({ ...animations, inProgress: false, finished: true });
      }

      if (animations.finished) {
        setClasses(`animation-end-${isPrev ? 'prev' : 'next'}`);
        setAnimations({ ...animations, finished: false });
      }
    }
  }, [animations, history, wisdoms, next, current, direction, prev]);

  if (current) {
    return (
      <div
        className={`wisdom ${classes}`}
        style={{
          backgroundImage: `url(${BASE_IMAGE_URL}${current.image.replace(' ', '%20')})`,
        }}
      >
        <div className="black-filter">
          <div
            className="wisdom-content"
            onClick={e => handleChangeWisdom(e.clientX < window.innerWidth / 2 ? 'prev' : 'next')}
          >
            <div className="one-wisdom-wrapper">
              <Row current={current.content} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Spinner />;
};

export default Wisdom;
