<template>
  <table class="table table-condensed">
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.name"
          @click.prevent="sort(column.name)"
          :class="{ sorting: column.active }"
          :style="{ 'width' : column.width }"
        >{{column.label}}</th>
      </tr>
    </thead>
    <slot></slot>
  </table>
</template>

<script>
export default {
  props: ["columns"]
};
</script>

