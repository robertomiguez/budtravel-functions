revoke delete on table "public"."leg" from "anon";

revoke insert on table "public"."leg" from "anon";

revoke references on table "public"."leg" from "anon";

revoke select on table "public"."leg" from "anon";

revoke trigger on table "public"."leg" from "anon";

revoke truncate on table "public"."leg" from "anon";

revoke update on table "public"."leg" from "anon";

revoke delete on table "public"."leg" from "authenticated";

revoke insert on table "public"."leg" from "authenticated";

revoke references on table "public"."leg" from "authenticated";

revoke select on table "public"."leg" from "authenticated";

revoke trigger on table "public"."leg" from "authenticated";

revoke truncate on table "public"."leg" from "authenticated";

revoke update on table "public"."leg" from "authenticated";

revoke delete on table "public"."leg" from "service_role";

revoke insert on table "public"."leg" from "service_role";

revoke references on table "public"."leg" from "service_role";

revoke select on table "public"."leg" from "service_role";

revoke trigger on table "public"."leg" from "service_role";

revoke truncate on table "public"."leg" from "service_role";

revoke update on table "public"."leg" from "service_role";

alter table "public"."leg" drop constraint "leg_pkey";

drop index if exists "public"."leg_pkey";

drop table "public"."leg";

alter table "public"."ticket" enable row level security;


