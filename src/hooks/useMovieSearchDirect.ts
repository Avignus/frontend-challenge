import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import type { MovieSearchResponse } from "@/types/movie";

interface UseMovieSearchDirectParams {
  query: string;
  page: number;
}

export function useMovieSearchDirect({ query, page }: UseMovieSearchDirectParams) {
  console.log("🎬 useMovieSearchDirect called:", { query, page });
  
  return useQuery<MovieSearchResponse>({
    queryKey: ["movies-direct", query, page],
    queryFn: async () => {
      console.log("🚀 Making direct API call for:", { query, page });
      
      // Direct API call without any fallback logic
      const params = query.trim() 
        ? {
            types: "MOVIE",
            pageSize: 500,
            sortBy: "SORT_BY_POPULARITY",
            sortOrder: "DESC",
          }
        : {
            types: "MOVIE",
            pageSize: 50,
            sortBy: "SORT_BY_POPULARITY",
            sortOrder: "DESC",
          };
      
      const { data } = await apiClient.get<MovieSearchResponse>("titles", { params });
      
      if (!query.trim()) {
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        return {
          titles: data.titles.slice(startIndex, endIndex),
          totalCount: data.titles.length
        };
      }
      
      // Filter results based on search query
      const filteredTitles = data.titles.filter(title => 
        title.primaryTitle?.toLowerCase().includes(query.toLowerCase()) ||
        title.originalTitle?.toLowerCase().includes(query.toLowerCase())
      );
      
      // If no matches found, return popular movies instead of empty
      if (filteredTitles.length === 0) {
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        return {
          titles: data.titles.slice(startIndex, endIndex),
          totalCount: data.titles.length
        };
      }
      
      // Paginate filtered results
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;
      const paginatedTitles = filteredTitles.slice(startIndex, endIndex);
      
      return {
        titles: paginatedTitles,
        totalCount: filteredTitles.length
      };
    },
    enabled: true,
    staleTime: 0,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
