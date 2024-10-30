// src/types.ts

export interface Movie {
    name: string;
    overview: string;
    rating?: number | null;
    poster_path?: string | null;
    release_year: string;
  }
  