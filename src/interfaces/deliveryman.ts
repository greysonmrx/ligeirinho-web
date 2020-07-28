export interface Deliveryman {
  id: string;
  name: string;
  email: string;
  avatar_id: string;
  avatar?: {
    id: string;
    name: string;
    path: string;
    url: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ResponseListDeliverymen {
  deliverymen: Deliveryman[];
  current_page: number;
  page_count: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}
