// controllers/Blog.js
const Blog = require("../../models/AddBlog/AddBlogModel");

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const {
      name, description, body, createdBy, lang, blog_type,
      meta_title, meta_description, meta_keywords, canonical_url,
    } = req.body;

    // Support file upload (imageFile field) OR plain URL in body
    const imageUrl = req.fileUrls?.['imageFile']?.[0] ?? req.body.imageUrl ?? null;

    const newBlog = await Blog.create({
      name,
      description,
      body,
      imageUrl,
      isActive: true,
      blog_type,
      createdBy,
      lang,
      meta_title,
      meta_description,
      meta_keywords,
      canonical_url,
    });

    res.status(200).json({ success: true, blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get all Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get a specific Blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Update a specific Blog by ID
exports.updateBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const {
      name, description, body, createdBy, lang, blog_type,
      meta_title, meta_description, meta_keywords, canonical_url,
    } = req.body;

    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    existingBlog.name             = name;
    existingBlog.description      = description;
    existingBlog.body             = body;
    existingBlog.blog_type        = blog_type;
    existingBlog.createdBy        = createdBy;
    existingBlog.lang             = lang;
    existingBlog.meta_title       = meta_title;
    existingBlog.meta_description = meta_description;
    existingBlog.meta_keywords    = meta_keywords;
    existingBlog.canonical_url    = canonical_url;

    // Update imageUrl only if a new file was uploaded
    const newImageUrl = req.fileUrls?.['imageFile']?.[0] ?? null;
    if (newImageUrl) {
      existingBlog.imageUrl = newImageUrl;
    } else if (req.body.imageUrl) {
      existingBlog.imageUrl = req.body.imageUrl;
    }

    const updatedBlog = await existingBlog.save();
    res.status(200).json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Delete a specific Blog by ID
exports.deleteBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;

    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    await Blog.deleteOne({ _id: blogId });
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
