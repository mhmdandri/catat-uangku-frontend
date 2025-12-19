import { FolderPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface EmptyPageProps {
  btnText: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export function EmptyPage({
  btnText,
  onClick,
  title,
  description,
}: EmptyPageProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderPlus />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button onClick={onClick}>{btnText}</Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
