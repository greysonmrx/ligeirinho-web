export interface Recipient {
  id: string;
  name: string;
  street: string;
  number: number;
  complement: string;
  state: string;
  city: string;
  zip_code: string;
  created_at: string;
  updated_at: string;
}

export interface ResponseListRecipients {
  recipients: Recipient[];
  current_page: number;
  page_count: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}
