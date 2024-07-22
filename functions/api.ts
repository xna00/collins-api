interface Env {
  KV: KVNamespace;
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // const value = await context.env.KV.get("example");
  context.env.DB;
  const { results } = await context.env.DB.prepare(
    "SELECT * FROM words WHERE word = ?"
  )
    .bind("hello")
    .all();
  return Response.json(results);
};
