const kv = await Deno.openKv();

kv.listenQueue(async (msg: unknown) => {
  console.log("Deno Queues:", msg);
});

Deno.serve(async (request): Promise<Response> => {
  const key: string = new URL(request.url).searchParams.get("key") ?? "DefaultKey";
  const uuid = crypto.randomUUID();
  await kv.set([key], uuid);
  await kv.enqueue({ key, uuid }, { delay: 3000 });
  return new Response("Hello, world!");
});
