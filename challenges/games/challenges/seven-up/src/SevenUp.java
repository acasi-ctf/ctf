import java.util.Scanner;

public class SevenUp {
    public static void main(String[] args) throws Exception {
        System.out.println("\fHello.");
        Thread.sleep(2000); // 3 seconds delay
        System.out.println("Let's play 7 up 7 down!");
        Thread.sleep(2000);
        int d1 = (int) (Math.random() * 6) + 1;
        int d2 = (int) (Math.random() * 6) + 1;
        int total = d1 + d2;
        Scanner sc = new Scanner(System.in);
        int n = 1;

        while (n != 0) {
            System.out.println("What do you predict?");
            System.out.println("Type 1 and press enter for less than 7");
            System.out.println("Type 2 and press enter for more than 7");
            System.out.println("Type 3 and press enter for exactly 7");
            int input = sc.nextInt();

            if (input != 1 && input != 2 && input != 3) {
                System.out.println("Invalid input");
                continue;
            } else
                System.out.println("Die 1 = " + d1 + "\nDie 2 = " + d2 + "\nTotal = " + total);

            if (total < 7 && input == 1 || total > 7 && input == 2 || total == 7 && input == 3)
                System.out.println("You win!!");
            else
                System.out.println("You lose!");

            System.out.println("Type 0 and press enter to quit and 4 to continue.");
            n = sc.nextInt();
            d1 = (int) (Math.random() * 6) + 1;
            d2 = (int) (Math.random() * 6) + 1;
            total = d1 + d2;
        }
        System.out.println("Bye!");
    }
}