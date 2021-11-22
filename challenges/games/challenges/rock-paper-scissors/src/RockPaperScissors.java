import java.util.Scanner;

public class RockPaperScissors {
    public static void main(String[] args) throws Exception {
        System.out.println("\fLet's play rock, paper, scissors!");
        int n = 9;
        while (n != 0) {
            int compPlay = (int) (Math.random() * 3) + 1;
            Scanner sc = new Scanner(System.in);
            Thread.sleep(2000);
            System.out.println("Enter 1 for rock");
            Thread.sleep(1000);
            System.out.println("Enter 2 for paper");
            Thread.sleep(1000);
            System.out.println("Enter 3 for scissors");
            Thread.sleep(1000);
            int personPlay = sc.nextInt();
            if (compPlay == 1 && personPlay == 2)
                System.out.println("Paper covers rock. You win!!");
            else if (compPlay == 1 && personPlay == 3)
                System.out.println("Rock breaks scissors. You lose!");
            else if (compPlay == 2 && personPlay == 1)
                System.out.println("Paper covers rock. You lose!");
            else if (compPlay == 2 && personPlay == 3)
                System.out.println("Scissors cut paper. You win!!");
            else if (compPlay == 3 && personPlay == 1)
                System.out.println("Rock breaks scissors. You win!!");
            else if (compPlay == 3 && personPlay == 2)
                System.out.println("Scissors cut paper. You lose!");
            else if (compPlay == personPlay)
                System.out.println("It's a tie!! Try again.");
            if (personPlay > 3)
                System.out.println("Invalid input");
            System.out.println("Enter 4 to continue playing or enter 0 to quit");
            n = sc.nextInt();
        }
        System.out.println("Bye!!");
    }
}