import React from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarBuilder from '../components/avatar/AvatarBuilder';
import { mockUserData } from '../data/mockData';

const AvatarSetupPage = () => {
  const navigate = useNavigate();

  const handleSave = (config) => {
    // In a real app, save to backend here
    console.log("Saving config:", config);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-piggy-bg p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full mb-8 text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-piggy-teal to-piggy-blue mb-4">
          PiggyPath Avatar Creator
        </h1>
        <p className="text-gray-400">Customize your character before you start your journey.</p>
      </div>
      
      <AvatarBuilder initialConfig={mockUserData.avatarConfig} onSave={handleSave} />
    </div>
  );
};

export default AvatarSetupPage;
