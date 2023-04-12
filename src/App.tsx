import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ReduxProvider } from './redux/store';

const App = () => {
  return (
    <ReduxProvider>
      <RouterProvider router={router} />
    </ReduxProvider>
  );
};

export default App;
