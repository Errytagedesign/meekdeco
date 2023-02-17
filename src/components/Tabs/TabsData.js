import Products from "../dashboardShop/products/Products";
import { BsUpload } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Upload from "../dashboardShop/upload/Upload";

export const TabsData = [
  {
    TabTitle: [
      { id: "tab1", icon: <BsUpload />, title: "Upload" },
      {
        id: "tab2",
        icon: <MdOutlineProductionQuantityLimits />,
        title: "Products",
      },
    ],
    TabContents: [
      { id: "tab1", comp: <Upload /> },
      { id: "tab2", comp: <Products /> },
    ],
  },
];
