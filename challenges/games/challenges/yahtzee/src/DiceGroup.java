/**
 * The group of die for each player
 * 
 *    @author    Anoushka Nadkarni 
 *    @since    09/24/21
 */
public class DiceGroup {
    
    private Dice [] die;    // the array of dice
    
    public DiceGroup() { //Constuctor
        die = new Dice[5];
        for (int i = 0; i < die.length; i++) {
            die[i] = new Dice(6);
        }
    }
    // Create the seven different line images of a die
    private String [] line = {    " _______ ",
                                "|       |",
                                "| O   O |",
                                "|   O   |",
                                "|     O |",
                                "| O     |",
                                "|_______|" };
    
    
    /**
     *  Prints out the images of the dice
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
     *  Prints the first line of the dice.
     */
    public void printDiceHeaders() {
        System.out.println();
        for (int i = 1; i < 6; i++) {
            System.out.printf("   # %d        ", i);
        }
        System.out.println();
    }
    
    /**
     *  Prints one line of the ASCII image of the dice.
     *
     *  @param value The index into the ASCII image of the dice.
     */
    public void printDiceLine(int value) {
        System.out.print(line[getDiceLine(value)]);
    }
    
    /**
     *  Gets the index number into the ASCII image of the dice.
     *
     *  @param value The index into the ASCII image of the dice.
     */
    public int getDiceLine(int value) {
        if (value < 7) return 0;
        if (value < 14) return 1;
        switch (value) {
            case 20: case 22: case 25:
                return 1;
            case 16: case 17: case 18: case 24: case 28: case 29: case 30:
                return 2;
            case 19: case 21: case 23:
                return 3;
            case 14: case 15:
                return 4;
            case 26: case 27:
                return 5;
            default:    // value > 30
                return 6;
        }
    }
    
    /**
     *  Rolls the dice but not the ones the player wants to skip
     *
     *  @param skip the index of the rolls the player wants to skip
     */
    public void roll(int skip) {
          for(int i=0; i<die.length; i++) {
                if(Integer.toString(skip).indexOf(Integer.toString(i+1).toCharArray()[0])==-1) {
                    die[i].roll();
                }
            }
    }
    
    /**
     *  Gets the value of the roll
     */
    public int getValue() {
        int value = 0;
        for (int i = 0; i < die.length; i++) {
            value += die[i].getValue();
        }
        return value;
    }
    
    /**
     *  Gets the value of specific die
     *  
     *  @param dice which dice
     */
    public int getValue(int dice) {
        return die[dice].getValue();
    }
}