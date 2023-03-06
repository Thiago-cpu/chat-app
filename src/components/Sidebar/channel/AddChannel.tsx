import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import Textarea from "@/components/ui/Textarea";
import { api } from "@/utils/api";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdAdd } from "react-icons/io";
import Textfield from "@/components/ui/Textfield";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { type chatRouterInput } from "@/server/api/routers/chat";
import { useState } from "react";
import useNotify from "@/hooks/useNotify";

export default function AddChannel() {
  const notify = useNotify();
  const utils = api.useContext();
  const { mutate: registerMutate } = api.chat.add.useMutation({
    onSuccess() {
      notify({
        title: "Channel created!",
      });
    },
    onError() {
      notify({
        type: "warning",
        title: "Error creating channel!",
      });
    },
    onSettled() {
      void utils.chat.infiniteList.invalidate();
    },
  });
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof chatRouterInput.add>>();

  const submitChat = handleSubmit((data) => {
    registerMutate(data);
    setOpen(false);
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <IconButton
          icon={IoMdAdd}
          iconProps={{
            size: 18,
            className: "fill-neutral-100",
          }}
          className="h-8 w-8 rounded-lg bg-neutral-800 p-2 hover:bg-gray-100"
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black-A data-[state=open]:animate-overlayShow" />
        <Dialog.Content className=" fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-3xl bg-black-600 pt-8 pb-5 pr-9 pl-11 focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="text-lg font-bold uppercase leading-6 text-neutral-100">
            New Channel
          </Dialog.Title>

          <Textfield
            placeholder="Channel name"
            className="mt-5"
            {...register("name", { required: true })}
            error={errors.name && "Name is required"}
          />
          <Textarea
            placeholder="Channel Description"
            className="resize-none"
            rows={4}
            {...register("description", { required: true })}
            error={errors.description && "Description is required"}
          />
          <div className="flex justify-end">
            <Button className="w-fit px-8" onClick={() => void submitChat()}>
              Save
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
