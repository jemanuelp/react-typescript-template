import VerticalNavMenuLink from "./VerticalNavMenuLink";
import VerticalNavMenuGroup from "./VerticalNavMenuGroup";
import VerticalNavMenuSectionHeader from "./VerticalNavMenuSectionHeader";
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from "../../../../layouts/utils";
import { CanViewMenuGroup } from "../../../utils";

const VerticalMenuNavItems = (props: any) => {
  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader,
  };

  // ** Render Nav Menu Items
  return (
    props.items &&
    props.items.map((item: any, index: number) => {
      const TagName = Components[resolveNavItemComponent(item)];
      if (item.children) {
        return (
          CanViewMenuGroup(item) && (
            <TagName item={item} index={index} key={item.id} {...props} />
          )
        );
      }
      return <TagName key={item.id || item.header} item={item} {...props} />;
    })
  );
};

export default VerticalMenuNavItems;
