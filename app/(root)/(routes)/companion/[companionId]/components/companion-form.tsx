"use client";

import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is requires",
  }),
  description: z.string().min(1, {
    message: "Description is requires",
  }),
  instruction: z.string().min(200, {
    message: "instruction requires atleast 200 characters",
  }),
  seed: z.string().min(200, {
    message: "seed requires atleast 200 characters",
  }),
  src: z.string().min(1, {
    message: "Image is requires",
  }),
  categoryId: z.string().min(1, {
    message: "Category is requires",
  }),
});

export const CompanionForm = ({
  categories,
  initialData,
}: CompanionFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instruction: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full ">
            <div>
              <h3 className="text-lg font-medium">General Info</h3>
              <p className="text-sm text-muted-foreground">
                genral info abut companion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-centre space-y-4">
                <FormControl>Image Upload COmponet</FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
