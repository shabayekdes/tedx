import axios from "axios";

const state = {
    teams: [],
    team: {
        id: "",
        name: "",
        title: "",
        thumbnail: ""
    },
    singleTeam: ""
};

const getters = {
    getAllTeams: state => state.teams,
    getNewTeam: state => state.team,
    getSingleTeam: state => state.singleTeam
};

const actions = {
    async fetchListTeams({ commit }, paged = null) {
        let page = paged !== null ? `?page=${paged}` : "";
        const response = await axios.get(`${urlApi}team${page}`);

        commit("SHOW_LIST_TEAM", response.data);
        commit("SET_META_DATA", response.data, { root: true });
    },
    async storeTeam({ commit }, data) {
        try {
            const response = await axios.post(`${urlApi}team`, data);

            commit("NEW_TEAM", response.data.data);
            commit("RESET_NEW_TEAM");
            commit("RESET_IMAGE");

            commit("SET_ERRORS", {});
        } catch (e) {
            commit("SET_ERRORS", e.response.data.errors);
        }
    },
    async updateTeam({ commit }, data) {
        try {
            const response = await axios.put(`${urlApi}team/${data.id}`, data);

            commit("PUT_TEAM", response.data);
            commit("SET_ERRORS", {});
            $("#addNew").modal("hide");
        } catch (e) {
            console.log("error");
            commit("SET_ERRORS", e.response.data.errors);
        }
    },
    setTeam({ commit, state }, oldValue) {
        state.team = oldValue;

        if (oldValue.thumbnail != null) {
            commit(
                "SET_IMAGE",
                {
                    name: oldValue.thumbnail,
                    url: oldValue.thumbnail
                },
                { root: true }
            );
        }
    },
    async deleteTeam({ commit }, id) {
        await axios.delete(`${urlApi}team/${id}`);
        commit("REMOVE_TEAM", id);
    },
    resetTeam({ commit, rootState }) {
        $("#addNew").on("hide.bs.modal", function(e) {
            commit("RESET_NEW_TEAM");
            commit("RESET_IMAGE");
            rootState.editMode = false;
        });
    }
};

const mutations = {
    SHOW_LIST_TEAM: (state, data) => {
        state.teams = data.data;
    },
    NEW_TEAM: (state, data) => {
        state.teams.unshift(data);
    },
    PUT_TEAM: (state, updValue) => {
        const index = state.teams.findIndex(team => team.id === updValue.id);
        if (index !== -1) {
            state.teams.splice(index, 1, updValue);
        }
    },
    REMOVE_TEAM: (state, id) =>
        (state.teams = state.teams.filter(team => team.id !== id)),
    RESET_NEW_TEAM: state => {
        state.team = {
            id: "",
            name: "",
            title: "",
            thumbnail: ""
        };
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
