import Mailjet, { SendEmailV3_1 } from 'node-mailjet';

const mailjett = Mailjet.smsConnect("5d8dda6d23384db9a931413c7fd29eb2", {
    config: {
      version: 'v4'
    }
  });

  export const requestMobile =function name(phoneNumber:any,otp:any) {
  
    {
  
      const data: any = {
        Text: otp,
        To: phoneNumber,
        From: "MJPilot"
      }
    
      const result = mailjett
        .post('sms-send', { version: 'v4' })
        .request(data)
        // .then((data)=>{
        //   console.log(data)
        // });
  
        // result.then((data)=>{
        //   // console.log("data",data)
        //   return data
        //   })
        //  .catch((err)=>{
        //   // console.log("err",err)
        //   return err
        //  })
        
    
      // const { Status } = result.body.Messages[0];
      return result
    }
    }