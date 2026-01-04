import type { CategoryDto, ProductDto } from "./catalog.dto";
import type { Category, Product } from "./catalog.model";

export const mapCategoryDtoToCategory = (dto: CategoryDto): Category => {
    return {
        slug: dto.slug,
        categoryName: dto.name,
        url: dto.url
    }
}

export const mapProductDtoToProduct = (dto: ProductDto): Product => {
    const hasDiscount = dto.discountPercentage > 0;
    return {
        id: dto.id,
        productName: dto.title,
        price: dto.price,
        originalPrice: hasDiscount
            ? Math.round(dto.price / (1 - dto.discountPercentage / 100))
            : undefined,
        rating: dto.rating,
        reviewCount: dto.reviews.length,

        brand: dto.brand,
        category: dto.category,

        image: dto.thumbnail,
        gallery: dto.images,

        tags: dto.tags,

        inStock: dto.stock > 0,
        stockCount: dto.stock,
        availabilityStatus: dto.availabilityStatus,

        createdAt: new Date(dto.meta.createdAt),
        updatedAt: new Date(dto.meta.updatedAt)
    }
}