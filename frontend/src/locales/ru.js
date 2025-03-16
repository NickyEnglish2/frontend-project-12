export default {
  translation: {
    loginPage: {
      title: 'Войти',
      placeholder: {
        username: 'Ник пользователя',
        password: 'Пароль',
      },
      button: {
        enter: 'Войти',
        loading: 'Загрузка...',
      },
      footer: {
        noAccount: 'Нет аккаунта?',
        signUp: 'Зарегистрироваться',
      },
    },
    signUpPage: {
      title: 'Регистрация',
      nameInput: {
        label: 'Имя пользователя',
        placeholder: 'Введите имя пользователя',
      },
      passwordInput: {
        label: 'Пароль',
        placeholder: 'Введите пароль',
      },
      confirmPasswordInput: {
        label: 'Подтвердите пароль',
        placeholder: 'Подтвердите пароль',
      },
      button: {
        loading: 'Загрузка...',
        signUp: 'Зарегистрироваться',
        back: 'Назад',
      },
    },
    validation: {
      signUp: {
        username: {
          required: 'Обязательное поле',
          min: 'Не менее 3 символов',
          max: 'Не более 20 символов',
        },
        password: {
          required: 'Обязательное поле',
          min: 'Пароль не менее 6 символов',
          max: 'Пароль не более 15 символов',
        },
        confirmPassword: {
          required: 'Обязательное поле',
          oneOf: 'Пароли должны совпадать',
        },
      },
      login: {
        username: {
          required: 'Обязательное поле',
        },
        password: {
          required: 'Обязательное поле',
        },
      },
    },
    errors: {
      loginErr: 'Неправильный логин или пароль',
      signUpErr: 'Пользователь с таким ником уже существует',
    },
  },
};
