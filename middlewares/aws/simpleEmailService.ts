// import AWS from "aws-sdk";

// // Setting configuration
// const SesConfig = {
//   apiVersion: "2010-12-01",
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECERET_ACCESS_KEY_ID,
//   region: process.env.AWS_REGION,
// };

// // Function to send email
// const sendAwsSesEmail = (receipentEmail: string, otp: number) => {
//   const params = {
//     Source: `Qub App <${process.env.FROM}>`,
//     Destination: {
//       ToAddresses: [`Qub User <${receipentEmail}>`],
//     },
//     ReplyToAddresses: [process.env.FROM],
//     Message: {
//       Body: {
//         Html: {
//           Charset: "UTF-8",
//           Data: `<p>Verification Code for Qub</p>
//           <p>You can ignore this email if you didn't request it.</p>
//           <h2>${otp}</h2>
//           `,
//         },
//       },
//       Subject: {
//         Charset: "UTF-8",
//         Data: "Verification Code for Qub app",
//       },
//     },
//   };

//   return new AWS.SES(SesConfig).sendEmail(params).promise();
// };

// export default sendAwsSesEmail;
