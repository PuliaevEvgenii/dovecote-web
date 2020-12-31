<template>
  <v-container :loading="loading">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-row>
      <v-col cols="4">
        <ProfilePhotoCard></ProfilePhotoCard>
      </v-col>

      <v-col cols="8">
        <ProfileInfoCard
          :title="fullName"
          :main-info="profileData"
          :tabs="tabs"
        ></ProfileInfoCard>

        <ProfileSubsCard></ProfileSubsCard>

        <ProfileActionsCard></ProfileActionsCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProfileActionsCard from "@/components/ProfileActionsCard";
import ProfilePhotoCard from "@/components/ProfilePhotoCard";
import ProfileInfoCard from "@/components/ProfileInfoCard";
import ProfileSubsCard from "@/components/ProfileSubsCard";

export default {
  name: "ProfileGroup",
  components: {
    ProfileSubsCard,
    ProfileInfoCard,
    ProfilePhotoCard,
    ProfileActionsCard
  },
  props: {
    loading: Boolean
  },
  computed: {
    tabs() {
      return [
        {
          tabKey: 1,
          tabName: "Info",
          tabContent: [
            {
              lineName: "FullName",
              lineText: this.$store.getters.getWithMiddleName
                ? this.$store.getters.getWithMiddleName
                : ""
            },
            {
              lineName: "BirthDate",
              lineText: this.$store.getters.getBirthDate
                ? this.$store.getters.getBirthDate
                : ""
            }
          ]
        },
        {
          tabKey: 2,
          tabName: "Contacts",
          tabContent: [
            {
              lineName: "Email",
              lineText: this.$store.getters.getUserInfo.email
                ? this.$store.getters.getUserInfo.email
                : ""
            },
            {
              lineName: "Phone number",
              lineText: this.$store.getters.getUserInfo.phoneNumber
                ? this.$store.getters.getUserInfo.phoneNumber
                : ""
            }
          ]
        },
        {
          tabKey: 3,
          tabName: "Address",
          tabContent: [
            {
              lineName: "City",
              lineText: this.$store.getters.getAddress.city
                ? this.$store.getters.getAddress.city.name
                : ""
            },
            {
              lineName: "Country",
              lineText: this.$store.getters.getAddress.country
                ? this.$store.getters.getAddress.country.name
                : ""
            }
          ]
        }
      ];
    },
    profileData() {
      return this.$store.getters.getUserInfo;
    },
    fullName() {
      return this.$store.getters.getFullName;
    }
  }
};
</script>

<style scoped></style>
