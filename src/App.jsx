import React from 'react';
import PLBAuthGuard from './pages/admin/PLBAuthGuard';
import PLBBuilder from './pages/admin/PLBBuilder';

function App() {
  return (
    <PLBAuthGuard>
      <PLBBuilder />
    </PLBAuthGuard>
  );
}

export default App;
