public class Coffee extends Product {
    
    private String origin;
    private String roast;
    private String flavor;
    private String aroma;
    private String acidity;
    private String body;


    public Coffee(String initialCode, String initialDescription, double initialPrice, String initialOrigin,
                  String initialRoast, String initialFlavor, String initialAroma, String initialAcidity,
                  String initialBody) {
        super(initialCode, initialDescription, initialPrice);
        this.origin = initialOrigin;
        this.roast = initialRoast;
        this.flavor = initialFlavor;
        this.aroma = initialAroma;
        this.acidity = initialAcidity;
        this.body = initialBody;
    }

    // Métodos de acceso para las nuevas variables de instancia
    public String getOrigin() {
        return this.origin;
    }

    public String getRoast() {
        return this.roast;
    }

    public String getFlavor() {
        return this.flavor;
    }

    public String getAroma() {
        return this.aroma;
    }

    public String getAcidity() {
        return this.acidity;
    }

    public String getBody() {
        return this.body;
    }

    @Override
    public String toString() {
        return super.toString() + "_" + this.origin + "_" + this.roast + "_" + this.flavor + "_" +
               this.aroma + "_" + this.acidity + "_" + this.body;
    }
}
