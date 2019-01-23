<template>
  <div>
    <div class="container">
      <div class="row my-3">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">

          <video ref="video" width="640" height="480" autoplay></video>

          <button @click="startVideo">Open camera</button>
          <button @click="stop">Close camera</button>
          <button @click="pause">Pause camera</button>
          <div id="errorMsg"></div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    name: "Home",
    data() {
      return {video: ''}
    },
    methods: {
      async startVideo() {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true})
          .catch((e) => {
            console.log(e);
          });
        if (stream) {
          this.$refs.video.srcObject = stream;
        }

      },
      pause(){
        let stream = this.$refs.video.srcObject;
        let tracks = stream.getTracks();
        tracks.forEach(function (track) {
          track.enabled = !track.enabled;
        });
      },
      stop() {
        let stream = this.$refs.video.srcObject;
        let tracks = stream.getTracks();
        tracks.forEach(function (track) {
          track.stop();
        });
        this.$refs.video.srcObject = null;
      }
    }
  }
</script>

<style scoped>

</style>
