import { UpdateEventForm } from "@/features/update-event";
import { UpdateEventSchema, trpc } from "@/shared/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function UpdateEvent() {
  const router = useRouter();
  const session = useSession();

  const { data, isLoading } = trpc.event.findUnique.useQuery({
    id: Number(router.query.id),
  });

  const { mutate } = trpc.event.update.useMutation({
    onSuccess: (data) => {
      router.push(`/events/${data.id}`);
    },
  });

  const handleSubmit = (data: UpdateEventSchema) => {
	  mutate({data, id: Number(router.query.id)});
  };

  if (isLoading) {
    return "Loading...";
  }

  if (session.status === "unauthenticated") {
    return "Forbidden";
  }

  if (!data) {
    return "No data";
  }

  return <UpdateEventForm onSubmit={handleSubmit} data={data} />;
}
