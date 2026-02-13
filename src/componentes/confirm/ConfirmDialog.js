import React from "react";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
  loading = false,
  error = "",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  const variantStyles =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : variant === "primary"
        ? "bg-blue-600 hover:bg-blue-700"
        : "bg-gray-800 hover:bg-gray-900";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => (loading ? null : onCancel())}
      />

      {/* modal */}
      <div className="relative w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        <div className="p-5 space-y-3">
          <p className="text-gray-700">{message}</p>

          {error ? (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {error}
            </div>
          ) : null}
        </div>

        <div className="p-5 border-t flex gap-3 justify-end">
          <button
            type="button"
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-60"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className={`px-4 py-2 rounded-md text-white disabled:opacity-60 ${variantStyles}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Aguarde..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
