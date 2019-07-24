<template>
  <div>
    <div v-for="(user, index) in users"
         :key="index">
      <h4>{{ user }}</h4>
    </div>

  </div>
</template>

<script lang="ts">
import { db } from './settings/firebase';
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component({
  firestore: {
    users: db.collection('users'),
  },
})
export default class App extends Vue {
  public users = [];
}
</script>

<style lang="stylus" scoped>
</style>