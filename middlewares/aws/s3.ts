// import AWS from "aws-sdk";

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECERET_ACCESS_KEY_ID,
// });

// // Setting up S3 upload parameters
// export const uploadFileToS3 = (image: any, originalname: any) => {
//   const params = {
//     Bucket: process.env.BUCKET_NAME,
//     Key: originalname.replace(/\s/g, ""),
//     Body: image,
//   };

//   // Uploading image
//   return s3.upload(params).promise();
// };

// // Setting up S3 delete parameters
// export const deleteFileFromS3 = async (fileUrl: string) => {
//   try {
//     const params = {
//       Bucket: process.env.BUCKET_NAME,
//       Key: removeSpaceFromUrl(fileUrl),
//     };

//     // Deleting the logo file from AWS S3
//     const deleteResponse = await s3.deleteObject(params).promise();

//     return deleteResponse;
//   } catch (error) {
//     throw error;
//   }
// };

// // Simplify URL
// const removeSpaceFromUrl = (fileUrl: string) => {
//   const finalUrl = fileUrl.split(".com/");
//   return finalUrl[1].replace(/\s/g, "");
// };
