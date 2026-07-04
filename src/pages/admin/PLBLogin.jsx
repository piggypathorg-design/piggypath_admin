import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, User, Loader2 } from 'lucide-react';
import Logo from '../../components/common/Logo';
import { loginUser } from '../../utils/api';

const PLBLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const user = await loginUser(username, password);
      if (user) {
        localStorage.setItem('plb_user_v2', JSON.stringify(user));
        setError('');
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E4E4E7] flex items-center justify-center p-6 font-sans relative overflow-hidden selection:bg-[#00E599] selection:text-black">
      {/* Decorative Neo-Brutalist shapes in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#8B5CF6] border-[4px] border-black rounded-full opacity-20"></div>
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-[#FFD100] border-[4px] border-black transform rotate-12 opacity-30"></div>
        <div className="absolute bottom-10 left-1/4 w-48 h-48 bg-[#00E599] border-[4px] border-black rounded-3xl transform -rotate-6 opacity-20"></div>
      </div>

      {/* Neo-Brutalist Login Card */}
      <div className="max-w-md w-full bg-white border-[4px] border-black shadow-[12px_12px_0_0_#000] rounded-[2rem] p-10 text-center relative z-10">
        
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#8B5CF6] rounded-2xl border-[3px] border-black flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] transition-all">
            <Lock size={32} className="text-white" strokeWidth={3} />
          </div>
        </div>
        
        <div className="flex justify-center mb-4">
           <Logo className="text-4xl text-black" />
        </div>
        <h1 className="text-3xl font-black text-black mb-2 tracking-tight">Welcome Back</h1>
        <p className="text-gray-500 font-bold mb-8 text-sm">Sign in to access the PiggyPath Builder</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black">
              <User size={20} strokeWidth={3} />
            </div>
            <input 
              type="text" 
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              placeholder="Username"
              required
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-[3px] border-black bg-white text-black placeholder-gray-400 font-bold focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0_0_#000] focus:-translate-y-1 transition-all"
            />
          </div>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black">
              <Lock size={20} strokeWidth={3} />
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Password"
              required
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-[3px] border-black bg-white text-black placeholder-gray-400 font-bold focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0_0_#000] focus:-translate-y-1 transition-all"
            />
          </div>
          
          {error && (
            <div className="bg-[#FF6B6B] border-[3px] border-black text-white font-black text-sm py-3 rounded-xl text-center shadow-[4px_4px_0_0_#000] animate-in slide-in-from-top-2">
              {error}
            </div>
          )}
          
          <button disabled={isLoading} type="submit" className="w-full mt-4 py-4 bg-[#00E599] hover:bg-[#00D68F] text-black font-black rounded-2xl border-[3px] border-black shadow-[6px_6px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? 'Signing In...' : 'Sign In'} 
            {isLoading ? <Loader2 size={20} className="animate-spin text-black" /> : <ArrowRight size={20} strokeWidth={3} className="text-black" />}
          </button>
        </form>

      </div>
    </div>
  );
};

export default PLBLogin;
