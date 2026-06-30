import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F5] dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5] font-sans selection:bg-[#00E599] selection:text-[#18181B] transition-colors">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#F4F4F5]/80 dark:bg-[#18181B]/80 backdrop-blur-md border-b-[4px] border-[#18181B] dark:border-white transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/">
            <Logo className="text-[28px]" />
          </Link>
          <Link to="/" className="font-bold hover:underline">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-[#27272A] border-[4px] border-[#18181B] dark:border-white rounded-3xl p-8 md:p-12 shadow-[8px_8px_0_#18181B] dark:shadow-[#FFFFFF]">
          
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">PiggyPath Privacy Policy</h1>
          <p className="font-bold text-[#71717A] dark:text-[#A1A1AA] mb-8">Effective Date: 20/06/2026</p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 font-medium text-[#3F3F46] dark:text-[#D4D4D8]">
            <p>
              Welcome to PiggyPath ("PiggyPath", "we", "our", or "us"). PiggyPath is committed to protecting your privacy and providing a safe and transparent learning experience. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website, mobile application, and related services.
            </p>
            <p>
              By accessing or using PiggyPath, you agree to the practices described in this Privacy Policy.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">1. About PiggyPath</h2>
            <p>
              PiggyPath is a gamified financial learning platform designed to help users build financial literacy through interactive stories, educational games, quizzes, challenges, and virtual investing simulations. PiggyPath is an educational platform and does not provide financial, investment, tax, or legal advice.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-bold text-[#18181B] dark:text-white mt-6 mb-2">Information You Provide</h3>
            <p>When you create an account or interact with PiggyPath, we may collect:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Full name</li>
              <li>Username</li>
              <li>Email address</li>
              <li>Profile avatar</li>
              <li>Age group</li>
              <li>Learning preferences</li>
              <li>Financial learning interests</li>
              <li>Feedback and support requests</li>
              <li>Messages sent to other users</li>
              <li>Challenge participation</li>
            </ul>

            <h3 className="text-xl font-bold text-[#18181B] dark:text-white mt-6 mb-2">Automatically Collected Information</h3>
            <p>When using PiggyPath, we may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Device information</li>
              <li>Operating system</li>
              <li>Browser type</li>
              <li>IP address</li>
              <li>App version</li>
              <li>Login timestamps</li>
              <li>Session duration</li>
              <li>Crash reports</li>
              <li>Analytics data</li>
              <li>Navigation patterns</li>
            </ul>

            <h3 className="text-xl font-bold text-[#18181B] dark:text-white mt-6 mb-2">Learning & Progress Data</h3>
            <p>To personalize your experience, we store:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Completed lessons</li>
              <li>XP earned</li>
              <li>Coins earned</li>
              <li>Badges collected</li>
              <li>Learning streaks</li>
              <li>Journey progress</li>
              <li>Portfolio simulation history</li>
              <li>Challenge completion history</li>
            </ul>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">3. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Create and manage your account</li>
              <li>Personalize your learning journey</li>
              <li>Track progress and achievements</li>
              <li>Provide rewards and challenges</li>
              <li>Improve application performance</li>
              <li>Detect fraud or abuse</li>
              <li>Send important service notifications</li>
              <li>Respond to support requests</li>
              <li>Analyze product usage</li>
              <li>Develop new features</li>
            </ul>

            <div className="bg-[#00E599]/20 border-[3px] border-[#00E599] rounded-xl p-6 my-8">
              <h2 className="text-2xl font-black text-[#18181B] dark:text-white mb-4">4. Virtual Portfolio Disclaimer</h2>
              <p className="font-bold text-[#18181B] dark:text-[#F4F4F5]">
                PiggyPath includes a virtual investment simulator. All portfolio values, returns, profits, losses, rankings, and performance metrics displayed inside the application are simulated and intended solely for educational purposes.
                <br /><br />
                No actual securities are purchased or sold through PiggyPath. Virtual performance does not guarantee or predict real-world investment results.
              </p>
            </div>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">5. Friend System & Messaging</h2>
            <p>Users may:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Add friends</li>
              <li>Search users by User ID</li>
              <li>Exchange text messages</li>
            </ul>
            <p>
              Users are responsible for their own communications. PiggyPath reserves the right to moderate, remove, or restrict content that violates community guidelines.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">6. Rewards & Coins</h2>
            <p>
              Virtual Coins earned inside PiggyPath have no cash value unless explicitly stated through official promotions. Coins cannot be exchanged for money or transferred between users unless enabled by PiggyPath. Promotional rewards, gift cards, or merchandise may be subject to additional eligibility requirements.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">7. Cookies & Analytics</h2>
            <p>We may use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Keep users logged in</li>
              <li>Remember preferences</li>
              <li>Improve performance</li>
              <li>Analyze usage trends</li>
              <li>Measure engagement</li>
            </ul>
            <p>Users may disable cookies through browser settings, although some features may not function correctly.</p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">8. Third-Party Services</h2>
            <p>PiggyPath may integrate with:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Google Authentication</li>
              <li>Apple Authentication</li>
              <li>Firebase</li>
              <li>Analytics providers</li>
              <li>Cloud hosting services</li>
              <li>Payment providers</li>
              <li>Notification services</li>
            </ul>
            <p>These providers operate under their own privacy policies.</p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">9. Data Security</h2>
            <p>We implement reasonable technical and organizational measures to protect user information, including:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Encrypted communication</li>
              <li>Secure authentication</li>
              <li>Access controls</li>
              <li>Regular security monitoring</li>
            </ul>
            <p>However, no online platform can guarantee absolute security.</p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">10. Children's Privacy</h2>
            <p>
              PiggyPath is intended for users who meet the minimum age requirements of their jurisdiction. Where legally required, parental consent may be necessary. We do not knowingly collect personal information from children in violation of applicable laws.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">11. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Access your information</li>
              <li>Update your information</li>
              <li>Delete your account</li>
              <li>Download your data</li>
              <li>Restrict processing</li>
              <li>Withdraw consent</li>
            </ul>
            <p>Requests may be submitted through our support channels.</p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">12. Data Retention</h2>
            <p>
              We retain user information only as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce our agreements. Deleted accounts may have certain information retained for security, legal, or fraud prevention purposes.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">13. International Users</h2>
            <p>
              Your information may be processed and stored in countries different from your own. By using PiggyPath, you consent to such transfers where permitted by law.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">14. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Material changes will be communicated through the website or application. Continued use of PiggyPath after updates constitutes acceptance of the revised policy.
            </p>

            <div className="bg-[#18181B] dark:bg-white text-white dark:text-[#18181B] rounded-2xl p-8 mt-12 shadow-[8px_8px_0_#8B5CF6]">
              <h2 className="text-2xl font-black mb-4">15. Contact Us</h2>
              <p className="font-bold mb-4">For privacy-related questions or requests:</p>
              <ul className="space-y-2 font-bold">
                <li>Email: <a href="mailto:admin@piggypath.in" className="text-[#00E599] dark:text-[#8B5CF6] hover:underline">admin@piggypath.in</a></li>
                <li>Email: <a href="mailto:piggypath@gmail.com" className="text-[#00E599] dark:text-[#8B5CF6] hover:underline">piggypath@gmail.com</a></li>
                <li>Website: <a href="https://www.piggypath.in" target="_blank" rel="noopener noreferrer" className="text-[#00E599] dark:text-[#8B5CF6] hover:underline">www.piggypath.in</a></li>
              </ul>
            </div>

          </div>
        </div>
      </main>

      {/* Mini Footer */}
      <footer className="border-t-[4px] border-[#18181B] bg-white dark:bg-[#27272A] py-8 text-center">
        <p className="font-bold text-[#A1A1AA]">
          © {new Date().getFullYear()} PiggyPath. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;
