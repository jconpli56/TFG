CREATE TABLE public.password_reset_tokens (
  pk_prt_id SERIAL PRIMARY KEY,
  fk_use_id INT NOT NULL,
  prt_email VARCHAR(255) NOT NULL,
  prt_token VARCHAR(64) UNIQUE NOT NULL,
  prt_fue_usado BOOLEAN DEFAULT false,
  prt_fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  prt_fecha_expiracion TIMESTAMP NOT NULL,
  prt_fecha_uso TIMESTAMP NULL
  
);