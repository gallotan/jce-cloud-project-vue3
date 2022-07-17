import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
    predictedPrice: null,
    preparedData: null,
    returunedData: null,


  },
  mutations: {
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },
    updateUser(state, payload) {
      state.user = payload; //returns true or false.
    },
    resetStoreOnLogout() {
      this.state.user = null;
      this.state.profileEmail = null;
      this.state.profileFirstName = null;
      this.state.profileLastName = null;
      this.state.profileUsername = null;
      this.state.profileId = null;
      this.state.profileInitials = null;
    },
    setPredictedPrice(state, payload) {
      state.predictedPrice = payload;
    },
    setPreparedData(state, payload) {
      state.preparedData = payload;


    },
    setReturnedData(state, payload) {
      state.returunedData = payload;


    },

    resetePredictedPrice(state) {
      state.predictedPrice = null;
    },
    setProfileInitials(state) {
      state.setProfileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      const dataBase = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
    },
  },
  modules: {},
});
