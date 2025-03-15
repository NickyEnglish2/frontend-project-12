import * as Yup from 'yup';

export default Yup.object().shape({
  username: Yup.string()
    .required('Обязательное поле')
    .min(3, 'Не менее 3 символов')
    .max(20, 'Не более 20 символов'),
  password: Yup.string()
    .required('Обязательное поле')
    .min(6, 'Пароль не менее 6 символов')
    .max(15, 'Пароль не более 15 символов'),
  confirmPassword: Yup.string()
    .required('Обязательное поле')
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});
