CREATE OR REPLACE FUNCTION fn_update_task_json(p_data jsonb,user_id int)
RETURNS void
LANGUAGE plpgsql
AS
$$
BEGIN

    UPDATE pry_task_tas
    SET
        tas_name = p_data->>'tas_name',
        tas_description = p_data->>'tas_description',
        tas_state = (p_data->>'tas_state')::tas_state,
        tas_type = (p_data->>'tas_type')::tas_type_task,
        tas_createdate=(p_data->>'tas_createdate')::date,
        tas_deadline = (p_data->>'tas_deadline')::date
    WHERE pk_tas_id = (p_data->>'pk_tas_id')::integer AND fk_tas_use_id=user_id;

END;
$$;