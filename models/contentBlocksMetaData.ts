import mongoose from "mongoose";

// Interface representing a document in MongoDB.
interface IContentBlocksMetaData {
  title: string;
  subtitle: string;
  global: boolean;
  pro: boolean;
  icon: string;
  section: string;
  blockLimit: number;
  blockType: string;
}

// Content block metadata schema
const contentBlockMetaDataSchema = new mongoose.Schema<IContentBlocksMetaData>({
  title: String,
  subtitle: String,
  global: Boolean,
  pro: Boolean,
  icon: String,
  section: String,
  blockLimit: Number,
  blockType: String,
});

// Content block metadata model
const ContentBlockMetaData = mongoose.model<IContentBlocksMetaData>(
  "contentBlockMetaData",
  contentBlockMetaDataSchema
);

export default ContentBlockMetaData;
