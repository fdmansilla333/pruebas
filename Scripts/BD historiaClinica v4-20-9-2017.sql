begin transaction;

--Secuencias necesarias para el proyecto historia clinica
 -- DROP SEQUENCE campanias.seq_antecedente_perinatologico;
 create
 sequence campanias.seq_antecedente_perinatologico increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

-- DROP SEQUENCE campanias.seq_antecedente_personal;
 create
 sequence campanias.seq_antecedente_personal increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

-- DROP SEQUENCE campanias.seq_antecedente_personal;
 create
 sequence campanias.seq_antecedente_familiar increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

-- DROP SEQUENCE campanias.seq_atencion;
 create
 sequence campanias.seq_atencion increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

-- DROP SEQUENCE campanias.seq_evolucion_ambulatoria;
 create
 sequence campanias.seq_evolucion_ambulatoria increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

-- DROP SEQUENCE campanias.seq_habito;
 create
 sequence campanias.seq_habito increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

-- DROP SEQUENCE campanias.seq_hc_atencion;
 create
 sequence campanias.seq_hc_atencion increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

-- DROP SEQUENCE campanias.seq_antecedente_siniestro;
 create
 sequence campanias.seq_antecedente_siniestro increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

-- DROP SEQUENCE campanias.seq_medicamento_alergia;
 create
 sequence campanias.seq_medicamento_alergia increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

-- DROP SEQUENCE campanias.seq_medicamento_consume;
 create
 sequence campanias.seq_medicamento_consume increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

/*
-- DROP SEQUENCE campanias.seq_seros_te_cuida_persona;

CREATE SEQUENCE campanias.seq_seros_te_cuida_persona
INCREMENT BY 1
MINVALUE 1
MAXVALUE 9223372036854775807
START 32;

-- DROP SEQUENCE campanias.seq_seros_te_cuida_riesgo_cardiovascular;

CREATE SEQUENCE campanias.seq_seros_te_cuida_riesgo_cardiovascular
INCREMENT BY 1
MINVALUE 1
MAXVALUE 9223372036854775807
START 32;

*/
-- DROP SEQUENCE campanias.seq_tipo_afeccion_familiar;
 create
 sequence campanias.seq_tipo_afeccion_familiar increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

-- DROP SEQUENCE campanias.seq_tipo_afeccion_personal;
 create
 sequence campanias.seq_tipo_afeccion_personal increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

-- DROP SEQUENCE campanias.seq_tipo_habito;
 create
 sequence campanias.seq_tipo_habito increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

-- DROP SEQUENCE campanias.seq_tipo_antecedente_siniestro;
 create
 sequence campanias.seq_tipo_antecedente_siniestro increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

-- DROP SEQUENCE campanias.seq_tipo_presentacion;
 create
 sequence campanias.seq_tipo_presentacion increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

-- DROP SEQUENCE campanias.seq_tipo_terminacion;
 create
 sequence campanias.seq_tipo_terminacion increment by 1 minvalue 1 maxvalue 9223372036854775807 start 1;

--Relaciones necesarias para el proyecto historia clinica
 create
 table
  campanias.atencion(
  codigo int4 not null default nextval(
   'campanias.seq_atencion'::regclass
  ),
  observacion varchar null,
  fecha_atencion date null,
  persona int4 null,
  observacion_internacion varchar null,
  -- Campos de auditoria
 usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint atencion_pk primary key(codigo),
  constraint atencion_persona_fk foreign key(persona) references public.persona(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.atencion is 'Almacena todas las atenciones recibidas de un paciente';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.atencion for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.atencion for each row execute procedure public.before_update();

--Fin de creación de tabla atencion
 create
 table
  campanias.tipo_afeccion_familiar(
  codigo int4 not null default nextval(
   'campanias.seq_tipo_afeccion_familiar'::regclass
  ),
  descripcion varchar null,
  nombre varchar null,
  -- Campos de auditoria
 usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint tipo_afeccion_familiar_pk primary key(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.tipo_afeccion_familiar is 'Almacena los distintos tipos de afeccion como antecedentes de los familiares de un paciente';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.tipo_afeccion_familiar for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.tipo_afeccion_familiar for each row execute procedure public.before_update();

--fin tipo de afeccion
 create
 table
  campanias.tipo_afeccion_personal(
  codigo int4 not null default nextval(
   'campanias.seq_tipo_afeccion_personal'::regclass
  ),
  nombre varchar null,
  descripcion varchar null,
  -- Campos de auditoria
 usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint tipo_afeccion_personal_pk primary key(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.tipo_afeccion_personal is 'Contiene los comprobantes de deposito emitidos para cancelar cuotas de prestamos de personas.';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.tipo_afeccion_personal for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.tipo_afeccion_personal for each row execute procedure public.before_update();

create
 table
  campanias.tipo_habito(
  codigo int4 not null default nextval(
   'campanias.seq_tipo_habito'::regclass
  ),
  nombre_corto varchar null,
  descripcion varchar null,
  -- Campos de auditoria
 usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint tipo_habito_pk primary key(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.tipo_habito is 'Posee los tipos de habitos que puede tener un paciente';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.tipo_habito for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.tipo_habito for each row execute procedure public.before_update();

--fin tipo habito
 create
 table
  campanias.antecedente_familiar(
  codigo int4 not null default nextval(
   'campanias.seq_antecedente_familiar'::regclass
  ),
  atencion int4 null,
  tipo_afeccion_familiar int4 null,
  observacion varchar null,
  usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint antecedente_familiar_pk primary key(codigo),
  constraint antecedente_familiar_atencion_fk foreign key(atencion) references campanias.atencion(codigo),
  constraint antecedente_familiar_tipo_afeccion_familiar_fk foreign key(tipo_afeccion_familiar) references campanias.tipo_afeccion_familiar(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.antecedente_familiar is 'Posee los antecedentes familiares (enfermedades) de un determinado paciente';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.antecedente_familiar for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.antecedente_familiar for each row execute procedure public.before_update();

--antecedente familiar
 create
 table
  campanias.tipo_presentacion(
  codigo int4 not null default nextval(
   'campanias.seq_tipo_presentacion'::regclass
  ),
  descripcion varchar null,
  -- Campos de auditoria
 usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint tipo_presentacion_pk primary key(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.tipo_presentacion is 'Contiene las distintas formas de presentación del paciente(bebe) al nacer';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.tipo_presentacion for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.tipo_presentacion for each row execute procedure public.before_update();

create
 table
  campanias.tipo_terminacion(
  codigo int4 not null default nextval(
   'campanias.seq_tipo_terminacion'::regclass
  ),
  descripcion varchar null,
  -- Campos de auditoria
 usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint tipo_terminacion_pk primary key(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.tipo_terminacion is 'Contiene las distintas formas de termiancion del paciente(bebe) al nacer';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.tipo_terminacion for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.tipo_terminacion for each row execute procedure public.before_update();

create
 table
  campanias.antecedente_perinatologico(
  codigo int4 not null default nextval(
   'campanias.seq_antecedente_perinatologico'::regclass
  ),
  controles_adecuados_embarazo bool not null default false,
  nacimiento_multiple bool not null default false,
  motivo_terminacion varchar(500) null,
  lugar_de_parto varchar(500) null,
  peso int2 null,
  talla int2 null,
  perimetro_cefalico int2 null,
  edad_gestacional int2 null,
  test_apgar int2 null,
  otoemisiones_acusticas bool null,
  otoemisiones_acusticas_resultado bool null,
  grupo_y_factor varchar(2) null,
  internacion bool null,
  pesquisa_enf_congenitas_metabolicas bool not null default false,
  pesquisa_enf_congenitas_metabolicas_resultado bool null default false,
  atencion int4 null,
  tipo_presentacion int4 null,
  tipo_terminacion int4 null,
  -- Campos de auditoria
 usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint antecedente_perinatologico_pk primary key(codigo),
  constraint antecedente_perinatologico_atencion_fk foreign key(atencion) references campanias.atencion(codigo),
  constraint antecedente_perinatologico_tipo_presentacion_fk foreign key(tipo_presentacion) references campanias.tipo_presentacion(codigo),
  constraint antecedente_perinatologico_tipo_terminacion_fk foreign key(tipo_terminacion) references campanias.tipo_terminacion(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.antecedente_perinatologico is 'Contiene los antecedentes perinatologicos del paciente al nacer';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.antecedente_perinatologico for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.antecedente_perinatologico for each row execute procedure public.before_update();

create
 table
  campanias.antecedente_personal(
  codigo int4 not null default nextval(
   'campanias.seq_antecedente_personal'::regclass
  ),
  atencion int4 null,
  tipo_afeccion_personal int4 null,
  observacion varchar null,
  -- Campos de auditoria
 usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint antecedente_personal_pk primary key(codigo),
  constraint antecedente_personal_atencion_fk foreign key(atencion) references campanias.atencion(codigo),
  constraint antecedente_personal_tipo_afeccion_personal_fk foreign key(tipo_afeccion_personal) references campanias.tipo_afeccion_personal(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.antecedente_personal is 'Contiene los antecedentes personales de una paciente determinado';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.antecedente_personal for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.antecedente_personal for each row execute procedure public.before_update();

create
 table
  campanias.evolucion_ambulatoria(
  fecha date null,
  peso float4 null,
  talla int2 null,
  pc int2 null,
  edad int2 null,
  imc float4 null,
  percentilos_pc_edad float4 null,
  percentilos_peso_edad float4 null,
  percentilos_talla_edad float4 null,
  percentilos_imc_edad float4 null,
  presion_arterial int4 null,
  perimetro_abdominal int4 null,
  vacunacion bool null,
  enfermedades_cronicas varchar null,
  estado_nutricional varchar null,
  codigo int4 not null default nextval(
   'campanias.seq_evolucion_ambulatoria'::regclass
  ),
  motivo_de_consulta varchar(500) null,
  enfermedad_actual varchar(500) null,
  examen_fisico varchar(500) null,
  diagn_problema_salud varchar(500) null,
  plan_tratamiento varchar(500) null,
  indicacion_lab varchar(500) null,
  indicacion_medicacion varchar null,
  solicitud_de_derivacion varchar(1) null,
  solicitud_de_derivacion_interconsulta varchar(500) null,
  atencion int4 null,
  antecedente_personal int4 null,
  -- Campos de auditoria
 usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint evolucion_ambulatoria_pk primary key(codigo),
  constraint evolucion_ambulatoria_antecedente_personal_fk foreign key(antecedente_personal) references campanias.antecedente_personal(codigo),
  constraint evolucion_ambulatoria_atencion_fk foreign key(atencion) references campanias.atencion(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.evolucion_ambulatoria is 'Contiene la atencion (examen fisico) ambulatoria de un paciente en un determinado momento';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.evolucion_ambulatoria for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.evolucion_ambulatoria for each row execute procedure public.before_update();

create
 table
  campanias.habito(
  codigo int4 not null default nextval(
   'campanias.seq_habito'::regclass
  ),
  atencion int4 null,
  tipo_habito int4 null,
  observacion varchar null,
  cantidad int2 null,
  -- Campos de auditoria
 usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint habito_pk primary key(codigo),
  constraint habito_atencion_fk foreign key(atencion) references campanias.atencion(codigo),
  constraint habito_tipo_habito_fk foreign key(tipo_habito) references campanias.tipo_habito(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.habito is 'Contiene los habitos de los pacientes';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.habito for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.habito for each row execute procedure public.before_update();

create
 table
  campanias.tipo_antecedente_siniestro(
  codigo int4 not null default nextval(
   'campanias.seq_tipo_antecedente_siniestro'::regclass
  ),
  descripcion varchar null,
  -- Campos de auditoria
 usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint tipo_antecedente_siniestro_pk primary key(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.tipo_antecedente_siniestro is 'Almacena las tipos de internaciones que pueden ser accidentes, internaciones y operaciones';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.tipo_antecedente_siniestro for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.tipo_antecedente_siniestro for each row execute procedure public.before_update();

create
 table
  campanias.antecedente_siniestro(
  codigo int4 not null default nextval(
   'campanias.seq_antecedente_siniestro'::regclass
  ),
  fecha date not null,
  motivo varchar(500) not null,
  atencion int4 null,
  tipo_antecedente_siniestro int4 null,
  -- Campos de auditoria
 usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint antecedente_siniestro_pk primary key(codigo),
  constraint antecedente_siniestro_atencion_fk foreign key(atencion) references campanias.atencion(codigo),
  constraint antecedente_siniestro_tipo_antecedente_siniestro_fk foreign key(tipo_antecedente_siniestro) references campanias.tipo_antecedente_siniestro(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.antecedente_siniestro is 'Contiene las internaciones, accidentes, y operaciones como antecedente de un paciente';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.antecedente_siniestro for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.antecedente_siniestro for each row execute procedure public.before_update();

create
 table
  campanias.medicamento_alergia(
  codigo int4 not null,
  atencion int4 null,
  descripcion varchar null,
  producto int4 null,
  -- Campos de auditoria
 usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint medicamento_alergia_pk primary key(codigo),
  constraint medicamento_alergia_atencion_fk foreign key(atencion) references campanias.atencion(codigo),
  constraint medicamento_alergia_producto_fk foreign key(producto) references farmacia.producto(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.medicamento_alergia is 'Contiene los medicamentos a los que un paciente presenta alergia';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.medicamento_alergia for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.medicamento_alergia for each row execute procedure public.before_update();

create
 table
  campanias.medicamento_consume(
  codigo int4 not null default nextval(
   'campanias.seq_medicamento_consume'::regclass
  ),
  medicamentos_principio_activo varchar(500) null,
  presentacion varchar(50) null,
  dosificacion varchar(50) null,
  producto int4 null,
  atencion int4 null,
  -- Campos de auditoria
 usr_create text not null,
  time_create timestamptz not null,
  usr_update text not null,
  time_update timestamptz not null,
  constraint medicamento_consume_pk primary key(codigo),
  constraint medicamento_consume_atencion_fk foreign key(atencion) references campanias.atencion(codigo),
  constraint medicamento_consume_producto_fk foreign key(producto) references farmacia.producto(codigo)
  ) with(
  oids = false
  );

comment on
table
 campanias.medicamento_consume is 'Almacena los distintos medicamentos que se encuentra consumiendo un paciente';

--------------
 -- TRIGGERS --
 --------------
 create
 trigger before_insert before insert
  on
  campanias.medicamento_consume for each row execute procedure public.before_insert();

create
 trigger before_update before update
  on
  campanias.medicamento_consume for each row execute procedure public.before_update();

/* Esta tabla deberia existir
CREATE TABLE campanias.seros_te_cuida_persona (
 codigo int4 NOT NULL DEFAULT nextval('campanias.seq_seros_te_cuida_persona'::regclass),
 persona int4 NULL,
 tipo_documento int2 NOT NULL,
 numero_documento int8 NOT NULL,
 nombre text NOT NULL,
 sexo text NOT NULL,
 fecha_nacimiento date NOT NULL,
 nacionalidad int4 NOT NULL,
 domicilio_personal_calle text NOT NULL,
 domicilio_personal_numero int4 NULL,
 domicilio_personal_piso text NULL,
 domicilio_personal_dpto text NULL,
 domicilio_personal_telefono_codigo_area int4 NULL,
 domicilio_personal_telefono_numero int4 NULL,
 domicilio_personal_codigo_postal text NULL,
 domicilio_personal_localidad int4 NOT NULL,
 email text NULL,
 cargado_por_sistema_seros_te_cuida bool NOT NULL,
 usr_create text NOT NULL,
 time_create timestamptz NOT NULL,
 usr_update text NOT NULL,
 time_update timestamptz NOT NULL,
   -- Campos de auditoria
   usr_create  TEXT  NOT NULL,
   time_create  TIMESTAMPTZ NOT NULL,
   usr_update  TEXT  NOT NULL,
   time_update  TIMESTAMPTZ NOT NULL,
 CONSTRAINT pk_seros_te_cuida_persona PRIMARY KEY (codigo),
 CONSTRAINT seros_te_cuida_persona_domicilio_personal_calle_check CHECK ((btrim(domicilio_personal_calle) <> ''::text)),
 CONSTRAINT seros_te_cuida_persona_domicilio_personal_numero_check CHECK ((domicilio_personal_numero > 0)),
 CONSTRAINT seros_te_cuida_persona_nombre_check CHECK ((btrim(nombre) <> ''::text)),
 CONSTRAINT seros_te_cuida_persona_sexo_check CHECK (((sexo = 'M'::text) OR (sexo = 'F'::text))),
 CONSTRAINT unq_seros_te_cuida_persona UNIQUE (tipo_documento,numero_documento),
 CONSTRAINT fk_domicilio_personal_localidad FOREIGN KEY (domicilio_personal_localidad) REFERENCES public.localidad(codigo) ON UPDATE CASCADE,
 CONSTRAINT fk_nacionalidad FOREIGN KEY (nacionalidad) REFERENCES public.pais(codigo) ON UPDATE CASCADE,
 CONSTRAINT fk_persona FOREIGN KEY (persona) REFERENCES public.persona(codigo) ON UPDATE CASCADE,
 CONSTRAINT fk_tipo_documento FOREIGN KEY (tipo_documento) REFERENCES public.tipo_documento(codigo) ON UPDATE CASCADE
)
WITH (
 OIDS=FALSE
) ;


COMMENT ON TABLE campanias.seros_te_cuida_persona IS
'Almacena las personas que se encuentran atendidas por el sistema seros te cuida persona';


--------------
-- TRIGGERS --
--------------

CREATE TRIGGER before_insert
BEFORE INSERT ON campanias.seros_te_cuida_persona
FOR EACH ROW EXECUTE PROCEDURE public.before_insert ();

CREATE TRIGGER before_update
BEFORE UPDATE ON campanias.seros_te_cuida_persona
FOR EACH ROW EXECUTE PROCEDURE public.before_update ();



CREATE TABLE campanias.seros_te_cuida_riesgo_cardiovascular (
 codigo int4 NOT NULL DEFAULT nextval('campanias.seq_seros_te_cuida_riesgo_cardiovascular'::regclass),
 seros_te_cuida_persona int4 NOT NULL,
 fecha_registro date NOT NULL,
 presion_arterial float4 NOT NULL,
 tratamiento_hipertension_arterial bool NOT NULL,
 diabetes bool NOT NULL,
 fumador bool NOT NULL,
 indice_masa_corporal int4 NOT NULL,
 edad_cardiovascular int2 NOT NULL,
 riesgo float4 NOT NULL,
 riesgo_normal float4 NOT NULL,
 riesgo_optimo float4 NOT NULL,
 se_entrega_beneficio bool NOT NULL,
 observaciones text NULL,
 anulado bool NOT NULL,
 usr_create text NOT NULL,
 time_create timestamptz NOT NULL,
 usr_update text NOT NULL,
 time_update timestamptz NOT NULL,
   -- Campos de auditoria
   usr_create  TEXT  NOT NULL,
   time_create  TIMESTAMPTZ NOT NULL,
   usr_update  TEXT  NOT NULL,
   time_update  TIMESTAMPTZ NOT NULL,
 CONSTRAINT pk_riesgo_cardiovascular PRIMARY KEY (codigo),
 CONSTRAINT fk_seros_te_cuida_persona FOREIGN KEY (seros_te_cuida_persona) REFERENCES campanias.seros_te_cuida_persona(codigo) ON UPDATE CASCADE
)
WITH (
 OIDS=FALSE
) ;



COMMENT ON TABLE campanias.seros_te_cuida_persona_riesgo_cardiovascular IS
'Contiene los calculos cardiovasculares realizados por las personas en el programa seros te cuida';


--------------
-- TRIGGERS --
--------------

CREATE TRIGGER before_insert
BEFORE INSERT ON campanias.seros_te_cuida_persona_riesgo_cardiovascular
FOR EACH ROW EXECUTE PROCEDURE public.before_insert ();

CREATE TRIGGER before_update
BEFORE UPDATE ON campanias.seros_te_cuida_persona_riesgo_cardiovascular
FOR EACH ROW EXECUTE PROCEDURE public.before_update ();

*/

 --Permisos necesarios para serosTeCuida sobre los pooles del proyecto seros te cuida e historia clinica
 

--Permisos necesarios para historia clinica sobre el usuario cnx_auditoria_medica_internet con los permisos crud sobre campanias
 --Permisos al esquema
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA campanias TO auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;
--consulta de personas para riesgo cardiovascular

/* permisos individuales
 grant select
 ,
 insert
  ,
  update
  on
  campanias.seros_te_cuida_persona auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.seros_te_cuida_persona_riesgo_cardiovascular auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.atencion auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.habito auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.tipo_habito auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.evolucion_ambulatoria auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.antecgedente_perinatologico auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.tipo_terminacion auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.tipo_presentacion auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.medicamento_consume auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.medicamento_alergia auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;
grant select
 ,
 insert
  ,
  update
  on
  campanias.tipo_afeccion_personal auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.tipo_afeccion_familiar auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.antecedente_personal auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.antecedente_familiar auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.tipo_antecedente_siniestro auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

grant select
 ,
 insert
  ,
  update
  on
  campanias.antecedente_siniestro auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;
*/

grant select on estado_civil to auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;
grant select on public.profesion to auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;
grant select on public.situacion_iva to auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;
grant select on public.entidad_general to auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;
grant select on public.tipo_entidad_general to auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;
grant select, insert, update on public.persona to auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool; 
grant select,insert,update,delete on all TABLES in schema farmacia to auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;
grant usage on schema farmacia to auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;
grant select on schema farmacia to auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;
grant select on schema public to auditoria_medica_historia_clinica_pool, auditoria_medica_internet_internaciones_pool;
grant select on public.localidad to auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;
grant usage on schema public to auditoria_medica_internet_internaciones_pool, auditoria_medica_historia_clinica_pool;

end transaction;
