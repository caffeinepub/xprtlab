import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, ChevronDown, FlaskConical, Check } from 'lucide-react';
import { Test } from '../../backend';
import { useGetAllTests } from '../../hooks/useQueries';

const PAGE_SIZE = 20;

interface SearchableTestSelectorProps {
  value: Test | null;
  onChange: (test: Test | null) => void;
  disabled?: boolean;
  error?: string;
}

export default function SearchableTestSelector({
  value,
  onChange,
  disabled = false,
  error,
}: SearchableTestSelectorProps) {
  const { data: allTests = [], isLoading } = useGetAllTests();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 300ms debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTests = useCallback(() => {
    if (!debouncedQuery.trim()) return allTests;
    const q = debouncedQuery.toLowerCase();
    return allTests.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q),
    );
  }, [allTests, debouncedQuery])();

  const paginatedTests = filteredTests.slice(0, page * PAGE_SIZE);
  const hasMore = paginatedTests.length < filteredTests.length;

  const handleSelect = (test: Test) => {
    onChange(test);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClear = () => {
    onChange(null);
    setSearchQuery('');
    setPage(1);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  };

  // If a test is selected, show read-only display
  if (value) {
    return (
      <div className="space-y-1">
        <div
          className={`flex items-center justify-between bg-muted/50 border rounded-xl px-3 py-3 ${
            error ? 'border-destructive' : 'border-border'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
              <FlaskConical className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{value.name}</p>
              <p className="text-xs text-muted-foreground">
                Code: {value.id} · ₹{Number(value.price).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="ml-2 w-7 h-7 rounded-lg bg-muted hover:bg-destructive/10 flex items-center justify-center transition-colors flex-shrink-0"
              title="Clear selection"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
            </button>
          )}
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative space-y-1">
      {/* Search Input */}
      <div
        className={`flex items-center gap-2 border rounded-xl px-3 py-2.5 bg-background transition-colors ${
          isOpen ? 'border-primary ring-2 ring-primary/20' : error ? 'border-destructive' : 'border-border'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}`}
        onClick={() => {
          if (!disabled) {
            setIsOpen(true);
            inputRef.current?.focus();
          }
        }}
      >
        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search by test name, code, or description..."
          disabled={disabled}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
        />
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              Loading tests...
            </div>
          ) : filteredTests.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              No tests found for "{debouncedQuery}"
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto">
              {paginatedTests.map((test) => (
                <button
                  key={test.id}
                  type="button"
                  onClick={() => handleSelect(test)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-primary/5 transition-colors text-left border-b border-border/50 last:border-0"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FlaskConical className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{test.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {test.id} · ₹{Number(test.price).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <Check className="w-4 h-4 text-primary opacity-0 flex-shrink-0" />
                </button>
              ))}
              {hasMore && (
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  className="w-full py-2.5 text-xs text-primary font-medium hover:bg-primary/5 transition-colors"
                >
                  Load more ({filteredTests.length - paginatedTests.length} remaining)
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
