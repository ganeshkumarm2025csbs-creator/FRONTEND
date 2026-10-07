/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Target, 
  Eye, 
  Sparkles,
  Sliders,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

import { ActivePanel, NavTab, DocumentItem, ReviewFieldItem } from './types';
import { INITIAL_DOCUMENTS, INITIAL_REVIEW_FIELDS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { DashboardHeader } from './components/DashboardHeader';
import { FeatureCard } from './components/FeatureCard';
import { SideDrawer } from './components/SideDrawer';
import { DocumentsPanel } from './components/DocumentsPanel';
import { ConfidencePanel } from './components/ConfidencePanel';
import { ReviewPanel } from './components/ReviewPanel';
import { UploadModal } from './components/UploadModal';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // App State
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [reviewFields, setReviewFields] = useState<ReviewFieldItem[]>(INITIAL_REVIEW_FIELDS);

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddDocument = (newDoc: DocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
    showToast(`Successfully processed "${newDoc.name}" with 94% confidence!`);
  };

  const handleUpdateReviewField = (updatedField: ReviewFieldItem) => {
    setReviewFields((prev) =>
      prev.map((f) => (f.id === updatedField.id ? updatedField : f))
    );
    if (updatedField.status === 'verified') {
      showToast(`Field "${updatedField.fieldName}" verified.`);
    }
  };

  const pendingReviewCount = reviewFields.filter((f) => f.status === 'needs_review').length;

  return (
    <div className="min-h-screen bg-[#F8F5EF] flex">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#123B67] text-white text-xs sm:text-sm font-semibold shadow-xl border border-[#6FA9DC]/40 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#3AA889]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Sidebar (Fixed 240px width on desktop) */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'dashboard') {
            setActivePanel(null);
          }
        }}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onOpenDocumentsDrawer={() => setActivePanel('documents')}
      />

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-[240px] flex flex-col min-h-screen transition-all">
        <div className="max-w-5xl mx-auto w-full px-5 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 flex-1 flex flex-col justify-between">
          
          <div>
            {/* Top Header */}
            <DashboardHeader
              onOpenMobileMenu={() => setMobileMenuOpen(true)}
              onOpenUpload={() => setIsUploadOpen(true)}
              totalDocuments={documents.length}
            />

            {/* If tab is not dashboard, show clean secondary view with a return button */}
            {currentTab === 'history' && (
              <div className="p-8 rounded-3xl bg-white border border-[#E3E7EC] text-center mb-8">
                <Clock className="w-10 h-10 text-[#6FA9DC] mx-auto mb-3" />
                <h3 className="text-xl font-bold text-[#123B67]">Extraction Processing Logs</h3>
                <p className="text-sm text-[#687A91] mt-1 mb-4">
                  Past 30 days: 148 documents ingested • 0 critical OCR errors • 99.4% uptime
                </p>
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="px-4 py-2 rounded-xl bg-[#E7F2FC] text-[#123B67] text-xs font-bold hover:bg-[#6FA9DC]/20 transition-all cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            )}

            {currentTab === 'settings' && (
              <div className="p-8 rounded-3xl bg-white border border-[#E3E7EC] text-center mb-8">
                <Sliders className="w-10 h-10 text-[#8D82D8] mx-auto mb-3" />
                <h3 className="text-xl font-bold text-[#123B67]">Parsing Configuration</h3>
                <p className="text-sm text-[#687A91] mt-1 mb-4">
                  Confidence Threshold: 90% • Auto-Verification: Enabled • Export Encoding: UTF-8
                </p>
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="px-4 py-2 rounded-xl bg-[#E7F2FC] text-[#123B67] text-xs font-bold hover:bg-[#6FA9DC]/20 transition-all cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            )}

            {/* Exactly THREE Large Feature Cards Arranged Vertically */}
            <div className="space-y-4 sm:space-y-5">
              {/* Card 1: Documents Processed */}
              <FeatureCard
                title="Documents Processed"
                description="View the documents that have been processed and extracted."
                icon={<FileText className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />}
                iconBgColor="bg-[#E7F2FC]"
                iconColor="text-[#123B67]"
                badgeText={`${documents.length} Files`}
                badgeBgColor="bg-[#E7F2FC]"
                badgeTextColor="text-[#123B67]"
                onClick={() => setActivePanel('documents')}
                isActive={activePanel === 'documents'}
              />

              {/* Card 2: Accuracy / Confidence Level */}
              <FeatureCard
                title="Accuracy / Confidence Level"
                description="Check the AI confidence level for the extracted information."
                icon={<Target className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />}
                iconBgColor="bg-[#EEEAFB]"
                iconColor="text-[#8D82D8]"
                badgeText="94% Average"
                badgeBgColor="bg-[#E2F4EC]"
                badgeTextColor="text-[#3AA889]"
                onClick={() => setActivePanel('confidence')}
                isActive={activePanel === 'confidence'}
              />

              {/* Card 3: Review */}
              <FeatureCard
                title="Review"
                description="Manually review and validate the extracted data before export."
                icon={<Eye className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />}
                iconBgColor="bg-[#E2F4EC]"
                iconColor="text-[#3AA889]"
                badgeText={pendingReviewCount > 0 ? `${pendingReviewCount} Pending` : 'Verified'}
                badgeBgColor={pendingReviewCount > 0 ? 'bg-[#EEEAFB]' : 'bg-[#E2F4EC]'}
                badgeTextColor={pendingReviewCount > 0 ? 'text-[#8D82D8]' : 'text-[#3AA889]'}
                onClick={() => setActivePanel('review')}
                isActive={activePanel === 'review'}
              />
            </div>
          </div>

          {/* Bottom subtle summary bar */}
          <footer className="mt-10 pt-6 border-t border-[#E3E7EC]/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#687A91]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3AA889]" />
              <span>AI Multi-Modal Parser Engine active</span>
            </div>
            <div>
              <span>ParseAnything • Intelligent Document Pipeline</span>
            </div>
          </footer>
        </div>
      </main>

      {/* Side Drawer: Documents Processed */}
      <SideDrawer
        isOpen={activePanel === 'documents'}
        onClose={() => setActivePanel(null)}
        title="Documents Processed"
        subtitle="Here are the documents that have been processed and extracted successfully."
        headerIcon={<FileText className="w-5 h-5 text-[#123B67]" />}
      >
        <DocumentsPanel
          documents={documents}
          onOpenUploadModal={() => setIsUploadOpen(true)}
        />
      </SideDrawer>

      {/* Side Drawer: Accuracy & Confidence Level */}
      <SideDrawer
        isOpen={activePanel === 'confidence'}
        onClose={() => setActivePanel(null)}
        title="Accuracy & Confidence"
        subtitle="AI confidence levels for extracted information."
        headerIcon={<Target className="w-5 h-5 text-[#8D82D8]" />}
      >
        <ConfidencePanel />
      </SideDrawer>

      {/* Side Drawer: Review Extracted Data */}
      <SideDrawer
        isOpen={activePanel === 'review'}
        onClose={() => setActivePanel(null)}
        title="Review Extracted Data"
        subtitle="Manually validate extracted information before export."
        headerIcon={<Eye className="w-5 h-5 text-[#3AA889]" />}
      >
        <ReviewPanel
          fields={reviewFields}
          onUpdateField={handleUpdateReviewField}
          onOpenExportModal={() => setIsExportOpen(true)}
        />
      </SideDrawer>

      {/* Upload Modal Simulation */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddDocument={handleAddDocument}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        fields={reviewFields}
      />
    </div>
  );
}
