// ** Menu Components Imports
import HorizontalNavMenuLink from "./HorizontalNavMenuLink";
import HorizontalNavMenuGroup from "./HorizontalNavMenuGroup";
import { resolveHorizontalNavMenuItemComponent as resolveNavItemComponent } from "../../../../layouts/utils";
import { CanViewMenuGroup } from "../../../utils";

const HorizontalNavMenuItems = (props: any) => {
  // ** Components Object
  const Components = {
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink,
  };

  // ** Render Nav Items
  return props.items.map((item: any, index: any) => {
    const TagName = Components[resolveNavItemComponent(item)];
    if (item.children) {
      return (
        CanViewMenuGroup(item) && (
          <TagName item={item} index={index} key={item.id} {...props} />
        )
      );
    }
    return <TagName item={item} index={index} key={item.id} {...props} />;
  });
};

export default HorizontalNavMenuItems;
