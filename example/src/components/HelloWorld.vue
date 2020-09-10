<template>
  <div class="hello">
    State count：{{$store.state.count}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>
<style lang="css" scoped>
.hello {
  margin-top: 16px;
}
</style>