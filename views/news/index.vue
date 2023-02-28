<template>
   <div>
      <div>
         {{ counter }}
      </div>
      <button @click="users.increment">增加</button>
   </div>
</template>
<script lang="ts" setup>
import { useDemoStore } from "@/store/modules/useDemoStore";
import { storeToRefs } from "pinia";
const users = useDemoStore();
const { counter } = storeToRefs(users);


</script>