import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { usePathname, useRouter } from "@/i18n/routing";

export default function useSearchParam(param: string) {
  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setFunction = useCallback(
    (value?: string) => {
      const params = new URLSearchParams(search.toString());

      if (value) params.set(param, value);
      else params.delete(param);
      router.push(pathname + "?" + params.toString());
    },
    [search],
  );

  return [search.get(param) ?? undefined, setFunction] as const;
}
