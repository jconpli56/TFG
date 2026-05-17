CREATE OR REPLACE FUNCTION pry_iniciar_sesion(
  gmail text
)
RETURNS TABLE (
  user_id integer,
  password_hash text,
  username varchar
)
LANGUAGE plpgsql
AS $$
BEGIN

RETURN QUERY
SELECT pk_use_id, use_password_hash,use_username
FROM pry_user_use
WHERE use_gmail = gmail;

END;

$$;