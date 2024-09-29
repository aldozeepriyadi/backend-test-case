import java.util.HashMap;

public class soal_3 {
    public static void main(String[] args) {
        String[] INPUT = {"xc", "dz", "bbb", "dz"};
        String[] QUERY = {"bbb", "ac", "dz"};

        int[] result = countOccurrences(INPUT, QUERY);

        
        for (int count : result) {
            System.out.print(count + " ");
        }
    }

    public static int[] countOccurrences(String[] input, String[] query) {
       
        HashMap<String, Integer> frequencyMap = new HashMap<>();

        
        for (String word : input) {
            frequencyMap.put(word, frequencyMap.getOrDefault(word, 0) + 1);
        }

        
        int[] result = new int[query.length];

        
        for (int i = 0; i < query.length; i++) {
            result[i] = frequencyMap.getOrDefault(query[i], 0);
        }

        return result;
    }
}
