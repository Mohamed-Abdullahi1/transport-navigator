
import type { Metadata } from "next";
import PolicyPage from "@/components/legal/PolicyPage";
import { complaintsPolicy } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Complaints Procedure",
  description: complaintsPolicy.description,
};

export default function ComplaintsPage() {
  return <PolicyPage policy={complaintsPolicy} />;
}
