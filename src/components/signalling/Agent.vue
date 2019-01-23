<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="agent_name">Name</label>
          <input
            type="text"
            id="agent_name"
            class="form-control" v-model="name">
        </div>
        <button v-if="!buttonFlag"
                :disabled="buttonFlag" class="btn btn-default btn-rounded btn-sm" @click="submit">Dashboard
        </button>
      </div>


      <ul class="list-group">
        <li class="list-group-item my-1" v-for="item in clientList">
          <button class="btn btn-flat" @click="startChat(item.name,item.id)">{{ item.name }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        name: '',
        buttonFlag: false,
        clientsMap: new Map(),
        clientList: []
      }
    },
    methods: {
      submit() {
        this.name = "Agent:" + this.name;
        this.buttonFlag = true;
        this.$socket.emit('connect-agent', {name: this.name});
      },
      startChat(name, id) {

        //agent joins private room
        this.$socket.emit('webrtc-room', {room: this.$socket.id});

        //send request to client with room name
        this.$socket.emit('client-join-request', {clientID: id, agentName: this.name})

        this.$router.push({
          name: 'room', params: {
            user: 'agent',
            room: this.$socket.id
          }
        })
      }
    },
    mounted() {
      this.$socket.on('clientList', (data) => {
        console.log("List came to agent");
        const map = new Map(data.queue);
        this.clientsMap.clear();
        const array = [];
        for (let user of (map)) {
          const kv = user.toString().split(',');
          this.clientsMap.set(kv[0], kv[1]);
          array.push({id: kv[0], name: kv[1]})
        }
        this.clientList = array;
      });
    }
  }

</script>

<style scoped>

</style>
