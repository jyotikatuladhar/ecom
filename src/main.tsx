import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css';
import '@/styles/global.css'
import '@/styles/theme.css';
import { store } from '@/app/store.ts'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from "./router.tsx";
import { AntdProvider } from './app/providers/AntdProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} >
      <AntdProvider>
        <RouterProvider router={router} />
      </AntdProvider>
    </Provider>
  </StrictMode>,
)
