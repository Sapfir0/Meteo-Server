"use strict";

import { urlB64ToUint8Array} from "./helpers.js"

const appServerKey = "BKAPKJCCKXxHvBcMfLk5OvIhWsfRDrwzAFlFkBv7JVFTaY3-JQTOB3KHmyrsTpFCukoBLbmWe0FXeUCHVBF8jEg";

const pushWrapper = document.querySelector(".push-wrapper");
const pushButton = document.querySelector(".push-button");

let hasSubscription = false;
let serviceWorkerRegistration = null;
let subscriptionData = false;

function updatePushButton() {
    pushWrapper.classList.remove("hidden");

    if (hasSubscription) {
        pushButton.textContent = "Disable Push Notifications";
    } else {
        pushButton.textContent = "Enable Push Notifications";
    }
}

async function subscribeUser() {
    serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(appServerKey)
        })
        .then( async (subscription) => {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(subscription)
            }

            try {
                const response = await fetch("/push/subscribe", options)
                console.log("User is subscribed.");
                //console.log(response)
                hasSubscription = true;   
                updatePushButton();
            }
            catch(error) {
                hasSubscription = false;
                console.error("error fetching subscribe", error);
            }


        })
        .catch(function(err) {
            console.log("Failed to subscribe the user: ", err);
        });
}

function unsubscribeUser() {
    serviceWorkerRegistration.pushManager.getSubscription()
        .then(function(subscription) {
            if (subscription) {
                subscriptionData = {
                    endpoint: subscription.endpoint
                };
                console.log("Произошла отпеска. Было отправлено в бади:")
                console.log(JSON.stringify(subscriptionData));


                fetch("/push/unsubscribe", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(subscriptionData)
                    })
                    .then( (response) => {
                        return response;
                    })
                    .then( (text) => {
                        hasSubscription = false;

                        updatePushButton();
                    })
                    .catch( (error) => {
                        hasSubscription = true;
                        console.error("error fetching subscribe", error);
                    });

                hasSubscription = false;

                updatePushButton();
                return subscription.unsubscribe();
            }
        });
}

function initPush() {

    pushButton.addEventListener("click", () => {
        if (hasSubscription) {
            unsubscribeUser();
        } else {
            subscribeUser();
        }
    });

    // Set the initial subscription value
    serviceWorkerRegistration.pushManager.getSubscription()
        .then(function(subscription) {
            hasSubscription = !(subscription === null);

            updatePushButton();
        });
}

navigator.serviceWorker.register("/js/serviceWorkers/sw.js")
    .then( (sw) => {
        serviceWorkerRegistration = sw;
        initPush();
    })
    .catch( (error) => {
        console.error("Service Worker Error", error);
    });

    // try {
    //     await navigator.serviceWorker.register('./js/sw.js')
    //     serviceWorkerRegistration = sw;
    //     initPush();
    // }
    // catch(error)  {
    //     console.error('Service Worker Error', error);
    // }
