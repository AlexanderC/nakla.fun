import React, { useEffect } from 'react';
import { Route, useHistory, Redirect, Switch, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import WisdomWrapper from 'containers/WisdomWrapper';
import HomePageWrapper from 'containers/HomePageWrapper';
import Page404 from 'components/Page404';
import Spinner from 'components/Spinner';

import { incrementSteps, resetSteps, setFirstWisdom, fetchWisdoms } from 'store/actions';

import { StoreInterface } from 'interfaces';
import { getWisdoms } from 'api';
import DummyWisdoms from 'fallback-data/wisdoms.json';

import 'assets/styles/containers/App.scss';

const App = () => {
  const { wisdoms, steps, firstWisdomId, homeAnimationCompleted } = useSelector(
    (s: StoreInterface) => s
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!wisdoms) {
      getWisdoms()
        .then(res => {
          dispatch(fetchWisdoms(res));
        })
        .catch(err => {
          console.log(err);
          dispatch(fetchWisdoms(DummyWisdoms));
        });
    }
    if (wisdoms) {
      dispatch(setFirstWisdom());
    }
  }, [dispatch, wisdoms]);

  useEffect(() => {
    if (location.pathname === '/home') {
      const interval = steps % 2 === 0 ? 200 : 2000;
      if (!homeAnimationCompleted) {
        setTimeout(() => {
          dispatch(incrementSteps());
        }, interval);
      }
    }
  }, [dispatch, homeAnimationCompleted, location.pathname, steps]);

  useEffect(() => {
    if (homeAnimationCompleted) {
      history.push(`/wisdoms/${firstWisdomId}`);
      dispatch(resetSteps());
    }
  }, [dispatch, firstWisdomId, history, homeAnimationCompleted]);

  if (wisdoms) {
    return (
      <div className="app-root full-screen flex-centered">
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home">
            <HomePageWrapper />
          </Route>
          <Route exact path="/wisdoms/:id">
            <WisdomWrapper />
          </Route>
          <Route path="/404" component={Page404} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
    );
  }

  return <Spinner />;
};

export default App;
