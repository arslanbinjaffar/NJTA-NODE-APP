import { Request, Response, NextFunction } from "express";

// Models
import ContentBlockMetaData from "../models/contentBlocksMetaData.js";

// Interfaces
interface IItem {
  id: string;
  title: string;
  subtitle: string;
  global: boolean;
  pro: boolean;
  icon: string;
  section: string;
  blockLimit: number;
}

/*
  @desc GET all content block meta data
  @route GET /api/v1/content-block
  @access Public
 */
const getAllContentBlockMD = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allData = await ContentBlockMetaData.find();

    res.json({
      status: 200,
      success: true,
      data: allData,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};

/*
@desc POST a new content block meta data
@route POST /api/v1/content-block/create/:id
@access Public
*/
const createContentBlockMD = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, subtitle, global, pro, icon, section, blockLimit, blockType } =
    req.body;
  try {
    const result = await ContentBlockMetaData.create({
      title,
      subtitle,
      global,
      pro,
      icon,
      section,
      blockLimit,
      blockType,
    });

    if (!result) throw new Error("Content block not created");

    res.json({
      status: 200,
      success: true,
      data: result,
      message: "Content block metadata created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc PATCH edit content block meta data
  @route PATCH /api/v1/content-block/edit/:blockId
  @access Public
 */
const editContentBlockMD = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockId } = req.params;
  const { title, subtitle, global, pro, icon, section, blockLimit, blockType } =
    req.body;

  try {
    const allData = await ContentBlockMetaData.find({ _id: blockId });
    if (!allData.length) throw new Error("Content block meta data not found");

    // const mergedObject = Object.assign(allData[0], contentBlocks);

    const result = await ContentBlockMetaData.findByIdAndUpdate(
      blockId,
      {
        title,
        subtitle,
        global,
        pro,
        icon,
        section,
        blockLimit,
        blockType,
      },
      { new: true }
    );
    if (!result) throw new Error("Content block not updated");

    res.json({
      status: 200,
      success: true,
      data: result,
      message: "Content block metadata updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc DELETE a content block meta data
  @route DELETE /api/v1/content-block/delete/:blockId
  @access Public
 */
const deleteContentBlockMD = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockId } = req.params;
  try {
    const result = await ContentBlockMetaData.findByIdAndDelete(blockId);

    if (!result) throw new Error("No content block meta data found");

    res.json({
      status: 200,
      success: true,
      data: result,
      message: "Content block meta data deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc DELETE all content block meta data
  @route DELETE /api/v1/content-block/delete-all
  @access Public
 */
const deleteAllContentBlockMD = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ContentBlockMetaData.deleteMany();

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "All Content block meta data deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllContentBlockMD,
  createContentBlockMD,
  editContentBlockMD,
  deleteContentBlockMD,
  deleteAllContentBlockMD,
};
