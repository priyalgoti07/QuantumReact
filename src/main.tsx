import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from "../src/Layout.tsx"
import SignIn from './components/SingIn.tsx'
import SignUp from './components/SingUp.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store.ts'
import Home from './components/Home.tsx'
import Dashboard from './components/Dashboard.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import ForgetPassword from './components/ForgetPassword.tsx'
import Profile from './components/user/Profile.tsx'
import Create from './components/user/Create.tsx'
import ListUser from './components/user/ListUser.tsx'
import EditUser from './components/user/EditUser.tsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx'
import NotFound from './components/NotFound.tsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx'
import InfiniteScrollBar from './components/InfiniteScroll/InfiniteScrollBar.tsx'
import UserChat from './components/UserChat/UserChat.tsx'

const routes = [
  // Public Routes
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/forgetpassword', element: <ForgetPassword /> },

  // Protected Routes
  { path: '/home', element: <Home />, protected: true },
  { path: '/user/profile', element: <ErrorBoundary><Profile /></ErrorBoundary>, protected: true },
  { path: '/user/create', element: <Create />, protected: true },
  { path: '/user/signin', element: <SignIn /> },
  { path: '/user/list', element: <ListUser />, protected: true },
  { path: '/user/edit/:id', element: <EditUser />, protected: true },
  { path: '/infinite-scroll', element: <InfiniteScrollBar />, protected: true },
  { path: '/user-chat', element: <UserChat />, protected: true },

  // Catch-all route for 404 Not Found
  { path: '*', element: <NotFound /> }
];

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<Layout />}>
      {routes.filter(route => (route.path !== '*' && route.path !== '/signin' && route.path !== '/signup' && route.path !== '/forgetpassword')).map(({ path, element, protected: isProtected }) => (
        <Route
          key={path}
          path={path}
          element={isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element}
        />
      ))}
    </Route>

    <Route path="*" element={<NotFound />} /> {/* 404 Route outside Layout */}
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgetpassword" element={<ForgetPassword />} />
  </>

));
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,
)
