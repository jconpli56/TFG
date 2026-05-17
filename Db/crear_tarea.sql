CREATE OR REPLACE FUNCTION fn_insert_task_json(p_data jsonb, user_id int)
RETURNS void
LANGUAGE plpgsql
AS
$$
BEGIN

   INSERT INTO pry_task_tas (
        tas_name,
        tas_description,
        tas_state,
        tas_type,
        tas_deadline,
        tas_createdate,
        fk_tas_use_id)
    VALUES(
        p_data ->>'tas_name',
        p_data->>'tas_description',
        (p_data->>'tas_state')::tas_state,
        (p_data->>'tas_type')::tas_type_task,
        (p_data->>'tas_deadline')::date,
        CURRENT_DATE,
        user_id);

END;
$$;