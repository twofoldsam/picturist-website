# Content Type Showcase Images

This directory should contain the images used in the Content Type Showcase component. The component is configured to use specific image files for each content type.

## Required Images

The following images are needed for the Content Type Showcase:

- `placeholder-story-illustration.jpg` - An illustration for the Short Story example
- `placeholder-technical-illustration.jpg` - A technical diagram for the Technical Article example
- `placeholder-comic-illustration.jpg` - A comic panel for the Comic example
- `placeholder-blog-illustration.jpg` - An infographic for the Blog Post example

## Image Customization

To customize the images and their dimensions, edit the `contentImages` object in the `/components/ContentTypeShowcase.tsx` file:

```typescript
const contentImages: Record<string, ContentTypeImageConfig> = {
  story: {
    src: "/images/placeholder-story-illustration.jpg", // Replace with actual image path
    width: 160, // Customize width (in pixels)
    height: 120, // Customize height (aspect ratio will be maintained)
    alt: "Lighthouse during a storm with lightning" // Customize alt text
  },
  // ...other content types
};
```

## Image Specifications

- **Recommended size**: At least 320x240px for good quality
- **Format**: JPG or WebP (WebP preferred for better compression)
- **Aspect ratio**: Default is 4:3, but can be customized in the config
- **File size**: Optimize for web (< 200KB each)

## Adding Custom Images

To add your own custom images:

1. Place your image files in this directory
2. Update the `src` property in the `contentImages` object to point to your new images
3. Adjust the `width` and `height` properties as needed to control the display size
4. Provide descriptive `alt` text for accessibility

Example of adding a custom image:

```typescript
const contentImages: Record<string, ContentTypeImageConfig> = {
  story: {
    src: "/images/custom-story-illustration.webp", 
    width: 180,
    height: 135,
    alt: "Custom lighthouse illustration"
  },
  // ...other content types
};
```