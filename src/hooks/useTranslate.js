import  { useMemo } from "react";
import { useTranslation } from "react-i18next";

const useTranslate = (data) => {
  const { t } = useTranslation();
  data = useMemo(
    () => data.map((el) => ({ ...el, label: t(el.label) })),
    [data, t]
  );
  return data;
};

export default useTranslate;
