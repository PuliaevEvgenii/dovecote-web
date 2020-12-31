<template>
  <v-dialog v-model="dialog" persistent>
    <v-card>
      <v-card-title class="headline">
        Profile Editing
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-row>
            <v-col>
              <v-card-subtitle>About</v-card-subtitle>
              <v-text-field
                v-model="firstName"
                :rules="firstNameRules"
                :counter="10"
                label="First name"
              ></v-text-field>

              <v-text-field
                v-model="lastName"
                :rules="lastNameRules"
                :counter="10"
                label="Last name"
              ></v-text-field>

              <v-text-field
                v-model="middleName"
                :rules="middleNameRules"
                :counter="10"
                label="Middle name"
              ></v-text-field>

              <v-text-field
                v-model="status"
                :rules="statusRules"
                :counter="32"
                label="Status"
              ></v-text-field>

              <v-text-field
                v-model="about"
                :rules="aboutRules"
                :counter="128"
                label="About me"
              ></v-text-field>

              <v-autocomplete
                v-model="selectedGender"
                :items="genders"
                :item-text="item => item.name"
                :item-value="item => item"
                clearable
                label="Gender"
              ></v-autocomplete>

              <DCBirthdayPicker
                :curr-date="birthDate"
                @change-date="birthDate = $event"
              ></DCBirthdayPicker>
            </v-col>

            <v-col>
              <v-card-subtitle>Contacts</v-card-subtitle>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
              ></v-text-field>

              <v-text-field
                v-model="phoneNumber"
                :rules="phoneNumberRules"
                label="Phone Number"
              ></v-text-field>

              <v-card-subtitle>Address</v-card-subtitle>
              <v-autocomplete
                v-model="selectedCountry"
                :items="countries"
                :item-text="item => item.name"
                :item-value="item => item"
                clearable
                label="Country"
              ></v-autocomplete>

              <v-autocomplete
                v-if="selectedCountry"
                v-model="selectedCity"
                :items="selectedCountry.cities"
                :item-text="item => item.name"
                :item-value="item => item"
                clearable
                label="City"
              ></v-autocomplete>

              <v-text-field
                v-if="selectedCity"
                v-model="street"
                label="Street"
              ></v-text-field>

              <v-text-field
                v-if="street"
                v-model="building"
                label="Building"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('action')">
          Cancel
        </v-btn>
        <v-btn text @click="submit" :disabled="!valid">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DCBirthdayPicker from "@/components/DCBirthdayPicker";
import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_GENDERS_REQUEST,
  UPDATE_PROFILE_REQUEST
} from "@/store/action-types";
export default {
  name: "DCProfileEditDialog",
  components: { DCBirthdayPicker },
  props: {
    dialog: Boolean
  },
  data: () => ({
    valid: false,

    firstName: "",
    lastName: "",
    middleName: "",
    status: "",
    about: "",
    birthDate: "",
    email: "",
    phoneNumber: "",

    genders: [],
    selectedGender: null,

    countries: [],
    selectedCountry: null,
    selectedCity: null,

    street: "",
    building: "",

    firstNameRules: [
      v => !!v || "First name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    lastNameRules: [
      v => !!v || "Last name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    middleNameRules: [
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    aboutRules: [
      v => v.length <= 256 || "About info must be less than 32 characters"
    ],
    statusRules: [
      v => v.length <= 64 || "Status must be less than 32 characters"
    ],
    emailRules: [v => /.+@.+/.test(v) || "E-mail must be valid"],
    phoneNumberRules: [
      //v => /.+@.+/.test(v) || 'Phone number must be valid',
    ]
  }),
  methods: {
    submit() {
      this.$refs.form.validate();
      const updatedUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        personalInfo: {
          secondName: this.middleName,
          status: this.status,
          about: this.about,
          gender: this.selectedGender,
          birthDate: this.birthDate,
          email: this.email,
          phoneNumber: this.phoneNumber,
          address: {
            id: this.$store.getters.getUserInfo.address.id,
            street: this.street,
            building: this.building,
            city: this.selectedCity,
            country: {
              id: this.selectedCountry.id,
              name: this.selectedCountry.name
            }
          }
        }
      };
      this.$store.dispatch(UPDATE_PROFILE_REQUEST, updatedUser);
      this.$emit("action");
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_GENDERS_REQUEST);
    this.$store.dispatch(FETCH_COUNTRIES_REQUEST);
    this.firstName = this.$store.getters.getProfile.firstName;
    this.lastName = this.$store.getters.getProfile.lastName;
    this.middleName = this.$store.getters.getUserInfo.secondName;
    this.birthDate = this.$store.getters.getUserInfo.birthDate;
    this.status = this.$store.getters.getUserInfo.status;
    this.about = this.$store.getters.getUserInfo.about;
    this.email = this.$store.getters.getUserInfo.email;
    this.phoneNumber = this.$store.getters.getUserInfo.phoneNumber;

    this.selectedGender = this.$store.getters.getUserInfo.gender;

    this.selectedCountry = this.$store.getters.getUserInfo.address.country;
    this.selectedCity = this.$store.getters.getUserInfo.address.city;
    this.street = this.$store.getters.getUserInfo.address.street;
    this.building = this.$store.getters.getUserInfo.address.building;
  },
  updated() {
    this.genders = this.$store.getters.getGenders;
    this.countries = this.$store.getters.getCountries;
  }
};
</script>

<style scoped></style>
