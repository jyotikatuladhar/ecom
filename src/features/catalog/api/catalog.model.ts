

export interface Pagination {
    total: number,
    skip: number,
    limit: number
}

export interface ProductList {
    items: Product[],
    pagination: Pagination
}

export interface Product {
    id: number;
    productName: string;

    price: number;
    originalPrice?: number;
    discountPercent?: number;

    brand: string;
    category: string;

    availabilityStatus: 'in_stock' | 'out_of_stock' | 'preorder';
    inStock: boolean;
    stockCount: number;

    rating: number;
    reviewCount: number;

    image: string;
    gallery: string[];

    tags: string[];


    createdAt: Date;
    updatedAt: Date;
}

export interface ProductDetail extends Product {
    description: string;
    dimensions: Dimension;
    weight?: number;
    shippingInfo?: string;
    warrantyInfo?: string;

}

type Dimension = {
    width: number,
    height: number,
    depth: number
}

// category and categorydto doesnt have any difference in field names
export type Category = {
    slug: string;
    categoryName: string;
    url: string;
};
