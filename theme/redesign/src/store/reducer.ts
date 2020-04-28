import * as Types from './types';

import { ActionInterface, StoreInterface } from 'interfaces';

const initialState: StoreInterface = {
  wisdoms: null,
  firstWisdomId: '',
  wisdomsMap: {
    prev: null,
    current: null,
    next: null,
  },
  isLoading: false,
  steps: 0,
  shouldRedirect: false,
  homeAnimationCompleted: false,
  homePageMessages: {
    1: 'это птица?',
    3: 'это самолет?',
    5: 'это #titaniumWisdom!',
  },
};

const Store = (state = initialState, action: ActionInterface): StoreInterface => {
  switch (action.type) {
    case Types.FETCH_WISDOMS:
      return {
        ...state,
        wisdoms: action.payload,
      };
    case Types.SET_ISLOADING:
      return {
        ...state,
        isLoading: true,
      };
    case Types.INCREMENT_STEPS:
      if (state.steps === 5) {
        return {
          ...state,
          homeAnimationCompleted: true,
        };
      }
      return {
        ...state,
        steps: state.steps + 1,
      };
    case Types.RESET_STEPS:
      return {
        ...state,
        steps: 0,
        homeAnimationCompleted: false,
      };
    case Types.RESET_REDIRECT:
      return {
        ...state,
        shouldRedirect: false,
      };
    case Types.SET_FIRST_WISDOM:
      return {
        ...state,
        firstWisdomId: state.wisdoms?.[0].id.toString(),
      };
    case Types.SET_SELECTED_WISDOM:
      const { wisdoms: w } = state;

      if (w) {
        const currentLength = w.length - 1;
        const current = w.findIndex(el => el.id.toString() === action.payload);
        let prev = current <= 0 ? w[currentLength] : w[current - 1];
        let next = current >= currentLength ? w[0] : w[current + 1];

        if (current === -1) {
          return {
            ...state,
            shouldRedirect: true,
            wisdomsMap: {
              prev: null,
              current: null,
              next: null,
            },
            isLoading: false,
          };
        }

        return {
          ...state,
          shouldRedirect: current === -1 ? true : false,
          wisdomsMap: {
            ...state.wisdomsMap,
            current: current === -1 ? null : w[current],
            prev,
            next,
          },
          isLoading: false,
        };
      }
      return state;
    default:
      return state;
  }
};

export default Store;
