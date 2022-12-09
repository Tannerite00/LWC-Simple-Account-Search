import { LightningElement, track } from 'lwc';

import searchAccounts from '@salesforce/apex/TestUserSearchController.searchAccounts'
export default class AccountSearch extends LightningElement {
    @track searchTerm = '';
    @track accounts = [];

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
    }

    handleSearchButtonClick() {
        searchAccounts({ searchTerm: this.searchTerm })
            .then(result => {
                this.accounts = result;
            })
            .catch(error => {
                console.log('Error', console.log(this.accounts));
            });
    }
}
