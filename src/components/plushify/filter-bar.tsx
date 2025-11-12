"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ArrowUpDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  onSortChange?: (sort: string) => void;
  onFilterChange?: (filter: string) => void;
  onSearch?: (query: string) => void;
  defaultSort?: string;
  defaultFilter?: string;
  className?: string;
}

export function FilterBar({
  onSortChange,
  onFilterChange,
  onSearch,
  defaultSort = "newest",
  defaultFilter = "all",
  className,
}: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-lg border bg-card p-4 sm:flex-row sm:items-center",
        className
      )}
    >
      {/* Sort */}
      <div className="flex items-center gap-2 sm:w-48">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        <Select defaultValue={defaultSort} onValueChange={onSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="favorites">Favorites</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 sm:w-48">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select defaultValue={defaultFilter} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search generations..."
          className="pl-9"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
    </div>
  );
}
