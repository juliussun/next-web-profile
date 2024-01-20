#algorithm #computer_system 

#### Displacement
`<<` means move to the left, the vacancy is filled with 0s.
`>>` means move to the right, the vacancy is filled with the sign number, i.e. the first number to the left.

```java
//define the function to show the binary number:
public static void print(int num) {
	for (int i = 31; i >= 0; i--) {
		System.out.print((num & (1 << i))==0?"0":"1"); //use loop to have digit 1 travel from right to left, and use & operation to identify the 1s in the binary number.
	}
	System.out.println();
```


