import S from "@sanity/desk-tool/structure-builder";
import { MdSettings } from "react-icons/md";
import { FaBriefcase, FaNewspaper, FaWrench } from "react-icons/fa";

const hiddenTypes = [
  "category",
  "teamInfo",
  "page",
  "person",
  "post",
  "portfolio",
  "siteSettings",
  "tools",
];

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Portfolio")
        .schemaType("portfolio")
        .child(S.documentTypeList("portfolio").title("Portfolio"))
        .icon(FaBriefcase),
      S.listItem()
        .title("Pages")
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages")),
      S.listItem()
        .title("Blog posts")
        .schemaType("post")
        .child(S.documentTypeList("post").title("Blog posts"))
        .icon(FaNewspaper),
      S.listItem()
        .title("Tools")
        .schemaType("tool")
        .child(S.documentTypeList("tool").title("Tools"))
        .icon(FaWrench),
      S.listItem()
        .title("Site Settings")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        )
        .icon(MdSettings),
      ...S.documentTypeListItems().filter(
        (listItem) => !hiddenTypes.includes(listItem.getId())
      ),
    ]);
