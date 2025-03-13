import * as Yup from 'yup';

export default Yup.object().shape({
  username: Yup.string()
    .required('Обязательное поле'),
  password: Yup.string()
    .required('Обязательное поле'),
});
