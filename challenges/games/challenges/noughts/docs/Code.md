# Code 

The following is the code that runs to allow you to play Noughts and Crosses

```java
import java.util.*;

class Noughts {
    public void printBoard(int[][] game) {
        for (int i = 0; i < game.length; i++) {
            for (int j = 0; j < game[i].length; j++)
                System.out.print(game[i][j] + " ");
            System.out.println();
        }
    }

    public static void main() {
        System.out.println("\fLet's play crosses and noughts!");
        System.out.println("Rows run from 0 (top) to 2 (bottom) and columns run from 0 (left) to 2 (right)");
        Scanner sc = new Scanner(System.in);
        int game[][] = {{0, 0, 0}, {0, 0, 0}, {0, 0, 0}};
        Noughts obj = new Noughts();
        obj.printBoard(game);
        boolean win = false;
        int ctr;
        int a, b, c, d, i, j;
        while (win == false) {
            ctr = 0;
            while (true) {
                System.out.println("Team 1 enter row and column");
                a = sc.nextInt();
                b = sc.nextInt();
                if (game[a][b] == 0) {
                    game[a][b] = 1;
                    break;
                } else
                    System.out.println("Space full!");
            }
            obj.printBoard(game);
            String s1, s2, s3, s4;
            for (i = 0; i < game.length; i++) {
                s1 = s2 = s3 = s4 = "";
                for (j = 0; j < game[i].length; j++) {
                    s1 += Integer.toString(game[i][j]);
                    s2 += Integer.toString(game[j][i]);
                    s3 += Integer.toString(game[j][j]);
                    s4 += Integer.toString(game[j][3 - j - 1]);
                    if (s1.equals("111") || s2.equals("111") || s3.equals("111") || s4.equals("111")) {
                        System.out.println("Team 1 wins!!");
                        System.exit(0);
                    } else if (s1.equals("222") || s2.equals("222") || s3.equals("222") || s4.equals("222")) {
                        System.out.println("Team 2 wins!!");
                        System.exit(0);
                    } else if (i == 2) {
                        for (int k = 0; k < game.length; k++)
                            for (int l = 0; l < game[k].length; l++)
                                if (game[k][l] == 0)
                                    ctr++;
                        if (ctr == 0) {
                            System.out.println("Tie!!");
                            System.exit(0);
                        }
                    }
                }
            }

            while (true) {
                System.out.println("Team 2 enter row and column");
                c = sc.nextInt();
                d = sc.nextInt();
                if (game[c][d] == 0) {
                    game[c][d] = 2;
                    break;
                } else
                    System.out.println("Space full!");
            }

            obj.printBoard(game);

            for (i = 0; i < game.length; i++) {
                s1 = s2 = s3 = s4 = "";
                for (j = 0; j < game[i].length; j++) {
                    s1 += Integer.toString(game[i][j]);
                    s2 += Integer.toString(game[j][i]);
                    s3 += Integer.toString(game[j][j]);
                    s4 += Integer.toString(game[j][3 - j - 1]);
                    if (s1.equals("111") || s2.equals("111") || s3.equals("111") || s4.equals("111")) {
                        System.out.println("Team 1 wins!!");
                        win = true;
                    } else if (s1.equals("222") || s2.equals("222") || s3.equals("222") || s4.equals("222")) {
                        System.out.println("Team 2 wins!!");
                        win = true;
                    } else if (i == 2) {
                        for (int k = 0; k < game.length; k++)
                            for (int l = 0; l < game[k].length; l++)
                                if (game[k][l] == 0)
                                    ctr++;
                        if (ctr == 0) {
                            System.out.println("Tie!!");
                            win = true;
                        }
                    }
                }
            }

        }
    }
}         
```