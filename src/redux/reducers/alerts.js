import React from 'react';

export const PUSH_ALERT = 'PUSH_ALERT';
export const SHIFT_ALERT = 'SHIFT_ALERT';

export default function (state = [], action) {
  switch (action.type) {
    case PUSH_ALERT: {
      const { component } = action;
      const key = state.length + 1;

      return [
        ...state,
        React.cloneElement(component, { key }),
      ];
    }

    case SHIFT_ALERT: {
      return state.slice(1);
    }

    default: break;
  }

  return state;
}
