<template xmlns:el-col="http://www.w3.org/1999/html">
  <section>
    <el-col :span="24" class="content-wrapper">
      <transition name="fade" mode="out-in">
        <router-view :request_type="request_type"></router-view>
      </transition>
    </el-col>
  </section>
</template>

<script>
    export default {
        data() {
            return {
                request_type: []
            }
        },
        methods: {}
    }
</script>