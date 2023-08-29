export interface IFurnitureDB {
  id: number;
  name: string;
  price: number;
  sku: string;
  description: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  high: number;
  width: number;
  long: number;
  stock: number;
  paragraphs: number;
  journey: number;
  weight: number;
  wholesale: number;
  retail: number;
  decorator: number;
  dropship: number;
  ordereded: number;
  images: Image[];
}

export interface Image {
  id: number;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface Formats {
  thumbnail: Small;
  small: Small;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
  provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}
