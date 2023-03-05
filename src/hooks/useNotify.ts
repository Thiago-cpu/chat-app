import { useToastStore } from "../store/ToastStore";
const useNotify = () => {
  const notify = useToastStore((state) => state.notify);

  return notify;
};

export default useNotify;
