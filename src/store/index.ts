import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '../settings/firebase';
import { STORE_AUTH } from './modules/auth'

Vue.use(Vuex);
import { vuexfireMutations, firestoreAction } from 'vuexfire';

export default new Vuex.Store({

  mutations: vuexfireMutations,

  actions: {
    bindUsers: firestoreAction(context => {
      // context contains all original properties like commit, state, etc
      // and adds `bindFirestoreRef` and `unbindFirestoreRef`
      // we return the promise returned by `bindFirestoreRef` that will
      // resolve once data is ready
        return context.bindFirestoreRef('auth.users', db.collection('users'));
    }),
  },
});
