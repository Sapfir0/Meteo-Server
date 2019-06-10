const webpush = require('web-push')
const publicVapidKey = process.env.PUBLIC_VAPID_KEY
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
webpush.setVapidDetails('mailto:technakal@gmail.com', publicVapidKey, privateVapidKey);



function subscribe(req, res, next) {
    const subscription = req.body
    res.status(201).json({})
    const payload = JSON.stringify({title: "test"})

    console.log(subscription);
    webpush.sendNotification(subscription, payload).catch(error => {
        console.error(error.stack);
      });
}

module.exports = {
    subscribe
}