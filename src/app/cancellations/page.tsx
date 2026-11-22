
import type { Metadata } from "next";
import PolicyPage from "@/components/legal/PolicyPage";
import { cancellationPolicy } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: cancellationPolicy.description,
};

export default function CancellationsPage() {
  return <PolicyPage policy={cancellationPolicy} />;
}
