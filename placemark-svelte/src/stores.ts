import {writable} from "svelte/store";

export const user = writable({
    email: "",
    token: "",
    id: "",
});


export const latestPlacemark = writable(null);
export const latestChartType = writable("line");
export const latestRoute = writable("");