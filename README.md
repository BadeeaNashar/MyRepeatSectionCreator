---------------------------------------------------------------------------------------

What is Repeat Section? and why i created a generater for it?

Repeat Section is a row group of fields inside a table that can be repeated by clicking on (Add) Button or you can delete the row b clikcing on (Delete) Button.

I created this generator when i got a lot of projects that have this repeated section, I was re-code it everytime at it was taking lot of time to me that can be useful to do something else, so i decided to create a generator for it so it can make it easier and less time wasting for me, and then i said "why not share it on github? maybe someone facing the same problem?" 

I created this generator using ASP DotNet 5 framewrok, it might not work on version 6 

github URL: https://github.com/BadeeaNashar/MyRepeatSectionCreator

---------------------------------------------------------------------------------------

How to run the code? 

Using Visual Code:

Download a clone from the repostory

and in the terminal in your selected clone's path, write this command line: dotnet run

to shutdown the running colne, press Ctrl+c in the terminal

---------------------------------------------------------------------------------------

[ Inputs Explaination ]

1- Your repeated section name: the name you enter here will appear as a card header for the table that will cerate. 

2- [Tbody] Class Name: this used for searching for the closest <tbody> tag in the script for appending a new <tr> tag
  
3- [Tr] Class Name: this used for deleting the row if the user pressed delete, the script will delete one child of the <tbody> tag whitch is <tr> tag.
  
4- [Tr] ID: this one not actually used for something but i thought it might be helpfull if someone need it to use it in validations or anything.
  
5- Object Name: this one is the Object name that called and used in the backend's controller, you will find it in the code like this for ex: Test[0].YouClumnName, [Test] is the object name (for your model) called in the controller, and [YouClumnName] here u can write your column name (from your model). 
  
6- [Add Button] name: Specifying the (Add) button name that will appear to the user. 
  
7- [Delete Button] name: Specifying the (Delete) button name that will appear to the user. 
  
8- Number of Columns: Columns number of the table that will be generated. 
  
9- Max Repeated Rows: Specify how many times you want the repeat section will be repeated, if you want it unlimited you can leave the field empty. 
