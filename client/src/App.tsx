import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignIn from './components/Forms/SignIn';
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: '/signin',
    Component: SignIn,
  },
  {
    path: '/',
    Component: Home,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
