<template>
  <div class="wrapper">
    <div>
      <h1>Users</h1>
      <div v-for="(user, index) in users"
           :key="index">
        <pre class="pre blue">{{ user }}</pre>
        <input type="text"
               v-model="newNames[index]">
        <button @click="changeName({user, index})">Change Name</button>
        <hr>
      </div>
    </div>
    <div>
      <h1> Lessons </h1>
      <div v-for="(item, index) in lessons"
           :key="index">
        <pre class="pre red">{{ item }}</pre>
        <button @click="setAuthor(item)">Set Author</button>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { db } from './settings/firebase';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { STORE_AUTH } from './store/modules/auth';
@Component({
  firestore() {
    return {
      lessons: db.collection('lessons'),
    };
  },
})
export default class App extends Vue {
  // public users: any = [];
  public selectedUser = '';
  public lessons = [];
  public newNames = [];

  get users() {
    return STORE_AUTH.users;
  }

  created() {
    // Calls Store root module to bind the users
    this.$store.dispatch('bindUsers');
  }

  public setAuthor(item: any) {
    // Calls firebase directly.
    
    const newItem = { ...item };
    const userRef = db.collection('users').doc(this.users[0].id);
    newItem.author = userRef;

    db.collection('lessons')
      .doc(item.id)
      .set(newItem)
      .then(() => {
      });
  }

  public changeName({ index, user }: { index: number; user: object }) {
    // Calls store action

    const newUser: any = { ...user };
    newUser.name = this.newNames[index];
    const payload = {
      user: newUser,
      id: this.users[index].id,
    };
    STORE_AUTH.updateUserName(payload);
  }
}
</script>

<style lang="stylus" scoped>
.wrapper {
  padding: 3rem;
}

.pre {
  font-size: 16px;
}

.red {
  color: red;
}

.blue {
  color: blue;
}
</style>