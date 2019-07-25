import store from '../index';
// import firebase from 'firebase';
// import { vuexfireMutations, firestoreAction } from 'vuexfire';
import { db } from '../../settings/firebase';

import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import Vue from 'vue';

@Module({
  namespaced: true,
  name: 'auth',
  store,
  dynamic: true,
})
class Auth extends VuexModule {
  // Add Type Checking
  users: any = null;
  isEditorMode: boolean = false;

  @Action
  updateUserName({ id, user }: { id: string; user: object }) {
    db.collection('users')
      .doc(id)
      .set(user)
      .then(() => {
        console.log('user updated!');
      });
  }
}

export const STORE_AUTH = getModule(Auth);
