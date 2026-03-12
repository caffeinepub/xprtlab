import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Banknote,
  Building2,
  CheckCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import DailyRevenueOverviewModule from "../../components/admin/DailyRevenueOverviewModule";
import HospitalLedgerModule from "../../components/admin/HospitalLedgerModule";
import PhlebotomistCollectionsModule from "../../components/admin/PhlebotomistCollectionsModule";
import SettlementMarkingModule from "../../components/admin/SettlementMarkingModule";
import PageHeroHeader from "../../components/shared/PageHeroHeader";

interface RevenueSettlementsPageProps {
  onNavigate?: (path: string) => void;
  isDemoMode?: boolean;
}

export default function RevenueSettlementsPage({
  onNavigate: _onNavigate,
  isDemoMode = false,
}: RevenueSettlementsPageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 pb-[90px]">
      <div className="px-4 pt-4">
        <PageHeroHeader
          title="Revenue & Settlements"
          description="Track collections, hospital ledgers, and settlements"
        />
      </div>
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-start to-brand-end flex items-center justify-center shadow-md">
              <Banknote className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Revenue & Settlements
              </h1>
              <p className="text-sm text-gray-500">
                Financial overview, ledger management, and settlement tracking
                {isDemoMode && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                    Demo Mode
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6 bg-white border border-gray-200 rounded-xl p-1 shadow-sm h-auto gap-1">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 rounded-lg py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-start data-[state=active]:to-brand-end data-[state=active]:text-white"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Daily Overview</span>
              <span className="sm:hidden">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="ledger"
              className="flex items-center gap-2 rounded-lg py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-start data-[state=active]:to-brand-end data-[state=active]:text-white"
            >
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Hospital Ledger</span>
              <span className="sm:hidden">Ledger</span>
            </TabsTrigger>
            <TabsTrigger
              value="phlebotomist"
              className="flex items-center gap-2 rounded-lg py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-start data-[state=active]:to-brand-end data-[state=active]:text-white"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Phlebotomist</span>
              <span className="sm:hidden">Phlebo</span>
            </TabsTrigger>
            <TabsTrigger
              value="settlements"
              className="flex items-center gap-2 rounded-lg py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-start data-[state=active]:to-brand-end data-[state=active]:text-white"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Settlements</span>
              <span className="sm:hidden">Settle</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DailyRevenueOverviewModule isDemoMode={isDemoMode} />
          </TabsContent>

          <TabsContent value="ledger">
            <HospitalLedgerModule isDemoMode={isDemoMode} />
          </TabsContent>

          <TabsContent value="phlebotomist">
            <PhlebotomistCollectionsModule isDemoMode={isDemoMode} />
          </TabsContent>

          <TabsContent value="settlements">
            <SettlementMarkingModule isDemoMode={isDemoMode} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
