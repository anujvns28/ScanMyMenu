
export type ShopDetails = {
    address:{
        area:string,
        city:string,
        pincode:string
    },
    contactInfo:{
        email:string,
        ownerName:string,
        phone:string
    },
    shopProfile:{
        logo:string,
        name:string
    },
    timing:{
        closeTime:string,
        openTime:string
    }
    isActive:boolean,
    owner:string,
    rating:number,
    reviewCount:number,
    totalScans:number,
    _id:string
}