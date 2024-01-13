import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.afs
          .doc(`users/${user.uid}`)
          .valueChanges()
          .subscribe((userData: User) => {
            this.userData.favorites = userData.favorites;
          });
      } else {
        localStorage.setItem('user', 'null');
        this.userData = null;
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign in with Google
  firebaseApp = initializeApp(environment.firebase);
  auth = auth.getAuth(this.firebaseApp);
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return auth
      .signInWithPopup(this.auth, provider, auth.browserPopupRedirectResolver)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string, displayName: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        await result.user.updateProfile({
          displayName: displayName,
        });
        this.SetUserData(result.user);
        this.router.navigate(['verify-email-address']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      favorites: [],
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    });
  }

  getUserInitials(): string {
    if (!this.userData || !this.userData.displayName) {
      return '';
    }
    const nameParts = this.userData.displayName.split(' ');
    if (nameParts.length < 2) {
      return '';
    }
    const initials = nameParts
      .slice(0, 2)
      .map((name) => name[0])
      .join('');
    return initials;
  }

  getUserFavorites() {
    if (!this.userData || !this.userData.favorites) {
      return [];
    }
    return this.userData.favorites;
  }

  addUserFavorite(favorite: string) {
    if (this.userData && this.userData.favorites) {
      // Get the current favorites array from userData
      let favorites = this.userData.favorites;

      // Add the new favorite
      favorites.push(favorite);

      // Update the userData with the modified favorites array
      this.userData.favorites = favorites;

      // Update the user data in Firestore
      this.updateUserData(this.userData);
    }
  }

  removeUserFavorite(favorite: string) {
    if (!this.userData || !this.userData.favorites) {
      return;
    }
    const favorites = this.userData.favorites.filter(
      (f: string) => f !== favorite
    );
    this.userData.favorites = favorites;
    this.updateUserData(this.userData);
  }

  isUserFavorite(favorite: string) {
    if (!this.userData || !this.userData.favorites) {
      return false;
    }
    return this.userData.favorites.includes(favorite);
  }

  updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      favorites: user.favorites,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
