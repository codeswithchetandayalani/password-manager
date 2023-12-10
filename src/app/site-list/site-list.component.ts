import { Component } from '@angular/core';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {
  allSites!: Observable<Array<any>>;
  siteName!: string;
  siteUrl!: string;
  siteImageUrl!: string;
  siteId!: string;
  formStatus: string = 'Add';
  Alert: boolean = false;
  AlertColor!: string;
  AlertMessage!: string;

  constructor(private passwordmanager: PasswordManagerService) {
    this.loadSite();
  }

  restForm() {
    this.siteName = '';
    this.siteUrl = '';
    this.siteImageUrl = '';
    this.siteId = '';
    this.formStatus = 'Add';
  }

  ShowAlert(AlertColor: string, AlertMessage: string) {
    this.Alert = true;
    this.AlertColor = AlertColor;
    this.AlertMessage = AlertMessage;
  }

  onSubmitForm(values: object) {
    // console.log(values);
    if (this.formStatus == 'Add') {
      try {
        this.passwordmanager.addSite(values);
        // console.log('Successfully added site');
        this.ShowAlert('bg-purple-400', 'Successfully added site');
        this.restForm();
      } catch (error) {
        this.ShowAlert('bg-pink-400', 'Error');
        console.log('Error', error);
      }
    } else if (this.formStatus == 'Edit') {
      try {
        this.passwordmanager.updateSite(this.siteId, values);
        this.ShowAlert('bg-purple-400', 'Successfully Update site');
        this.restForm();
      } catch (error) {
        this.ShowAlert('bg-pink-400', 'Error');
        // console.log('Error', error);
      }
    }
  }

  loadSite() {
    this.allSites = this.passwordmanager.loadSite();
    console.log(this.allSites);
  }

  editSite(
    siteName: string,
    siteUrl: string,
    siteImageUrl: string,
    siteId: string
  ) {
    this.siteName = siteName;
    this.siteUrl = siteUrl;
    this.siteImageUrl = siteImageUrl;
    this.siteId = siteId;
    this.formStatus = 'Edit';
  }

  deleteSite(siteId: string) {
    try {
      this.passwordmanager.deleteSite(siteId);
      this.ShowAlert('bg-purple-400', 'Successfully deleted site');
    } catch (error) {
      this.ShowAlert('bg-pink-400', 'Error');
    }
  }
}
