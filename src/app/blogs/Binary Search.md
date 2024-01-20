#algorithm 

For a linear search, it looks like this: 

```python
def linear_search(list,target):
#return the index position of the target if found, else returns None.
	for i in range(0,len(list)): #constant time iteration on list
		if list[i] == target:
			reuturn i
	return None
```

This would take O(n) time since you need to search every element in the list.

Suppose we have the prerequisite of two sorted lists, then we can do much better.
For a binary search:
```python
def binary_search(list,target):
	first = 0
	last = len(list) - 1 #index of a list starts at 0

	while first <= last:
		midpoint = (first + last)//2

		if list[midpoint] == target:
			return midpoint
		elif list[midpoint] < target:
			first = midpoint + 1
		else:
			last = midpoint - 1
	return None
```

Let's use recursion to write a new approach for binary search:
```python
def recursive_binary_search(list,target):
	if len(list) == 0:
		return False
	else:
		midpoint = (len(list))//2
		if list[midpoint] == target:
			return True
		else:
			if list[midpoint] < target:
				return recursive_binary_search(list[midpoint+1:],target)
			else:
				return recursive_binary_search(list[:midpoint],target)
```

The time complexity is $\log{}{(n)}$

> [!Note]
> Note here that recursive method actually called the answer to another answer! And we need to have a decrementing function to terminate the recursion. This is satisfied here by decreasing the size of the list in half for every recursion. This would eventually lead to the starting point.
> Python doesn't prefer recursion and put on a recursion limit of 1000.

>[!Question]
> What if we need to verify that the two lists we got are indeed sorted?
> 
> *this is an interesting question, since doing this will defeat the purpose of using binary search. When using binary search, we have to bear the risk of such assumptions.*
> 
> *Normally we would use sorted function or list.sort() method to sort a list in python*




