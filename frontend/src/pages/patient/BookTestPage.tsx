import React, { useState } from 'react';
import { Search, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useGetAllTests } from '../../hooks/useQueries';
import { TestOutput } from '../../backend';

interface BookTestPageProps {
  onNavigate?: (page: string, data?: any) => void;
}

export default function BookTestPage({ onNavigate }: BookTestPageProps) {
  const { data: tests = [], isLoading } = useGetAllTests();
  const [search, setSearch] = useState('');
  const [selectedTests, setSelectedTests] = useState<TestOutput[]>([]);

  const filteredTests = tests.filter(
    (t) =>
      t.isActive &&
      (t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.code.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleTest = (test: TestOutput) => {
    setSelectedTests((prev) =>
      prev.find((t) => t.id === test.id)
        ? prev.filter((t) => t.id !== test.id)
        : [...prev, test]
    );
  };

  const isSelected = (test: TestOutput) =>
    selectedTests.some((t) => t.id === test.id);

  const totalPrice = selectedTests.reduce((sum, t) => sum + Number(t.price), 0);

  const handleProceed = () => {
    if (selectedTests.length === 0) return;
    onNavigate?.('slot-selection', { selectedTests });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border bg-background">
        <h1 className="text-lg font-semibold text-foreground mb-3">Book a Test</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            className="pl-9"
            placeholder="Search tests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Test List */}
      <div className="flex-1 overflow-auto px-4 py-3 space-y-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : filteredTests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground">No tests found</p>
            <p className="text-xs text-muted-foreground mt-1">Try a different search term.</p>
          </div>
        ) : (
          filteredTests.map((test) => {
            const selected = isSelected(test);
            return (
              <div
                key={test.id}
                onClick={() => toggleTest(test)}
                className={[
                  'flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200',
                  selected
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/40',
                ].join(' ')}
              >
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-sm font-medium text-foreground truncate">{test.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                      {test.code}
                    </span>
                    <span className="text-xs text-muted-foreground">{test.sampleType}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-semibold text-foreground">
                    ₹{Number(test.price).toLocaleString('en-IN')}
                  </span>
                  <div
                    className={[
                      'w-7 h-7 rounded-full flex items-center justify-center transition-colors',
                      selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                    ].join(' ')}
                  >
                    {selected ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Cart Footer */}
      {selectedTests.length > 0 && (
        <div className="px-4 py-3 border-t border-border bg-background">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {selectedTests.length} test{selectedTests.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              ₹{totalPrice.toLocaleString('en-IN')}
            </span>
          </div>
          <Button className="w-full gap-2" onClick={handleProceed}>
            Proceed to Slot Selection
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
