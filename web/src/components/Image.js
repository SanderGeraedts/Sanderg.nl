import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import React from "react";

const Image = ({ image, width, height }) => {
  return (
    <img
      src={imageUrlFor(buildImageObj(image))
        .width(width)
        .height(height)
        .auto("format")
        .url()}
      alt={image.alt}
    />
  );
};

export default Image;
