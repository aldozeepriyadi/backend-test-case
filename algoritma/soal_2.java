public class soal_2 {
    public static void main(String[] args) {
        String sentence = "Saya sangat senang mengerjakan soal algoritma";
        String longestWord = findLongestWord(sentence);
        System.out.println(longestWord);
    }

    public static String findLongestWord(String sentence) {
        
        String[] words = sentence.split(" ");
        
       
        String longest = "";

       
        for (String word : words) {
            if (word.length() > longest.length()) {
                longest = word;
            }
        }

        // Menampilkan kata terpanjang dan panjangnya
        return longest + ": " + longest.length() + " character";
    }
}
