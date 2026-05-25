const Branch = require("../../models/Branch/Branch");

// ✅ CREATE BRANCH
exports.createBranch = async (req, res) => {
  try {
    const {
      name,
      address,
      phone,
      googleMapsUrl,
      description,
      isActive,
      createdBy,
      lang,
    } = req.body;

    // Prefer the GCS-uploaded URL; fall back to any URL sent in the body
    const image =
      req.fileUrls?.imageFile?.[0] ||
      req.fileUrls?.images?.[0] ||
      req.body.image ||
      '';

    const newBranch = await Branch.create({
      name,
      address,
      phone,
      googleMapsUrl,
      image,
      description,
      isActive,
      createdBy,
      lang,
    });

    res.status(200).json({
      success: true,
      branch: newBranch,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};


// ✅ GET ALL BRANCHES
exports.getAllBranches = async (req, res) => {
  try {
    const branchList = await Branch.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      branchList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};


// ✅ GET BRANCH BY ID
exports.getBranchById = async (req, res) => {
  try {
    const branchId = req.params.id;

    const branch = await Branch.findById(branchId);

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    res.status(200).json({
      success: true,
      branch,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};


// ✅ UPDATE BRANCH
exports.updateBranchById = async (req, res) => {
  try {
    const branchId = req.params.id;

    const existingBranch = await Branch.findById(branchId);

    if (!existingBranch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    // If a new image file was uploaded use its URL; otherwise keep the existing image
    const newImageUrl =
      req.fileUrls?.imageFile?.[0] ||
      req.fileUrls?.images?.[0] ||
      null;

    // update fields
    existingBranch.name        = req.body.name        ?? existingBranch.name;
    existingBranch.address     = req.body.address     ?? existingBranch.address;
    existingBranch.phone       = req.body.phone       ?? existingBranch.phone;
    existingBranch.googleMapsUrl = req.body.googleMapsUrl ?? existingBranch.googleMapsUrl;
    existingBranch.image       = newImageUrl || req.body.image || existingBranch.image;
    existingBranch.description = req.body.description ?? existingBranch.description;
    existingBranch.isActive    = req.body.isActive    ?? existingBranch.isActive;
    existingBranch.createdBy   = req.body.createdBy   ?? existingBranch.createdBy;
    existingBranch.lang        = req.body.lang        ?? existingBranch.lang;

    const updatedBranch = await existingBranch.save();

    res.status(200).json({
      success: true,
      branch: updatedBranch,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};


// ✅ DELETE BRANCH
exports.deleteBranchById = async (req, res) => {
  try {
    const branchId = req.params.id;

    const existingBranch = await Branch.findById(branchId);

    if (!existingBranch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    await Branch.deleteOne({ _id: branchId });

    res.status(200).json({
      success: true,
      message: "Branch deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};