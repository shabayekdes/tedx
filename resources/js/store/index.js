import Vue from "vue";
import Vuex from "vuex";
import Team from "./modules/team";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        meta_data: {
            last_page: null,
            current_page: 1,
            prev_page_url: null
        },
        errors: {},
        status: "",
        editMode: false,
        image: {
            name: "Choose Image ...",
            url: "/img/img-placeholder.png"
        }
    },
    getters: {
        getMetaData: state => state.meta_data,
        getErrorMsg: state => field => {
            if (state.errors.hasOwnProperty(field)) {
                return state.errors[field][0];
            }
        },
        getStatus: state => state.status,
        getMode: state => state.editMode,
        hasError: state => field => {
            return state.errors.hasOwnProperty(field);
        },
        getImage: state => state.image
    },
    actions: {
        setMode({ state }, bool) {
            state.editMode = bool;
        },
        uploadImage({ commit }, e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            let limit = 1024 * 1024 * 2;
            if (file["size"] > limit) {
                return false;
            }
            reader.onloadend = f => {
                let image = {
                    name: file.name,
                    url: reader.result
                };
                commit("SET_IMAGE", image);
            };
            reader.readAsDataURL(file);
        }
    },
    mutations: {
        SET_META_DATA: (state, data) => {
            state.meta_data.last_page = data.meta.last_page;
            state.meta_data.current_page = data.meta.current_page;
            state.meta_data.prev_page_url = data.links.prev;
        },
        SET_ERRORS: (state, data) => {
            state.errors = data;
        },
        SET_IMAGE: (state, image) => {
            state.image = {
                name: image.name,
                url: image.url
            };
        },
        RESET_IMAGE: state => {
            state.image = {
                name: "Choose Image ...",
                url: "/img/img-placeholder.png"
            };
        }
    },
    modules: {
        Team
    }
});
