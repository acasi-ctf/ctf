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