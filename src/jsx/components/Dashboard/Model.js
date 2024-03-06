import React from "react";
import styles from "../../../css/Model.module.css";

const Model = ({ children, onClose }) => {
  const title = children.props.data.title;
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.box_model}>
        <div className={styles.header}>
          <p className="title">{title}</p>
          <button className={styles.cross_button} onClick={onClose}>
            &#10006;
          </button>
        </div>
        <div className={styles.search_bar}>
          <input type="text" placeholder="Search..." />
          <div className={styles.search_icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="#000000"
                d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-1.42 1.42l.27.28v.79l4.25 4.25c.5-.39 1.08-.81 1.71-1.46l-4.25-4.25zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z"
              />
            </svg>
          </div>
        </div>
        <div className={styles.table}>{children}</div>
      </div>
    </div>
  );
};

export default Model;
