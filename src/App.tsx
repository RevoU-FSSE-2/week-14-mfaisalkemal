import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PublicLayout } from './layouts'
import { LoginPage, RegisterPage, ListPage, AddCategoryPage, EditCategoryPage } from './pages'
import AppProvider from './Provider/AppProvider'

function App() {
  const router = createBrowserRouter([
    {
      element: <PublicLayout />,
      children: [
        {
          path: '/',
          element: <LoginPage />
        },
        {
          path: '/login',
          element: <LoginPage />
        },
        {
          path: '/register',
          element: <RegisterPage />
        },
        {
          path: '/list',
          element: <ListPage />
        },
        {
          path: '/add',
          element: <AddCategoryPage />
        },
        {
          path: '/edit/:id',
          element: <EditCategoryPage />
        },
      ]
    }
  ])

  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App