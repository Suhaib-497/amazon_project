export const deliveryOptions=[{
    id:'1',
    deliverytime:7,
    priceCents:0
},{
    id:'2',
    deliverytime:3,
    priceCents:499
},{
    id:'3',
    deliverytime:1,
    priceCents:999
}];

export function getDeliveryOpition(deliveryoptionId){
    const deliveryoption = deliveryOptions.find(option => option.id === deliveryoptionId);
    return deliveryoption || deliveryOptions[0];
}