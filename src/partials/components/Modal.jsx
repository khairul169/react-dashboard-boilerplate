import React, { useRef, useEffect, useState } from 'react';
import Transition from '../../utils/Transition';

const Modal = ({ visible, setVisible, children }) => {
  const modalContent = useRef();
  const [isLoaded, setLoaded] = useState();

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!visible || !isLoaded || modalContent.current.contains(target) || target.id?.startsWith('react-select')) {
        return;
      }
      setVisible(false);
    };

    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!visible || !isLoaded || keyCode !== 27) {
        return;
      }
      setVisible(false);
    };

    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    setLoaded(visible);
  }, [visible]);

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={visible}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={visible}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white overflow-auto z-50 max-w-2xl w-full max-h-full rounded shadow-lg"
        >
          {children}
        </div>
      </Transition>
    </>
  );
};

export default Modal;
