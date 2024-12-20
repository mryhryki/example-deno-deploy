const kv = await Deno.openKv();

kv.listenQueue(async (msg: unknown) => {
  console.log("Deno Queues:", msg);
});

Deno.serve(async (request: Request): Promise<Response> => {
  const key: string = new URL(request.url).searchParams.get("key") ?? "DefaultKey";

  // Deno KV Test
  const uuid = crypto.randomUUID();
  await kv.set([key], uuid);
  await kv.enqueue({ key, uuid }, { delay: 3000 });

  const data = {
    method: request.method,
    url: request.url,
  }

  return new Response(JSON.stringify(data, null, 2), {
    headers: new Headers({
      "content-type": "application/json",
    }),
  });
});
