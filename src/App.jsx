import React from 'react';
import { ContextProvider } from './context/crypto-context';
import AppLayout from './components/layout/AppLayout';

function App() {
  return (
    
    <ContextProvider>
      <AppLayout />
    </ContextProvider>
  )
}

export default App
