import React, { useState } from 'react';
import { Test } from '../../types/models';
import { Search, X, Check } from 'lucide-react';

interface SearchableTestSelectorProps {
  tests: Test[];
  selectedTests: Test[];
  onSelectionChange: (tests: Test[]) => void;
  isLoading?: boolean;
}

export default function SearchableTestSelector({
  tests,
  selectedTests,
  onSelectionChange,
  isLoading,
}: SearchableTestSelectorProps) {
  const [search, setSearch] = useState('');

  const filtered = tests.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description?.toLowerCase().includes(search.toLowerCase())
  );

  const isSelected = (test: Test) => selectedTests.some(s => s.id === test.id);

  const toggleTest = (test: Test) => {
    if (isSelected(test)) {
      onSelectionChange(selectedTests.filter(s => s.id !== test.id));
    } else {
      onSelectionChange([...selectedTests, test]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tests..."
          className="w-full pl-9 pr-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filtered.map(test => (
            <button
              key={test.id}
              onClick={() => toggleTest(test)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-colors ${
                isSelected(test)
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-white hover:bg-muted/30'
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{test.name}</p>
                {test.description && (
                  <p className="text-xs text-muted-foreground">{test.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-bold text-primary">₹{test.price}</span>
                {isSelected(test) && <Check className="h-4 w-4 text-primary" />}
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-4">No tests found</p>
          )}
        </div>
      )}

      {selectedTests.length > 0 && (
        <div className="bg-primary/5 rounded-xl p-3">
          <p className="text-xs font-bold text-primary mb-1">{selectedTests.length} test(s) selected</p>
          <p className="text-xs text-muted-foreground">
            Total: ₹{selectedTests.reduce((sum, t) => sum + t.price, 0)}
          </p>
        </div>
      )}
    </div>
  );
}
