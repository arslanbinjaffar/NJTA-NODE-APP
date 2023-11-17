import mongoose from "mongoose";

// Interface representing a document in MongoDB.
interface IPage {
  userId: { type: string };
  pages: [
    {
      title: string;
      pageStyles: {};
      visibility: {
        type: boolean;
        default: true;
      };
      thumbnail: string;
      contentBlocks: [
        {
          blockType: { type: string };
          blockOrder: { type: number };
          data: {};
        }
      ];
      _id: any;
    }
  ];
}

// Page Schema
const pageSchema = new mongoose.Schema<IPage>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  pages: [
    {
      title: String,
      pageStyles: { type: mongoose.Schema.Types.Mixed, default: null },
      visibility: {
        type: Boolean,
        default: true,
      },
      pageUrl: String,
      thumbnail: { type: String, default: null },
      contentBlocks: [
        {
          blockType: { type: String },
          blockOrder: { type: Number },
          data: {},
        },
      ],
    },
  ],
});

// Page model
const Page = mongoose.model<IPage>("page", pageSchema);

export default Page;
