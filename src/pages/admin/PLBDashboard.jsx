import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, LogOut, FileText, LayoutDashboard, Search, Clock, 
  CheckCircle, Sparkles, ChevronRight, X, Settings, 
  Users, FolderOpen, Trash2, AlertTriangle, Activity, Loader2, Save, Edit3, Trash, UserPlus, Lock
} from 'lucide-react';
import Logo from '../../components/common/Logo';
import { getLessons, createLesson, deleteLesson, getActivities, getUsers, updateUser, clearActivities, createUser, updateLesson } from '../../utils/api';

const PLBDashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  
  const [lessons, setLessons] = useState([]);
  const [activities, setActivities] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All'); 
  
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [profileName, setProfileName] = useState('');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isClearingActivity, setIsClearingActivity] = useState(false);

  // New User State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserUsername, setNewUserUsername] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [addUserError, setAddUserError] = useState(null);

  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [editPasswordValue, setEditPasswordValue] = useState('');
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [myNewPassword, setMyNewPassword] = useState('');
  const [isSavingMyPassword, setIsSavingMyPassword] = useState(false);

  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('plb_user_v2') || '{}'));
  const isAdmin = user.role === 'Admin' || user.username === 'admin' || user.username === 'shabnam' || user.username === 'piggypath';

  useEffect(() => {
    if(user && user.name) setProfileName(user.name);
    refreshData();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    const [fetchedLessons, fetchedActivities, fetchedUsers] = await Promise.all([
      getLessons(),
      getActivities(),
      getUsers()
    ]);
    setLessons(fetchedLessons || []);
    setActivities(fetchedActivities || []);
    setTeamMembers(fetchedUsers || []);
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('plb_user_v2');
    navigate('/login');
  };

  const handleApprove = async (lessonId) => {
    const updated = await updateLesson(lessonId, { status: 'Published' }, user.username || 'Admin');
    if (updated) {
      setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, status: 'Published' } : l));
      const acts = await getActivities();
      setActivities(acts);
    }
  };

  const confirmDelete = (lesson) => {
    setLessonToDelete(lesson);
    setShowDeleteModal(true);
  };

  const handleDeleteLesson = async () => {
    if (lessonToDelete) {
      setIsDeleting(true);
      await deleteLesson(lessonToDelete.id, user.name || user.username);
      await refreshData();
      setShowDeleteModal(false);
      setLessonToDelete(null);
      setIsDeleting(false);
    }
  };
  
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if(!user.id) return;
    setIsSavingSettings(true);
    const updatedUser = await updateUser(user.id, profileName);
    if(updatedUser) {
      localStorage.setItem('plb_user_v2', JSON.stringify(updatedUser));
      setUser(updatedUser);
      await refreshData();
    }
    setIsSavingSettings(false);
  };

  const handleClearActivity = async () => {
    setIsClearingActivity(true);
    await clearActivities(user.name || user.username);
    await refreshData();
    setIsClearingActivity(false);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUserUsername.trim() || !newUserName.trim() || !newUserPassword.trim()) return;
    
    setIsAddingUser(true);
    setAddUserError(null);
    
    const newUser = await createUser(newUserUsername, newUserName, newUserPassword, user.name || user.username);
    
    setIsAddingUser(false);
    if (newUser && !newUser.error) {
      setShowAddUserModal(false);
      setNewUserName('');
      setNewUserUsername('');
      setNewUserPassword('');
      await refreshData();
    } else {
      setAddUserError(newUser?.error || 'Failed to create user. Username might already exist.');
    }
  };

  const handleEditUserPassword = async (e) => {
    e.preventDefault();
    if (!userToEdit || !editPasswordValue.trim()) return;
    setIsEditingPassword(true);
    const updated = await updateUser(userToEdit.id, { password: editPasswordValue }, user.name || user.username);
    setIsEditingPassword(false);
    if (updated) {
      setShowEditPasswordModal(false);
      setEditPasswordValue('');
      await refreshData();
    } else {
      alert('Failed to update password');
    }
  };

  const handleUpdateMyPassword = async (e) => {
    e.preventDefault();
    if (!myNewPassword.trim()) return;
    setIsSavingMyPassword(true);
    const updatedUser = await updateUser(user.id, { password: myNewPassword }, user.name || user.username);
    if (updatedUser) {
      localStorage.setItem('plb_user_v2', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMyNewPassword('');
      alert('Password updated successfully!');
    }
    setIsSavingMyPassword(false);
  };

  const openBuilder = (id) => {
    navigate(`/builder/${id}`);
  };

  // Metrics calculation
  const totalLessons = lessons.length;
  const publishedLessons = lessons.filter(l => l.status === 'Published').length;
  const draftLessons = lessons.filter(l => l.status === 'Draft').length;
  const totalAuthors = new Set(lessons.map(l => l.draftedBy)).size;

  // Filtering lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            lesson.course.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'All' ? true : lesson.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [lessons, searchQuery, activeTab]);

  return (
    <div className="min-h-screen bg-[#E4E4E7] text-black font-sans relative overflow-hidden selection:bg-[#00E599] selection:text-black flex">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r-[3px] border-black flex flex-col justify-between sticky top-0 h-screen overflow-y-auto z-40 shadow-[4px_0_0_0_#000]">
        <div>
          <div className="h-20 flex items-center px-6 border-b-[3px] border-black mb-6 bg-white">
            <Logo className="text-2xl text-black" />
          </div>
          
          <nav className="px-4 flex flex-col gap-3">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 px-2">Menu</div>
            
            <button 
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black transition-all duration-200 border-[3px] border-black ${activeView === 'dashboard' ? 'bg-[#8B5CF6] text-white shadow-[4px_4px_0_0_#000] translate-x-1' : 'bg-white text-black hover:bg-gray-100 hover:shadow-[4px_4px_0_0_#000]'}`}
            >
              <LayoutDashboard size={20} strokeWidth={3} /> Dashboard
            </button>
            
            <button 
              onClick={() => setActiveView('lessons')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black transition-all duration-200 border-[3px] border-black ${activeView === 'lessons' ? 'bg-[#FFD100] text-black shadow-[4px_4px_0_0_#000] translate-x-1' : 'bg-white text-black hover:bg-gray-100 hover:shadow-[4px_4px_0_0_#000]'}`}
            >
              <FolderOpen size={20} strokeWidth={3} /> All Lessons
            </button>
            
            <button 
              onClick={() => setActiveView('team')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black transition-all duration-200 border-[3px] border-black ${activeView === 'team' ? 'bg-[#00E599] text-black shadow-[4px_4px_0_0_#000] translate-x-1' : 'bg-white text-black hover:bg-gray-100 hover:shadow-[4px_4px_0_0_#000]'}`}
            >
              <Users size={20} strokeWidth={3} /> Team Members
            </button>
            
            <button 
              onClick={() => setActiveView('settings')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black transition-all duration-200 border-[3px] border-black ${activeView === 'settings' ? 'bg-black text-white shadow-[4px_4px_0_0_#000] translate-x-1' : 'bg-white text-black hover:bg-gray-100 hover:shadow-[4px_4px_0_0_#000]'}`}
            >
              <Settings size={20} strokeWidth={3} /> Settings
            </button>
            
          </nav>
        </div>

        <div className="p-4 border-t-[3px] border-black bg-white">
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border-[3px] border-black shadow-[4px_4px_0_0_#000]">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6] border-[2px] border-black flex items-center justify-center text-white font-black text-xl">
              {user.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-black text-black truncate">{user.name}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate">Admin</p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-black hover:text-white hover:bg-black rounded-lg border-[2px] border-transparent hover:border-black transition-colors"
              title="Logout"
            >
              <LogOut size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-white border-b-[3px] border-black sticky top-0 z-30 shadow-[0_4px_0_0_#000] z-30 relative">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-[10px] font-black bg-[#00E599] text-black px-4 py-2 border-[2px] border-black rounded-full uppercase tracking-widest shadow-[2px_2px_0_0_#000]">
              <Sparkles size={14} strokeWidth={3} /> Supabase Connected
            </span>
          </div>
          
          <button 
            onClick={() => navigate('/create-lesson')}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#8B5CF6] hover:bg-purple-500 text-white text-sm font-black rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-y-[2px] border-[3px] border-black transition-all duration-200"
          >
            <Plus size={18} strokeWidth={4} /> Create Lesson
          </button>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-y-auto p-8 flex gap-8">
          
          {/* DASHBOARD VIEW OR LESSONS VIEW */}
          {(activeView === 'dashboard' || activeView === 'lessons') && (
            <>
              {/* Main Column */}
              <div className="flex-1 flex flex-col gap-8">
                {activeView === 'dashboard' && (
                  <>
                    <div>
                      <h2 className="text-4xl font-black mb-2 text-black tracking-tight">Overview</h2>
                      <p className="text-gray-500 font-bold text-sm">Welcome back, here is what's happening with your modules today.</p>
                    </div>

                    {/* Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white border-[3px] border-black p-5 rounded-3xl shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] transition-all relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 p-4 text-[#8B5CF6] opacity-10 group-hover:opacity-20 transition-opacity"><LayoutDashboard size={80} strokeWidth={3} /></div>
                        <div className="w-12 h-12 bg-[#8B5CF6] border-[3px] border-black rounded-xl mb-4 flex items-center justify-center text-white shadow-[2px_2px_0_0_#000]">
                          <LayoutDashboard size={24} strokeWidth={3} />
                        </div>
                        <p className="text-black text-4xl font-black mb-1">{isLoading ? '...' : totalLessons}</p>
                        <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Total Lessons</p>
                      </div>
                      
                      <div className="bg-white border-[3px] border-black p-5 rounded-3xl shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] transition-all relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 p-4 text-[#00E599] opacity-10 group-hover:opacity-20 transition-opacity"><CheckCircle size={80} strokeWidth={3} /></div>
                        <div className="w-12 h-12 bg-[#00E599] border-[3px] border-black rounded-xl mb-4 flex items-center justify-center text-black shadow-[2px_2px_0_0_#000]">
                          <CheckCircle size={24} strokeWidth={3} />
                        </div>
                        <p className="text-black text-4xl font-black mb-1">{isLoading ? '...' : publishedLessons}</p>
                        <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Published</p>
                      </div>
                      
                      <div className="bg-white border-[3px] border-black p-5 rounded-3xl shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] transition-all relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 p-4 text-[#FFD100] opacity-10 group-hover:opacity-20 transition-opacity"><Clock size={80} strokeWidth={3} /></div>
                        <div className="w-12 h-12 bg-[#FFD100] border-[3px] border-black rounded-xl mb-4 flex items-center justify-center text-black shadow-[2px_2px_0_0_#000]">
                          <Clock size={24} strokeWidth={3} />
                        </div>
                        <p className="text-black text-4xl font-black mb-1">{isLoading ? '...' : draftLessons}</p>
                        <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Drafts</p>
                      </div>
                      
                      <div className="bg-white border-[3px] border-black p-5 rounded-3xl shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] transition-all relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 p-4 text-[#FF6B6B] opacity-10 group-hover:opacity-20 transition-opacity"><Users size={80} strokeWidth={3} /></div>
                        <div className="w-12 h-12 bg-[#FF6B6B] border-[3px] border-black rounded-xl mb-4 flex items-center justify-center text-white shadow-[2px_2px_0_0_#000]">
                          <Users size={24} strokeWidth={3} />
                        </div>
                        <p className="text-black text-4xl font-black mb-1">{isLoading ? '...' : totalAuthors}</p>
                        <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Authors</p>
                      </div>
                    </div>
                  </>
                )}

                {activeView === 'lessons' && (
                  <div>
                    <h2 className="text-4xl font-black mb-2 text-black tracking-tight">All Lessons</h2>
                    <p className="text-gray-500 font-bold text-sm">Manage, search, and edit all lessons in the workspace.</p>
                  </div>
                )}

                {/* Enhanced Dashboard Grid (Lessons Table) */}
                <div className="bg-white border-[3px] border-black rounded-3xl overflow-hidden shadow-[8px_8px_0_0_#000] relative flex flex-col flex-1">
                  
                  {/* Table Header Controls */}
                  <div className="p-5 border-b-[3px] border-black flex items-center justify-between bg-white relative z-10">
                    <div className="flex bg-white rounded-xl p-1.5 border-[3px] border-black shadow-[4px_4px_0_0_#000]">
                      {['All', 'Pending Approval', 'Published', 'Draft'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-5 py-2 text-sm font-black rounded-lg transition-all border-[2px] ${activeTab === tab ? 'bg-black text-white border-black' : 'text-gray-500 border-transparent hover:text-black hover:bg-gray-200'}`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    
                    <div className="relative">
                      <Search size={20} strokeWidth={3} className="absolute left-4 top-1/2 -translate-y-1/2 text-black" />
                      <input 
                        type="text" 
                        placeholder="Search lessons..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-4 py-3 bg-white border-[3px] border-black rounded-xl text-sm font-bold text-black focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0_0_#000] focus:-translate-y-1 w-64 md:w-80 placeholder-gray-400 transition-all shadow-[2px_2px_0_0_#000]"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto relative z-10 min-h-[300px] bg-white">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-[3px] border-black bg-gray-50">
                          <th className="p-5 font-black text-black text-xs tracking-widest uppercase">Lesson Title</th>
                          <th className="p-5 font-black text-black text-xs tracking-widest uppercase">Course</th>
                          <th className="p-5 font-black text-black text-xs tracking-widest uppercase">Author</th>
                          <th className="p-5 font-black text-black text-xs tracking-widest uppercase">Status</th>
                          <th className="p-5 font-black text-black text-xs tracking-widest uppercase text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan="5" className="p-16 text-center text-black">
                              <Loader2 className="animate-spin mx-auto mb-4" size={32} strokeWidth={3} />
                              <p className="font-bold">Syncing with Supabase...</p>
                            </td>
                          </tr>
                        ) : filteredLessons.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="p-12 text-center text-gray-500 font-bold relative">
                              <div className="flex flex-col items-center justify-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-white border-[3px] border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center text-black">
                                  <Search size={24} strokeWidth={3} />
                                </div>
                                <div>
                                  <p className="text-black font-black mb-1">No lessons found</p>
                                  <p className="text-sm">Try adjusting your filters or search query.</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredLessons.map((lesson, index) => (
                            <tr key={lesson.id} className={`group ${index !== filteredLessons.length - 1 ? 'border-b-[2px] border-black' : ''} hover:bg-[#F4F4F5] transition-colors duration-200`}>
                              <td className="p-5">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-white border-[3px] border-black flex items-center justify-center text-black shadow-[2px_2px_0_0_#000] group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0_0_#000] transition-all duration-300">
                                    <FileText size={20} strokeWidth={3} />
                                  </div>
                                  <span className="font-black text-black">{lesson.title}</span>
                                </div>
                              </td>
                              <td className="p-5 text-sm font-bold text-gray-600">{lesson.course}</td>
                              <td className="p-5 text-sm font-bold text-gray-600 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-xs text-white font-black border-[2px] border-black shadow-[2px_2px_0_0_#000]">
                                  {lesson.draftedBy.charAt(0).toUpperCase()}
                                </div>
                                {lesson.draftedBy}
                              </td>
                              <td className="p-5">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-[2px] border-black text-xs font-black uppercase tracking-widest shadow-[2px_2px_0_0_#000] ${
                                  lesson.status === 'Draft' 
                                    ? 'bg-gray-200 text-black' 
                                    : lesson.status === 'Pending Approval'
                                    ? 'bg-[#FFD100] text-black'
                                    : 'bg-[#00E599] text-black'
                                }`}>
                                  {lesson.status === 'Draft' ? <Edit3 size={14} strokeWidth={3} /> : lesson.status === 'Pending Approval' ? <Clock size={14} strokeWidth={3} /> : <CheckCircle size={14} strokeWidth={3} />}
                                  {lesson.status}
                                </span>
                              </td>
                              <td className="p-5 text-right flex items-center justify-end gap-3">
                                {isAdmin && lesson.status === 'Pending Approval' && (
                                  <button 
                                    onClick={() => handleApprove(lesson.id)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B5CF6] text-white text-xs font-black rounded-lg border-[3px] border-black shadow-[2px_2px_0_0_#000] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_#000] hover:bg-[#7C3AED] transition-all duration-200"
                                  >
                                    <CheckCircle size={16} strokeWidth={3} /> Approve
                                  </button>
                                )}
                                <button 
                                  onClick={() => openBuilder(lesson.id)}
                                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs font-black rounded-lg border-[3px] border-black shadow-[2px_2px_0_0_#000] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_#000] hover:bg-[#8B5CF6] hover:text-white transition-all duration-200"
                                >
                                  <Edit3 size={16} strokeWidth={3} /> Edit
                                </button>
                                <button 
                                  onClick={() => confirmDelete(lesson)}
                                  className="p-2.5 bg-white text-black hover:bg-[#FF6B6B] hover:text-white rounded-lg border-[3px] border-black shadow-[2px_2px_0_0_#000] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_#000] transition-all duration-200"
                                  title="Delete Lesson"
                                >
                                  <Trash2 size={16} strokeWidth={3} />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column (Activity Feed) - ONLY on Dashboard */}
              {activeView === 'dashboard' && (
                <div className="w-80 flex flex-col gap-6 hidden xl:flex">
                  <div className="bg-white border-[3px] border-black rounded-3xl p-6 relative overflow-hidden flex-1 max-h-[800px] flex flex-col shadow-[8px_8px_0_0_#000]">
                    
                    <div className="flex items-center justify-between mb-6 relative z-10 border-b-[3px] border-black pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FFD100] rounded-xl border-[3px] border-black shadow-[2px_2px_0_0_#000] flex items-center justify-center">
                          <Activity size={20} strokeWidth={3} className="text-black" />
                        </div>
                        <h3 className="font-black text-xl text-black tracking-wide">Activity</h3>
                      </div>
                      <button 
                        onClick={handleClearActivity}
                        disabled={isClearingActivity || activities.length === 0}
                        className="p-2 text-xs font-black bg-white border-[2px] border-black rounded-lg shadow-[2px_2px_0_0_#000] hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-all disabled:opacity-50 flex items-center gap-2"
                        title="Clear Activity Feed"
                      >
                        {isClearingActivity ? <Loader2 size={14} className="animate-spin" /> : <Trash size={14} strokeWidth={3} />}
                        Clear
                      </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-4 relative z-10 space-y-6 custom-scrollbar">
                      {isLoading ? (
                        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-black" /></div>
                      ) : activities.length === 0 ? (
                        <p className="text-sm font-bold text-gray-400">No recent activity to show.</p>
                      ) : (
                        activities.map((activity, index) => (
                          <div key={activity.id} className="relative pl-8 group">
                            {/* Timeline line */}
                            {index !== activities.length - 1 && (
                              <div className="absolute left-[13px] top-8 bottom-[-24px] w-[3px] bg-black"></div>
                            )}
                            {/* Timeline dot */}
                            <div className="absolute left-[5px] top-1.5 w-5 h-5 rounded-full bg-white border-[3px] border-black group-hover:bg-[#8B5CF6] transition-colors shadow-[2px_2px_0_0_#000]"></div>
                            
                            <p className="text-sm text-gray-700 font-bold leading-relaxed">
                              <span className="font-black text-black">{activity.user}</span> {activity.action}
                            </p>
                            <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">
                              {new Date(activity.timestamp).toLocaleString(undefined, {
                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                              })}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TEAM MEMBERS VIEW */}
          {activeView === 'team' && (
            <div className="flex-1 flex flex-col gap-8 w-full max-w-5xl">
              <div>
                <h2 className="text-4xl font-black mb-1 text-black tracking-tight">Team Members</h2>
                <p className="text-gray-500 font-bold text-sm">Manage the developers and authors in your workspace.</p>
              </div>
              
              <div className="bg-white border-[3px] border-black rounded-3xl overflow-hidden shadow-[8px_8px_0_0_#000] relative flex flex-col flex-1">
                
                <div className="p-6 border-b-[3px] border-black bg-white flex items-center justify-between z-10">
                   <h3 className="text-black font-black text-xl flex items-center gap-3">
                     <div className="w-10 h-10 bg-[#00E599] border-[3px] border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0_0_#000]">
                       <Users size={20} strokeWidth={3} className="text-black" />
                     </div>
                     All Registered Users
                   </h3>
                   {isAdmin && (
                     <button 
                       onClick={() => setShowAddUserModal(true)}
                       className="flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] hover:bg-purple-500 text-white text-xs font-black rounded-xl shadow-[2px_2px_0_0_#000] hover:translate-y-[2px] hover:shadow-none border-[3px] border-black transition-all duration-200"
                     >
                       <UserPlus size={16} strokeWidth={3} /> Add User
                     </button>
                   )}
                </div>

                <div className="overflow-x-auto relative z-10 p-8 min-h-[300px] bg-white">
                  {isLoading ? (
                    <div className="flex justify-center py-20"><Loader2 className="animate-spin text-black" size={32} strokeWidth={3} /></div>
                  ) : teamMembers.length === 0 ? (
                    <div className="text-center font-bold py-20 text-gray-500">No users found. Ensure users are registered in Supabase.</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {teamMembers.map(member => (
                        <div key={member.id} className="p-5 bg-white border-[3px] border-black rounded-2xl flex items-center gap-5 hover:-translate-y-1 shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all">
                          <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center text-white font-black text-2xl border-[3px] border-black shadow-[2px_2px_0_0_#8B5CF6]">
                            {member.name ? member.name.charAt(0).toUpperCase() : member.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-black font-black text-lg">{member.name || 'No Name Provided'}</p>
                            <p className="text-gray-500 font-bold text-sm">@{member.username}</p>
                          </div>
                          <div className="ml-auto flex items-center gap-3">
                            {isAdmin && member.id !== user.id && (
                              <button 
                                onClick={() => { setUserToEdit(member); setEditPasswordValue(''); setShowEditPasswordModal(true); }}
                                className="p-2 bg-white hover:bg-gray-100 text-black rounded-lg border-[2px] border-black shadow-[2px_2px_0_0_#000] hover:-translate-y-0.5 transition-all"
                                title="Change Password"
                              >
                                <Lock size={14} strokeWidth={3} />
                              </button>
                            )}
                            <span className="text-[10px] uppercase font-black tracking-widest px-3 py-1.5 bg-[#FFD100] text-black rounded-md border-[2px] border-black shadow-[2px_2px_0_0_#000]">
                              {member.username === 'admin' || member.username === 'shabnam' || member.username === 'piggypath' ? 'Admin' : 'Member'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS VIEW */}
          {activeView === 'settings' && (
            <div className="flex-1 flex flex-col gap-8 w-full max-w-3xl">
              <div>
                <h2 className="text-4xl font-black mb-1 text-black tracking-tight">Settings</h2>
                <p className="text-gray-500 font-bold text-sm">Update your workspace and profile preferences.</p>
              </div>
              
              <div className="bg-white border-[3px] border-black rounded-3xl overflow-hidden shadow-[8px_8px_0_0_#000] relative flex flex-col flex-1 p-10">
                
                <form onSubmit={handleSaveSettings} className="relative z-10 flex flex-col gap-8">
                  <h3 className="text-2xl font-black text-black border-b-[3px] border-black pb-4">My Profile</h3>
                  
                  <div>
                    <label className="block text-sm font-black mb-3 text-black uppercase tracking-widest">Display Name</label>
                    <input 
                      type="text" 
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full max-w-md px-5 py-4 bg-white border-[3px] border-black rounded-xl text-black font-bold focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0_0_#000] focus:-translate-y-1 transition-all placeholder-gray-400 shadow-[2px_2px_0_0_#000]"
                      required
                    />
                    <p className="text-xs font-bold text-gray-500 mt-3">This is the name that will appear on lessons you draft and in the activity feed.</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-black mb-3 text-gray-400 uppercase tracking-widest">Username (Read Only)</label>
                    <input 
                      type="text" 
                      value={user.username || ''}
                      disabled
                      className="w-full max-w-md px-5 py-4 bg-gray-100 border-[3px] border-gray-300 rounded-xl text-gray-500 font-bold cursor-not-allowed"
                    />
                  </div>

                  <div className="mt-4 pt-8 border-t-[3px] border-black">
                    <button 
                      type="submit" 
                      disabled={isSavingSettings || profileName === user.name}
                      className="px-8 py-4 bg-black text-white font-black rounded-xl shadow-[4px_4px_0_0_#8B5CF6] hover:shadow-[2px_2px_0_0_#8B5CF6] hover:translate-y-[2px] active:translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_0_#8B5CF6]"
                    >
                      {isSavingSettings ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} strokeWidth={3} />}
                      Save Profile
                    </button>
                  </div>
                </form>

                <div className="mt-8 pt-8 border-t-[3px] border-black relative z-10">
                  <h3 className="text-2xl font-black text-black mb-6 inline-block">Security</h3>
                  <form onSubmit={handleUpdateMyPassword} className="flex flex-col gap-6">
                    <div>
                      <label className="block text-sm font-black mb-3 text-black uppercase tracking-widest">Change Password</label>
                      <input 
                        type="password" 
                        value={myNewPassword}
                        onChange={(e) => setMyNewPassword(e.target.value)}
                        placeholder="New password"
                        className="w-full max-w-md px-5 py-4 bg-white border-[3px] border-black rounded-xl text-black font-bold focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0_0_#000] focus:-translate-y-1 transition-all placeholder-gray-400 shadow-[2px_2px_0_0_#000]"
                        required
                      />
                    </div>
                    <div>
                      <button 
                        type="submit" 
                        disabled={isSavingMyPassword || !myNewPassword}
                        className="px-6 py-4 bg-[#FF6B6B] text-black font-black rounded-xl border-[3px] border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-y-[2px] active:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSavingMyPassword ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} strokeWidth={3} />}
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </main>

      {/* Neo-Brutalist Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isDeleting && setShowDeleteModal(false)}></div>
          
          <div className="bg-white border-[4px] border-black shadow-[12px_12px_0_0_#000] rounded-3xl max-w-sm w-full p-8 relative z-10 animate-in zoom-in-95 duration-200 text-center">
            
            <div className="w-20 h-20 rounded-2xl bg-[#FF6B6B] border-[4px] border-black flex items-center justify-center text-white mx-auto mb-6 shadow-[4px_4px_0_0_#000] transform -rotate-6">
               <AlertTriangle size={40} strokeWidth={3} />
            </div>

            <h3 className="text-2xl font-black mb-3 text-black">Delete Lesson?</h3>
            <p className="text-gray-600 font-bold mb-8 text-sm">
              Are you sure you want to delete <span className="text-black font-black">"{lessonToDelete?.title}"</span>? This action cannot be undone.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="py-3 bg-white hover:bg-gray-100 text-black font-black border-[3px] border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:-translate-y-1 transition-all duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteLesson}
                disabled={isDeleting}
                className="py-3 bg-[#FF6B6B] hover:bg-red-500 text-black font-black border-[3px] border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? <Loader2 size={18} className="animate-spin" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isAddingUser && setShowAddUserModal(false)}></div>
          
          <div className="bg-white border-[4px] border-black shadow-[12px_12px_0_0_#000] rounded-3xl max-w-sm w-full p-8 relative z-10 animate-in zoom-in-95 duration-200 text-left">
            <h3 className="text-3xl font-black mb-2 text-black">Add User</h3>
            <p className="text-gray-500 font-bold mb-6 text-sm">Create a new account for your team.</p>
            
            {addUserError && (
              <div className="mb-4 p-3 bg-red-100 border-[3px] border-red-500 text-red-700 text-xs font-black rounded-xl">
                {addUserError}
              </div>
            )}
            
            <form onSubmit={handleAddUser} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-black mb-1 text-black uppercase tracking-widest">Display Name</label>
                <input 
                  type="text" 
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Alice"
                  className="w-full px-4 py-3 bg-white border-[3px] border-black rounded-xl text-black font-bold focus:outline-none focus:ring-0 focus:-translate-y-1 transition-all placeholder-gray-400"
                  required
                  disabled={isAddingUser}
                />
              </div>
              
              <div>
                <label className="block text-xs font-black mb-1 text-black uppercase tracking-widest">Username</label>
                <input 
                  type="text" 
                  value={newUserUsername}
                  onChange={(e) => setNewUserUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                  placeholder="e.g. alice_writer"
                  className="w-full px-4 py-3 bg-white border-[3px] border-black rounded-xl text-black font-bold focus:outline-none focus:ring-0 focus:-translate-y-1 transition-all placeholder-gray-400"
                  required
                  disabled={isAddingUser}
                />
              </div>
              
              <div>
                <label className="block text-xs font-black mb-1 text-black uppercase tracking-widest">Password</label>
                <input 
                  type="password" 
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  placeholder="Secret password"
                  className="w-full px-4 py-3 bg-white border-[3px] border-black rounded-xl text-black font-bold focus:outline-none focus:ring-0 focus:-translate-y-1 transition-all placeholder-gray-400"
                  required
                  disabled={isAddingUser}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  disabled={isAddingUser}
                  className="py-3 bg-gray-100 text-black font-black border-[3px] border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:-translate-y-1 transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isAddingUser}
                  className="py-3 bg-[#00E599] text-black font-black border-[3px] border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isAddingUser ? <Loader2 size={16} className="animate-spin" /> : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Password Modal */}
      {showEditPasswordModal && userToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isEditingPassword && setShowEditPasswordModal(false)}></div>
          
          <div className="bg-white border-[4px] border-black shadow-[12px_12px_0_0_#000] rounded-3xl max-w-sm w-full p-8 relative z-10 animate-in zoom-in-95 duration-200 text-left">
            <h3 className="text-3xl font-black mb-2 text-black">Manage User</h3>
            <p className="text-gray-500 font-bold mb-6 text-sm">Change password for <span className="text-black">@{userToEdit.username}</span></p>
            
            <form onSubmit={handleEditUserPassword} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-black mb-1 text-black uppercase tracking-widest">New Password</label>
                <input 
                  type="password" 
                  value={editPasswordValue}
                  onChange={(e) => setEditPasswordValue(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 bg-white border-[3px] border-black rounded-xl text-black font-bold focus:outline-none focus:ring-0 focus:-translate-y-1 transition-all placeholder-gray-400"
                  required
                  disabled={isEditingPassword}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setShowEditPasswordModal(false)}
                  disabled={isEditingPassword}
                  className="py-3 bg-gray-100 text-black font-black border-[3px] border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:-translate-y-1 transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isEditingPassword}
                  className="py-3 bg-[#8B5CF6] text-white font-black border-[3px] border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isEditingPassword ? <Loader2 size={16} className="animate-spin" /> : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Custom Scrollbar Styles for the Activity Feed */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #E4E4E7;
          border-radius: 8px;
          border: 2px solid black;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #000;
          border-radius: 8px;
        }
      `}} />
    </div>
  );
};

export default PLBDashboard;
