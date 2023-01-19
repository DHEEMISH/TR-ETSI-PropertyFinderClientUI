export interface House {
    title: string,
    description: string,
    propertyType: "Rental" | "For Sale",
    houseType: "Villa" | "Apartment" | "Office",
    propertyCost: string,
    deposit?: string,
    downpayment?: string,
    builtup: string,
    cityName: string,
    furnished: "Semi-furnished" | "Unfurnished" | "Fully-furnished",
    availableFrom: string,
    preferredCustomer: "All" | "Only-family" | "No-pets" | "No-Bachelors",
    houseOwnerName: string,
    ownerContact: number,
    propImgUrl: string
}


