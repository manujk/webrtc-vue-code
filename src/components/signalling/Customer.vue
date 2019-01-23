<template>

  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <div class="form-group">
          <label for="customer_name">Name</label>
          <input
            type="text"
            id="customer_name"
            class="form-control" v-model="name">
        </div>

        <button v-if="!res"
                :disabled="buttonFlag" class="btn btn-default btn-rounded btn-sm" @click="submit">Contact Agent
        </button>

        <button v-if="res" class="btn btn-default btn-rounded btn-sm" @click="startChat">Join Chat
        </button>
        <p v-if="buttonFlag && !res">Waiting for agent...</p>
      </div>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        name: '',
        buttonFlag: false,
        res: false,
        roomID: ''
      }
    },
    methods: {
      submit() {
        this.name = "Customer:" + this.name;
        this.buttonFlag = true;
        this.$socket.emit('connect-client', {name: this.name});
      },
      startChat() {
        this.$router.push({
          name: 'room', params: {
            user: 'customer',
            room: this.roomID
          }
        })
      }
    },
    mounted() {
      this.$socket.on('joinRoom', (data) => {
        if (data) {
          this.$socket.emit('webrtc-room', {room: data.room});
          this.roomID = data.room;
          console.log("Join room" + this.roomID);
          this.res = true
        }
      });
    }
  }
</script>

<style scoped>

</style>
