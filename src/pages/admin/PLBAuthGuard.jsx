import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import Logo from '../../components/common/Logo';

const PLBAuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('plb_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded password for MVP
    if (password === 'piggyadmin2026') {
      localStorage.setItem('plb_admin_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (isChecking) return null;

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F4F4F5] dark:bg-[#18181B] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white dark:bg-[#27272A] rounded-2xl border-[4px] border-[#18181B] dark:border-white shadow-[8px_8px_0_#18181B] dark:shadow-[#FFFFFF] p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#8B5CF6] rounded-2xl border-[3px] border-[#18181B] flex items-center justify-center shadow-[4px_4px_0_#18181B]">
            <Lock size={32} className="text-white" strokeWidth={3} />
          </div>
        </div>
        <Logo className="text-3xl mb-2 justify-center" />
        <h1 className="text-2xl font-black text-[#18181B] dark:text-white mb-2">Lesson Builder (PLB)</h1>
        <p className="text-[#71717A] dark:text-[#A1A1AA] font-bold mb-8">Internal access only. Please enter the master password.</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="password" 
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="Enter password..."
            className="w-full px-4 py-3 rounded-xl border-[3px] border-[#18181B] dark:border-white bg-white dark:bg-[#18181B] text-[#18181B] dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-[#00E599]"
          />
          {error && <p className="text-red-500 font-bold text-sm text-left">{error}</p>}
          <button type="submit" className="w-full py-3 bg-[#00E599] text-[#18181B] font-black rounded-xl border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] hover:-translate-y-1 transition-transform">
            Unlock Builder
          </button>
        </form>
      </div>
    </div>
  );
};

export default PLBAuthGuard;
