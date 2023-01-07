export interface PropertyRegistrationDto {
    description: string;
    title: string;
    propertyType: string;
    postedOn: string;
    propertyCost: string;
    costTobeDisplayed: boolean;
    availableFrom:Date;
    propImgUrl:string;
    FkCityName:string;
    isActiveProperties:boolean;
    propertyConfig: number;
}