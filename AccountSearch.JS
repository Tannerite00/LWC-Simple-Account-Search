import { LightningElement, track } from 'lwc';

import searchAccounts from '@salesforce/apex/TestUserSearchController.searchAccounts'
export default class TestUserSearch extends LightningElement {
    @track searchTerm = '';
    @track accounts = [];

    searchResults = false;

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
}
