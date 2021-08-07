import { memo } from "react";
const Loading = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default memo(Loading);
