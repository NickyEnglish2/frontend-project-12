/* eslint-disable react/function-component-definition */

import { I18nextProvider } from 'react-i18next';
import { Provider, ErrorBoundary } from '@rollbar/react';
import AppRouter from './AppRouter.jsx';
import i18n from './i18n.js';
import { addRussianDictionary } from './utilities/censorText.js';

function App() {
  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  addRussianDictionary('ru');

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n} defaultNS="translation">
          <AppRouter />
        </I18nextProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
