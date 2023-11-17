import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ContentBlockMetaData from "../models/contentBlocksMetaData.js";
import User from "../models/user.js";
import Page from "../models/page.js";
import Global from "../models/globals.js";

const seedDatabase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // mongoose.connection.db.dropDatabase();
    // await ContentBlockMetaData.insertMany(seedContentBlockMetaData);
    // await User.create(seedUsers);
    await User.create(users);
    // await Global.create(seedGlobal);

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "Database seeded successfully",
    });
  } catch (error) {
    next(error);
  }
};

// admin user
const users=
{
  firstName: "shafqat",
  lastName: "Jatt",
  phoneNumber: "334324",
  email: "shafqatjatt@gmail.com",
  password: "123123",
  role: "admin",
  referCode: ""
}


const seedContentBlockMetaData = [
  /*Essentials*/
  {
    title: "Link",
    subtitle: "A simple link button",
    global: false,
    pro: false,
    icon: "link",
    section: "Essentials",
    blockLimit: -1,
    blockType: "link",
  },
  {
    title: "Bio",
    subtitle: "Introduce yourself",
    global: true,
    pro: false,
    icon: "circle-user",
    section: "Essentials",
    blockLimit: 1,
    blockType: "bio",
  },
  {
    title: "Social icons",
    subtitle: "A row of social icons",
    global: true, //partially, social account details are global but which social accounts are visible is set per-page
    pro: false,
    icon: "ellipsis",
    section: "Essentials",
    blockLimit: 1,
    blockType: "social",
  },
  /*Content*/
  {
    title: "Video",
    subtitle: "Create or embed a video",
    global: false,
    pro: false,
    icon: "video",
    section: "Content",
    blockLimit: 5,
    blockType: "video",
  },
  {
    title: "Carousel",
    subtitle: "Scrollable image carousel",
    global: false,
    pro: true,
    icon: "rectangle-vertical-history",
    section: "Content",
    blockLimit: 5,
    blockType: "carousel",
  },
  {
    title: "Product",
    subtitle: "Add a shopify product card",
    global: false, //partially, The connected store is a global setting, the product and button configuration is set per-page
    pro: true,
    icon: "shopping-bag",
    section: "Content",
    blockLimit: 3,
    blockType: "product",
  },
  {
    title: "Image",
    subtitle: "Display an image",
    global: false,
    pro: false,
    icon: "image",
    section: "Content",
    blockLimit: -1,
    blockType: "image",
  },
  {
    title: "Audio",
    subtitle: "An audio player",
    global: false,
    pro: false,
    icon: "volume",
    section: "Content",
    blockLimit: 5,
    blockType: "audio",
  },
  {
    title: "Heading",
    subtitle: "A simple section heading",
    global: false,
    pro: false,
    icon: "heading",
    section: "Content",
    blockLimit: -1,
    blockType: "heading",
  },
  {
    title: "Text",
    subtitle: "A simple text block",
    global: false,
    pro: false,
    icon: "grip-lines",
    section: "Content",
    blockLimit: -1,
    blockType: "text",
  },
  /*Buttons*/
  {
    title: "Link to Qubio page",
    subtitle: "Link to another page",
    global: false,
    pro: true,
    icon: "memo",
    section: "Buttons",
    blockLimit: -1,
    blockType: "linkedPage",
  },
  {
    title: "App link",
    subtitle: "Display iOS and Android store links",
    global: false,
    pro: true,
    icon: "arrow-down-to-line",
    section: "Buttons",
    blockLimit: 5,
    blockType: "appLink",
  },
  {
    title: "Clipboard button",
    subtitle: "Let viewers copy text at the top of the button",
    global: false,
    pro: true,
    icon: "clipboard",
    section: "Buttons",
    blockLimit: -1,
    blockType: "clipboard",
  },
  /*About*/
  {
    title: "Contact card",
    subtitle: "A downloadable contact card",
    global: true,
    pro: true,
    icon: "id-badge",
    section: "About",
    blockLimit: 1,
    blockType: "contactCard",
  },
  {
    title: "Logo",
    subtitle: "Add your logo",
    global: true,
    pro: true,
    icon: "seal",
    section: "About",
    blockLimit: 1,
    blockType: "logo",
  },
  /*Connect*/
  {
    title: "Email subscribe",
    subtitle: "Get email subscribes",
    global: false, //partially, the email service is global, the list/audience and form configuration is set per-page
    pro: true,
    icon: "envelope",
    section: "Connect",
    blockLimit: 1,
    blockType: "emailSubscribe",
  },
  {
    title: "Contact form",
    subtitle: "A customisable contact form",
    global: false,
    pro: true,
    icon: "message",
    section: "Connect",
    blockLimit: 1,
    blockType: "contactForm",
  },
];

const seedGlobal = {
  _id: "64f5c5c31a42c4ad1753c935",
  userId: "64db5086a68cd90a49774199",
  globals: [
    {
      blockType: "social",
      data: [
        {
          accountUrl: "instagram.com",
          platform: "instagram",
          icon: "fa-brands fa-instagram",
        },
        {
          accountUrl: "youtube.com",
          platform: "youtube",
          icon: "fa-brands fa-youtube",
        },
        {
          accountUrl: "facebook.com",
          platform: "facebook",
          icon: "fa-brands fa-facebook",
        },
      ],
      _id: "64f5c5c23538c0a9b00a8ddf",
    },
    {
      blockType: "bio",
      data: {
        headline: "sample title",
        bioText: "Lorem Ipsum",
        url: "bio.com",
      },
      _id: "64f5c5c23538c0a9b00a8ddc",
    },
    {
      blockType: "logo",
      data: {
        logoUrl: "logo url",
      },
    },
  ],
};

const seedUsers = [
  {
    firstname: "Hasnain",
    lastname: "Raza",
    email: "hasnain@qubapp.com",
    company: "Qub App",
    verified: true,
    otp: "123456",
    pro: true,
    metadata: {
      platform: "email",
    },
    _id: "64db5086a68cd90a49774199",
  },
  {
    firstname: "Hamza",
    lastname: "Yaseen",
    email: "hamza@qubio.me",
    company: "Qub App",
    verified: true,
    otp: "123456",
    pro: true,
    metadata: {
      platform: "email",
    },
    _id: "64eedd35e1927e0632f790e4",
  },
];

const seedPage1 = {
  title: "Qub Page",
  visibility: true,
  pageStyle: { backgroundColor: "red" },
  contentBlocks: [
    {
      blockType: "heading",
      blockOrder: 1,
      data: {
        heading: "Sample heading",
      },
      _id: "64db53b1ffd44a65660c7da2",
    },
    {
      blockType: "image",
      blockOrder: 2,
      data: {
        description: "image description",
        imageUrl:
          "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images.jpg",
      },
      _id: "64db53b1ffd44a65660c7da3",
    },
    {
      blockType: "carousel",
      blockOrder: 3,
      data: {
        carousel: [
          "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images9.jpg",
          "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images8.jpg",
          "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images7.jpg",
          "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images5.jpg",
          "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images4.jpg",
          "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images3.jpg",
          "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images2.jpg",
          "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images11.jpg",
          "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images10.jpg",
        ],
      },
      _id: "64db53b1ffd44a65660c7da4",
    },
    {
      blockType: "audio",
      blockOrder: 4,
      data: {
        audioUrl:
          "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/Over_the_Horizon.mp3",
        title: "audio title",
      },
      _id: "64db53b1ffd44a65660c7da5",
    },
    {
      blockType: "video",
      blockOrder: 5,
      data: {
        videoUrl: "https://www.youtube.com/watch?v=YiSQ_db-Dcw",
        thumbnail:
          "https://s3-alpha.figma.com/hub/file/3793902531/fcd64a6f-fb24-4c37-9bc6-ac1fe9728f19-cover.png",
        type: "embedded",
        tag: "youtube",
      },
      _id: "64db53b1ffd44a65660c7da6",
    },
    {
      blockType: "video",
      blockOrder: 6,
      data: {
        videoUrl: "https://www.youtube.com/watch?v=YiSQ_db-Dcw",
        thumbnail:
          "https://s3-alpha.figma.com/hub/file/3793902531/fcd64a6f-fb24-4c37-9bc6-ac1fe9728f19-cover.png",
        type: "local",
      },
      _id: "64db53b1ffd44a65660c7da7",
    },
    {
      blockType: "social",
      blockOrder: 7,
      data: [
        {
          accountUrl: "https://www.instagram.com/",
          platform: "instagram",
          icon: "fa-instagram",
        },
        {
          accountUrl: "https://twitter.com/?lang=en",
          platform: "twitter",
          icon: "fa-twitter",
        },
        {
          accountUrl: "https://pk.linkedin.com/",
          platform: "linkedin",
          icon: "fa-linkedin",
        },
        {
          accountUrl: "https://www.facebook.com/",
          platform: "facebook",
          icon: "fa-facebook",
        },
        {
          accountUrl: "https://www.twitch.tv/",
          platform: "twitch",
          icon: "fa-twitch",
        },
        {
          accountUrl: "https://discord.com/",
          platform: "discord",
          icon: "fa-discord",
        },
        {
          accountUrl: "https://www.tiktok.com/en/",
          platform: "tiktok",
          icon: "fa-tiktok",
        },
        {
          accountUrl: "https://open.spotify.com/",
          platform: "spotify",
          icon: "fa-spotify",
        },
        {
          accountUrl: "https://www.snapchat.com/",
          platform: "snapchat",
          icon: "fa-snapchat",
        },
      ],
      _id: "64db53b1ffd44a65660c7da8",
    },
    {
      blockType: "link",
      blockOrder: 8,
      data: {
        url: "https://tse2.mm.bing.net/th?id=OIP.p3e5Y37IbeWX45Atdp_9_AHaE8&pid=Api&P=0&h=180",
        icon: "link",
        buttonText: "enter",
        highlight: false,
      },
      _id: "64db53b1ffd44a65660c7da9",
    },
    {
      blockType: "logo",
      blockOrder: 9,
      data: {
        logoUrl:
          "https://bloggytalky.com/wp-content/uploads/2017/07/create-a-free-logo-design-logo-designs-design-a-free-logo-design-a-free-logo-alltech-just-free-logo-design.png",
      },
      _id: "64db53b1ffd44a65660c7da0",
    },
    {
      blockType: "text",
      blockOrder: 10,
      data: {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      },
      _id: "64db53b1ffd44a65660c8da1",
    },
    {
      blockType: "bio",
      blockOrder: 11,
      data: {
        headline: "sample title",
        bioText: "Lorem Ipsum",
        url: "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images.jpg",
      },
      _id: "64db53b1ffd44a65660c8da2",
    },
    {
      blockType: "clipboard",
      blockOrder: 12,
      data: {
        content: "Lorem Ipsum",
        icon: "clipboard",
        highlight: false,
      },
      _id: "64db53b1ffd44a65660c8da3",
    },
    {
      blockType: "appLink",
      blockOrder: 13,
      data: {
        ios: "ios.url",
        android: "android.url",
      },
    },
  ],
  _id: "64db53b1ffd44a65660c9db4",
};

// const seedPage2 = {
//   title: "Qub Page",
//   visibility: true,
//   pageStyle: {},
//   contentBlocks: [
//     {
//       blockType: "heading",
//       blockOrder: 1,
//       data: {
//         heading: "Sample heading",
//       },
//       _id: "64db53b1ffd44a65660c7da2",
//     },
//     {
//       blockType: "image",
//       blockOrder: 2,
//       data: {
//         description: "image description",
//         imageUrl:
//           "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images.jpg",
//       },
//       _id: "64db53b1ffd44a65660c7da3",
//     },
//     {
//       blockType: "carousel",
//       blockOrder: 3,
//       data: {
//         carousel: [
//           "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images9.jpg",
//           "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images8.jpg",
//           "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images7.jpg",
//           "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images5.jpg",
//           "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images4.jpg",
//           "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images3.jpg",
//           "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images2.jpg",
//           "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images11.jpg",
//           "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images10.jpg",
//         ],
//       },
//       _id: "64db53b1ffd44a65660c7da4",
//     },
//     {
//       blockType: "audio",
//       blockOrder: 4,
//       data: {
//         audioUrl:
//           "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/Over_the_Horizon.mp3",
//         title: "audio title",
//       },
//       _id: "64db53b1ffd44a65660c7da5",
//     },
//     {
//       blockType: "video",
//       blockOrder: 5,
//       data: {
//         videoUrl: "https://www.youtube.com/watch?v=YiSQ_db-Dcw",
//         thumbnail:
//           "https://s3-alpha.figma.com/hub/file/3793902531/fcd64a6f-fb24-4c37-9bc6-ac1fe9728f19-cover.png",
//         type: "embedded",
//         tag: "youtube",
//       },
//       _id: "64db53b1ffd44a65660c7da6",
//     },
//     {
//       blockType: "video",
//       blockOrder: 6,
//       data: {
//         videoUrl: "https://www.youtube.com/watch?v=YiSQ_db-Dcw",
//         thumbnail:
//           "https://s3-alpha.figma.com/hub/file/3793902531/fcd64a6f-fb24-4c37-9bc6-ac1fe9728f19-cover.png",
//         type: "local",
//       },
//       _id: "64db53b1ffd44a65660c7da7",
//     },
//     {
//       blockType: "social",
//       blockOrder: 7,
//       data: [
//         {
//           accountUrl: "instagram.com",
//           platform: "instagram",
//           icon: "fa-brands fa-instagram",
//         },
//         {
//           accountUrl: "youtube.com",
//           platform: "youtube",
//           icon: "fa-brands fa-youtube",
//         },
//         {
//           accountUrl: "facebook.com",
//           platform: "facebook",
//           icon: "fa-brands fa-facebook",
//         },
//       ],
//       _id: "64db53b1ffd44a65660c7da8",
//     },
//     {
//       blockType: "link",
//       blockOrder: 8,
//       data: {
//         url: "https://tse2.mm.bing.net/th?id=OIP.p3e5Y37IbeWX45Atdp_9_AHaE8&pid=Api&P=0&h=180",
//         icon: "link",
//         buttonText: "enter",
//         highlight: false,
//       },
//       _id: "64db53b1ffd44a65660c7da9",
//     },
//     {
//       blockType: "logo",
//       blockOrder: 9,
//       data: {
//         logoUrl:
//           "https://bloggytalky.com/wp-content/uploads/2017/07/create-a-free-logo-design-logo-designs-design-a-free-logo-design-a-free-logo-alltech-just-free-logo-design.png",
//       },
//       _id: "64db53b1ffd44a65660c7da0",
//     },
//     {
//       blockType: "text",
//       blockOrder: 10,
//       data: {
//         text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
//       },
//       _id: "64db53b1ffd44a65660c8da1",
//     },
//     {
//       blockType: "bio",
//       blockOrder: 11,
//       data: {
//         headline: "sample title",
//         bioText: "Lorem Ipsum",
//         url: "bio.com",
//       },
//       _id: "64db53b1ffd44a65660c8da2",
//     },
//     {
//       blockType: "clipboard",
//       blockOrder: 12,
//       data: {
//         content: "Lorem Ipsum",
//         icon: "clipboard",
//         highlight: false,
//       },
//       _id: "64db53b1ffd44a65660c8da3",
//     },
//     {
//       blockType: "appLink",
//       blockOrder: 13,
//       data: {
//         ios: "ios.url",
//         android: "android.url",
//       },
//     },
//   ],
//   _id: "64db53b1ffd44a65660c7da4",
// };

const seedPage = {
  userId: "64db5086a68cd90a49774500",
  pages: [seedPage1],
};

export default seedDatabase;
