<template>
  <div class="container">
    <div class="row my-2">
      <div class="col">
        <video ref="localVideo" width="300" height="300" autoplay></video>
        <video ref="remoteVideo" width="300" height="300" autoplay></video>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-default btn-rounded btn-sm" @click="startVideo">Open camera</button>
      </div>
    </div>
  </div>
</template>

<script>

  import Peer from 'simple-peer';
  import $socket from '../../socket-instance';

  export default {
    name: "ChatWebRtc",
    data() {
      return {
        user: '',
        roomID: '',
        localVideo: null,
        remoteVideo: null,
        peer: null
      }
    },
    methods: {
      async startVideo() {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true})
          .catch((e) => {
            console.log(e.name + ": " + e.message);
          });
        if (stream) {
          this.$refs.localVideo.srcObject = stream;
          if (this.user === 'customer') {
            this.peer = new Peer({initiator: true, stream: stream, trickle: false})
          } else if (this.user === 'agent') {
            this.peer = new Peer({initiator: false, stream: stream, trickle: false});
          }

          this.peer.on('signal', (data) => {
            console.log(data);
            console.log('Advertising signalling data', this.roomID);
            $socket.emit('signal', {signal: data, room: this.roomID});
          });

          $socket.on('signal', (data) => {
            console.log("Signal from Server");
            console.log(data);
            this.peer.signal(data.signal);
          });

          this.peer.on('connect', () => {
            console.log('Peer connection established');
          });

          this.peer.on('stream', (remoteStream) => {
            this.$refs.remoteVideo.srcObject = remoteStream;
          });
        }

      }
    },
    created() {
      this.user = this.$route.params.user;
      this.roomID = this.$route.params.room;
    },

  }
</script>

<style scoped>

</style>
