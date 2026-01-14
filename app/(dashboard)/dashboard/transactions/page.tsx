import TransactionPage from "@/components/transactions/TransactionPage";
import { serverGet } from "@/lib/api/server";
import { AuthMeResponse } from "@/lib/types/auth";
import type {
  Transaction,
  TransactionListResponse,
} from "@/lib/types/transaction";
import React from "react";

const getTrx = async () => {
  const user = await serverGet<AuthMeResponse>("/auth/me");
  const res = await serverGet<TransactionListResponse>(
    `/transactions/user/${user.data.id}`
  );
  return res;
};

const page = async () => {
  const { data: transactions, summary } = await getTrx();
  return (
    <div>
      <TransactionPage data={transactions} summary={summary} />
    </div>
  );
};

export default page;
