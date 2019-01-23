<template>
  <header>
    <!-- Full Page Intro -->
    <div class="view  jarallax" data-jarallax='{"speed": 0.2}' style="">
      <!-- Mask & flexbox options-->
      <div class="mask  d-flex justify-content-center align-items-center">
        <!-- Content -->
        <div class="container">
          <!--Grid row-->
          <div class="row wow fadeIn">
            <!--Grid column-->
            <div class="col-md-12 text-center">
              <h1 class="display-4 font-weight-bold mb-0 pt-md-5 pt-5 wow fadeInUp">WebRTC Demo</h1>
              <h5 class="pt-md-5 pt-sm-2 pt-5 pb-md-5 pb-sm-3 pb-5 wow fadeInUp" data-wow-delay="0.2s">Click to Enter</h5>
              <div class="wow fadeInUp" data-wow-delay="0.4s">
                <router-link to="/agent" class="btn btn-primary btn-rounded">Agent</router-link>
                <router-link to="/customer" class="btn btn-outline-primary btn-rounded">Customer</router-link>
              </div>
            </div>
            <!--Grid column-->
          </div>
          <!--Grid row-->
        </div>
        <!-- Content -->
      </div>
      <!-- Mask & flexbox options-->
    </div>
    <!-- Full Page Intro -->
  </header>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>

</style>
