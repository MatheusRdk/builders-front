import React from "react";

function Dialog(props) {
  const {
    actionsPannel,
    children,
    color = "bg-red",
    handleCloseDialog,
    size = "w-1/3",
    title,
  } = props;

  const CloseIcon = () => {
    return (
      <span>
        <button
          onClick={handleCloseDialog}
        >
          <svg
            class="fill-current text-black hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 
            9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
        </button>
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex 
    transition ease-in-out duration-700">
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div>
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className={`inline-block align-bottom bg-white rounded-lg text-left 
            overflow-hidden shadow-xl transform transition-all sm:my-8 
            sm:align-middle ${size}`}
            role="dialog"
          >
            <div>
              <div className="text-xl font-semibold">{title}</div>
              {CloseIcon()}
            </div>
            <div className="bg-white">
              <div>
                {children}
              </div>
            </div>
            {actionsPannel}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;