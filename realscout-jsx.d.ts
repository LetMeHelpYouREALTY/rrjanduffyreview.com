import type {
  DetailedHTMLProps,
  HTMLAttributes,
} from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "realscout-simple-search": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "agent-encoded-id"?: string;
      };
      "realscout-office-listings": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "agent-encoded-id"?: string;
        "sort-order"?: string;
        "listing-status"?: string;
        "property-types"?: string;
        "price-min"?: string;
        "price-max"?: string;
      };
    }
  }
}

export {};
