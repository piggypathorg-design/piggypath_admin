import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';

const TermsOfServicePage = () => {
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
          
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">PiggyPath Terms of Service</h1>
          <p className="font-bold text-[#71717A] dark:text-[#A1A1AA] mb-8">Effective Date: 20/06/2026</p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 font-medium text-[#3F3F46] dark:text-[#D4D4D8]">
            <p>
              Welcome to PiggyPath. These Terms of Service ("Terms") govern your access to and use of PiggyPath's website, mobile applications, products, and services.
            </p>
            <p>
              By creating an account or using PiggyPath, you agree to these Terms.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">1. Purpose of the Platform</h2>
            <p>
              PiggyPath is an educational platform designed to improve financial literacy through interactive learning experiences, games, quizzes, challenges, and virtual investment simulations.
            </p>
            <p className="font-bold text-[#18181B] dark:text-[#F4F4F5]">
              PiggyPath is not a bank, broker, investment advisor, financial institution, or licensed financial planner. Nothing within the platform should be interpreted as personalized financial advice.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">2. User Accounts</h2>
            <p>Users are responsible for:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Providing accurate information</li>
              <li>Maintaining account security</li>
              <li>Protecting login credentials</li>
              <li>All activity occurring under their account</li>
            </ul>
            <p>PiggyPath may suspend or terminate accounts that violate these Terms.</p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">3. Acceptable Use</h2>
            <p>Users agree not to:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Use PiggyPath for unlawful purposes</li>
              <li>Attempt unauthorized access</li>
              <li>Reverse engineer the application</li>
              <li>Exploit bugs or vulnerabilities</li>
              <li>Manipulate leaderboards or rewards</li>
              <li>Create fake accounts</li>
              <li>Harass or abuse other users</li>
              <li>Upload malicious content</li>
              <li>Interfere with platform operations</li>
            </ul>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">4. Educational Content</h2>
            <p>
              All lessons, games, stories, quizzes, and simulations are intended for educational purposes only. Users remain solely responsible for any real-world financial decisions they make.
            </p>

            <div className="bg-[#8B5CF6]/20 border-[3px] border-[#8B5CF6] rounded-xl p-6 my-8">
              <h2 className="text-2xl font-black text-[#18181B] dark:text-white mb-4">5. Virtual Investing</h2>
              <p>PiggyPath includes a simulated investment environment. Virtual portfolios:</p>
              <ul className="list-disc pl-6 space-y-1 font-bold text-[#18181B] dark:text-[#F4F4F5]">
                <li>Do not represent real investments</li>
                <li>Do not involve actual securities</li>
                <li>Do not guarantee future performance</li>
                <li>Cannot be redeemed for money</li>
              </ul>
              <p className="font-bold mt-4 text-[#18181B] dark:text-[#F4F4F5]">
                Users acknowledge that virtual performance should not be relied upon as investment advice.
              </p>
            </div>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">6. Virtual Coins & Rewards</h2>
            <p>Coins, XP, badges, avatars, cosmetics, and achievements are virtual platform assets. Unless explicitly stated in official promotions, these assets:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Have no monetary value</li>
              <li>Cannot be exchanged for cash</li>
              <li>Cannot be transferred outside PiggyPath</li>
            </ul>
            <p>PiggyPath reserves the right to modify reward structures at any time.</p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">7. Premium Features</h2>
            <p>Certain features may require a paid subscription or purchase. These may include:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Virtual Stock Simulator</li>
              <li>Premium Games</li>
              <li>Exclusive Challenges</li>
              <li>Advanced Learning Journeys</li>
            </ul>
            <p>Availability may change without notice.</p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">8. Merchandise & Digital Products</h2>
            <p>
              Physical and digital products purchased through PiggyPath are subject to applicable shipping, refund, and purchase policies. Separate terms may apply to promotional campaigns.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">9. Community & Messaging</h2>
            <p>Users may interact through:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Friend requests</li>
              <li>Messaging</li>
              <li>Leaderboards</li>
            </ul>
            <p>
              Users must behave respectfully. PiggyPath may remove content or suspend accounts that violate community standards.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">10. Intellectual Property</h2>
            <p>All PiggyPath content, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Branding</li>
              <li>Logos</li>
              <li>Stories</li>
              <li>Games</li>
              <li>Graphics</li>
              <li>Characters</li>
              <li>Designs</li>
              <li>Source materials</li>
            </ul>
            <p>
              are owned or licensed by PiggyPath and protected by applicable intellectual property laws. Users may not reproduce or distribute platform content without written permission.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">11. Availability</h2>
            <p>
              We strive to maintain uninterrupted service but do not guarantee continuous availability. Features may be modified, updated, or discontinued at any time.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">12. Disclaimer of Warranties</h2>
            <p>
              PiggyPath is provided on an "as available" and "as is" basis. To the maximum extent permitted by law, PiggyPath disclaims all warranties, express or implied.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">13. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law, PiggyPath shall not be liable for:</p>
            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>Investment losses</li>
              <li>Lost profits</li>
              <li>Indirect damages</li>
              <li>Data loss</li>
              <li>Business interruption</li>
              <li>Consequential damages arising from use of the platform</li>
            </ul>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">14. Account Termination</h2>
            <p>
              Users may delete their accounts at any time. PiggyPath may suspend or terminate accounts for violations of these Terms, fraud, abuse, or harmful activity.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">15. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of the jurisdiction in which PiggyPath operates, without regard to conflict of law principles.
            </p>

            <h2 className="text-2xl font-black text-[#18181B] dark:text-white mt-12 mb-4">16. Changes to Terms</h2>
            <p>
              PiggyPath may update these Terms periodically. Continued use of the platform after updates constitutes acceptance of the revised Terms.
            </p>

            <div className="bg-[#18181B] dark:bg-white text-white dark:text-[#18181B] rounded-2xl p-8 mt-12 shadow-[8px_8px_0_#8B5CF6]">
              <h2 className="text-2xl font-black mb-4">17. Contact Us</h2>
              <p className="font-bold mb-4">For legal inquiries:</p>
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

export default TermsOfServicePage;
