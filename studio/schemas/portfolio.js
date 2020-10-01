export default {
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Some frontend will require a slug to be set to be able to show the portfolio",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "publishedAt",
      title: "Published at",
      description:
        "You can use this field to schedule portfolio where you show them",
      type: "datetime",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "blockText",
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "mainImage",
    },
    {
      name: "logo",
      title: "Logo",
      type: "mainImage",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],
  orderings: [
    {
      title: "Publishing date new–>old",
      name: "publishingDateAsc",
      by: [
        { field: "publishedAt", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
    {
      title: "Publishing date old->new",
      name: "publishingDateDesc",
      by: [
        { field: "publishedAt", direction: "desc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      image: "logo",
    },
    prepare({ title = "No title", publishedAt, image }) {
      return {
        title,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : "Missing publishing date",
        media: image,
      };
    },
  },
};
