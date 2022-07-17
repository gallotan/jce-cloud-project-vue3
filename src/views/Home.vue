<template id="app">
	<div class="Home">
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</head>

		<div class="container-card">
			

			<form action="/action_page.php">
				<div class="inner-card">
					<h1 class="title">Hello!</h1>

					<p class="welcome-message"><b>Our smart algorithm will predict the best price for you.</b></p>

					<div class="subtitle-wrapper">
						<div class="black-dot"></div>
						<p>Please, fill all the fields.</p>
					</div>

					<div class="input-fields-wrapper">
						<div class="input-box">
							<label class="details" for="Manufacturer"><b>Manufacturer: </b></label>
							<select
								class="firstList selectFilter input-field"
								v-on:change="manufacturereChanged"
								v-model="Manufacturer"
								:class="this.Manufacturer ? 'valid-field' : 'error-field'"
							>
								<option value="" selected disabled hidden>Select a Manufacturer</option>
								<option v-for="(item, i) in manufacturerOptions" v-bind:key="i" v-bind:value="{ name: item, idx: i }">
									{{ item }}
								</option>
							</select>
						</div>

						<div class="input-box">
							<label class="details" for="Model"><b>Model: </b></label>
							<select
								data-target="thirdList"
								class="secondList selectFilter input-field"
								v-model="Model"
								:class="this.Model ? 'valid-field' : 'error-field'"
							>
								<option value="" selected disabled hidden>Select a Model</option>
								<option v-for="(item, i) in modelOptions" v-bind:key="i" v-bind:value="{ name: item, idx: i }">
									{{ item }}
								</option>
							</select>
						</div>

						<div class="input-box">
							<label class="details" for="Condition"><b>Condition: </b></label>
							<select name="Condition" required v-model="Condition" class="input-field" :class="this.Condition ? 'valid-field' : 'error-field'">
								<option value="" selected disabled hidden>Select a Condition</option>
								<option v-for="key in Object.keys(conditionOptions)" v-bind:key="key" v-bind:value="key">
									{{ conditionOptions[key] }}
								</option>
							</select>
						</div>

						<div class="input-box">
							<label class="details" for="Cylinders"><b>Cylinders: </b></label>
							<select name="Cylinders" required v-model="Cylinders" class="input-field" :class="this.Cylinders ? 'valid-field' : 'error-field'">
								<option value="" selected disabled hidden>Select a Cylinders</option>
								<option v-for="key in Object.keys(cylindersOptions)" v-bind:key="key" v-bind:value="key">
									{{ cylindersOptions[key] }}
								</option>
							</select>
						</div>

						<div class="input-box">
							<label class="details" for="Fuel_Type"><b>Fuel Type: </b></label>
							<select name="Fuel_Type" required v-model="Fuel_Type" class="input-field" :class="this.Fuel_Type ? 'valid-field' : 'error-field'">
								<option value="" selected disabled hidden>Select a Fuel Type</option>
								<option v-for="key in Object.keys(fuelOptions)" v-bind:key="key" v-bind:value="key">
									{{ fuelOptions[key] }}
								</option>
							</select>
						</div>

						<div class="input-box">
							<label class="details" for="Transmission"><b>Transmission: </b></label>
							<select v-model="Transmission" class="input-field" :class="this.Transmission ? 'valid-field' : 'error-field'">
								<option value="" selected disabled hidden>Select Transmission</option>
								<option v-for="key in Object.keys(transmissionOptions)" v-bind:key="key" v-bind:value="key">
									{{ transmissionOptions[key] }}
								</option>
							</select>
						</div>

						<div class="input-box">
							<label class="details" for="Drive"><b>Drive: </b></label>
							<select name="Drive" required v-model="Drive" class="input-field" :class="this.Drive ? 'valid-field' : 'error-field'">
								<option value="" selected disabled hidden>Select a Drive like 4X4</option>
								<option v-for="key in Object.keys(driveOptions)" v-bind:key="key" v-bind:value="key">
									{{ driveOptions[key] }}
								</option>
							</select>
						</div>

						

						<div class="input-box">
							<label class="details" for="Color"><b>Color: </b></label>
							<select name="Color" required v-model="Color" class="input-field" :class="this.Color ? 'valid-field' : 'error-field'">
								<option value="" selected disabled hidden>Select a Color</option>
								<option v-for="key in Object.keys(colorOptions)" v-bind:key="key" v-bind:value="key">
									{{ colorOptions[key] }}
								</option>
							</select>
						</div>

						<div class="input-box">
							<label class="details" for="Year"><b>Year: </b></label>
							<input
								type="number"
								min="1910"
								max="2022"
								class="input-type-text input-field"
								placeholder="between 2000 - 2021"
								id="Year"
								name="Year"
								v-model="Year"
								:class="this.Year ? 'valid-field' : 'error-field'"
							/>
						</div>

						<div class="input-box">
							<label class="details" for="Mileage"><b>Mileage: </b></label>
							<input
								type="number"
								min="100"
								max="250000"
								class="input-type-text input-field"
								placeholder="between 100-250,000 KM"
								id="Mileage"
								name="Mileage"
								v-model="Mileage"
								:class="this.Mileage ? 'valid-field' : 'error-field'"
							/>
						</div>
					</div>
					<div class="error-message" v-show="error">
						<b>{{ this.errorMsg }}</b>
					</div>
					<button @click.prevent="goToResult" class="submitbtn" style= "background-color: #34779e">Predict Price</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { models } from "../assets/models";
import { modelsKeys } from "../assets/convert_keys";
import { getPredictedPrice } from "../utils/api";

import firebase from "firebase/app";
import "firebase/auth";

export default {
	name: "Home",
	components: {},
	data() {
		return {
			Manufacturer: "",
			Model: "",
			Condition: "",
			Cylinders: "",
			Fuel_Type: "",
			Transmission: "",
			Drive: "",
			Type_of_vehicle: "",
			Color: "",
			Year: "",
			Mileage: "",
			error: null,
			errorMsg: "",
			manufacturerOptions: [],
			modelOptions: [],
			conditionOptions: {
				0: "excellent",
				1: "fair",
				2: "good",
				3: "like new",
				4: "new",
				5: "salvage",
			},
			cylindersOptions: {
				0: "3 cylinders",
				1: "4 cylinders",
				2: "5 cylinders",
				3: "6 cylinders",
				4: "8 cylinders",
				5: "10 cylinders",
				6: "12 cylinders",
				7: "other",
			},
			fuelOptions: {
				0: "diesel",
				1: "electric",
				2: "gas",
				3: "hybrid",
				4: "other",
			},
			transmissionOptions: { 0: "automatic", 1: "manual", 2: "other" },
			driveOptions: { 0: "4wd", 1: "fwd", 2: "rwd" },
			typeOptions: {
				0: "SUV",
				1: "bus",
				2: "convertible",
				3: "coupe",
				4: "hatchback",
				5: "mini-van",
				6: "offroad",
				7: "other",
				8: "pickup",
				9: "sedan",
				10: "truck",
				11: "van",
				12: "wagon",
			},
			colorOptions: {
				0: "black",
				1: "blue",
				2: "brown",
				3: "custom",
				4: "green",
				5: "grey",
				6: "orange",
				7: "purple",
				8: "red",
				9: "silver",
				10: "white",
				11: "yellow",
			},
		};
	},

	watch: {},

	created() {
		let manufacturers = Object.keys(models);
		this.manufacturerOptions = manufacturers;

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.$store.commit("updateUser", user);
				this.$store.dispatch("getCurrentUser");
				const user_id = this.$store.state.user.uid;
				console.log(user_id);
				
				if (this.$route.name !== "Home") {
					this.$router.push({ name: "Home" });
				}
			} else {
				if (this.$route.name !== "Login") {
					this.$router.push({ name: "Login" });
				}
			}
		},
		);
	},

	methods: {
		manufacturereChanged() {
			let model = models[this.Manufacturer.name];
			this.modelOptions = model.models;
		},
		getPayload() {
			return {
				year: String(this.Year),
				manufacturer: String(this.Manufacturer.idx),
				model: String(modelsKeys[this.Model.name] || "0"),
				condition: String(this.Condition),
				cylinders: String(this.Cylinders),
				fuel: String(this.Fuel_Type),
				odometer: String(this.Mileage),
				transmission: String(this.Transmission),
				drive: String(this.Drive),
				type: String(this.Type_of_vehicle),
				paint_color: String(this.Color),
			};
		},
		goToResult() {
			if (Number(this.Year) < 2000 || Number(this.Year) > 2021) {
				this.error = true;
				this.errorMsg = "Please enter a year in range 2000-2021";
				return;
			}
			if (Number(this.Mileage) < 100 || Number(this.year) > 250000) {
				this.error = true;
				this.errorMsg = "Please enter range 100 - 250,000 KM";
				return;
			}
			if (
				this.Manufacturer.idx !== "" &&
				this.Model.idx !== "" &&
				this.Cylinders !== "" &&
				this.Fuel_Type !== "" &&
				this.Transmission !== "" &&
				this.Drive !== "" &&
				
				this.Color !== "" &&
				this.Year !== "" &&
				this.Mileage !== ""
			) {
				this.error = false; //reset the error state & sign a user up
				this.error = "";
				const userSelectionPayload = this.getPayload();

				const preparedData = {
					year: String(this.Year),
					manufacturer: String(this.Manufacturer.name),
					model: String(this.Model.name),
					condition: this.conditionOptions[this.Condition],
					cylinders: this.cylindersOptions[this.Cylinders],
					fuel: this.fuelOptions[this.Fuel_Type],
					odometer: String(this.Mileage),
					transmission: this.transmissionOptions[this.Transmission],
					drive: this.driveOptions[this.Drive],
					paint_color: this.colorOptions[this.Color],				
					}

				getPredictedPrice(userSelectionPayload)
					.then((res) => res.json())
					.then(async (data) => {
						if (!data.error) {

							const responseBody = JSON.parse(data.body);

							this.$store.commit("setPredictedPrice", responseBody.result);
							this.$store.commit("setPreparedData", preparedData);
							console.log("*RETURNED PREDICTED PRICE:*");
							console.log(responseBody.result);


							this.$router.push({ name: "Result" });
						} else {
							throw new Error("API Call now successful");
						}
					})
					.catch((err) => {
						this.error = true;
						this.errorMsg = err.message;
					});
				return true;
			}
			this.error = true;
			this.errorMsg = "Please fill out all the fields!";
			return;
		},
		logOutFirebase() {
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
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

body {
	height: 100vh;
	width: 100vw;
	font-family: "Quicksand", sans-serif;
	background-image: url("./../assets/road-3.jpg");
	background-repeat: no-repeat;
	background-position: center;
	transition: all 0.5s ease;
}

.container-card {
	display: flex;
	flex-direction: column;
	height: max-content;
	width: 70%;
	margin: 5% auto 0 auto;
	background-color: gray;
	border-radius: 5px;
	padding: 10px;
	background-color: rgba(255, 255, 255, 0.8);
}

.logoutbtn {
	border: solid 1.5px black;
	font-size: 18px;
	width: min-content;
	padding-left: 10px;
	padding-right: 10px;
	padding-top: 5px;
	padding-bottom: 5px;
	border-radius: 5px;
	margin-left: auto;
	cursor: pointer;
}

.inner-card {
	display: flex;
	flex-direction: column;
	padding: 0 10%;
	gap: 30px;
}

.title {
	text-align: center;
}

.subtitle-wrapper {
	display: flex;
	flex-direction: row;
	gap: 10px;
	justify-items: center;
	align-items: center;
}

.black-dot {
	height: 15px;
	width: 15px;
	background-color: black;
	border-radius: 100%;
}

.input-fields-wrapper {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	width: 100%;
	gap: 15px;
	column-gap: 5%;
	justify-content: center;
	justify-items: center;
}

.input-box {
	display: flex;
	flex-direction: row;
	justify-items: center;
	align-items: center;
	width: 100%;
	border: solid 1px gray;
	border-radius: 5px;
	padding: 5px 10px;
}

.details {
	display: flex;
	width: 40%;
}

.input-field {
	cursor: pointer;
	display: flex;
	border: solid 1px gray;
	width: 60%;
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 5px;
	padding-bottom: 5px;
	border-radius: 5px;
}

.error-field {
	border: solid 2px gray;
}

.valid-field {
	border: solid 2px green;
}

.error-message {
	padding-top: 5px;
	padding-bottom: 5px;
	text-align: center;
	color: red;
}

@media (max-width: 1280px) {
	.inner-card {
		padding: 0 0;
	}
}

@media (max-width: 1024px) {
	.inner-card {
		padding: 0 10%;
	}
	.input-fields-wrapper {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}
}

@media (max-width: 768px) {
	.input-box {
		flex-direction: column;
	}
	.details {
		width: 100%;
	}
	.input-field {
		width: 100%;
	}
}

@media (max-width: 640px) {
	.container-card {
		width: 100%;
		margin-top: 0;
	}
	.input-box {
		flex-direction: row;
	}
	.details {
		width: 50%;
	}
	.input-field {
		width: 50%;
	}
}

@media (max-width: 460px) {
	.input-box {
		flex-direction: column;
	}
	.details {
		width: 100%;
	}
	.input-field {
		width: 100%;
	}
}

/* Add padding to containers */
// .container {
// 	max-width: 700px;
// 	width: 100%;
// 	background-color: #fff;
// 	padding: 25px 30px;
// 	border-radius: 5px;
// 	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
// }

// .container .title {
// 	font-size: 40px;
// 	font-weight: 500;
// 	position: relative;
// 	text-align: center;
// }

// .container .subtitle {
// 	font-size: 15px;
// 	font-weight: 500;
// 	position: center;
// }

// .container .title::before {
// 	content: "";
// 	position: absolute;
// 	left: 0;
// 	bottom: -5;
// 	height: 3px;
// 	width: 100px;
// 	border-radius: 5px;
// 	background: linear-gradient(135deg, #71b7e6, #9b59b6);
// }

// .content .user-details {
// 	display: flex;
// 	flex-wrap: wrap;
// 	justify-content: space-between;
// 	margin: 20px 0 12px 0;
// }
// .user-details .input-box {
// 	margin-bottom: 15px;
// 	width: 25%;
// 	height: 25px;
// 	padding: 15px;
// 	margin: 5px 0 22px 0;
// }
// .input-box label.details {
// 	display: block;
// 	font-weight: 500;
// 	margin-bottom: 5px;
// 	width: 25%;
// 	height: 25px;
// 	padding: 15px;
// 	margin: 5px 0 22px 0;
// }
// .input-box .input-type-text {
// 	height: 45px;
// 	width: 25%;
// 	outline: none;
// 	font-size: 16px;
// 	border-radius: 5px;
// 	padding-left: 15px;
// 	border: 1px solid #ccc;
// 	border-bottom-width: 2px;
// 	transition: all 0.3s ease;

// 	background: #f1f1f1;
// 	margin: 5px 0 22px 0;
// 	display: inline-block;
// 	text-align: center;
// }

// .submitbtn {
// 	background: linear-gradient(135deg, #71b7e6, #9b59b6);
// 	height: 45px;
// 	width: 50%;
// 	margin: 35px 0;
// 	border-radius: 5px;
// 	border: none;
// 	color: #fff;
// 	font-size: 18px;
// 	font-weight: 500;
// 	letter-spacing: 1px;
// 	cursor: pointer;
// 	transition: all 0.3s ease;
// }

.submitbtn {
	padding: 10px 15px;
	margin: auto;
	border-radius: 5px;
	border: none;
	color: white;
	background-color: gray;
	font-size: 18px;
	font-weight: 500;
	letter-spacing: 1px;
	cursor: pointer;
	margin-bottom: 30px;
}

button:hover {
	transform: scale(0.99);
}

// .select {
// 	width: 25%;
// 	height: 25px;
// 	padding: 15px;
// 	margin: 5px 0 22px 0;
// 	display: inline-block;
// 	background: #f1f1f1;
// 	cursor: pointer;
// 	position: relative;
// 	border: 1px solid #ccc;
// }

// label {
// 	position: relative;

// 	width: 190px;
// 	padding-left: 15px;
// 	text-align: center;
// 	display: center;
// }

// select {
// 	height: 45px;
// 	width: 25%;
// 	outline: none;
// 	font-size: 16px;
// 	border-radius: 5px;
// 	padding-left: 15px;
// 	border: 1px solid #ccc;
// 	border-bottom-width: 2px;
// 	transition: all 0.3s ease;

// 	background: #f1f1f1;
// 	margin: 5px 0 22px 0;
// 	display: inline-block;
// 	text-align: center;
// }
</style>
