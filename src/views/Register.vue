<template id="app">
	<div class="container-card">
		<div class="inner-card">
			<p>
				Already have an account?
				<router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
			</p>
			<h2 class="title">Create Account</h2>

			<form class="form-wrapper" id="register">
				<div class="input-box">
					<input type="text" placeholder="First Name" v-model="firstName" class="input-field" required />
					<user class="icon" />
				</div>
				<div class="input-box">
					<input type="text" placeholder="Last Name" v-model="lastName" class="input-field" required />
					<user class="icon" />
				</div>
				<div class="input-box">
					<input type="text" placeholder="Username" v-model="username" class="input-field" required />
					<user class="icon" />
				</div>
				<div class="input-box">
					<input type="email" placeholder="Email" v-model="email" class="input-field" required />
					<email class="icon" />
				</div>
				<div class="input-box">
					<input type="password" placeholder="Password" v-model="password" class="input-field" required />
					<password class="icon" />
				</div>
				<button @click.prevent="register" class="submitbtn">Create Account</button>
			</form>
			<div class="error-message" v-if="error">{{ this.errorMsg }}</div>
		</div>
	</div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import user from "../assets/Icons/user-alt-light.svg";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

export default {
	name: "Register",
	components: {
		email,
		password,
		user,
	},
	data() {
		return {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
			error: false,
			errorMsg: "",
		};
	},
	methods: {
		// async register() {
		// 	if (this.email !== "" && this.password !== "" && (this.firstName !== "") & (this.lastName !== "") && this.username !== "") {
		// 		this.error = false; //reset the error state & sign a user up
		// 		this.error = "";
		// 		const firebaseAuth = await firebase.auth();
		// 		const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
		// 		const result = await createUser;
		// 		const dataBase = db.collection("users").doc(result.user.uid); //creating a collection in firebase and inserting the user there.
		// 		await dataBase.set({
		// 			firstName: this.firstName,
		// 			lastName: this.lastName,
		// 			username: this.username,
		// 			email: this.email,
		// 		});
		// 		this.$router.push({ name: "Home" });
		// 		return;
		// 	}
		// 	this.error = true;
		// 	this.errorMsg = "Please fill out all the fields!";
		// 	return;
		// },
		register() {
			if (this.firstName === "" || this.lastName === "" || this.username === "" || this.email === "" || this.password === "") {
				this.error = true;
				this.errorMsg = "Please, fill all the fields.";
				return;
			}
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.email, this.password)
				.then((user) => {
					//creating a collection in firebase and inserting the user there.
					db.collection("users").doc(user.user.uid).set({
						firstName: this.firstName,
						lastName: this.lastName,
						username: this.username,
						email: this.email,
					});
					this.$store.commit("updateUser", user.user);
					this.$router.push({ name: "Home" });
				})
				.catch((err) => {
					this.error = true;
					this.errorMsg = err.message;
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.inner-card {
	display: flex;
	width: 100%;
	align-items: center;
	margin-bottom: 20px;
}

.submitbtn {
	margin-bottom: 0px;
}

.container-card {
	width: 50%;
}

.input-box {
	position: relative;
}

.input-field {
	width: 100%;
	justify-items: center;
	padding-left: 50px;
	cursor: text;
}

@media (max-width: 1024px) {
	.container-card {
		width: 90%;
	}
}

@media (max-width: 640px) {
	.container-card {
		width: 100%;
		margin-top: 0;
	}
}
</style>
