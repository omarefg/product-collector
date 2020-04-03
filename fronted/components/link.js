import { withRouter } from "next/router";
import NextLink from "next/link";
import React, { Children } from "react";

const Link = ({ router, children, ...props }) => {
  const child = Children.only(children);
  const activeClassName = props.activeClassName || "active";

  let className = child.props.className || "";

  if (router.pathname === props.href && activeClassName) {
    className = `${className}${activeClassName}`.trim();
  }

  delete props.activeClassName;

  return <NextLink {...props}>{React.cloneElement(child, { className })}</NextLink>;
};

export default withRouter(Link);
