# LWC-Simple-Account-Search
Creates a Lightning Web Component that allows the user to search for accounts by letter, and displays the accounts by ID, Name, and Type.

Added an Edit button that brings up a modal with a form, pulling relevent info from the account record and allowing the user to edit the account information from there. Only accurately pulls owner ID, Account Name, and Customer Type at the moment. all else on the form is filler.

NOT WORKING:
Save function to update account information with new changes. Currently using @wire getRecord and getFieldValue to grab account info, then using updateRecord to update with new values. 
