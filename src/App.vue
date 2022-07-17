

<template id="app">
  <div class="app-wrapper">
    <div class="app">
      <div
        class="header-cntr"
        v-if="this.$store.state.user && this.$store.state.user.email"
      >
          <button v-on:click="goToHome" class="logout-btn" style="margin-right: 20px; width:120px">Home</button>

          <button v-on:click="goToPredictions" class="logout-btn" style="margin-right: 20px;  width:120px">History</button>

        <button v-on:click="loguOutFirebase" class="logout-btn" style=" width:120px">Logout</button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import isAuthenticated from "./router";

export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit("updateUser", user);
        this.$store.dispatch("getCurrentUser");
        if (this.$route.name !== "Home") {
          this.$router.push({ name: "Home" });
        }
      } else {
        if (this.$route.name !== "Login") {
          this.$router.push({ name: "Login" });
        }
      }
    });
  },
  mounted() {},
  methods: {
    isUserAuthenticated() {
      return isAuthenticated();
    },
    goToPredictions() {
			this.$router.push({ name: "PredictionsHistory" });
    },
      goToHome() {
			this.$router.push({ name: "Home" });
    },
    loguOutFirebase() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("resetStoreOnLogout");

          this.$router.push({ name: "Login" });
        })
        .catch(() => {
          console.log("error", "Could not log out of firebase");
        });
    },
  },
  watch: {},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header-cntr {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
  width: 100%;

  .logout-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    padding: 20px 10px;
    border: 1px solid #fff;

    &:hover {
      color: #fff;
      background: rgb(214, 94, 250);
    }
  }
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.error {
  text-align: center;
  font-size: 14px;
  color: red;
}
</style>
