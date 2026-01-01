export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    sku: string,
    brand: string;
    category: string;
    dimensions: Dimension,
    discountPercentage: number,
    availabilityStatus: string,
    stock: number
    rating: number;
    reviews: Review[],
    images: string[],
    shippingInformation: string,
    thumbnail: string,
    tags: string[],
    warrantyInformation: string,
    weight: number,
    meta: Meta
}

type Dimension = {
    width: number,
    height: number,
    depth: number
}

type Review = {
    date: string,
    comment: string,
    rating: number,
    reviewerName: string,
    reviewerEmail: string
}

type Meta = {
    createdAt: string,
    barcode: string,
    qrCode: string,
    updatedAt: string
}