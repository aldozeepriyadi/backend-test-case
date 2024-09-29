public class soal_1 {
    public static void main(String[] args) {
        String input = "NEGIE1";
        String output = reverseAlphabets(input);
        System.out.println(output); 
    }

    public static String reverseAlphabets(String str) {
        
        String alphabets = str.replaceAll("[0-9]", "");
        String numbers = str.replaceAll("[^0-9]", "");

       
        String reversedAlphabets = new StringBuilder(alphabets).reverse().toString();

        
        return reversedAlphabets + numbers;
    }
}
