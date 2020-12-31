<template>
  <v-card class="my-6">
    <v-card-title>{{ title }}</v-card-title>

    <v-divider class="mx-2"></v-divider>

    <v-card-text>
      <div class="subtitle-1">Status: {{ mainInfo.status }}</div>
      <div>About: {{ mainInfo.about }}</div>
    </v-card-text>

    <v-divider class="mx-2"></v-divider>

    <v-expansion-panels popout flat focusable class="my-2">
      <v-expansion-panel>
        <v-expansion-panel-header>
          More info
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-tabs center-active v-model="tab">
            <v-tab v-for="infoTab in tabs" :key="infoTab.tabKey">{{
              infoTab.tabName
            }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="infoTab in tabs" :key="infoTab.tabKey">
              <v-card flat>
                <v-card-text>
                  <v-row
                    v-for="line in infoTab.tabContent"
                    :key="line.lineName"
                  >
                    <b>{{ line.lineName + ": " }}</b>
                    <p>{{ line.lineText }}</p>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
export default {
  name: "ProfileInfoCard",
  props: {
    title: String,
    mainInfo: {},
    tabs: Array
  },
  data: () => ({
    tab: null
  })
};
</script>

<style scoped></style>
