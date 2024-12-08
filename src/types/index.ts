export interface School {
  id: number;
  short_name: string;
  [key: string]: any;
}

export interface OrderData {
  school_id: number;
  class: string;
  number: string;
  real_name: string;
  need_sticker: boolean;
}
