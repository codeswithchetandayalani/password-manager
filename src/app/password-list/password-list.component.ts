import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable } from 'rxjs';
import { AES, enc } from 'crypto-js';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  id!: string;
  siteData!: any;
  allPasswords!: Array<any>;
  email!: string;
  userName!: string;
  password!: string;
  passwordId!: string;
  formStatus: string = 'Add New';

  constructor(
    private routes: ActivatedRoute,
    private passwordmanager: PasswordManagerService
  ) {
    const id = this.routes.snapshot.params['id'];
    this.getSite(id);
    this.getPassword(id);
  }

  async getSite(id: string) {
    try {
      this.siteData = await this.passwordmanager.getSite(id);
      console.log(this.siteData);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  restForm() {
    this.email = '';
    this.userName = '';
    this.password = '';
    this.passwordId = '';
    this.formStatus = 'Add New';
  }

  async onSubmitForm(values: any) {
    // console.log(values.password);
    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword;
    // console.log(encryptedPassword);
    let id = this.routes.snapshot.params['id'];
    const data = this.passwordmanager.addPassword(values, id);
    if (this.formStatus == 'Add New') {
      try {
        this.passwordmanager.addPassword(values, id);
        console.log('success');
        this.restForm();
      } catch (error: any) {
        console.error(error.message);
      }
    } else if (this.formStatus == 'Edit') {
      try {
        this.passwordmanager.updatePassword(id, values, this.passwordId);
        console.log('success');
        this.restForm();
      } catch (error: any) {
        console.error(error.message);
      }
    }
  }

  getPassword(id: string) {
    try {
      this.passwordmanager.loadPassword(id).subscribe((val) => {
        this.allPasswords = val;
      });
      // console.log(this.siteData);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  editPassword(
    email: string,
    userName: string,
    password: string,
    passwordId: string
  ) {
    this.email = email;
    this.userName = userName;
    this.password = this.decryptPassword(password);
    this.passwordId = passwordId;
    this.formStatus = 'Edit';
  }

  deletePassword(passwordId: string) {
    let id = this.routes.snapshot.params['id'];
    try {
      this.passwordmanager.deletePassword(id, passwordId);
      console.log('bg-purple-400', 'Successfully deleted site');
    } catch (error) {
      console.log('bg-pink-400', 'Error');
    }
  }

  encryptPassword(password: string) {
    const key = 'g0+9PKxMVGScHbY44giZDu7+MD3Zxt3qjG2cHuYecEE=';
    const encryptedPassword = AES.encrypt(password, key).toString();
    return encryptedPassword;
  }

  decryptPassword(password: string) {
    const key = 'g0+9PKxMVGScHbY44giZDu7+MD3Zxt3qjG2cHuYecEE=';
    const decryptedPassword = AES.decrypt(password, key).toString(enc.Utf8);
    return decryptedPassword;
  }

  onDecryptPassword(password: string, index: number) {
    const decryptedPassword = this.decryptPassword(password);
    this.allPasswords[index].password = decryptedPassword;
    // return decryptedPassword;
  }
}
