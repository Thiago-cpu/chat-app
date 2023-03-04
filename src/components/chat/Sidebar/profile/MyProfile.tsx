import * as Dialog from "@radix-ui/react-dialog";
import Textfield from "@/components/ui/Textfield";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { api } from "@/utils/api";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { type userRouterInput } from "@/server/api/routers/user";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MyProfile = ({ open, onOpenChange }: Props) => {
  const { data: me } = api.user.me.useQuery();
  const { mutate: update } = api.user.updateMe.useMutation();
  const { register, handleSubmit } =
    useForm<z.infer<typeof userRouterInput.updateMe>>();

  const updateUser = handleSubmit((data) => {
    update(data);
    onOpenChange(false);
  });

  if (!me) return null;
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black-A data-[state=open]:animate-overlayShow" />
        <Dialog.Content className=" fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-3xl bg-black-600 pt-8 pb-5 pr-9 pl-11 focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="text-lg font-bold uppercase leading-6 text-neutral-100">
            Change Info
          </Dialog.Title>
          <Dialog.Description className="mt-[10px] mb-5 text-[13px] font-medium leading-[18px] text-neutral-500">
            Changes will be reflected to every services
          </Dialog.Description>
          <div className="flex gap-4">
            <Textfield
              defaultValue={me.name ?? ""}
              placeholder="Enter your name..."
              containerClassName="flex-1"
              {...register("name")}
            />
            <Textfield
              type="password"
              placeholder="Enter your new password..."
              containerClassName="flex-1"
              {...register("newPassword")}
            />
          </div>
          <Textarea
            defaultValue={me.bio ?? ""}
            placeholder="Enter your bio..."
            className="resize-none"
            rows={4}
            {...register("bio")}
          />
          <Textfield defaultValue={me.email ?? ""} disabled />
          <div className="flex justify-end">
            <Dialog.Close asChild>
              <Button onClick={() => void updateUser()} className="w-fit px-8">
                Save
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MyProfile;
