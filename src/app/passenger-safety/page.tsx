
import type { Metadata } from "next";
import PolicyPage from "@/components/legal/PolicyPage";
import { safetyPolicy } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Passenger Safety & Accessibility",
  description: safetyPolicy.description,
};

export default function PassengerSafetyPage() {
  return <PolicyPage policy={safetyPolicy} />;
}
