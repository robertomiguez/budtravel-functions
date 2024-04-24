// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { corsHeaders } from '../shared/cors.ts';
import {
  createClient,
  PostgrestResponse,
} from 'https://esm.sh/@supabase/supabase-js@2.39.2';
import type { Ticket } from '../types/Ticket.ts';

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      // Handle CORS preflight request
      return new Response(null, {
        headers: corsHeaders,
        status: 200,
      });
    }

    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/').filter(Boolean).slice(1) || [];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    switch (req.method) {
      case 'GET': {
        let supabaseQuery = supabase.from('ticket').select(
          `id,
        createdAt: created_at,
        quoteId: quote_id,
        quoteDateTime: quote_date_time,
        quoteUrl: quote_url,
        price,
        multiCarrier: multi_carrier,
        journeys`
        );

        // return new Response(`Hello, ${pathSegments[1]}`, { status: 200 });

        if (pathSegments[0] === 'id') {
          supabaseQuery = supabaseQuery.eq('id', pathSegments[1]);
        } else if (pathSegments[0] === 'iataCode') {
          supabaseQuery = supabaseQuery.contains(
            'journeys',
            JSON.stringify([{ outbound: { iataCode: pathSegments[1] } }])
          );
        }

        const { data, error }: PostgrestResponse<Ticket> = await supabaseQuery;

        if (error) {
          throw error;
        }

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        });
      }
      case 'POST': {
        const body = (await req.json()) as Ticket;
        const { error, status, statusText } = await supabase
          .from('ticket')
          .insert(body);
        // .select('*');
        if (error) {
          throw error;
        }
        return new Response(JSON.stringify({ statusText }), {
          headers: { 'Content-Type': 'application/json' },
          status,
        });
      }
      case 'PUT': {
        const body = await req.json();
        const { error, status } = await supabase
          .from('ticket')
          .update(body)
          .eq('id', body.id);
        if (error) {
          throw error;
        }
        return new Response(null, {
          status,
        });
      }
      case 'DELETE': {
        const { id } = await req.json();
        const { error, status } = await supabase
          .from('ticket')
          .delete()
          .eq('id', id);
        if (error) {
          throw error;
        }
        return new Response(null, {
          status,
        });
      }
      default: {
        console.log({ error: 'Method Not Allowed', req: req });
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 405,
        });
      }
    }
  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});
