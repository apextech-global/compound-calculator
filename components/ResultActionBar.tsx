"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export type ResultActionOutcome =
  | "resultShared"
  | "linkCopied"
  | "imageDownloaded"
  | "captionCopied";

type ResultActionName = "share" | "copyLink" | "download" | "copyCaption";

type ResultActionBarProps = {
  shareUrl: string;
  onShareResult: () => Promise<ResultActionOutcome>;
  onCopyShareLink: () => Promise<ResultActionOutcome>;
  onDownloadResultImage: () => Promise<ResultActionOutcome>;
  onCopySocialCaption: () => Promise<ResultActionOutcome>;
};

type FeedbackState = {
  message: string;
  tone: "success" | "error";
};

export default function ResultActionBar({
  shareUrl,
  onShareResult,
  onCopyShareLink,
  onDownloadResultImage,
  onCopySocialCaption,
}: ResultActionBarProps) {
  const t = useTranslations();
  const [activeAction, setActiveAction] = useState<ResultActionName | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const dismissTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (dismissTimer.current !== null) {
        window.clearTimeout(dismissTimer.current);
      }
    },
    []
  );

  const showFeedback = (nextFeedback: FeedbackState) => {
    if (dismissTimer.current !== null) {
      window.clearTimeout(dismissTimer.current);
    }

    setFeedback(nextFeedback);
    dismissTimer.current = window.setTimeout(() => {
      setFeedback(null);
      dismissTimer.current = null;
    }, 2400);
  };

  const runAction = async (
    actionName: ResultActionName,
    action: () => Promise<ResultActionOutcome>
  ) => {
    setActiveAction(actionName);

    try {
      const outcome = await action();
      const messages: Record<ResultActionOutcome, string> = {
        resultShared: t("share.resultShared"),
        linkCopied: t("share.linkCopied"),
        imageDownloaded: t("share.imageDownloaded"),
        captionCopied: t("caption.captionCopied"),
      };

      showFeedback({ message: messages[outcome], tone: "success" });
    } catch {
      showFeedback({ message: t("share.actionFailed"), tone: "error" });
    } finally {
      setActiveAction(null);
    }
  };

  return (
    <div className="min-w-0 lg:max-w-[34rem]">
      <div className="calculator-action-group flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
        <button
          type="button"
          data-testid="share-result-button"
          onClick={() => void runAction("share", onShareResult)}
          disabled={activeAction !== null}
          className="calculator-secondary-action w-full rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2.5 text-sm font-semibold text-cyan-100 hover:border-cyan-200/50 hover:bg-cyan-300/15 sm:w-auto"
          aria-label={t("share.title")}
          aria-busy={activeAction === "share"}
        >
          {t("share.shareResult")}
        </button>
        <button
          type="button"
          data-testid="copy-link-button"
          onClick={() => void runAction("copyLink", onCopyShareLink)}
          disabled={activeAction !== null}
          className="calculator-secondary-action w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-2.5 text-sm font-semibold text-slate-100 hover:border-cyan-300/40 hover:text-cyan-200 sm:w-auto"
          aria-label={t("share.copyDescription")}
          aria-busy={activeAction === "copyLink"}
        >
          {t("share.copyLink")}
        </button>
        <button
          type="button"
          data-testid="download-result-image-button"
          onClick={() => void runAction("download", onDownloadResultImage)}
          disabled={activeAction !== null}
          className="calculator-secondary-action w-full rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-sm font-semibold text-emerald-200 hover:bg-emerald-400/20 sm:w-auto"
          aria-label={t("share.downloadResultImage")}
          aria-busy={activeAction === "download"}
        >
          {t("share.downloadResultImage")}
        </button>
        <button
          type="button"
          data-testid="copy-caption-button"
          onClick={() => void runAction("copyCaption", onCopySocialCaption)}
          disabled={activeAction !== null}
          className="calculator-secondary-action w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-2.5 text-sm font-semibold text-slate-100 hover:border-emerald-300/40 hover:text-emerald-200 sm:w-auto"
          aria-label={t("caption.copyCaption")}
          aria-busy={activeAction === "copyCaption"}
        >
          {t("caption.copyCaption")}
        </button>
      </div>
      <div className="mt-2 min-w-0">
        <div
          data-testid="result-action-feedback"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          data-tone={feedback?.tone ?? "idle"}
          className={`result-action-feedback min-h-6 text-sm font-semibold ${
            feedback?.tone === "error" ? "text-rose-300" : "text-emerald-300"
          }`}
        >
          {feedback?.message ?? ""}
        </div>
        {shareUrl ? (
          <p className="mt-2 truncate rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2 text-xs text-slate-500">
            {shareUrl}
          </p>
        ) : null}
      </div>
    </div>
  );
}
