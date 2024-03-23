'use client';
import { AuthGuard } from '@/components/protected-route/components/AuthGuard';
import AdminSidebar from '../../components/SidebarDashboard';
import HeaderJournal from './components/HeaderJournal';
import JournalPicker from './components/JournalPicker';

const JournalPage = () => {
  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8 min-h-screen">
      <AdminSidebar />
      <div className="w-full space-y-4">
        <HeaderJournal />
        <div className="flex-wrap">
          <JournalPicker />
        </div>
      </div>
    </div>
  );
};

export default AuthGuard(JournalPage);
