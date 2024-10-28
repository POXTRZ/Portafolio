public class Product {
    private String code;
    private String description;
    private double price;  

    public Product (String initialCode, String initialDescription, double initialPrice){
        this.code = initialCode;
        this.description = initialDescription;
        this.price = initialPrice;
    }
    // Getters and Setters for
    public String getCode(){
        return this.code;
    }

    public String getDescription(){
        return this.description;
    }
    public double getPrice(){
        return this.price;
    }
   
    // Sobrescribe (override)
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        Product product = (Product) object;
        return this.code.equals(product.code);
    }

    // Sobrescribe (override)
    public String toString() {
        return String.format("%s_%s_%.2f", this.code, this.description, this.price);
    }
}
