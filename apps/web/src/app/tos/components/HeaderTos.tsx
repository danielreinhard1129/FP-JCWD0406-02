'use client';

import React, { useState } from 'react';
import TermsOfService from './Term';
import PrivacyPolicy from './Privacy';

interface TabContentProps {
  activeTab: 'terms' | 'privacy';
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  switch (activeTab) {
    case 'terms':
      return <TermsOfService />;
    case 'privacy':
      return <PrivacyPolicy />;
    default:
      return null;
  }
};

const TermsAndPrivacyTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="border-b">
        <div className="flex space-x-1 justify-center">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'terms'
                ? 'text-teal-700 border-b-2 border-teal-700'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('terms')}
          >
            Terms of Service
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'privacy'
                ? 'text-teal-700 border-b-2 border-teal-700'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy Policy
          </button>
        </div>
      </div>
      <div className="p-4">
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default TermsAndPrivacyTabs;
