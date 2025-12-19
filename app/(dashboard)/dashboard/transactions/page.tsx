import TransactionPage from "@/components/transactions/TransactionPage";
import { serverGet } from "@/lib/api/server";
import type { Transaction } from "@/lib/types/transaction";
import type { User } from "@/lib/types/user";
import React from "react";

const getTrx = async () => {
  const { data: user } = await serverGet<{ data: User }>("/auth/me");
  const res = await serverGet<{ data: Transaction[] }>(
    `/transactions/user/${user.id}`
  );
  return res.data;
};

const page = async () => {
  const transactions = await getTrx();
  return (
    <div>
      <TransactionPage data={transactions} />
    </div>
  );
};

export default page;
