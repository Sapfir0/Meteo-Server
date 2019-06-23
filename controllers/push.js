const {Push} = require("../database/tables")
const webPush = require("web-push");
const config = require("../config/config")

/**
* POST /
* Subscribe user.
*/
function subscribe(req, res) {

  const endpoint = req.body;

  const push = new Push({
      endpoint: endpoint.endpoint,
      p256dh: endpoint.keys.p256dh,
      auth: endpoint.keys.auth
  });

  console.log(push)

  sendNotification(push,
      "Привет",
      "Важно. Ты петух.",
      config.imgDir + "/weatherIcons/01d.png"
  )

  res.status(200).send("subscribe");

}

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


/**
* POST /
* Unsubscribe user.
*/
async function unsubscribe(req, res) { // не уверен что это работает(т.к. у меня не добавляется строчка)

  try {
      await Push.destroy({
          where: {
              endpoint: req.body.endpoint
          }
      })
  } 
  catch (error) {
      console.error("error with unsubscribe", error);
      res.status(500).send("unsubscription not possible");
  }
  console.log("unsubscribed");
  res.status(200).send("unsubscribe");

}



module.exports = {
  subscribe,
  unsubscribe
}