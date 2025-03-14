import * as Yup from 'yup';

export default Yup.object().shape({
  username: Yup.string()
    .required('Обязательное поле')
    .min(3, 'Не менее 3 символов')
    .max(10, 'Не более 10 символов'),
  password: Yup.string()
    .required('Обязательное поле')
    .min(5, 'Пароль не менее 5 символов')
    .max(15, 'Пароль не более 15 символов'),
  confirmPassword: Yup.string()
    .required('Обязательное поле')
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});
