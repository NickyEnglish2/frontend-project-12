import * as Yup from 'yup';

export default (t) => Yup.object().shape({
  username: Yup.string()
    .required(t('validation.login.username.required')),
  password: Yup.string()
    .required(t('validation.login.password.required')),
});
