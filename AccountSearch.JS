import { LightningElement, track, wire, api } from 'lwc';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_OWNER_FIELD from '@salesforce/schema/Account.OwnerId';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import searchAccounts from '@salesforce/apex/TestUserSearchController.searchAccounts'

const FIELDS = [ACCOUNT_NAME_FIELD, ACCOUNT_OWNER_FIELD, ACCOUNT_TYPE_FIELD];

export default class TestUserSearch extends LightningElement {
    @track searchTerm = '';
    @track accounts = [];

    @api recordId;

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

    handleEditAccount() {
        if(this.editAccount == false){
        this.editAccount = true;
        } else {
            this.editAccount = false;
        }
        handleWhichAccountEdit();
    }

    handleWhichAccountEdit(event) {
        let idToEdit = event.target.name;
        let accounts = this.accounts;
        let accountsIndex;
        let recordIdToEdit;

        for(let i=0; i<accounts.length; i++) {
            if(idToEdit === accounts[i].id) {
                accountsIndex = i;
            }
        }

        recordIdToEdit = accounts[accountsIndex].recordId;
        this.recordId = recordIdToEdit;
        console.log(this.recordId);
        return this.recordId;
    }

    handleSave() {

    }
}
