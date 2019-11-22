import { SUBMIT_FORM, VERIFY } from '../constants';

export const submitForm = payload => ({
  type: SUBMIT_FORM,
  payload
});

export const verify = payload => ({
  type: VERIFY,
  payload
});
