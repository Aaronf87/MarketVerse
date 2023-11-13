require("dotenv").config();
const cloudinary = require("cloudinary").v2;

console.log("Ln 7", process.env.CLOUD_NAME);
console.log("Ln 8", process.env.CLOUD_API_KEY);
console.log("Ln 9", process.env.CLOUD_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

// Log the configuration
console.log("Ln 12", cloudinary.config());

// Uploads an image file to Cloudinary. Returns the image's public ID.
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log("Ln 25", result);
      return result.public_id;
    } catch (error) {
      console.error("Ln 28", error);
    }
};

const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
      colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        console.log("Ln 42", result);
        return result.colors;
        } catch (error) {
        console.error("Ln 45", error);
    }
};

// const createImageTag = (publicId, ...colors) => {

//     // Set the effect color and background color
//     const [effectColor, backgroundColor] = colors;

//     // Create an image tag with transformations applied to the src URL
//     let imageTag = cloudinary.image(publicId, {
//       transformation: [
//         { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
//         { radius: 'max' },
//         { effect: 'outline:10', color: effectColor },
//         { background: backgroundColor },
//       ],
//     });

//     return imageTag;
// };

(async () => {

    // Set the image to upload
    const imagePath = '';

    // Upload the image
    const publicId = await uploadImage(imagePath);

    // Get the colors in the image
    // const colors = await getAssetInfo(publicId);

    // Create an image tag, using two of the colors in a transformation
    // const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

    // Log the image tag to the console
    console.log("Ln 82", publicId);

})();