import { IFurnitureDB } from "../inventories";

export interface ICartShopItem {
  furniter: IFurnitureDB;
  amount: number;
}

export interface IStripeResponse {
  id: string;
  object: string;
  amount: number;
  amount_capturable: number;
  amount_details: AmountDetails;
  amount_received: number;
  application: null;
  application_fee_amount: null;
  automatic_payment_methods: null;
  canceled_at: null;
  cancellation_reason: null;
  capture_method: string;
  charges: Charges;
  client_secret: string;
  confirmation_method: string;
  created: number;
  currency: string;
  customer: null;
  description: null;
  invoice: null;
  last_payment_error: null;
  latest_charge: null;
  livemode: boolean;
  metadata: Metadata;
  next_action: null;
  on_behalf_of: null;
  payment_method: null;
  payment_method_options: PaymentMethodOptions;
  payment_method_types: string[];
  processing: null;
  receipt_email: null;
  review: null;
  setup_future_usage: null;
  shipping: null;
  source: null;
  statement_descriptor: null;
  statement_descriptor_suffix: null;
  status: string;
  transfer_data: null;
  transfer_group: null;
}

export interface AmountDetails {
  tip: Metadata;
}

export interface Metadata {}

export interface Charges {
  object: string;
  data: any[];
  has_more: boolean;
  total_count: number;
  url: string;
}

export interface PaymentMethodOptions {
  card: Card;
}

export interface Card {
  installments: null;
  mandate_options: null;
  network: null;
  request_three_d_secure: string;
}
