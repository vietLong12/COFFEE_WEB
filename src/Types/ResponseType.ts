interface Pagination {
  currentPage: number;
  totalDocuments: number;
  totalPages: number;
}
interface Sizes {
  name: string;
  price: number;
  _id: string;
}

export interface ProductResponse {
  _id: string;
  productName: string;
  img: string;
  categoryId: string;
  comments: any[],
  desc: string;
  inStock: boolean;
  sizes: Sizes[];
  rating?: number;
  createdAt: string;
}

export interface GetProductListResponse {
  status: string;
  code: number;
  products: ProductResponse[];
  pagination: Pagination;
}
