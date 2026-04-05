type Product = {
    image:string,
    name:string,
    _id:string,
    qty?:number,
}

export type OrderItems = {
    type:string,
    qty:number,
    price:number,
    name:string,
    image:string,
    product?:Product,
    items: Product[] | [],
    offer?:string
}

export type OrderDetails = {
    createdAt :string,
    gst:string
    instructions:string
    items:OrderItems[]
    orderNumber:string
    orderType:string
    paymentStatus:string
    phone:string
    razorpayOrderId:string
    razorpayPaymentId:string
    shop:{_id:string}
    status:string
    subtotal:number
    tableNo:string
    total:number
    user:string
    _id:string

}