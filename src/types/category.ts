
export type Category = {
    name:string,
    description:string,
    image:string
    isActive?:boolean
    dietType:"veg"| "non-veg"| "mixed"
    usedByCount?:number
    _id:string
}

export type Tags = {
    name:string
    color:string
    _id:string
}

export type ShopCategory = {
    category:Category,
    displayName:string,
    isEnabled:boolean
    isFeatured:boolean
    products: string[] | []
    shop:string
    tags:Tags[] | []
    _id:string
}