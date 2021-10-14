import { PUSH_ALERT } from '@ppl/redux/reducers/alerts';

export default function pushAlert(component) {
  return {
    type: PUSH_ALERT,
    component,
  };
}
