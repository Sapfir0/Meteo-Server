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
    const subscription = await serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(appServerKey)
        })

    try {
        subscribe(subscription)
    } catch (error) {
        console.log("Failed to subscribe the user: ", error);

    }

    async function subscribe(subscription) {
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
    }
}

async function unsubscribeUser() {
    const subscription = await serviceWorkerRegistration.pushManager.getSubscription()
    unsubscribe(subscription)

    async function unsubscribe(subscription) {
        if (!subscription) {
            throw new Error("User is not subsribed")
        }
        subscriptionData = {
            endpoint: subscription.endpoint
        };
        console.log("Произошла отпеска. Было отправлено в бади:")
        console.log(JSON.stringify(subscriptionData));
        const options = {  
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subscriptionData)
        }

        try {
            const response = await fetch("/push/unsubscribe", options)
            hasSubscription = false;
            updatePushButton();    
        }
        catch(error) {     
            hasSubscription = true;
            console.error("error fetching subscribe", error);
        }

        hasSubscription = false;

        updatePushButton();
        return subscription.unsubscribe();
        
    }

}

async function initPush() {

    pushButton.addEventListener("click", () => {
        if (hasSubscription) {
            unsubscribeUser();
        } else {
            subscribeUser();
        }
    });

    const subscription = await serviceWorkerRegistration.pushManager.getSubscription()
    hasSubscription = !(subscription === null);
    updatePushButton();

}

navigator.serviceWorker.register("./js/serviceWorkers/sw.js")
    .then( (sw) => {
        serviceWorkerRegistration = sw;
        initPush();
    })
    .catch( (error) => {
        console.error("Service Worker Error", error);
    });
