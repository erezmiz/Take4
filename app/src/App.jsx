import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ProductPage from './pages/ProductPage';
import ChatPage from './pages/ChatPage';
import NewRequestPage from './pages/NewRequestPage';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'product', element: <ProductPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'new-request', element: <NewRequestPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
