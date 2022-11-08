import React, { useState } from "react";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../../redux/slices/userSlice";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const User = () => { 
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);

  const user = useSelector((state) => state.user?.user)
  const dispatch = useDispatch()



  const handleSignout = () => {
    dispatch(removeUser())

  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">Welcome</div>
            <div className="user-name dropdown-indicator">{user?.profileName}</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span><FaUser/></span>
            </div>
            <div className="user-info">
              <span className="lead-text">{user?.profileName}</span>
              <span className="sub-text">{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
          </LinkList>
          <LinkList>
            <LinkItem link="/" icon="setting-alt" onClick={toggle}>
              Reset Password
            </LinkItem>
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <Link to="/" onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </Link>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
