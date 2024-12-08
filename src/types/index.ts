export interface School {
  id: number;
  short_name: string;
  full_name: string;
  plan: PartnerPlan;
}

export enum PartnerPlan {
  Personal = 'Personal',
  GroupA = 'GroupA',
  GroupB = 'GroupB',
  Combined = 'Combined',
}

export interface OrderData {
  school_id: number;
  class: string;
  number: string;
  real_name: string;
  need_sticker: boolean;
}

export interface Order {
  id: number;
  created_at: string | null;
  updated_at: string | null;
  member_id: string | null;
  school_id: number;
  class: string;
  number: string;
  real_name: string;
  need_sticker: boolean;
  is_paid: boolean;
}

export interface FederatedAuthLinkRequest {
  flow: 'authorization_code' | 'token';
  grant_value: string;
  redirect_uri?: string;
}
