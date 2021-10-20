/**
 *  The Score card 
 */
public class YahtzeeScoreCard {
	int [] scores; 
	
	public YahtzeeScoreCard() { //Constructor
		scores = new int[13];
		for(int i=0; i<scores.length; i++) {
			scores[i] = -1;
		}
	}
	/**
	 *  Print the scorecard header
	 */
	public void printCardHeader() {
		System.out.println("\n");
		System.	out.printf("\t\t\t\t\t       3of  4of  Fll Smll Lrg\n");
		System.out.printf("  NAME\t\t  1    2    3    4    5    6   Knd  Knd  Hse " +
						"Strt Strt Chnc Ytz!\n");
		System.out.printf("+----------------------------------------------------" +
						"---------------------------+\n");
	}
	
	/**
	 *  Prints player's score
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
	 *  Gets the score of a column
	 */
	public int getScore(int column) {
		return scores[column];
	}
	
	/**
	 *  Prints the ending row of the scorecard
	 */
	public void printRows() {
        System.out.printf("      \t\t  1    2    3    4    5    6    7    8    9   " +
                "10   11   12   13\n\n");
    }


	/**
	 *  Change the scorecard based on the category choice 1-13.
	 *
	 *  @param choice The choice of the player 1 to 13
	 *  @param diceGroup  The DiceGroup to score
	 *  @return  true if change succeeded. Returns false if choice already taken.
	 */
	public boolean changeScore(int choice, DiceGroup diceGroup) {
		//If the column has been filled or choice is not in the limit range of categories
		if(scores[choice - 1]>-1 || choice<=0 || choice>scores.length) {
			return false;
		}
		
		//Categories the player can choose
		if(choice<7) numberScore(choice, diceGroup);
		else if(choice==7) threeOfAKind(diceGroup);
		else if(choice==8) fourOfAKind(diceGroup);
		else if(choice==9) fullHouse(diceGroup);
		else if(choice==10) smallStraight(diceGroup);
		else if(choice==11) largeStraight(diceGroup);
		else if(choice==12) chance(diceGroup);
		else if(choice==13) yahtzeeScore(diceGroup);
		return true;
	}
	
	/**
	 *  Change the scorecard for a number score 1 to 6
	 *
	 *  @param choice The choice of the player 1 to 6
	 *  @param diceGroup  The DiceGroup to score
	 */
	public void numberScore(int choice, DiceGroup diceGroup) {
		int count = 0; //Counts number of times that number entered appears
		for(int i=0; i<5; i++) {
			if(diceGroup.getValue(i)==choice) {
				count++;
			}
		}
		scores[choice-1] = count*choice; //Returns the total score of category
	}
	
	/**
	 *	Updates the scorecard for three Of A kind choice.
	 *
	 *	@param diceGroup	The DiceGroup to score
	 */	
	public void threeOfAKind(DiceGroup diceGroup) {
		scores[6] = 0; //Category number
		int sameDice = 0; //Number of times the 3 of a kind number appears
		
		//Goes through all the possible numbers 1-6 a dice can have
		for(int j=1; j<7; j++) { 
			//Goes through all the dice values
			for(int i = 0; i<5; i++) { 
				//If the dice equals the correct number
				if(diceGroup.getValue(i)==j) sameDice++;
			}
			//If there are 3 of a kind, add it in
			if(sameDice>=3) {
				int value = 0;
				//Add up the whole row
				for(int i = 0; i<5; i++) {
					value += diceGroup.getValue(i);
				}
				scores[6] = value;
			}
			sameDice = 0;
		}
	}
	
	/**
	 *	Updates the scorecard for four of a kind choice.
	 *
	 *	@param diceGroup
	 */	
	public void fourOfAKind(DiceGroup diceGroup) {
		scores[7] = 0; //Category number
		int sameDice = 0; //Number of times the 4 of a kind number appears
		
		//Goes through all the possible numbers 1-6 a dice can have
		for(int j=1; j<7; j++) { 
			//Goes through all the dice values
			for(int i = 0; i<5; i++) {
				//If the dice equals the correct number
				if(diceGroup.getValue(i)==j) sameDice++;
			}
			//If there are 4 of a kind, add it in
			if(sameDice>=4) {
				int value = 0;
				//Add up the whole row
				for(int i = 0; i<5; i++) {
					value += diceGroup.getValue(i);
				}
				scores[7] = value;
			}
			sameDice = 0;
		}
	}
	
	/**
	 *	Updates the scorecard for full house choice.
	 *
	 *	@param diceGroup	
	 */	
	public void fullHouse(DiceGroup diceGroup) {
		scores[8] = 0; //Category number
		int sameDice = 0; //Number of times the 3 of a kind number  or 2 of a kind number appears
		int num3 = 0; 
		boolean trio = false; //If a trio exists
		
		//Goes through all the possible numbers 1-6 a dice can have
		for(int j=1; j<7; j++) { 
			//Goes through all the dice values
			for(int i = 0; i<5; i++) {
				//If the dice equals the correct number
				if(diceGroup.getValue(i)==j) sameDice++;
			}
			
			//If the three of a row exists in the full house
			if(sameDice==3) {
				num3 = j;
				trio = true;
				break;
			}
			sameDice = 0;
		}
		sameDice = 0;
		
		//Goes through all the possible numbers 1-6 a dice can have
			for(int j=1; j<7; j++) { 
				
			if(j==num3) continue;

			for(int i = 0; i<5; i++) {
				//If the dice equals the correct number
				if(diceGroup.getValue(i)==j) sameDice++;
			}
			
			//If the duo exists in the full house
			if(sameDice==2) {
				int value = 0;
				
				//If two group and three group , it's a full house
				if(trio) {
					for(int i = 0; i<5; i++) {
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
	 *	Updates the scorecard for small straight choice.
	 *
	 *	@param diceGroup	The DiceGroup to score
	 */	
	public void smallStraight(DiceGroup diceGroup) {
		int consecutive = 0; //Counts the consecutive number
		int count = 0; //Sees if each time the consecutive number is there so that 1 2 3 5 6 doesn't make a straight
		scores[9] = 0; //Category number
		
		//Goes through all the possible numbers 1-6 a dice can have
		for(int j=1; j<7; j++) { 
			//Goes through all the dice values
			for(int i=0; i<5; i++) {
				//If the dice equals the next number in the straight
				if(diceGroup.getValue(i)==j) {
					count++; 
					consecutive++;
					break;
				}
			}
			//If the straight has been achieved
			if(consecutive>=4) {
				scores[9] = 30;
			}
			if(count == 0) {
				consecutive = 0;
			}
			count = 0;
		}
	}
	
	/**
	 *	Updates the scorecard for large straight choice.
	 *
	 *	@param diceGroup	
	 */	
	public void largeStraight(DiceGroup diceGroup) {
		int consecutive = 0; //Counts the consecutive number
		int count = 0; //Sees if each time the consecutive number is there so that 1 2 3 5 6 doesn't make a straight
		scores[10] = 0; //Category number
		
		//Goes through all the possible numbers 1-6 a dice can have
		for(int j=1; j<7; j++) { 
			for(int i=0; i<5; i++) {
				if(diceGroup.getValue(i)==j) {
					count++; 
					consecutive++;
					break;
				}
			}
			
			if(consecutive == 5) {
				scores[10] = 40;
			}
			if(count == 0) {
				consecutive = 0;
			}
			count = 0;
		}
	}
	
	/**
	 *	Updates the scorecard for Chance choice.
	 *
	 *	@param diceGroup	
	 */	
	public void chance(DiceGroup diceGroup) {
		scores[11] = 0;//Category number
		
		//Adds up the whole roll
		for(int i=0; i<5; i++) {
			scores[11]+=diceGroup.getValue(i);
		}
	}
	
	/**
	 *	Updates the scorecard for Yahtzee choice.
	 *
	 *	@param diceGroup	
	 */	
	public void yahtzeeScore(DiceGroup diceGroup) {
		scores[12] = 0; //Category number
		int yahtzeeNum = 0; //The number for yahtzee
		int count = 0; //If Yahtzee
		for(int i=0; i<5; i++) {
			//Yahtzee number
			yahtzeeNum = diceGroup.getValue(0);
			//If each roll is the yahtzee number
			if(diceGroup.getValue(i) == yahtzeeNum) {
				count++;
			}
		}
		if(count == 5) {
			scores[12] = 50;
		}
	}

}
