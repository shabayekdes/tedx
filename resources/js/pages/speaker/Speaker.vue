<template>
  <div class="content-wrapper" style="min-height: 1015.13px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Teams</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <a href="#">Admin</a>
              </li>
              <li class="breadcrumb-item active">Teams</li>
            </ol>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-4">
            <div class="card card-outline card-success">
              <div class="card-header">
                <h3 class="card-title">Add Member to Teams</h3>

                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="remove">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <!-- /.card-tools -->
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <formTeam />
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <div class="col-8">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Team Member</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body p-0">
                <dataTables :columns="columns">
                  <tbody>
                    <tr v-for="team in getAllTeams" :key="team.id">
                      <td>{{ team.id }}</td>
                      <td>
                        <img
                          src="/img/default-150x150.png"
                          v-if="team.thumbnail == null"
                          alt="team"
                          class="img-circle img-size-64 mr-2"
                        />
                        <img
                          :src="team.thumbnail"
                          v-else
                          alt="Product 2"
                          class="img-circle img-size-64 mr-2"
                        />
                        {{ team.name }}
                      </td>
                      <td>{{ team.title }}</td>
                      <td class="project-actions text-right">
                        <a class="btn btn-info btn-sm" @click="editModel(team)" href="#">
                          <i class="fas fa-pencil-alt"></i>
                          Edit
                        </a>
                        <a class="btn btn-danger btn-sm" @click="deleteTeam(team.id)" href="#">
                          <i class="fas fa-trash"></i>
                          Delete
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </dataTables>
              </div>
              <!-- /.card-body -->

              <div class="card-footer clearfix">
                <ul class="pagination pagination-sm m-0 float-right">
                  <li class="page-item">
                    <a class="page-link" href="#">«</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">2</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">3</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">»</a>
                  </li>
                </ul>
              </div>
              <!-- /.card-footer -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
    <model title="Update Category">
      <formTeam />
    </model>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dataTables from "@/components/DataTables";
import formTeam from "@/views/forms/TeamForm.vue";
import model from "@/components/Model.vue";

export default {
  components: {
    dataTables,
    formTeam,
    model
  },
  data() {
    return {
      columns: [
        { width: "5%", label: "#", name: "id", active: true },
        { width: "45%", label: "Name", name: "name", active: true },
        { width: "20%", label: "Title", name: "title", active: true },
        { width: "20%", label: "Action", name: "action", active: false }
      ]
    };
  },
  methods: {
    ...mapActions([
      "fetchListSpeakers",
      "deleteSpeaker",
      "setSpeaker",
      "resetSpeaker",
      "setMode"
    ]),
    editModel(speaker) {
      this.setMode(true);
      $("#addNew").modal("show");
      this.setSpeaker(speaker);
    }
  },
  mounted() {
    this.resetSpeaker();
  },
  created() {
    this.fetchListSpeakers();
  },
  computed: mapGetters(["getAllSpeakers", "getMetaData"])
};
</script>
