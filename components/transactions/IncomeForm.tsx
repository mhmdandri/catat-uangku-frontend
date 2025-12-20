import React from "react";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IncomeFormProps {
  accounts: { id: string; name: string }[];
  isAccountsLoading: boolean;
  accountsError: string | null;
  isAccountFieldDisabled: boolean;
  formData: {
    account: string;
    amount: string;
    title: string;
    description: string;
  };
  isSubmitting: boolean;
  fetchAccounts: () => void;
  handleInputChange: (field: string, value: string) => void;
  renderCategoryContent: () => React.ReactNode;
  renderFetchError: (
    errorMessage: string,
    retryAction: () => void
  ) => React.ReactNode;
}
const IncomeForm = ({
  accounts,
  isAccountsLoading,
  accountsError,
  isAccountFieldDisabled,
  formData: { account, amount, title, description },
  isSubmitting,
  fetchAccounts,
  handleInputChange,
  renderCategoryContent,
  renderFetchError,
}: IncomeFormProps) => {
  return (
    <>
      <div className="grid gap-2">
        <Label>Pilih Akun</Label>
        {isAccountsLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : accountsError ? (
          renderFetchError(accountsError, fetchAccounts)
        ) : (
          <Select
            value={account}
            onValueChange={(value) => handleInputChange("account", value)}
            disabled={isAccountFieldDisabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih akun" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="grid gap-2">
        <Label>Nominal</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => handleInputChange("amount", e.target.value)}
          placeholder="10000"
          disabled={isSubmitting}
        ></Input>
      </div>
      <div className="grid gap-2">
        <Label>Judul</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="cth: gaji bulanan"
          disabled={isSubmitting}
        ></Input>
      </div>
      <div className="grid gap-2">
        <Label>Category</Label>
        <div className={isSubmitting ? "pointer-events-none opacity-60" : ""}>
          {renderCategoryContent()}
        </div>
      </div>
      <div className="grid gap-2">
        <Label>Deskripsi</Label>
        <Textarea
          value={description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="gaji bulan ini"
          disabled={isSubmitting}
        ></Textarea>
      </div>
    </>
  );
};

export default IncomeForm;
