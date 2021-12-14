import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { AlertService } from '../services/alert.service';
import { LoaderService } from '../services/loader.service';

import PouchDB from 'pouchdb';
import PouchDBAuth from 'pouchdb-authentication';
PouchDB.plugin(PouchDBAuth);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  signUpForm: FormGroup;
  isSubmittedSignUp = false;

  signUpAdminForm: FormGroup;
  isSubmittedSignUpAdmin = false;

  signInForm: FormGroup;
  isSubmittedSignIn = false;

  dbAuthURL: string = environment.db;
  pouchDBAuth: any = new PouchDB(this.dbAuthURL, { skip_setup: true });
  pouchDB: any = new PouchDB(environment.db, { skip_setup: true });

  constructor(
    public formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.signUpAdminForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get errorSignUpControl() {
    return this.signUpForm.controls;
  }

  get errorSignUpAdminControl() {
    return this.signUpAdminForm.controls;
  }

  get errorSignInControl() {
    return this.signInForm.controls;
  }

  async submitsignUpForm() {
    this.isSubmittedSignUp = true;
    if (!this.signUpForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.signUpForm.value);
      await this.loaderService.showLoader();
      this.pouchDBAuth.signUp(
        this.signUpForm.value.username,
        this.signUpForm.value.password,
        { roles: ['user'] },
        (err, result) => {
          if (err) {
            if (err.name === 'conflict') {
              // "batman" already exists, choose another username
              this.loaderService.hideLoader();
              this.alertService.presentAlert(
                'เกิดข้อผิดพลาด',
                'already exists, choose another username'
              );
            } else if (err.name === 'forbidden') {
              this.loaderService.hideLoader();
              this.alertService.presentAlert(
                'เกิดข้อผิดพลาด',
                'invalid username'
              );
              // invalid username
            } else {
              this.loaderService.hideLoader();
              this.alertService.presentAlert(
                'เกิดข้อผิดพลาด',
                'HTTP error, cosmic rays, etc.'
              );
              // HTTP error, cosmic rays, etc.
            }
          }
          this.loaderService.hideLoader();
          this.alertService.presentAlert('สำเร็จ', 'signUp Complete');
        }
      );
    }
  }

  async submitsignUpAdminForm() {
    this.isSubmittedSignUpAdmin = true;
    if (!this.signUpAdminForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.signUpAdminForm.value);
      await this.loaderService.showLoader();
      this.pouchDBAuth.signUpAdmin(
        this.signUpAdminForm.value.username,
        this.signUpAdminForm.value.password,
        (err, result) => {
          if (err) {
            if (err.name === 'conflict') {
              // "batman" already exists, choose another username
              this.loaderService.hideLoader();
              this.alertService.presentAlert(
                'เกิดข้อผิดพลาด',
                'already exists, choose another username'
              );
            } else if (err.name === 'forbidden') {
              this.loaderService.hideLoader();
              this.alertService.presentAlert(
                'เกิดข้อผิดพลาด',
                'invalid username'
              );
              // invalid username
            } else {
              this.loaderService.hideLoader();
              this.alertService.presentAlert(
                'เกิดข้อผิดพลาด',
                'HTTP error, cosmic rays, etc.'
              );
              // HTTP error, cosmic rays, etc.
            }
          }
          this.loaderService.hideLoader();
          this.alertService.presentAlert('สำเร็จ', 'signUpAdmin Complete');
        }
      );
    }
  }

  async submitsignInForm() {
    this.isSubmittedSignIn = true;
    if (!this.signInForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.signInForm.value);
      await this.loaderService.showLoader();
      this.pouchDBAuth.logIn(
        this.signInForm.value.username,
        this.signInForm.value.password,
        (err, result) => {
          if (err) {
            if (err.name === 'unauthorized' || err.name === 'forbidden') {
              this.loaderService.hideLoader();
              this.alertService.presentAlert(
                'เกิดข้อผิดพลาด',
                'name or password incorrect'
              );
              // name or password incorrect
            } else {
              this.loaderService.hideLoader();
              this.alertService.presentAlert(
                'เกิดข้อผิดพลาด',
                'cosmic rays, a meteor, etc.'
              );
              // cosmic rays, a meteor, etc.
            }
          }
          this.loaderService.hideLoader();
          this.alertService.presentAlert('สำเร็จ', 'signIn Complete');
        }
      );
    }
  }
}
