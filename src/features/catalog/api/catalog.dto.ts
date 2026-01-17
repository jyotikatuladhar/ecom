// Contains all Data Transfer Objects as defined by DummyJSON at the moment

export type CategoryListResponseDto = CategoryDto[]

export interface CategoryDto {
    name: string;
    slug: string;
    url: string;
}

export interface ProductListResponseDto {
    total: number;
    skip: number;
    limit: number;
    products: ProductDto[];
}

export interface ProductPageListResponseDto {
    pageParams: number[],
    pages: ProductListResponseDto
}

export interface ProductDto {
    id: number;
    title: string;
    description: string;
    price: number;
    sku: string,
    brand: string;
    category: string;
    dimensions: DimensionDto;
    discountPercentage: number;
    availabilityStatus: 'in_stock' | 'out_of_stock' | 'preorder';
    stock: number;
    rating: number;
    reviews: ReviewDto[];
    images: string[];
    shippingInformation: string;
    thumbnail: string;
    tags: string[];
    warrantyInformation: string;
    weight: number;
    meta: MetaDto
}

type DimensionDto = {
    width: number,
    height: number,
    depth: number
}

type ReviewDto = {
    date: string,
    comment: string,
    rating: number,
    reviewerName: string,
    reviewerEmail: string
}

type MetaDto = {
    createdAt: string,
    barcode: string,
    qrCode: string,
    updatedAt: string
}