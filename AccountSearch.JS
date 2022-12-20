import { LightningElement, track, wire, api } from 'lwc';
import ID_FIELD from "@salesforce/schema/Account.Id";
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_OWNER_FIELD from '@salesforce/schema/Account.OwnerId';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import { getRecord, getFieldValue, updateRecord } from 'lightning/uiRecordApi';
import searchAccounts from '@salesforce/apex/TestUserSearchController.searchAccounts'

const FIELDS = [ID_FIELD, ACCOUNT_NAME_FIELD, ACCOUNT_OWNER_FIELD, ACCOUNT_TYPE_FIELD];

export default class TestUserSearch extends LightningElement {
    @track searchTerm = '';
    @track accounts = [];

    recordId = '';

    accountName;
    accountType;


    @wire(getRecord, { recordId: '$recordId', fields: FIELDS})
    account;

    searchResults = false;
    editAccount = false;

    get name() {
        return getFieldValue(this.account.data, ACCOUNT_NAME_FIELD);
    }

    get owner() {
        return getFieldValue(this.account.data, ACCOUNT_OWNER_FIELD);
        
    }

    get type() {
        return getFieldValue(this.account.data, ACCOUNT_TYPE_FIELD);
    }

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
    }

    handleSearchButtonClick() {
        searchAccounts({ searchTerm: this.searchTerm })
            .then(result => {
                this.accounts = result;
                this.searchResults = true;
            })
            .catch(error => {
                console.log('Error', console.log(this.accounts));
            });
            this.searchTerm = '';
    }

    handleEditModal() {
        if(this.editAccount == false){
        this.editAccount = true;
        } else {
            this.editAccount = false;
        }
    }

    handleWhichAccountEdit(event) {
        this.recordId = event.target.name;
        console.log('id to edit', this.recordId); 
        this.handleEditModal();
    }

    handleChange(e) {
        if (e.target.name === "name") {
        
          //this is name input textbox
          this.name = e.target.value;
          console.log(this.name);
        } else if (e.target.name === "industry") {
        
          //this is industry input textbox
          this.type = e.target.value;
          console.log(this.type);
        }
      }

    handleSave() {
        console.log('handleSave was clicked');
        const allValid = [...this.template.querySelectorAll('input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);

        if (allValid) {
            // Create the recordInput object
            
            const fields = {};
            console.log('fields' ,fields);
            fields[ID_FIELD.fieldApiName] = this.recordId;
            console.log('handleSave recordId value: ', this.recordId);
            //breaks here 

            fields[ACCOUNT_NAME_FIELD.fieldApiName] = this.accountName;
            console.log('handleSave name value: ', this.accountName);
            fields[ACCOUNT_TYPE_FIELD.fieldApiName] = this.accountType;
            console.log('handleSave type value: ', this.accountType);

            const recordInput = { fields: fields };

            updateRecord(recordInput)
                .then((record) => {
                console.log(record);
            });
            this.handleEditModal();
            
        }
        
    }
}
