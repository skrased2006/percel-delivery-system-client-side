import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Authprovider from './context/Authprovider.jsx'

// Initialize AOS
AOS.init()

// ✅ Initialize Query Client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-10/12 mx-auto'>
      {/* ✅ Fix here: Pass the client prop */}
      <QueryClientProvider client={queryClient}>
        <Authprovider>
          <RouterProvider router={router} />
        </Authprovider>
      </QueryClientProvider>
    </div>
  </StrictMode>
)
