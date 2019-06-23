"use strict";

const VERSION = "v0.0.5";

const FILES_TO_CASHE = [
    "/js/manifest.json",
    "/js/push.js",
    "/js/offlinePage.html"
]

self.addEventListener("install", (evt) => {
    console.log("[ServiceWorker] Install");
    // CODELAB: Precache static resources here.
    evt.waitUntil(
        caches.open(VERSION).then((cache) => {
          console.log("[ServiceWorker] Pre-caching offline page");
          return cache.addAll(FILES_TO_CASHE);
        })
    );
    self.skipWaiting();
  });


self.addEventListener("fetch", (evt) => {
    if (evt.request.mode !== "navigate") {
        // Not a page navigation, bail.
        return;
      }
      evt.respondWith(
          fetch(evt.request)
              .catch(() => {
                return caches.open(VERSION)
                    .then((cache) => {
                      return cache.match("/js/offline.html");
                    });
              })
      );
});


self.addEventListener("activate", (event) => { //удаление кэша сработаывает тогда же когда и кэширование
    event.waitUntil(
        caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
            if (key !== FILES_TO_CASHE) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
            }
        }));
        })
    );
    self.clients.claim()

});


self.addEventListener("push", (event) => {

    let notificationData = {};

    try {
        notificationData = event.data.json();
    } catch (e) {
        notificationData = {
            title: "Default title",
            body: "Default message",
            icon: "/default-icon.png"
        };
    }

    event.waitUntil(
        self.registration.showNotification(notificationData.title, {
            body: notificationData.body,
            icon: notificationData.icon
        })
    );

});

self.addEventListener("notificationclick", function(event) {

    // close the notification
    event.notification.close();

    // see if the current is open and if it is focus it
    // otherwise open new tab
    event.waitUntil(

        self.clients.matchAll().then(function(clientList) {

            if (clientList.length > 0) {
                return clientList[0].focus();
            }

            return self.clients.openWindow("/");
        })
    );
});

