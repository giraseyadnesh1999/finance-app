import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';

/* ── Code splitting: lazy-load the page ───────────────── */
const TransactionsPage = lazy(() => import('./pages/TransactionsPage'));

function LoadingFallback() {
  return (
    <div className="page-loading">
      <div className="page-loading-spinner" />
      <p>Loading…</p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <TransactionsPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
