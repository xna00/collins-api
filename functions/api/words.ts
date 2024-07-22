interface Env {
  KV: KVNamespace;
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // const value = await context.env.KV.get("example");
  let result;
  const u = new URL(context.request.url);
  const w = u.searchParams.get("word");
  const word: {
    word: string;
    linkTo: string;
  } = await context.env.DB.prepare("SELECT * FROM words WHERE word = ?")
    .bind(w)
    .first();

  if (word.linkTo) {
    const p = await context.env.DB.prepare(
      "SELECT * FROM protoWords WHERE word = ?"
    )
      .bind(word.linkTo)
      .first();
    p.forms = JSON.parse(p.forms as string);
    p.senses = JSON.parse(p.senses as string);
    result = {
      ...word,
      ...p,
    };
  }
  return Response.json(result);
};
