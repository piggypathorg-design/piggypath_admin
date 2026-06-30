import React from 'react';
import { 
  Lock, Crown, Flame, BookOpen, PiggyBank, Sun, Moon, Users, Target,
  Zap, Activity, Star, Trophy, Medal, Rocket, Shield, Heart,
  Book, Library, GraduationCap, Scroll, Lightbulb, Glasses, Microscope, PenTool, Award,
  Coins, Banknote, Wallet, CreditCard, Vault, ShieldCheck, Landmark, Gem, Diamond,
  Sunrise, Sunset, CloudSun, CloudMoon, CalendarDays, CalendarCheck, Clock, Hourglass,
  User, UserPlus, UserCheck, MessageCircle, Share2, Globe, Radio, Megaphone, Smartphone,
  Crosshair, CheckCircle, CheckSquare, Brain, Puzzle, Swords, Flag, Compass, Map
} from 'lucide-react';

const badgeCategories = [
  {
    title: 'STREAKS',
    icon: Flame,
    color: '#EF4444',
    badges: [
      { id: 'st1', label: '3-Day Streak', locked: true, specificIcon: Flame },
      { id: 'st2', label: '7-Day Streak', locked: true, specificIcon: Zap },
      { id: 'st3', label: '14-Day Streak', locked: true, specificIcon: Activity },
      { id: 'st4', label: '30-Day Streak', locked: true, specificIcon: Star },
      { id: 'st5', label: '50-Day Streak', locked: true, specificIcon: Crown },
      { id: 'st6', label: '75-Day Streak', locked: true, specificIcon: Trophy },
      { id: 'st7', label: '100-Day Streak', locked: true, specificIcon: Medal },
      { id: 'st8', label: '150-Day Streak', locked: true, specificIcon: Rocket },
      { id: 'st9', label: '200-Day Streak', locked: true, specificIcon: Shield },
      { id: 'st10', label: '365-Day Streak', locked: true, specificIcon: Heart },
    ]
  },
  {
    title: 'LEARNING',
    icon: BookOpen,
    color: '#3B82F6',
    badges: [
      { id: 'l1', label: 'First Lesson', locked: true, specificIcon: BookOpen },
      { id: 'l2', label: 'Module Master', locked: true, specificIcon: Book },
      { id: 'l3', label: 'Curriculum Finisher', locked: true, specificIcon: Library },
      { id: 'l4', label: 'Knowledge Seeker', locked: true, specificIcon: GraduationCap },
      { id: 'l5', label: 'Avid Reader', locked: true, specificIcon: Scroll },
      { id: 'l6', label: 'Concept Crusher', locked: true, specificIcon: Lightbulb },
      { id: 'l7', label: 'Theory Expert', locked: true, specificIcon: Glasses },
      { id: 'l8', label: 'Practical Pro', locked: true, specificIcon: Microscope },
      { id: 'l9', label: 'Finance Guru', locked: true, specificIcon: PenTool },
      { id: 'l10', label: 'PiggyPath Scholar', locked: true, specificIcon: Award },
    ]
  },
  {
    title: 'SAVING',
    icon: PiggyBank,
    color: '#00E599',
    badges: [
      { id: 'sa1', label: 'First ₹500', locked: true, specificIcon: PiggyBank },
      { id: 'sa2', label: 'Saver Pro (₹5K)', locked: true, specificIcon: Coins },
      { id: 'sa3', label: 'Growing (₹10K)', locked: true, specificIcon: Banknote },
      { id: 'sa4', label: 'Nest Egg (₹20K)', locked: true, specificIcon: Wallet },
      { id: 'sa5', label: 'Safety Net (₹30K)', locked: true, specificIcon: CreditCard },
      { id: 'sa6', label: 'Big Goals (₹50K)', locked: true, specificIcon: Vault },
      { id: 'sa7', label: 'Wealth Builder (₹100K)', locked: true, specificIcon: ShieldCheck },
      { id: 'sa8', label: 'Half Mil (₹500K)', locked: true, specificIcon: Landmark },
      { id: 'sa9', label: 'Millionaire (₹1M)', locked: true, specificIcon: Gem },
      { id: 'sa10', label: 'Financial Freedom', locked: true, specificIcon: Diamond },
    ]
  },
  {
    title: 'CONSISTENCY',
    icon: Sun, 
    color: '#FFC107',
    badges: [
      { id: 'c1', label: 'Early Bird', locked: true, specificIcon: Sun },
      { id: 'c2', label: 'Night Owl', locked: true, specificIcon: Moon },
      { id: 'c3', label: 'Weekend Warrior', locked: true, specificIcon: Sunrise },
      { id: 'c4', label: 'Daily Grind', locked: true, specificIcon: Sunset },
      { id: 'c5', label: 'Non-Stop', locked: true, specificIcon: CloudSun },
      { id: 'c6', label: 'Dedicated', locked: true, specificIcon: CloudMoon },
      { id: 'c7', label: 'Relentless', locked: true, specificIcon: CalendarDays },
      { id: 'c8', label: 'Routine Master', locked: true, specificIcon: CalendarCheck },
      { id: 'c9', label: 'Habit Former', locked: true, specificIcon: Clock },
      { id: 'c10', label: 'Unbreakable', locked: true, specificIcon: Hourglass },
    ]
  },
  {
    title: 'SOCIAL',
    icon: Users,
    color: '#8B5CF6',
    badges: [
      { id: 'so1', label: 'First Friend', locked: true, specificIcon: User },
      { id: 'so2', label: 'Friendly (3)', locked: true, specificIcon: Users },
      { id: 'so3', label: 'Social (5)', locked: true, specificIcon: UserPlus },
      { id: 'so4', label: 'Butterfly (10)', locked: true, specificIcon: UserCheck },
      { id: 'so5', label: 'Connector (20)', locked: true, specificIcon: MessageCircle },
      { id: 'so6', label: 'Networker (50)', locked: true, specificIcon: Share2 },
      { id: 'so7', label: 'Influencer (100)', locked: true, specificIcon: Globe },
      { id: 'so8', label: 'Trendsetter', locked: true, specificIcon: Radio },
      { id: 'so9', label: 'Community Lead', locked: true, specificIcon: Megaphone },
      { id: 'so10', label: 'PiggyPath Mayor', locked: true, specificIcon: Smartphone },
    ]
  },
  {
    title: 'QUIZZES',
    icon: Target,
    color: '#F97316',
    badges: [
      { id: 'q1', label: 'Perfect Score', locked: true, specificIcon: Target },
      { id: 'q2', label: 'Sharp Mind', locked: true, specificIcon: Crosshair },
      { id: 'q3', label: 'Quiz Pro (5)', locked: true, specificIcon: CheckCircle },
      { id: 'q4', label: 'Quiz Master (10)', locked: true, specificIcon: CheckSquare },
      { id: 'q5', label: 'Trivia King (20)', locked: true, specificIcon: Brain },
      { id: 'q6', label: 'Flawless (50)', locked: true, specificIcon: Puzzle },
      { id: 'q7', label: 'Genius (100)', locked: true, specificIcon: Swords },
      { id: 'q8', label: 'Speed Demon', locked: true, specificIcon: Flag },
      { id: 'q9', label: 'Accuracy God', locked: true, specificIcon: Compass },
      { id: 'q10', label: 'Unstoppable', locked: true, specificIcon: Map },
    ]
  }
];

const BadgesAndCollections = () => {
  return (
    <div className="w-full bg-white dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white shadow-[8px_8px_0_#18181B] dark:shadow-[8px_8px_0_#F4F4F5] p-8 mb-6 transition-colors">
      
      <h3 className="font-black text-xl tracking-tight text-[#18181B] dark:text-[#F4F4F5] uppercase mb-8">
        Badges & Collections
      </h3>

      <div className="flex flex-col gap-8">
        {badgeCategories.map((category, idx) => {
          const CategoryIcon = category.icon;
          
          return (
            <div key={idx}>
              <div className="flex items-center gap-2 mb-4">
                <CategoryIcon size={16} color={category.color} strokeWidth={3} />
                <h4 className="font-['Space_Mono',monospace] font-bold text-xs text-[#18181B] dark:text-[#F4F4F5] uppercase">
                  {category.title}
                </h4>
              </div>
              
              <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                {category.badges.map(badge => {
                  const Icon = badge.specificIcon || category.icon;
                  
                  return (
                    <div key={badge.id} className="flex flex-col items-center shrink-0 w-16 relative">
                      
                      {/* Badge Box */}
                      <div 
                        className={`
                          w-16 h-16 rounded-full border-[3px] border-[#18181B] dark:border-[#F4F4F5] flex items-center justify-center mb-2 transition-colors relative overflow-hidden
                          shadow-[3px_4px_0_#18181B] dark:shadow-[3px_4px_0_#F4F4F5] shrink-0
                        `}
                        style={{ 
                          backgroundColor: category.color 
                        }}
                      >
                        {/* 3D Highlight */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-white opacity-25 rounded-t-full pointer-events-none"></div>

                        {/* Illustration */}
                        <Icon 
                          size={28} 
                          color="#18181B" 
                          strokeWidth={2.5} 
                          className="drop-shadow-sm z-10"
                        />

                        {/* Lock Overlay */}
                        {badge.locked && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20 backdrop-blur-[0.5px]">
                            <Lock size={20} color="#FFF" strokeWidth={3} className="drop-shadow-md" />
                          </div>
                        )}
                      </div>

                      {/* Label */}
                      <span className="font-['Space_Mono',monospace] text-[9px] font-bold text-[#18181B] dark:text-[#A1A1AA] text-center w-full leading-tight">
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default BadgesAndCollections;
