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

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />} >
    <Route path='/home' element={<Home />} />
    <Route path='/user/profile' element={<Profile />} />
    <Route path='/user/create' element={<Create />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/signin' element={<SignIn />} />
    <Route path='/signup' element={<SignUp />} />
    <Route path='/forgetpassword' element={<ForgetPassword />} />
  </Route>
))
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,
)
