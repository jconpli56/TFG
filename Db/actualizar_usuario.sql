CREATE OR REPLACE FUNCTION pry_actualizar_usuario(datuserJSON JSON)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN

update pry_user_use set use_password_hash    where use_gmail==

END;
$$;
