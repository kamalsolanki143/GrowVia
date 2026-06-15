"use client";

import { Search, Filter } from "lucide-react";

interface OpportunityFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
  domainFilter: string;
  onDomainChange: (value: string) => void;
}

export default function OpportunityFilters({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeChange,
  domainFilter,
  onDomainChange,
}: OpportunityFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search opportunities..."
          className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Filter className="h-4 w-4 hidden sm:block" />
        </div>

        {/* Type dropdown */}
        <select
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
          className="h-10 px-3 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all cursor-pointer appearance-none min-w-[130px]"
        >
          <option value="all">All Types</option>
          <option value="internship">Internship</option>
          <option value="fellowship">Fellowship</option>
          <option value="hackathon">Hackathon</option>
          <option value="competition">Competition</option>
        </select>

        {/* Domain dropdown */}
        <select
          value={domainFilter}
          onChange={(e) => onDomainChange(e.target.value)}
          className="h-10 px-3 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all cursor-pointer appearance-none min-w-[130px]"
        >
          <option value="all">All Domains</option>
          <option value="All">All Domains (Gen)</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Web Dev">Web Dev</option>
        </select>
      </div>
    </div>
  );
}
