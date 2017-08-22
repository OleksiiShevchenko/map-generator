'use strict';

'use strict';

const Promise = require('bluebird');
const config = require('../../config');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(config.nodemailer.opts);
const logger = require('../loggerService/logger.service');
const RenderHBS = require('../../utils/renderHbs')(__dirname + '/templates');


transporter.verify((error, success) => {
  if (error) {
    logger.warn(error);
  } else {
    logger.info(`[nodemailer] connect: smtps://${config.nodemailer.opts.auth.user}:password@${config.nodemailer.opts.host}`);
  }
});


const EmailService = {

  /**
   * @param {string} message
   * @return {object}
   */
  sendNotification: (message) => new Promise((resolve, reject) => {

    const options = {
      from: `"${config.nodemailer.name}" <${config.nodemailer.sender}>`,
      to: config.notificationRecipients,
      subject: 'Notification',
      text: 'Plain text',
      html: RenderHBS.render('notification.hbs', { message: message })
    };

    transporter.sendMail(options, (error, info) => {
      if (error) return reject(error);
      resolve(info);
    });
  })

};

module.exports = EmailService;