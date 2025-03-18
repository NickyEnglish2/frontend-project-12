import AppRouter from './AppRouter.jsx';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18n from './i18n.js';
import { addRussianDictionary } from './utilities/censorText.js';

function App() {
  const rollbarConfig = {
    accessToken: '743b0215789b48bf9c556dc5aa87c9ce',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  addRussianDictionary('ru');

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n} defaultNS={'translation'}>
          <AppRouter />
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  )
}

export default App
