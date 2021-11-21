# Code

The following is the code that runs to allow you to play Yahtzee. This is by far
the largest game of the java games and would normally be comprised of multiple files,
but we have placed them all here for you to view easily.

```java
/**
 * Simulates a single die.  The die has a number of
 * sides, it can be rolled, and it keeps its own
 * roll count.
 *
 * @author Anoushka Nadkarni
 * @version August 29, 2021
 */

public class Dice {
    // Declare integers for number of sides, count number of rolls,
    // value of a die roll
    int numSides;
    private int rollCount;
    private int value;

    // Constructor - assumes there are 6 sides to the die; initializes other fields
    public Dice() {
        numSides = 6;
        rollCount = value = 0;
        ;
    }

    // Constructor - parameter specifies the number of sides
    public Dice(int n) {
        numSides = n;
        rollCount = value = 0;

    }

    /**
     * Rolls the die to generate a random number
     *
     * @return a random number from the roll of the die
     */
    public int roll() {
        rollCount++;
        value = (int) (Math.random() * numSides) + 1;
        return value;
    }

    /**
     * Returns the number of rolls
     *
     * @return the number of rolls
     */
    public int getRollCount() {
        return rollCount;
    }

    /**
     * Returns the value of the die roll
     *
     * @return value of the die roll
     */
    public int getValue() {
        return value;
    }
}


/**
 * The group of die for each player
 *
 * @author Anoushka Nadkarni
 * @since 09/24/21
 */
public class DiceGroup {

    private Dice[] die;    // the array of dice
    // Create the seven different line images of a die
    private String[] line = {" _______ ",
            "|       |",
            "| O   O |",
            "|   O   |",
            "|     O |",
            "| O     |",
            "|_______|"};

    public DiceGroup() { //Constuctor
        die = new Dice[5];
        for (int i = 0; i < die.length; i++) {
            die[i] = new Dice(6);
        }
    }

    /**
     * Prints out the images of the dice
     */
    public void printDice() {
        printDiceHeaders();
        for (int i = 0; i < 6; i++) {
            System.out.print(" ");
            for (int j = 0; j < die.length; j++) {
                printDiceLine(die[j].getValue() + 6 * i);
                System.out.print("     ");
            }
            System.out.println();
        }
        System.out.println();
    }

    /**
     * Prints the first line of the dice.
     */
    public void printDiceHeaders() {
        System.out.println();
        for (int i = 1; i < 6; i++) {
            System.out.printf("   # %d        ", i);
        }
        System.out.println();
    }

    /**
     * Prints one line of the ASCII image of the dice.
     *
     * @param value The index into the ASCII image of the dice.
     */
    public void printDiceLine(int value) {
        System.out.print(line[getDiceLine(value)]);
    }

    /**
     * Gets the index number into the ASCII image of the dice.
     *
     * @param value The index into the ASCII image of the dice.
     */
    public int getDiceLine(int value) {
        if (value < 7) return 0;
        if (value < 14) return 1;
        switch (value) {
            case 20:
            case 22:
            case 25:
                return 1;
            case 16:
            case 17:
            case 18:
            case 24:
            case 28:
            case 29:
            case 30:
                return 2;
            case 19:
            case 21:
            case 23:
                return 3;
            case 14:
            case 15:
                return 4;
            case 26:
            case 27:
                return 5;
            default:    // value > 30
                return 6;
        }
    }

    /**
     * Rolls the dice but not the ones the player wants to skip
     *
     * @param skip the index of the rolls the player wants to skip
     */
    public void roll(int skip) {
        for (int i = 0; i < die.length; i++) {
            if (Integer.toString(skip).indexOf(Integer.toString(i + 1).toCharArray()[0]) == -1) {
                die[i].roll();
            }
        }
    }

    /**
     * Gets the value of the roll
     */
    public int getValue() {
        int value = 0;
        for (int i = 0; i < die.length; i++) {
            value += die[i].getValue();
        }
        return value;
    }

    /**
     * Gets the value of specific die
     *
     * @param dice which dice
     */
    public int getValue(int dice) {
        return die[dice].getValue();
    }
}

import java.io.BufferedReader;
        import java.io.InputStreamReader;
        import java.io.IOException;

/**
 * Prompt.java - Uses BufferedReader.
 * Provides utilities for user input.  This enhances the BufferedReader
 * class so our programs can recover from "bad" input, and also provides
 * a way to limit numerical input to a range of values.
 * <p>
 * The advantages of BufferedReader are speed, synchronization, and piping
 * data in Linux.
 *
 * @author your name
 * @since date
 */

public class Prompt {
    // BufferedReader variables
    private static InputStreamReader streamReader = new InputStreamReader(System.in);
    private static BufferedReader bufReader = new BufferedReader(streamReader);

    /**
     * Prompts user for string of characters and returns the string.
     *
     * @param ask The prompt line
     * @return The string input
     */
    public static String getString(String ask) {

        System.out.print(ask + " -> ");
        String input = "";
        try {
            input = bufReader.readLine();
        } catch (IOException e) {
            System.err.println("ERROR: BufferedReader could not read line");
        }
        return input;
    }

    /**
     * Prompts the user for a character and returns the character.
     *
     * @param ask The prompt line
     * @return The character input
     */
    public static char getChar(String ask) {
        return ' ';
    }

    /**
     * Prompts the user for an integer and returns the integer.
     *
     * @param ask The prompt line
     * @return The integer input
     */
    public static int getInt(String ask) {
        int val = 0;
        boolean found = false;
        while (!found) {
            String str = getString(ask);
            try {
                val = Integer.parseInt(str);
                found = true;
            } catch (NumberFormatException e) {
                found = false;
            }

        }

        return val;
    }

    /**
     * Prompts the user for an integer using a range of min to max,
     * and returns the integer.
     *
     * @param ask The prompt line
     * @param min The minimum integer accepted
     * @param max The maximum integer accepted
     * @return The integer input
     */
    public static int getInt(String ask, int min, int max) {
        int val = 0;
        boolean found = false;
        do {
            val = getInt(ask + " (" + min + ", " + max + ")");
        } while (val < min || val > max);
        return val;
    }

    /**
     * Prompts the user for a double and returns the double.
     *
     * @param ask The prompt line
     * @return The double input
     */
    public static double getDouble(String ask) {
        double val = 0.0;
        boolean found = false;
        while (!found) {
            String str = getString(ask);
            try {
                val = Double.parseDouble(str);
                found = true;
            } catch (NumberFormatException e) {
                found = false;
            }

        }

        return val;
    }

    /**
     * Prompts the user for a double and returns the double.
     *
     * @param ask The prompt line
     * @param min The minimum double accepted
     * @param max The maximum double accepted
     * @return The double input
     */
    public static double getDouble(String ask, double min, double max) {
        double val = 0.0;
        boolean found = false;
        do {
            val = getDouble(ask + " (" + min + ", " + max + ")");
        } while (val < min || val > max);
        return val;
    }
}

/**
 * A simple version of the Yahtzee game where the user plays against another user.
 * <p>
 * The objective of the game is to score the most amount of points
 *
 * @author Anoushka Nadkarni
 * @since 09/24/21
 */
public class Yahtzee {
    YahtzeePlayer player1; //Player 1
    YahtzeePlayer player2; //Player 2
    DiceGroup playerRoll1; //Player 1's dice
    DiceGroup playerRoll2; //Player 2's dice
    boolean firstTurn; //Checks who goes first
    int round; //Round number
    String keepDice; //Whether or not to keep dice
    int count; //Dice roll number
    int rollChoice; //Which spot to put roll into

    public Yahtzee() { //Constructor
        player1 = new YahtzeePlayer();
        player2 = new YahtzeePlayer();
        playerRoll1 = new DiceGroup();
        playerRoll2 = new DiceGroup();
        firstTurn = false;
        round = 1;
        keepDice = " ";
        count = 0;
        rollChoice = 0;
    }

    public static void main(String[] args) { //Main
        Yahtzee yahtzee = new Yahtzee();
        yahtzee.printHeader();
    }

    /**
     * Print the introduction screen for Yahtzee.
     */
    public void printHeader() {
        System.out.println("\n");
        System.out.println("+------------------------------------------------------------------------------------+");
        System.out.println("| WELCOME TO YAHTZEE!                                                    |");
        System.out.println("|                                                                                    |");
        System.out.println("| There are 13 rounds in a game of Yahtzee. In each turn, a player can roll his/her  |");
        System.out.println("| dice up to 3 times in order to get the desired combination. On the first roll, the |");
        System.out.println("| player rolls all five of the dice at once. On the second and third rolls, the      |");
        System.out.println("| player can roll any number of dice he/she wants to, including none or all of them, |");
        System.out.println("| trying to get a good combination.                                                  |");
        System.out.println("| The player can choose whether he/she wants to roll once, twice or three times in   |");
        System.out.println("| each turn. After the three rolls in a turn, the player must put his/her score down |");
        System.out.println("| on the scorecard, under any one of the thirteen categories. The score that the     |");
        System.out.println("| player finally gets for that turn depends on the category/box that he/she chooses  |");
        System.out.println("| and the combination that he/she got by rolling the dice. But once a box is chosen  |");
        System.out.println("| on the score card, it can't be chosen again.                                       |");
        System.out.println("|                                                                                    |");
        System.out.println("| LET'S PLAY SOME YAHTZEE!                                                           |");
        System.out.println("+------------------------------------------------------------------------------------+");
        System.out.println("\n\n");
        this.introduction();
    }

    /**
     * Prints the introduction of the game and also ending.
     */
    public void introduction() {
        //Prompts for first player's name
        player1.setName(Prompt.getString("Player 1, please enter your first name"));
        //Prompts for second player's name
        player2.setName(Prompt.getString("\nPlayer 2, please enter your first name"));

        // Determine who goes first
        do {
            //If there's a tie and its not the beginning of game
            if (playerRoll1.getValue() == playerRoll2.getValue() && playerRoll1.getValue() != 0) {
                System.out.println("You both TIED. Roll again.\n\n");
            }

            //Rolls for first player
            Prompt.getString("\nLet's see who will go first. " + player1.getName() + ", please hit enter to roll the dice");
            playerRoll1.roll(0);
            playerRoll1.printDice();

            //Rolls for second player
            Prompt.getString(player2.getName() + ", it's your turn. Please hit enter to roll the dice");
            playerRoll2.roll(0);
            playerRoll2.printDice();

            //prints out each person's roll
            System.out.println(player1.getName() + ", you rolled a sum of " + playerRoll1.getValue() + ", and " + player2.getName() + ", you rolled a sum of " + playerRoll2.getValue() + ".");
        } while (playerRoll1.getValue() == playerRoll2.getValue()); //while there's a tie, repeat

        //Sets who goes first according to whose roll was bigger
        if (playerRoll1.getValue() > playerRoll2.getValue()) {
            System.out.println(player1.getName() + ", Your sum was higher, you'll roll first.");
            firstTurn = true;
        } else {
            System.out.println(player2.getName() + ", Your sum was higher, you'll roll first.");
            firstTurn = false;
        }
        //Plays the 13 rounds
        while (round <= 13) {
            //What round it is
            System.out.println("\nRound " + round + " of 13 rounds.\n\n");
            //If player 1's roll was bigger, he starts, otherwise player2 goes first
            if (firstTurn) {
                firstTurn();
                player2Turn();
            } else {
                player2Turn();
                firstTurn();
            }
            round++;
        }
        int player1Score = 0; //Player 1 total score
        int player2Score = 0; //Player 2 total score

        //Calculates scores
        for (int i = 0; i < 13; i++) {
            player1Score += player1.getScoreCard().getScore(i);
            player2Score += player2.getScoreCard().getScore(i);
        }

        //Prints out scores
        System.out.printf("%-20s score total = %s", player1.getName(), player1Score);
        System.out.printf("\n%-20s score total = %s", player2.getName(), player2Score);
        System.out.println("\n");

        //Prints who won
        if (player1Score > player2Score) {
            System.out.println("Congratulations " + player1.getName() + ". YOU WON!!!");
        } else if (player1Score < player2Score) {
            System.out.println("Congratulations " + player2.getName() + ". YOU WON!!!");
        } else {
            System.out.println("TIE!!");
        }
        System.out.println("\n");
    }

    /**
     * Prints out player's scores
     */
    public void printScoreCard() {
        player1.getScoreCard().printCardHeader();
        player1.getScoreCard().printPlayerScore(player1);
        player2.getScoreCard().printPlayerScore(player2);
    }

    /**
     * Player 1's turn
     */
    public void firstTurn() {
        //Prompts to roll
        Prompt.getString(player1.getName() + ", it's your turn to play. Please hit enter to roll the dice");
        //Rolls
        playerRoll1.roll(0);
        //Prints
        playerRoll1.printDice();

        //3 rolls
        while (count < 2) {
            //Asks which dice
            System.out.println("Which di(c)e would you like to keep?  Enter the values you'd like to 'hold' without\n"
                    + "spaces.  For examples, if you'd like to 'hold' die 1, 2, and 5, enter 125");
            keepDice = Prompt.getString("(enter -1 if you'd like to end the turn)");
            //end turn
            if (keepDice.equals("-1")) {
                count = 2;
            } else {
                playerRoll1.roll(Integer.parseInt(keepDice));
                playerRoll1.printDice();
            }
            //Counts the rolls
            count++;
        }
        count = 0;
        printScoreCard();
        player1.getScoreCard().printRows();

        //Prompts player to pick which spot to put roll into
        rollChoice = Prompt.getInt(player1.getName() + ", now you need to make a choice. Pick a valid integer from the list above");
        while (!player1.getScoreCard().changeScore(rollChoice, playerRoll1)) {
            rollChoice = Prompt.getInt(player1.getName() + ", now you need to make a choice. Pick a valid integer from the list above");
        }

        player1.getScoreCard().changeScore(rollChoice, playerRoll1);
        rollChoice = 0;
        //Prints score card
        printScoreCard();
        System.out.println("\n\n");
    }

    /**
     * Player 2's turn
     */
    public void player2Turn() {
        //Prompts for player to roll
        Prompt.getString(player2.getName() + ", it's your turn to play. Please hit enter to roll the dice");
        //Rolls
        playerRoll2.roll(0);
        //Prints dice
        playerRoll2.printDice();

        //3 rolls
        while (count < 2) {
            //Asks which dice to keep
            System.out.println("Which di(c)e would you like to keep?  Enter the values you'd like to 'hold' without\n"
                    + "spaces.  For examples, if you'd like to 'hold' die 1, 2, and 5, enter 125");
            keepDice = Prompt.getString("(enter -1 if you'd like to end the turn)");
            //Player ends turn
            if (keepDice.equals("-1")) {
                count = 2;
            } else {
                playerRoll2.roll(Integer.parseInt(keepDice));
                playerRoll2.printDice();
            }
            //Count rolls
            count++;
        }
        count = 0;
        printScoreCard();
        player2.getScoreCard().printRows();

        rollChoice = Prompt.getInt(player2.getName() + ", now you need to make a choice. Pick a valid integer from the list above");
        while (!player2.getScoreCard().changeScore(rollChoice, playerRoll2)) {
            rollChoice = Prompt.getInt(player2.getName() + ", now you need to make a choice. Pick a valid integer from the list above");
        }

        player2.getScoreCard().changeScore(rollChoice, playerRoll2);
        rollChoice = 0;
        //Prints score card
        printScoreCard();
        System.out.println("\n\n");
    }
}

/**
 * @author Mr Greenstein
 */

public class YahtzeePlayer {
    private String name;
    private YahtzeeScoreCard scorecard;


    public YahtzeePlayer() {
        scorecard = new YahtzeeScoreCard();
    }

    public String getName() {
        return name;
    }

    public void setName(String n) {
        name = n;
    }

    public YahtzeeScoreCard getScoreCard() {
        return scorecard;
    }

}

/**
 * The Score card
 */
public class YahtzeeScoreCard {
    int[] scores;

    public YahtzeeScoreCard() { //Constructor
        scores = new int[13];
        for (int i = 0; i < scores.length; i++) {
            scores[i] = -1;
        }
    }

    /**
     * Print the scorecard header
     */
    public void printCardHeader() {
        System.out.println("\n");
        System.out.printf("\t\t\t\t\t       3of  4of  Fll Smll Lrg\n");
        System.out.printf("  NAME\t\t  1    2    3    4    5    6   Knd  Knd  Hse " +
                "Strt Strt Chnc Ytz!\n");
        System.out.printf("+----------------------------------------------------" +
                "---------------------------+\n");
    }

    /**
     * Prints player's score
     */
    public void printPlayerScore(YahtzeePlayer player) {
        System.out.printf("| %-12s |", player.getName());
        for (int i = 1; i < 14; i++) {
            if (getScore(i - 1) > -1)
                System.out.printf(" %2d |", getScore(i - 1));
            else System.out.printf("    |");
        }
        System.out.println();
        System.out.printf("+----------------------------------------------------" +
                "---------------------------+\n");
    }

    /**
     * Gets the score of a column
     */
    public int getScore(int column) {
        return scores[column];
    }

    /**
     * Prints the ending row of the scorecard
     */
    public void printRows() {
        System.out.printf("      \t\t  1    2    3    4    5    6    7    8    9   " +
                "10   11   12   13\n\n");
    }

    /**
     * Change the scorecard based on the category choice 1-13.
     *
     * @param choice    The choice of the player 1 to 13
     * @param diceGroup The DiceGroup to score
     * @return true if change succeeded. Returns false if choice already taken.
     */
    public boolean changeScore(int choice, DiceGroup diceGroup) {
        //If the column has been filled or choice is not in the limit range of categories
        if (scores[choice - 1] > -1 || choice <= 0 || choice > scores.length) {
            return false;
        }

        //Categories the player can choose
        if (choice < 7) numberScore(choice, diceGroup);
        else if (choice == 7) threeOfAKind(diceGroup);
        else if (choice == 8) fourOfAKind(diceGroup);
        else if (choice == 9) fullHouse(diceGroup);
        else if (choice == 10) smallStraight(diceGroup);
        else if (choice == 11) largeStraight(diceGroup);
        else if (choice == 12) chance(diceGroup);
        else if (choice == 13) yahtzeeScore(diceGroup);
        return true;
    }

    /**
     * Change the scorecard for a number score 1 to 6
     *
     * @param choice    The choice of the player 1 to 6
     * @param diceGroup The DiceGroup to score
     */
    public void numberScore(int choice, DiceGroup diceGroup) {
        int count = 0; //Counts number of times that number entered appears
        for (int i = 0; i < 5; i++) {
            if (diceGroup.getValue(i) == choice) {
                count++;
            }
        }
        scores[choice - 1] = count * choice; //Returns the total score of category
    }

    /**
     * Updates the scorecard for three Of A kind choice.
     *
     * @param diceGroup The DiceGroup to score
     */
    public void threeOfAKind(DiceGroup diceGroup) {
        scores[6] = 0; //Category number
        int sameDice = 0; //Number of times the 3 of a kind number appears

        //Goes through all the possible numbers 1-6 a dice can have
        for (int j = 1; j < 7; j++) {
            //Goes through all the dice values
            for (int i = 0; i < 5; i++) {
                //If the dice equals the correct number
                if (diceGroup.getValue(i) == j) sameDice++;
            }
            //If there are 3 of a kind, add it in
            if (sameDice >= 3) {
                int value = 0;
                //Add up the whole row
                for (int i = 0; i < 5; i++) {
                    value += diceGroup.getValue(i);
                }
                scores[6] = value;
            }
            sameDice = 0;
        }
    }

    /**
     * Updates the scorecard for four of a kind choice.
     *
     * @param diceGroup
     */
    public void fourOfAKind(DiceGroup diceGroup) {
        scores[7] = 0; //Category number
        int sameDice = 0; //Number of times the 4 of a kind number appears

        //Goes through all the possible numbers 1-6 a dice can have
        for (int j = 1; j < 7; j++) {
            //Goes through all the dice values
            for (int i = 0; i < 5; i++) {
                //If the dice equals the correct number
                if (diceGroup.getValue(i) == j) sameDice++;
            }
            //If there are 4 of a kind, add it in
            if (sameDice >= 4) {
                int value = 0;
                //Add up the whole row
                for (int i = 0; i < 5; i++) {
                    value += diceGroup.getValue(i);
                }
                scores[7] = value;
            }
            sameDice = 0;
        }
    }

    /**
     * Updates the scorecard for full house choice.
     *
     * @param diceGroup
     */
    public void fullHouse(DiceGroup diceGroup) {
        scores[8] = 0; //Category number
        int sameDice = 0; //Number of times the 3 of a kind number  or 2 of a kind number appears
        int num3 = 0;
        boolean trio = false; //If a trio exists

        //Goes through all the possible numbers 1-6 a dice can have
        for (int j = 1; j < 7; j++) {
            //Goes through all the dice values
            for (int i = 0; i < 5; i++) {
                //If the dice equals the correct number
                if (diceGroup.getValue(i) == j) sameDice++;
            }

            //If the three of a row exists in the full house
            if (sameDice == 3) {
                num3 = j;
                trio = true;
                break;
            }
            sameDice = 0;
        }
        sameDice = 0;

        //Goes through all the possible numbers 1-6 a dice can have
        for (int j = 1; j < 7; j++) {

            if (j == num3) continue;

            for (int i = 0; i < 5; i++) {
                //If the dice equals the correct number
                if (diceGroup.getValue(i) == j) sameDice++;
            }

            //If the duo exists in the full house
            if (sameDice == 2) {
                int value = 0;

                //If two group and three group , it's a full house
                if (trio) {
                    for (int i = 0; i < 5; i++) {
                        value += diceGroup.getValue(i);
                    }
                    scores[8] = value;
                }
                return;
            }
            sameDice = 0;
        }
    }

    /**
     * Updates the scorecard for small straight choice.
     *
     * @param diceGroup The DiceGroup to score
     */
    public void smallStraight(DiceGroup diceGroup) {
        int consecutive = 0; //Counts the consecutive number
        int count = 0; //Sees if each time the consecutive number is there so that 1 2 3 5 6 doesn't make a straight
        scores[9] = 0; //Category number

        //Goes through all the possible numbers 1-6 a dice can have
        for (int j = 1; j < 7; j++) {
            //Goes through all the dice values
            for (int i = 0; i < 5; i++) {
                //If the dice equals the next number in the straight
                if (diceGroup.getValue(i) == j) {
                    count++;
                    consecutive++;
                    break;
                }
            }
            //If the straight has been achieved
            if (consecutive >= 4) {
                scores[9] = 30;
            }
            if (count == 0) {
                consecutive = 0;
            }
            count = 0;
        }
    }

    /**
     * Updates the scorecard for large straight choice.
     *
     * @param diceGroup
     */
    public void largeStraight(DiceGroup diceGroup) {
        int consecutive = 0; //Counts the consecutive number
        int count = 0; //Sees if each time the consecutive number is there so that 1 2 3 5 6 doesn't make a straight
        scores[10] = 0; //Category number

        //Goes through all the possible numbers 1-6 a dice can have
        for (int j = 1; j < 7; j++) {
            for (int i = 0; i < 5; i++) {
                if (diceGroup.getValue(i) == j) {
                    count++;
                    consecutive++;
                    break;
                }
            }

            if (consecutive == 5) {
                scores[10] = 40;
            }
            if (count == 0) {
                consecutive = 0;
            }
            count = 0;
        }
    }

    /**
     * Updates the scorecard for Chance choice.
     *
     * @param diceGroup
     */
    public void chance(DiceGroup diceGroup) {
        scores[11] = 0;//Category number

        //Adds up the whole roll
        for (int i = 0; i < 5; i++) {
            scores[11] += diceGroup.getValue(i);
        }
    }

    /**
     * Updates the scorecard for Yahtzee choice.
     *
     * @param diceGroup
     */
    public void yahtzeeScore(DiceGroup diceGroup) {
        scores[12] = 0; //Category number
        int yahtzeeNum = 0; //The number for yahtzee
        int count = 0; //If Yahtzee
        for (int i = 0; i < 5; i++) {
            //Yahtzee number
            yahtzeeNum = diceGroup.getValue(0);
            //If each roll is the yahtzee number
            if (diceGroup.getValue(i) == yahtzeeNum) {
                count++;
            }
        }
        if (count == 5) {
            scores[12] = 50;
        }
    }

}
```