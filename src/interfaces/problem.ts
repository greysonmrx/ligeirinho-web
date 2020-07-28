import { Delivery } from './delivery';

export interface Problem {
  id: string;
  delivery_id: string;
  description: string;
  delivery: Delivery;
  created_at: string;
  updated_at: string;
}

export interface ResponseListProblems {
  problems: Problem[];
  current_page: number;
  page_count: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}
