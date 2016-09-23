System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Product;
    return {
        setters:[],
        execute: function() {
            Product = (function () {
                function Product(name, price, date) {
                    this.name = name;
                    this.price = price;
                    this.date = date;
                }
                return Product;
            }());
            exports_1("Product", Product);
        }
    }
});
//# sourceMappingURL=product.model.js.map