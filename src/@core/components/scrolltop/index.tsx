import { useEffect, useState } from "react";
import Proptypes from "prop-types";

const ScrollTop = (props: any) => {
  const { showOffset, scrollBehaviour, children, ...rest } = props;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset >= showOffset) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      });
    }
  }, []);

  const handleScrollToTop = () => {
    window.scroll({ top: 0, behavior: scrollBehaviour });
  };

  return visible ? (
    <div className="scroll-to-top" onClick={handleScrollToTop} {...rest}>
      {children}
    </div>
  ) : null;
};

export default ScrollTop;

// ** PropTypes
ScrollTop.propTypes = {
  showOffset: Proptypes.number,
  children: Proptypes.any.isRequired,
  scrollBehaviour: Proptypes.oneOf(["smooth", "instant", "auto"]),
  className: Proptypes.string,
};

ScrollTop.defaultProps = {
  scrollBehaviour: "smooth",
};
