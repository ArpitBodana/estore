

export type ProductType = {

    name: string,
    image: string,
    _id: string,
    brand: string,
    description: string,
    createdAt: string,
    countInStock: number,
    rating: number,
    numOfReviews: number,
    price: number,
    category?: string,

}

export type ProductComponentType = {
    products: ProductType[]
}

export type ProductRating = {
    rating: number,
    numOfReviews?: number,
    caption?: string
}

export type CartProductType = {
    name: string,
    image: string,
    _id: string,
    brand: string,
    description: string,
    createdAt: string,
    countInStock: number,
    rating: number,
    numOfReviews: number,
    price: number,
    quantity: number

}