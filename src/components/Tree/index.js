import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { isNumber } from "lodash";
import "./index.css";
import ColoredLine from "../ColoredLine";
import { ROW_PREFIX_ICON_COLOR } from "../../utils/constants";

/**
 * A basic Tree component for showing nested list structure
 * @param {object} props Component props
 * @param {boolean} props.fromChild whether this Tree is part of another TreeNode
 * @param {string} props.data nested list of elements which has nested elements in children property
 */
const Tree = (props) => {
  const { data, fromChild } = props;
  return (
    <ol className={`treeContainer flexColumn ${fromChild ? "children" : ""}`}>
      {data.map((tree, idx) => (
        <div key={tree.id}>
          <TreeNode
            node={tree}
            idx={fromChild ? String.fromCharCode(97 + idx) : idx + 1}
          />
          {!fromChild && idx !== data.length - 1 && (
            <ColoredLine color="#f0f4f9" />
          )}
        </div>
      ))}
    </ol>
  );
};

/**
 * A basic TreeNode component for showing each element in Tree
 * @param {object} props Component props
 * @param {string} props.idx key value for element
 * @param {string} props.node element details
 */
const TreeNode = (props) => {
  const { node, idx } = props;
  const [childVisible, setChildVisiblity] = useState(true);

  const hasChild = node.children ? true : false;
  const isChildNode = !isNumber(idx);
  const backGroundClass =
    isChildNode && (idx.charCodeAt(0) - 97) % 2 === 0
      ? "evenStyle"
      : "oddStyle";

  return (
    <>
      <li className={`treeNode ${backGroundClass}`}>
        <div className="flex" onClick={() => setChildVisiblity((v) => !v)}>
          {hasChild && (
            <div
              className={`treeToggler inlineFlex alignCenter ${
                childVisible ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
          )}

          <div className="inlineFlex">
            <div
              className={`alignCenter ${isChildNode ? "horizontalLine" : ""}`}
            ></div>
            <div
              className={`inlineFlex ${
                isChildNode ? "treeNodeContent-child" : "treeNodeContent"
              }`}
            >
              <FontAwesomeIcon
                icon={faUserCircle}
                color={ROW_PREFIX_ICON_COLOR}
              />
              <div className="content">{`${idx}.  ${node.title}`}</div>
            </div>
          </div>
        </div>
      </li>
      {hasChild && childVisible && (
        <Tree data={node.children} fromChild={hasChild} />
      )}
    </>
  );
};

Tree.propTypes = {
  data: PropTypes.array.isRequired,
  fromChild: PropTypes.bool
};

Tree.defaultProps = {
  fromChild: false
};

export default Tree;
