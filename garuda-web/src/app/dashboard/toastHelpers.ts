// Lightweight toast helpers. Any client component on the dashboard
// can call notify.loading() / notify.success() / notify.error() and the
// <Toaster /> mounted in page.tsx will render the result.
//
// Pattern:
//   const id = notify.loading("Saving…");
//   try { await action(); notify.success("Saved", id); }
//   catch { notify.error("Couldn't save", id); }

export type ToastVariant = "loading" | "success" | "error";

export type ToastEventDetail = {
  id?: string;
  message: string;
  variant: ToastVariant;
};

let counter = 0;

function emit(detail: ToastEventDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ToastEventDetail>("garuda:toast", { detail }),
  );
}

export const notify = {
  /** Show a sticky "in progress" toast. Returns its id for later upgrade. */
  loading(message: string): string {
    const id = `t${++counter}`;
    emit({ id, message, variant: "loading" });
    return id;
  },
  /** Show or replace a toast with a success state (auto-dismisses). */
  success(message: string, id?: string) {
    emit({ id, message, variant: "success" });
  },
  /** Show or replace a toast with an error state (auto-dismisses, longer). */
  error(message: string, id?: string) {
    emit({ id, message, variant: "error" });
  },
};
