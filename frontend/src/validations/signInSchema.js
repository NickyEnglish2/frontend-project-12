import * as Yup from 'yup';

export default (t) => Yup.object().shape({
  username: Yup.string()
    .required(t('validation.signUp.username.required'))
    .min(3, t('validation.signUp.username.min'))
    .max(20, t('validation.signUp.username.max')),
  password: Yup.string()
    .required(t('validation.signUp.password.required'))
    .min(6, t('validation.signUp.password.min'))
    .max(15, t('validation.signUp.password.max')),
  confirmPassword: Yup.string()
    .required(t('validation.signUp.confirmPassword.required'))
    .oneOf([Yup.ref('password'), null], t('validation.signUp.confirmPassword.oneOf')),
});
