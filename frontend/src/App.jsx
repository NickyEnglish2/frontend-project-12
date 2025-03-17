import AppRouter from './AppRouter.jsx';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.js';
import { addRussianDictionary } from './utilities/censorText.js';

function App() {
  addRussianDictionary('ru');

  return (
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <AppRouter />
    </I18nextProvider>
  )
}

export default App
