"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Radar, SearchX } from "lucide-react";
import OpportunityCard from "@/components/opportunity/OpportunityCard";
import OpportunityFilters from "@/components/opportunity/OpportunityFilters";
import { supabase } from "@/lib/supabase";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function OpportunityRadarPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [domainFilter, setDomainFilter] = useState("all");
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOpps() {
      const { data } = await supabase.from('opportunities').select('*').order('created_at', { ascending: false });
      if (data) setOpportunities(data);
      setLoading(false);
    }
    loadOpps();
  }, []);
  const filtered = useMemo(() => {
    return opportunities.filter((opp) => {
      const organization = opp.organization || opp.company || "";
      const matchesSearch = opp.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) || organization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        typeFilter === "all" || opp.type === typeFilter;
      const matchesDomain =
        domainFilter === "all" || opp.domain === domainFilter;
      return matchesSearch && matchesType && matchesDomain;
    });
  }, [searchQuery, typeFilter, domainFilter, opportunities]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <Radar className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Opportunity Radar</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} opportunities matched for you
          </p>
        </div>
      </div>

      {/* Filters */}
      <OpportunityFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        domainFilter={domainFilter}
        onDomainChange={setDomainFilter}
      />

      {/* Grid */}
      {filtered.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((opp) => (
            <motion.div key={opp.id} variants={fadeUp}>
              <OpportunityCard opportunity={opp} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <SearchX className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No opportunities found</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Try adjusting your filters or search query to discover more
            opportunities.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
