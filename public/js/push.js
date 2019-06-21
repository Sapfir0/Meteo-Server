'use strict';

const appServerKey = 'BHLCrsFGJQIVgg-XNp8F59C8UFF49GAVxvYMvyCURim3nMYI5TMdsOcrh-yJM7KbtZ3psi5FhfvaJbU_11jwtPY';

const pushWrapper = document.querySelector('.push-wrapper');
const pushButton = document.querySelector('.push-button');

let hasSubscription = false;
let serviceWorkerRegistration = null;
let subscriptionData = false;

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function updatePushButton() {
    pushWrapper.classList.remove('hidden');

    if (hasSubscription) {
        pushButton.textContent = `Disable Push Notifications`;
    } else {
        pushButton.textContent = `Enable Push Notifications`;
    }
}

function subscribeUser() {
    serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(appServerKey)
        })
        .then( (subscription) => {

            fetch('/push/subscribe', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(subscription)
                })
                .then( (response) => {
                    return response;
                })
                .then( (text) => {
                    console.log('User is subscribed.');
                    hasSubscription = true;

                    updatePushButton();
                })
                .catch(function(error) {
                    hasSubscription = false;
                    console.error('error fetching subscribe', error);
                });

        })
        .catch(function(err) {
            console.log('Failed to subscribe the user: ', err);
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


                fetch('/push/unsubscribe', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
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
                        console.error('error fetching subscribe', error);
                    });

                hasSubscription = false;

                updatePushButton();
                return subscription.unsubscribe();
            }
        });
}

function initPush() {

    pushButton.addEventListener('click', () => {
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

navigator.serviceWorker.register('./js/sw.js')
    .then( (sw) => {
        serviceWorkerRegistration = sw;
        initPush();
    })
    .catch( (error) => {
        console.error('Service Worker Error', error);
    });