import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from "../src/Layout.tsx"
import SignIn from './components/SingIn.tsx'
import SignUp from './components/SingUp.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import Header from './components/Header.tsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />} >

    <Route path='/home' element={<Header />} />
    <Route path='/signin' element={<SignIn />} />
    <Route path='/signup' element={<SignUp />} />
  </Route>
))
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
