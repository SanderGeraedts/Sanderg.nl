export default {
  name: "tool",
  title: "Tool",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "logo",
      title: "Logo",
      type: "mainImage",
    },
    {
      name: "profiency",
      title: "Profiency",
      type: "number",
      validation: (Rule) =>
        Rule.min(0)
          .max(100)
          .integer(),
    },
  ],
};
