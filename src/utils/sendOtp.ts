import Mailjet, { SendEmailV3_1 } from 'node-mailjet';

const mailjett = Mailjet.smsConnect("5d8dda6d23384db9a931413c7fd29eb2", {
    config: {
      version: 'v4'
    }
  });