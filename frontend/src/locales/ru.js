export default {
  translation: {
    loginPage: {
      title: 'Войти',
      placeholder: {
        username: 'Ваш ник',
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
        label: 'Пароль:',
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
    notFoundPage: {
      title: '404 - Страница не найдена',
      body1: 'Извините, запрашиваемая страница не существует. Возможно, она была удалена или перемещена.',
      body2: 'Вы можете вернуться на главную страницу, нажав на кнопку ниже.',
      backButton: 'Вернуться на главную',
    },
    header: {
      logoutBtn: 'Выйти',
    },
    mainPage: {
      channels: 'Каналы',
      addChannelBtn: 'Добавить канал',
      dropDown: {
        edit: 'Переименовать',
        delete: 'Удалить',
      },
      form: {
        placeholder: 'Введите сообщение...',
        sendBtn: 'Отправить',
      },
      messages: {
        messageCount_one: '{{count}} сообщение',
        messageCount_few: '{{count}} сообщения',
        messageCount_many: '{{count}} сообщений',
      },
    },
    confirmDeleteModal: {
      title: 'Удаление канала',
      body: 'Вы точно хотите удалить канал {{channelName}}?',
      btnYes: 'Да',
      btnNo: 'Нет',
    },
    addChannelModal: {
      validation: {
        required: 'Обязательное поле',
        min: 'Не менее 3 символов',
        max: 'Не более 20 символов',
        unique: 'Канал уже существует',
      },
      title: 'Добавить канал',
      placeholder: 'Введите название канала',
      submitBtn: 'Добавить',
      cancelBtn: 'Отменить',
    },
    editChannelModal: {
      validation: {
        required: 'Обязательное поле',
        min: 'Новое название не менее 3 символов',
        max: 'Новое название не более 20 символов',
        unique: 'Канал с таким именем уже существует',
      },
      title: 'Редактирование канала # {{channelName}}',
      placeholder: 'Введите новое название канала',
      cancelBtn: 'Отменить',
      saveBtn: 'Сохранить',
    },
    validation: {
      signUp: {
        username: {
          required: 'Обязательное поле',
          min: 'От 3 до 20 символов',
          max: 'От 3 до 20 символов',
        },
        password: {
          required: 'Обязательное поле',
          min: 'Не менее 6 символов',
          max: 'Не более 15 символов',
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
      loginErr: 'Неверные имя пользователя или пароль',
      signUpErr: 'Такой пользователь уже существует',
    },
    toasters: {
      networkErr: 'Ошибка соединения',
      networkRestored: 'Соединение восстановлено',
      newChannel: 'Канал создан',
      editedChannel: 'Канал переименован',
      deletedChannel: 'Канал удален',
    },
  },
};
