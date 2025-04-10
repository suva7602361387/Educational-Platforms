const { Mongoose } = require("mongoose");
const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
	try {
        
    
		const allCategorys = await Category.find({});
		res.status(200).json({
			success: true,
			data: allCategorys
		});
    console.log("INSIDE SHOW ALL CATEGORIES",allCategorys);

	} catch (error) {
		return res.status(500).json({
			success: false,

			message:"error is return",
		});
	}
};
exports.getCategoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log("PRINTING CATEGORY ID:", categoryId);

    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    if (!selectedCategory) {
      console.log("Category not found.");
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    if (!selectedCategory.courses.length) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // Get other categories excluding the selected one
    const categoriesExceptSelected = await Category.find({ _id: { $ne: categoryId } });

    let differentCategory = null;
    if (categoriesExceptSelected.length > 0) {
      const randomCategory = categoriesExceptSelected[Math.floor(Math.random() * categoriesExceptSelected.length)];
      differentCategory = await Category.findById(randomCategory._id)
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec();
    }

    // Get top-selling courses across all categories
    const allCategories = await Category.find().populate({
      path: "courses",
      match: { status: "Published" },
      populate: { path: "instructor" },
    });

    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .filter((course) => course.sold !== undefined)
      .sort((a, b) => (b.sold || 0) - (a.sold || 0))
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: { selectedCategory, differentCategory, mostSellingCourses },
    });
  } catch (error) {
    console.error("Error fetching category details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
