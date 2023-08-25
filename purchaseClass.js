export class purchase{
    productName;
    price;
    quantity;
    size;
    totalSum;

    constructor(productName, price, quantity, size){
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
        this.size = size;
        this.totalSum = (price*quantity).toFixed(2);
    }
}