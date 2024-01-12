import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Stocks from './pages/Stocks';
import Stock from './pages/Stock';
import Tickers from './pages/Tickers.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'Stocks',
        element: <Stocks />
      },
      {
        path: 'Stock/:symbol',
        element: <Stock />
      },
      {
        path: 'Tickers',
        element: <Tickers />
      },
      {
        path: '*', // This is a catch-all route
        element: <NotFound />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
