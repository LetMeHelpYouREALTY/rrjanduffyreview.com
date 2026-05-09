"use client";

import type { RefObject } from "react";
import { useEffect, useState } from "react";

export type UseDeferRealScoutMountOptions = {
  /** Passed to `requestIdleCallback` timeout. */
  idleTimeoutMs: number;
  /** Delay after idle callback before flipping `ready` (office widget stagger). */
  afterIdleDelayMs?: number;
  /** Root element to observe; required when `respectViewport` is true. */
  observeRef: RefObject<HTMLElement | null>;
  /** Wait for near-viewport visibility before scheduling idle (saves work when below the fold). */
  respectViewport?: boolean;
  /** IntersectionObserver rootMargin (preload slightly before entering view). */
  rootMargin?: string;
  /** Always schedule after this delay if the band never intersects (e.g. short viewports, fast exit). */
  maxWaitBeforeMountMs?: number;
  /** When `requestIdleCallback` is unavailable. */
  fallbackDelayMs?: number;
};

/**
 * Defers mounting heavy RealScout web components until (1) the band is near the viewport
 * and (2) an idle slice (with optional extra delay for office vs search ordering).
 */
export function useDeferRealScoutMount({
  idleTimeoutMs,
  afterIdleDelayMs = 0,
  observeRef,
  respectViewport = true,
  rootMargin = "140px 0px",
  maxWaitBeforeMountMs = 14_000,
  fallbackDelayMs,
}: UseDeferRealScoutMountOptions): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    let cancelled = false;
    let idleId: number | undefined;
    let delayTimer: ReturnType<typeof setTimeout> | undefined;
    let maxWaitTimer: ReturnType<typeof setTimeout> | undefined;
    let rafId = 0;
    let observer: IntersectionObserver | undefined;
    let unlocked = false;

    function scheduleIdleHydration() {
      if (cancelled) return;

      function mount() {
        if (!cancelled) setReady(true);
      }

      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(
          () => {
            delayTimer = setTimeout(mount, afterIdleDelayMs);
          },
          { timeout: idleTimeoutMs },
        );
        return;
      }

      const fallbackBase = fallbackDelayMs ?? 1000;
      delayTimer = setTimeout(mount, fallbackBase + afterIdleDelayMs);
    }

    function unlock() {
      if (unlocked || cancelled) return;
      unlocked = true;
      if (maxWaitTimer !== undefined) {
        clearTimeout(maxWaitTimer);
        maxWaitTimer = undefined;
      }
      observer?.disconnect();
      observer = undefined;
      scheduleIdleHydration();
    }

    maxWaitTimer = setTimeout(unlock, maxWaitBeforeMountMs);

    if (!respectViewport) {
      unlock();
    } else if (typeof IntersectionObserver === "undefined") {
      unlock();
    } else {
      rafId = requestAnimationFrame(() => {
        if (cancelled || unlocked) return;
        const el = observeRef.current;
        if (!el) {
          unlock();
          return;
        }
        observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              unlock();
            }
          },
          { root: null, rootMargin, threshold: 0 },
        );
        observer.observe(el);
      });
    }

    return () => {
      cancelled = true;
      if (rafId !== 0) cancelAnimationFrame(rafId);
      if (maxWaitTimer !== undefined) clearTimeout(maxWaitTimer);
      observer?.disconnect();
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (delayTimer !== undefined) clearTimeout(delayTimer);
    };
  }, [
    afterIdleDelayMs,
    fallbackDelayMs,
    idleTimeoutMs,
    maxWaitBeforeMountMs,
    observeRef,
    respectViewport,
    rootMargin,
  ]);

  return ready;
}
