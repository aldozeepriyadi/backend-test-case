public class soal_4 {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 0},
            {4, 5, 6},
            {7, 8, 9}
        };

        int result = diagonalDifference(matrix);
        System.out.println("Hasil pengurangan diagonal: " + result); 
    }

    public static int diagonalDifference(int[][] matrix) {
        int primaryDiagonalSum = 0;
        int secondaryDiagonalSum = 0;
        int n = matrix.length;

        
        for (int i = 0; i < n; i++) {
            primaryDiagonalSum += matrix[i][i];
        }

        
        for (int i = 0; i < n; i++) {
            secondaryDiagonalSum += matrix[i][n - 1 - i];
        }

       
        return Math.abs(primaryDiagonalSum - secondaryDiagonalSum);
    }
}
