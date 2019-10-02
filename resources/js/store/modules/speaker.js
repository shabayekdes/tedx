import axios from "axios";

const state = {
    speakers: [],
    speaker: {
        id: "",
        name: "",
        details: "",
        thumbnail: ""
    },
    singleSpeaker: ""
};

const getters = {
    getAllSpeakers: state => state.speakers,
    getNewSpeaker: state => state.speaker,
    getSingleSpeaker: state => state.singleSpeaker
};

const actions = {
    async fetchListSpeakers({ commit }, paged = null) {
        let page = paged !== null ? `?page=${paged}` : "";
        const response = await axios.get(`${urlApi}speaker${page}`);

        commit("SHOW_LIST_SPEAKER", response.data);
        commit("SET_META_DATA", response.data, { root: true });
    },
    async storeSpeaker({ commit }, data) {
        try {
            const response = await axios.post(`${urlApi}speaker`, data);

            commit("NEW_SPEAKER", response.data.data);
            commit("RESET_NEW_SPEAKER");
            commit("RESET_IMAGE");

            commit("SET_ERRORS", {});
        } catch (e) {
            commit("SET_ERRORS", e.response.data.errors);
        }
    },
    async updateSpeaker({ commit }, data) {
        try {
            const response = await axios.put(
                `${urlApi}speaker/${data.id}`,
                data
            );

            commit("PUT_SPEAKER", response.data);
            commit("SET_ERRORS", {});
            $("#addNew").modal("hide");
        } catch (e) {
            console.log("error");
            commit("SET_ERRORS", e.response.data.errors);
        }
    },
    setSpeaker({ commit, state }, oldValue) {
        state.speaker = oldValue;

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
    async deleteSpeaker({ commit }, id) {
        await axios.delete(`${urlApi}speaker/${id}`);
        commit("REMOVE_SPEAKER", id);
    },
    resetTeam({ commit, rootState }) {
        $("#addNew").on("hide.bs.modal", function(e) {
            commit("RESET_NEW_SPEAKER");
            commit("RESET_IMAGE");
            rootState.editMode = false;
        });
    }
};

const mutations = {
    SHOW_LIST_SPEAKER: (state, data) => {
        state.speakers = data.data;
    },
    NEW_SPEAKER: (state, data) => {
        state.speakers.unshift(data);
    },
    PUT_SPEAKER: (state, updValue) => {
        const index = state.speakers.findIndex(
            speaker => speaker.id === updValue.id
        );
        if (index !== -1) {
            state.speakers.splice(index, 1, updValue);
        }
    },
    REMOVE_SPEAKER: (state, id) =>
        (state.speakers = state.speakers.filter(speaker => speaker.id !== id)),
    RESET_NEW_SPEAKER: state => {
        state.speaker = {
            id: "",
            name: "",
            details: "",
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
