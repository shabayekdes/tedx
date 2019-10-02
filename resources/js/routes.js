import Dashboard from "./pages/dashboard/Dashboard.vue";
import Team from "./pages/team/Team.vue";
import Speaker from "./pages/speaker/Speaker.vue";

export const routes = [
    {
        path: "/admin",
        name: "dashboard",
        component: Dashboard
    },
    {
        path: "/admin/teams",
        name: "team.index",
        component: Team
    },
    {
        path: "/admin/speakers",
        name: "speaker.index",
        component: Speaker
    }
];
