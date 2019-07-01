const webPush = require("web-push");

/* 
Send notification
*/
async function sendNotification(push, title, body, icon) {

    const payload = JSON.stringify({
        title: title,
        body: body,
        icon: icon
    });
  
    const options = {
        TTL: 86400
    };
  
    const subscription = {
        endpoint: push.dataValues.endpoint,
        keys: {
            p256dh: push.dataValues.p256dh,
            auth: push.dataValues.auth
        }
    };
  
    try {
        await webPush.sendNotification(subscription, payload, options)
        console.log("Send welcome push notification");
    } catch (err) {
        console.error("Unable to send welcome push notification", err);
    }
  }

  module.exports = {
      sendNotification
  }