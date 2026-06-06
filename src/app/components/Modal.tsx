import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  icon,
  children,
  footer,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md bg-white text-gray-900 gap-0 p-0 overflow-hidden">
        <DialogHeader className="flex-row items-center gap-3 px-6 py-4 border-b border-gray-100 text-left space-y-0">
          {icon}
          <div className="flex-1">
            <DialogTitle className="text-gray-900 font-normal">{title}</DialogTitle>
            {subtitle && (
              <DialogDescription className="text-xs text-gray-500">{subtitle}</DialogDescription>
            )}
          </div>
        </DialogHeader>

        <div className="px-6 py-5">{children}</div>

        {footer && <DialogFooter className="px-6 pb-5 sm:justify-stretch">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
