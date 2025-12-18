import Button from "./Button";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "",
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-sm animate-fadeIn">
        <h4>{title}</h4>
        {description && (
          <p className="mt-2 opacity-80">{description}</p>
        )}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
