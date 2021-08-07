import { useState, memo } from "react";

const Error = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      {isVisible && (
        <div className="alert">
          <span
            className="alert-closebtn"
            onClick={(e) => setIsVisible(!isVisible)}
          >
            &times;
          </span>
          Oops!! Please refresh the page
        </div>
      )}
    </div>
  );
};

export default memo(Error);
