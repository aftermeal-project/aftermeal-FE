import { useEffect } from 'react';
import { SetterOrUpdater } from 'recoil';

interface Props extends React.HTMLAttributes<HTMLElement> {
  setModal: SetterOrUpdater<boolean>;
}

export default function ModalLayout({ children, setModal }: Props) {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px; 
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const onClick = () => {
    setModal(false);
  };

  return (
    <div className="fixed inset-x-0 inset-y-0 z-[10] flex h-screen w-full flex-col items-center">
      <div
        className="fixed flex h-full w-full items-center justify-center bg-black/[.3]"
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
}
