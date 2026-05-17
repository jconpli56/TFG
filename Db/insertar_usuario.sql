CREATE OR REPLACE FUNCTION pry_insertar_usuario(datuserJSON JSON)
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN

    INSERT INTO pry_user_use (
        use_gmail,
        use_username,
        use_password_hash
    )
    VALUES (
        datuserJSON ->> 'gmail',
        datuserJSON ->> 'username',
        datuserJSON ->> 'password_hash'
    );
RETURN TRUE;
END;
$$;