<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-card-title>
      <router-link :to="`/products/${product.id}`">{{product.name}} - {{product.name_ar}}</router-link>
    </v-card-title>
    <v-card-text>
      <div class="my-4 subtitle-1">$ {{ product.price }}</div>

      <div>{{ product.desc }}</div>
      <div>{{ product.desc_ar}}</div>
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-content>
          <p dir="rtl">الكمية: {{quantity}}</p>
          <br />
          <p dir="rtl">اللون: {{color}}</p>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
    <v-divider class="mx-4"></v-divider>
  </v-card>
</template>

<script>
export default {
  name: 'ProductPreview',
  props: {
    product: {
      type: Object,
      required: true
    },
    quantity: { type: Number },
    color: { type: String }
  }
}
</script>
