import AppRouter from './AppRouter.jsx';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.js';

function App() {
  return (
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <AppRouter />
    </I18nextProvider>
  )
}

export default App
