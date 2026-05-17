CREATE OR REPLACE FUNCTION fn_delete_task(t_task_id integer,user_id int)
RETURNS void
LANGUAGE plpgsql
AS
$$
BEGIN

    DELETE FROM pry_task_tas
    WHERE pk_tas_id = t_task_id AND fk_tas_use_id=user_id;

END;
$$;