<template>
  <v-container fluid>
    <v-card>
      <v-row>
        <div class="ma-1">
          <v-card-title>Filtration</v-card-title>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon @click="showFiltration = !showFiltration" class="ma-4">
          <v-icon>{{
            this.showFiltration ? "mdi-chevron-up" : "mdi-chevron-down"
          }}</v-icon>
        </v-btn>
      </v-row>

      <v-expand-transition>
        <div v-show="showFiltration">
          <v-card-text>
            <v-row>
              <v-col>
                <v-card-subtitle>Personal info</v-card-subtitle>
                <v-text-field
                  v-model="name"
                  label="Name"
                  clearable
                ></v-text-field>
                <v-row>
                  <v-col>
                    <DCBirthdayPicker
                      label="Birth date from"
                      :curr-date="birthStart"
                      @change-date="birthStart = $event"
                    ></DCBirthdayPicker>
                  </v-col>
                  <v-col>
                    <DCBirthdayPicker
                      label="Birth date to"
                      :curr-date="birthFinish"
                      @change-date="birthFinish = $event"
                    ></DCBirthdayPicker>
                  </v-col>
                </v-row>
                <v-autocomplete
                  v-model="selectedGender"
                  :items="genders"
                  :item-text="item => item.name"
                  :item-value="item => item"
                  clearable
                  label="Gender"
                ></v-autocomplete>
              </v-col>
              <v-col>
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
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="primary" @click="search">Search</v-btn>
          </v-card-actions>
        </div>
      </v-expand-transition>
    </v-card>

    <DCUserRow
      v-for="item in users"
      :key="item.name"
      :user-row="item"
      class="mx-auto my-3"
    ></DCUserRow>
  </v-container>
</template>

<script>
import DCUserRow from "@/components/DCUserRow";
import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_GENDERS_REQUEST,
  FETCH_USERS_REQUEST
} from "@/store/action-types";
import DCBirthdayPicker from "@/components/DCBirthdayPicker";

export default {
  name: "AllUsers",
  components: { DCUserRow, DCBirthdayPicker },
  data: () => ({
    showFiltration: false,
    name: "",
    birthStart: "",
    birthFinish: "",

    genders: [],
    selectedGender: null,

    countries: [],
    selectedCountry: null,
    selectedCity: null
  }),
  computed: {
    users() {
      return this.$store.getters.getUsers;
    }
  },
  methods: {
    search() {
      const searchParams = {
        name: this.name,
        startDate: this.birthStart,
        finishDate: this.birthFinish,
        gender: this.selectedGender?.id,
        country: this.selectedCountry?.id,
        city: this.selectedCity?.id
      };
      this.$store.dispatch(FETCH_USERS_REQUEST, searchParams);
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_USERS_REQUEST);
    this.$store.dispatch(FETCH_GENDERS_REQUEST);
    this.$store.dispatch(FETCH_COUNTRIES_REQUEST);
  },
  updated() {
    this.genders = this.$store.getters.getGenders;
    this.countries = this.$store.getters.getCountries;
  }
};
</script>

<style scoped></style>
