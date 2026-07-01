import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import Logo from '../../components/common/Logo';
import { loginUser } from '../../utils/mockDatabase';

const PLBLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const user = localStorage.getItem('plb_current_user');
    if (user) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = loginUser(username, password);
    
    if (user) {
      localStorage.setItem('plb_current_user', JSON.stringify(user));
      setError('');
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] dark:bg-[#18181B] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#8B5CF6] blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#00E599] blur-[100px]"></div>
      </div>

      <div className="max-w-md w-full bg-white dark:bg-[#27272A] rounded-2xl border-[4px] border-[#18181B] dark:border-white shadow-[8px_8px_0_#18181B] dark:shadow-[#FFFFFF] p-8 text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#8B5CF6] rounded-2xl border-[3px] border-[#18181B] flex items-center justify-center shadow-[4px_4px_0_#18181B]">
            <Lock size={32} className="text-white" strokeWidth={3} />
          </div>
        </div>
        <Logo className="text-3xl mb-2 justify-center" />
        <h1 className="text-2xl font-black text-[#18181B] dark:text-white mb-2">Developer Login</h1>
        <p className="text-[#71717A] dark:text-[#A1A1AA] font-bold mb-8">Access the PiggyPath Lesson Builder</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User size={20} className="text-[#A1A1AA]" />
            </div>
            <input 
              type="text" 
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              placeholder="Username"
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border-[3px] border-[#18181B] dark:border-white bg-[#F4F4F5] dark:bg-[#18181B] text-[#18181B] dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-[#00E599] transition-all"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={20} className="text-[#A1A1AA]" />
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Password"
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border-[3px] border-[#18181B] dark:border-white bg-[#F4F4F5] dark:bg-[#18181B] text-[#18181B] dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-[#00E599] transition-all"
            />
          </div>
          
          {error && <p className="text-red-500 font-bold text-sm text-center">{error}</p>}
          
          <button type="submit" className="w-full mt-2 py-3 bg-[#00E599] text-[#18181B] font-black rounded-xl border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B] transition-all flex justify-center items-center gap-2">
            Sign In
          </button>
        </form>

        <div className="mt-6 pt-6 border-t-2 border-dashed border-[#E4E4E7] dark:border-[#3F3F46]">
          <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] font-semibold">
            Test Accounts:<br/>
            dev1 / password<br/>
            dev2 / password
          </p>
        </div>
      </div>
    </div>
  );
};

export default PLBLogin;
