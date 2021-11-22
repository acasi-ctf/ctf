import java.util.*;

class Prize {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("\fThere are 3 doors. One of them has a prize behind it.");
        String input = "Yes";
        double ctr = 0;
        double points = 0;
        while (input.equalsIgnoreCase("Yes")) {
            System.out.println("Choose door 1, 2 or 3 by typing the number and pressing enter");
            int choice = sc.nextInt();
            int door = (int) (Math.random() * 3) + 1;
            int open = door;
            switch (choice) {
                case 1:
                    while (open == 1 || open == door)
                        open = (int) (Math.random() * 3) + 1;
                    break;
                case 2:
                    while (open == 2 || open == door)
                        open = (int) (Math.random() * 3) + 1;
                    break;
                case 3:
                    while (open == 3 || open == door)
                        open = (int) (Math.random() * 3) + 1;
                    break;
                default:
                    System.out.println("Invalid");
                    continue;
            }
            System.out.println("Door " + open + " does not contain the prize.\nEnter Yes to change your choice.");
            input = sc.next();
            if (input.equalsIgnoreCase("Yes")) {
                System.out.println("Enter your new door choice");
                choice = sc.nextInt();
            }
            if (choice == door) {
                points++;
                System.out.println("You chose: Door " + choice + "\nCongratulations, you win!!\nYou have: " + points + " point/s");
            } else
                System.out.println("You chose: Door " + choice + "\nYou lost.Better luck next time!");
            System.out.println("Would you like to play again? Enter 'Yes' or 'No'.");
            ctr++;
            input = sc.next();
        }
        double percent = (points / ctr) * 100;
        System.out.println("Percentage of games won: " + percent + "%");
    }
}