

class CartItem {
    constructor(product, quantity) {
        this.product = product
        this.quantity = quantity
    };

    itemPrice = () => {
        return this.product.price * this.quantity
    }

}