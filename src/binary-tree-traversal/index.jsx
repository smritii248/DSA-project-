import { useState } from "react";
import "./binary-tree-traversal.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const getTreeData = () => ({
  element: "0",
  left: {
    element: "1",
    left: { element: "3" },
    right: { element: "4" },
  },
  right: {
    element: "2",
    left: {
      element: "5",
      left: { element: "7", left: { element: "10" } },
    },
    right: {
      element: "6",
      left: { element: "8" },
      right: {
        element: "9",
        left: { element: "11", left: { element: "13" } },
        right: { element: "12", right: { element: "14" } },
      },
    },
  },
});

const BinaryTree = () => {
  const navigate = useNavigate();
  const [tree, setTree] = useState(getTreeData());
  const [traversalStarted, setTraversalStarted] = useState(false);
  const [inorderArray, setInorderArray] = useState([]);
  const [preorderArray, setPreorderArray] = useState([]);
  const [postorderArray, setPostorderArray] = useState([]);
  console.log(setTree);

  const resetBackgroundColors = () => {
    document.querySelectorAll(".node-element").forEach((node) => {
      node.style.backgroundColor = "lightyellow";
    });
  };

  const inorderTraversal = async (node) => {
    if (!node) return;

    const domNode = document.getElementById(node.element);
    await sleep(500);
    domNode.style.backgroundColor = "lightgreen";

    await inorderTraversal(node.left);

    await sleep(500);
    domNode.style.backgroundColor = "pink";
    setInorderArray((prev) => [...prev, node.element]);

    await inorderTraversal(node.right);
  };

  const preorderTraversal = async (node) => {
    if (!node) return;

    const domNode = document.getElementById(node.element);
    await sleep(500);
    domNode.style.backgroundColor = "lightgreen";

    await sleep(500);
    domNode.style.backgroundColor = "pink";
    setPreorderArray((prev) => [...prev, node.element]);

    await preorderTraversal(node.left);
    await preorderTraversal(node.right);
  };

  const postorderTraversal = async (node) => {
    if (!node) return;

    const domNode = document.getElementById(node.element);
    await sleep(500);
    domNode.style.backgroundColor = "lightgreen";

    await postorderTraversal(node.left);
    await postorderTraversal(node.right);

    await sleep(500);
    domNode.style.backgroundColor = "pink";
    setPostorderArray((prev) => [...prev, node.element]);
  };

  const startTraversal = async (type) => {
    if (traversalStarted) return;

    resetBackgroundColors();
    setTraversalStarted(true);
    setInorderArray([]);
    setPreorderArray([]);
    setPostorderArray([]);

    if (type === "inorder") {
      await inorderTraversal(tree);
    } else if (type === "preorder") {
      await preorderTraversal(tree);
    } else {
      await postorderTraversal(tree);
    }

    setTraversalStarted(false);
  };

  const renderTree = (node) => {
    if (!node) return null;

    return (
      <div className="node">
        <div id={node.element} className="node-element">
          {node.element}
        </div>
        {(node.left || node.right) && (
          <div className="node-children">
            <div className="node">{renderTree(node.left)}</div>
            <div className="node">{renderTree(node.right)}</div>
          </div>
        )}
      </div>
    );
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="container">
      <Button
        variant="contained"
        color="info"
        onClick={handleBack}
        sx={{ fontSize: "1.25rem", padding: "12px 24px" }}
      >
        Go Back
      </Button>
      <h2>Binary Tree Traversal</h2>
      <div className="tree">{renderTree(tree)}</div>

      <div className="traversal-btn-array-container">
        <Button variant="contained" onClick={() => startTraversal("inorder")}>
          Inorder
        </Button>
        <div className="traversal-array">
          {inorderArray.map((el, index) => (
            <div key={index} className="array-cell">
              {el}
            </div>
          ))}
        </div>
      </div>

      <div className="traversal-btn-array-container">
        <Button variant="contained" onClick={() => startTraversal("preorder")}>
          Preorder
        </Button>
        <div className="traversal-array">
          {preorderArray.map((el, index) => (
            <div key={index} className="array-cell">
              {el}
            </div>
          ))}
        </div>
      </div>
      <div className="traversal-btn-array-container">
        <Button variant="contained" onClick={() => startTraversal("postorder")}>
          Postorder
        </Button>
        <div className="traversal-array">
          {postorderArray.map((el, index) => (
            <div key={index} className="array-cell">
              {el}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BinaryTree;
