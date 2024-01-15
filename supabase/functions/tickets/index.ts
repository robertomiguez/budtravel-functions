// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.2";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  const { method, json } = req;
  console.log(method, json);
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    switch (method) {
      case "GET": {
        const { data, error } = await supabase.from("ticket").select("*");
        if (error) {
          throw error;
        }
        return new Response(JSON.stringify({ data }), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      }
      case "POST": {
        const body = await req.json();
        const { error, status, statusText } = await supabase
          .from("ticket")
          .insert(body);
        // .select('*');
        if (error) {
          throw error;
        }
        return new Response(JSON.stringify({ statusText }), {
          headers: { "Content-Type": "application/json" },
          status,
        });
      }
      case "PUT": {
        const body = await req.json();
        const { error, status } = await supabase
          .from("ticket")
          .update(body)
          .eq("id", body.id);
        if (error) {
          throw error;
        }
        return new Response(null, {
          status,
        });
      }
      case "DELETE": {
        const { id } = await req.json();
        const { error, status } = await supabase
          .from("ticket")
          .delete()
          .eq("id", id);
        if (error) {
          throw error;
        }
        return new Response(null, {
          status,
        });
      }
      default: {
        console.log({ error: "Method Not Allowed" });
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
          headers: { "Content-Type": "application/json" },
          status: 405,
        });
      }
    }
  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});
