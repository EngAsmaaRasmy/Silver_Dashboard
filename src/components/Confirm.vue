/* eslint-disable vue/no-mutating-props */
/* eslint-disable vue/no-mutating-props */
/* eslint-disable vue/no-mutating-props */
<template>
  <v-dialog v-model="open" max-width="290">
    <v-card>
      <v-card-title class="headline">Are you sure?</v-card-title>

      <v-card-text>If you deleted a product you won't be able to undo that.</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" icon @click="onYes">
          <v-icon left>mdi-delete</v-icon>Delete
        </v-btn>
        <v-btn color="light darken-1" text @click="deleteDialog =false">Cancel</v-btn>
      </v-card-actions>
      <loader />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'confirm',
  props: ['deleteDialog', 'onYes'],
  data () {
    return {
      open: this.deleteDialog
    }
  }
}
</script>
