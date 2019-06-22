const { Push } = require('../database/tables')
const webPush = require('web-push');
const config = require("../config/config")

/**
 * POST /
 * Subscribe user.
 */
function subscribe(req, res) {

  const endpoint = req.body;

  const push = new Push({ // неплохой способ создать строчку в таблице
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

  res.status(200).send('subscribe');

}

/* 
Send notification

*/
function sendNotification(push, title, body, icon) {

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

    webPush.sendNotification(subscription, payload, options)
    .then( () => {
        console.log("Send welcome push notification");
      }).catch(err => {
        console.error("Unable to send welcome push notification", err );
    });
    return;
  
}


/**
 * POST /
 * Unsubscribe user.
 */
function unsubscribe (req, res) {

  Push.destroy({
        where: {
            endpoint: req.body.endpoint
        }  
    }, function (err,data){
    if(err) { 
      console.error('error with unsubscribe', err);
      res.status(500).send('unsubscription not possible'); 
    }
    console.log('unsubscribed');
    res.status(200).send('unsubscribe');
  });
}



module.exports = {
    subscribe,
    unsubscribe
}