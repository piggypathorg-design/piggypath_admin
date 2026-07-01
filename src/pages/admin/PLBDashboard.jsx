import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, FileText, LayoutDashboard, Search, Clock, CheckCircle } from 'lucide-react';
import Logo from '../../components/common/Logo';
import { getLessons, createLesson } from '../../utils/mockDatabase';

const PLBDashboard = () => {
  const [lessons, setLessons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('');
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('plb_current_user') || '{}');

  useEffect(() => {
    setLessons(getLessons());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('plb_current_user');
    navigate('/login');
  };

  const handleCreateLesson = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCourse.trim()) return;

    const newLesson = createLesson(newTitle, newCourse, user.name || user.username);
    setLessons(getLessons());
    setShowModal(false);
    navigate(`/builder/${newLesson.id}`);
  };

  const openBuilder = (id) => {
    navigate(`/builder/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5] font-sans transition-colors selection:bg-[#00E599] selection:text-[#18181B]">
      {/* Top Navigation */}
      <nav className="h-20 bg-[#F4F4F5] dark:bg-[#18181B] border-b-[3px] border-[#18181B] dark:border-white flex items-center justify-between px-6 sticky top-0 z-40 transition-colors">
        <div className="flex items-center gap-4">
          <Logo className="text-2xl" />
          <span className="font-black text-sm bg-[#8B5CF6] text-white px-3 py-1 border-[3px] border-[#18181B] dark:border-white rounded-lg shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF]">Admin Dashboard</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-sm font-bold text-[#71717A] dark:text-[#A1A1AA]">
            Logged in as: <span className="text-[#18181B] dark:text-white">{user.name}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#27272A] hover:-translate-y-1 text-[#18181B] dark:text-white font-bold rounded-xl transition-transform border-[3px] border-[#18181B] dark:border-white shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF]"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
              <LayoutDashboard className="text-[#8B5CF6]" /> All Lessons
            </h2>
            <p className="text-[#71717A] dark:text-[#A1A1AA] font-bold">Manage your interactive lessons for PiggyPath</p>
          </div>
          
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#00E599] text-[#18181B] font-black rounded-xl border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B] transition-all"
          >
            <Plus size={20} strokeWidth={3} /> Create New Lesson
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-white rounded-2xl overflow-hidden shadow-[8px_8px_0_#18181B] dark:shadow-[#FFFFFF]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F4F4F5] dark:bg-[#18181B] border-b-[3px] border-[#18181B] dark:border-white">
                  <th className="p-5 font-black text-[#18181B] dark:text-white">Title</th>
                  <th className="p-5 font-black text-[#18181B] dark:text-white">Course</th>
                  <th className="p-5 font-black text-[#18181B] dark:text-white">Drafted By</th>
                  <th className="p-5 font-black text-[#18181B] dark:text-white">Status</th>
                  <th className="p-5 font-black text-[#18181B] dark:text-white">Pages</th>
                  <th className="p-5 font-black text-[#18181B] dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {lessons.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-[#71717A] dark:text-[#A1A1AA] font-bold">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <FileText size={48} className="opacity-50" />
                        <p>No lessons created yet. Click "Create New Lesson" to begin.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  lessons.map((lesson, index) => (
                    <tr key={lesson.id} className={`${index !== lessons.length - 1 ? 'border-b-[3px] border-[#E4E4E7] dark:border-[#3F3F46]' : ''} hover:bg-[#F4F4F5] dark:hover:bg-[#18181B] transition-colors`}>
                      <td className="p-5 font-bold">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 border-2 border-[#8B5CF6] flex items-center justify-center text-[#8B5CF6]">
                            <FileText size={16} />
                          </div>
                          {lesson.title}
                        </div>
                      </td>
                      <td className="p-5 font-bold text-[#71717A] dark:text-[#A1A1AA]">{lesson.course}</td>
                      <td className="p-5 font-bold text-[#71717A] dark:text-[#A1A1AA]">{lesson.draftedBy}</td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg border-[2px] font-black text-xs ${
                          lesson.status === 'Draft' ? 'bg-yellow-100 border-yellow-500 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                          'bg-[#00E599]/20 border-[#00E599] text-[#00E599]'
                        }`}>
                          {lesson.status === 'Draft' ? <Clock size={12} /> : <CheckCircle size={12} />}
                          {lesson.status}
                        </span>
                      </td>
                      <td className="p-5 font-black text-[#18181B] dark:text-white">{lesson.pagesCount || 1}</td>
                      <td className="p-5">
                        <button 
                          onClick={() => openBuilder(lesson.id)}
                          className="px-4 py-2 bg-[#8B5CF6] text-white font-black rounded-xl border-[3px] border-[#18181B] dark:border-[#8B5CF6] shadow-[4px_4px_0_#18181B] hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B] transition-all"
                        >
                          Edit Builder
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#18181B]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#27272A] border-[4px] border-[#18181B] dark:border-white shadow-[12px_12px_0_#18181B] dark:shadow-[#FFFFFF] rounded-2xl max-w-md w-full p-8 animate-in zoom-in duration-200">
            <h3 className="text-2xl font-black mb-2 text-[#18181B] dark:text-white">Create New Lesson</h3>
            <p className="text-[#71717A] dark:text-[#A1A1AA] font-bold mb-6">Set up the initial details for the lesson.</p>
            
            <form onSubmit={handleCreateLesson} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-black mb-2 text-[#18181B] dark:text-white">Lesson Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Introduction to Python"
                  className="w-full px-4 py-3 bg-[#F4F4F5] dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white rounded-xl text-[#18181B] dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-[#00E599]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-black mb-2 text-[#18181B] dark:text-white">Course Name</label>
                <input 
                  type="text" 
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  placeholder="e.g. CS101"
                  className="w-full px-4 py-3 bg-[#F4F4F5] dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white rounded-xl text-[#18181B] dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-[#00E599]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="py-3 bg-white dark:bg-[#27272A] text-[#18181B] dark:text-white font-black border-[3px] border-[#18181B] dark:border-white rounded-xl hover:-translate-y-1 hover:shadow-[4px_4px_0_#18181B] dark:hover:shadow-[#FFFFFF] transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="py-3 bg-[#00E599] text-[#18181B] font-black border-[3px] border-[#18181B] rounded-xl shadow-[4px_4px_0_#18181B] hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B] transition-all"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PLBDashboard;
