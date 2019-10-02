<template>
  <form @submit.prevent="getMode ? patchTeam() : createTeam()" enctype="multipart/form-data">
    <div class="card-body">
      <div class="form-group">
        <label for="inputName">Name</label>
        <input
          type="text"
          v-model="getNewTeam.name"
          id="inputName"
          class="form-control"
          placeholder="Enter name ..."
        />
      </div>
      <div class="form-group">
        <label for="inputName">Title</label>
        <input
          type="text"
          v-model="getNewTeam.title"
          id="inputName"
          class="form-control"
          placeholder="Enter title ..."
        />
      </div>
      <div class="row mb-3">
        <div class="col-md-4 offset-md-4">
          <img
            class="img-thumbnail mx-auto"
            width="200"
            height="200"
            :src="getImage.url"
            alt="user image"
          />
        </div>
      </div>
      <div class="form-group">
        <div class="input-group mb-3">
          <div class="custom-file">
            <label
              class="custom-file-label"
              for="inputGroupFile02"
              aria-describedby="inputGroupFileAddon02"
            >{{ getImage.name }}</label>
            <input
              type="file"
              @change="uploadImage"
              class="custom-file-input"
              id="inputGroupFile02"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- /.card-body -->

    <div class="card-footer">
      <button type="submit" v-if="getMode" class="btn btn-success">Update</button>
      <button type="submit" v-else class="btn btn-primary">Submit</button>
      <button type="submit" v-show="getMode" class="btn btn-primary" data-dismiss="modal">close</button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SpeakerForm",
  methods: {
    ...mapActions(["storeTeam", "updateTeam", "uploadImage"]),
    createTeam() {
      this.storeTeam(this.getNewTeam);
    },
    patchTeam() {
      this.updateTeam(this.getNewTeam);
    }
  },
  watch: {
    getImage: {
      handler: function(val, oldVal) {
        this.getNewTeam.thumbnail = val.url;
      },
      deep: true
    }
  },
  computed: mapGetters(["getNewTeam", "getMode", "getImage"])
};
</script>

<style scoped>
.custom-file-label {
  font-size: 14px;
}
</style>
