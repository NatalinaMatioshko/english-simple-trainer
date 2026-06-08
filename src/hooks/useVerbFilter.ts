import { useMemo, useState } from "react";
import { verbs } from "../data/verbs";
import type { Filter } from "../types/trainer";

export function useVerbFilter() {
  const [filter, setFilter] = useState<Filter>("all");
  const [revealedVerbs, setRevealedVerbs] = useState<string[]>([]);

  const filteredVerbs = useMemo(() => {
    return filter === "all"
      ? verbs
      : verbs.filter((verb) => verb.cat === filter);
  }, [filter]);

  const toggleVerbReveal = (base: string) => {
    setRevealedVerbs((prev) =>
      prev.includes(base)
        ? prev.filter((item) => item !== base)
        : [...prev, base],
    );
  };

  return {
    filter,
    setFilter,
    filteredVerbs,
    revealedVerbs,
    toggleVerbReveal,
  };
}
