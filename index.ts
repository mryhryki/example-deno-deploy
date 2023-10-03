const kv = await Deno.openKv();

Deno.serve(async (request): Promise<Response> => {
  const key: string = new URL(request.url).searchParams.get("key") ?? "DefaultKey";
  await kv.set([key], new Date().toISOString());
  return new Response("Hello, world!");
});
