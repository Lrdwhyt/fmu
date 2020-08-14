import Vue from 'vue'
import App from '@/components/App.vue'
import Store from "@/store"

let attachFmu = function() {
    let app = document.createElement("div");
    app.id = "fmu-app";
    const attachPoint = document.getElementById("qrform");
    if (attachPoint !== null && attachPoint.parentNode !== null) {
        attachPoint.parentNode.insertBefore(app, attachPoint.nextSibling);
    }
};

let main = function() {
    attachFmu();
    Store.dispatch("init");
    Store.dispatch("finalInit");
    new Vue({
        render: h => h(App),
        store: Store
    }).$mount('#fmu-app');
};

if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', function() {
        main();
    });
} else {
    main();
}