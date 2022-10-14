import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const CustomToolTip = ({message, children}) => {
    return (
        <OverlayTrigger
        key="top"
        placement="top"
        overlay={
          <Tooltip id="tooltip-top">
            {message}
          </Tooltip>
        }
      >
        {children}
      </OverlayTrigger>
    );
};

export default CustomToolTip;