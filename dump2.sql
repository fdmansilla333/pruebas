--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.2
-- Dumped by pg_dump version 9.5.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'LATIN1';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = campanias, pg_catalog;

ALTER TABLE ONLY campanias.medicamento_consume DROP CONSTRAINT medicamento_consume_producto_fk;
ALTER TABLE ONLY campanias.medicamento_consume DROP CONSTRAINT medicamento_consume_atencion_fk;
ALTER TABLE ONLY campanias.medicamento_alergia DROP CONSTRAINT medicamento_alergia_monodroga_fk;
ALTER TABLE ONLY campanias.medicamento_alergia DROP CONSTRAINT medicamento_alergia_atencion_fk;
ALTER TABLE ONLY campanias.habito DROP CONSTRAINT habito_tipo_habito_fk;
ALTER TABLE ONLY campanias.habito DROP CONSTRAINT habito_atencion_fk;
ALTER TABLE ONLY campanias.seros_te_cuida_persona DROP CONSTRAINT fk_tipo_documento;
ALTER TABLE ONLY campanias.seros_te_cuida_riesgo_cardiovascular DROP CONSTRAINT fk_seros_te_cuida_persona;
ALTER TABLE ONLY campanias.seros_te_cuida_persona DROP CONSTRAINT fk_persona;
ALTER TABLE ONLY campanias.seros_te_cuida_persona DROP CONSTRAINT fk_nacionalidad;
ALTER TABLE ONLY campanias.seros_te_cuida_persona DROP CONSTRAINT fk_domicilio_personal_localidad;
ALTER TABLE ONLY campanias.evolucion_ambulatoria DROP CONSTRAINT evolucion_ambulatoria_atencion_fk;
ALTER TABLE ONLY campanias.evolucion_ambulatoria DROP CONSTRAINT evolucion_ambulatoria_antecedente_personal_fk;
ALTER TABLE ONLY campanias.atencion DROP CONSTRAINT atencion_persona_fk;
ALTER TABLE ONLY campanias.antecedente_siniestro DROP CONSTRAINT antecedente_siniestro_tipo_antecedente_siniestro_fk;
ALTER TABLE ONLY campanias.antecedente_siniestro DROP CONSTRAINT antecedente_siniestro_atencion_fk;
ALTER TABLE ONLY campanias.antecedente_personal DROP CONSTRAINT antecedente_personal_tipo_afeccion_personal_fk;
ALTER TABLE ONLY campanias.antecedente_personal DROP CONSTRAINT antecedente_personal_atencion_fk;
ALTER TABLE ONLY campanias.antecedente_perinatologico DROP CONSTRAINT antecedente_perinatologico_tipo_terminacion_fk;
ALTER TABLE ONLY campanias.antecedente_perinatologico DROP CONSTRAINT antecedente_perinatologico_tipo_presentacion_fk;
ALTER TABLE ONLY campanias.antecedente_perinatologico DROP CONSTRAINT antecedente_perinatologico_atencion_fk;
ALTER TABLE ONLY campanias.antecedente_familiar DROP CONSTRAINT antecedente_familiar_tipo_afeccion_familiar_fk;
ALTER TABLE ONLY campanias.antecedente_familiar DROP CONSTRAINT antecedente_familiar_atencion_fk;
DROP TRIGGER before_update ON campanias.medicamento_consume;
DROP TRIGGER before_update ON campanias.medicamento_alergia;
DROP TRIGGER before_update ON campanias.antecedente_siniestro;
DROP TRIGGER before_update ON campanias.tipo_antecedente_siniestro;
DROP TRIGGER before_update ON campanias.habito;
DROP TRIGGER before_update ON campanias.evolucion_ambulatoria;
DROP TRIGGER before_update ON campanias.antecedente_personal;
DROP TRIGGER before_update ON campanias.antecedente_perinatologico;
DROP TRIGGER before_update ON campanias.tipo_terminacion;
DROP TRIGGER before_update ON campanias.tipo_presentacion;
DROP TRIGGER before_update ON campanias.antecedente_familiar;
DROP TRIGGER before_update ON campanias.tipo_habito;
DROP TRIGGER before_update ON campanias.tipo_afeccion_personal;
DROP TRIGGER before_update ON campanias.tipo_afeccion_familiar;
DROP TRIGGER before_update ON campanias.atencion;
DROP TRIGGER before_update ON campanias.seros_te_cuida_riesgo_cardiovascular;
DROP TRIGGER before_update ON campanias.seros_te_cuida_persona;
DROP TRIGGER before_insert ON campanias.medicamento_consume;
DROP TRIGGER before_insert ON campanias.medicamento_alergia;
DROP TRIGGER before_insert ON campanias.antecedente_siniestro;
DROP TRIGGER before_insert ON campanias.tipo_antecedente_siniestro;
DROP TRIGGER before_insert ON campanias.habito;
DROP TRIGGER before_insert ON campanias.evolucion_ambulatoria;
DROP TRIGGER before_insert ON campanias.antecedente_personal;
DROP TRIGGER before_insert ON campanias.antecedente_perinatologico;
DROP TRIGGER before_insert ON campanias.tipo_terminacion;
DROP TRIGGER before_insert ON campanias.tipo_presentacion;
DROP TRIGGER before_insert ON campanias.antecedente_familiar;
DROP TRIGGER before_insert ON campanias.tipo_habito;
DROP TRIGGER before_insert ON campanias.tipo_afeccion_personal;
DROP TRIGGER before_insert ON campanias.tipo_afeccion_familiar;
DROP TRIGGER before_insert ON campanias.atencion;
DROP TRIGGER before_insert ON campanias.seros_te_cuida_riesgo_cardiovascular;
DROP TRIGGER before_insert ON campanias.seros_te_cuida_persona;
ALTER TABLE ONLY campanias.seros_te_cuida_persona DROP CONSTRAINT unq_seros_te_cuida_persona;
ALTER TABLE ONLY campanias.tipo_terminacion DROP CONSTRAINT tipo_terminacion_pk;
ALTER TABLE ONLY campanias.tipo_presentacion DROP CONSTRAINT tipo_presentacion_pk;
ALTER TABLE ONLY campanias.tipo_habito DROP CONSTRAINT tipo_habito_pk;
ALTER TABLE ONLY campanias.tipo_antecedente_siniestro DROP CONSTRAINT tipo_antecedente_siniestro_pk;
ALTER TABLE ONLY campanias.tipo_afeccion_personal DROP CONSTRAINT tipo_afeccion_personal_pk;
ALTER TABLE ONLY campanias.tipo_afeccion_familiar DROP CONSTRAINT tipo_afeccion_familiar_pk;
ALTER TABLE ONLY campanias.seros_te_cuida_persona DROP CONSTRAINT pk_seros_te_cuida_persona;
ALTER TABLE ONLY campanias.seros_te_cuida_riesgo_cardiovascular DROP CONSTRAINT pk_riesgo_cardiovascular;
ALTER TABLE ONLY campanias.medicamento_consume DROP CONSTRAINT medicamento_consume_pk;
ALTER TABLE ONLY campanias.medicamento_alergia DROP CONSTRAINT medicamento_alergia_pk;
ALTER TABLE ONLY campanias.habito DROP CONSTRAINT habito_pk;
ALTER TABLE ONLY campanias.evolucion_ambulatoria DROP CONSTRAINT evolucion_ambulatoria_pk;
ALTER TABLE ONLY campanias.atencion DROP CONSTRAINT atencion_pk;
ALTER TABLE ONLY campanias.antecedente_siniestro DROP CONSTRAINT antecedente_siniestro_pk;
ALTER TABLE ONLY campanias.antecedente_personal DROP CONSTRAINT antecedente_personal_pk;
ALTER TABLE ONLY campanias.antecedente_perinatologico DROP CONSTRAINT antecedente_perinatologico_pk;
ALTER TABLE ONLY campanias.antecedente_familiar DROP CONSTRAINT antecedente_familiar_pk;
DROP TABLE campanias.tipo_terminacion;
DROP TABLE campanias.tipo_presentacion;
DROP TABLE campanias.tipo_habito;
DROP TABLE campanias.tipo_antecedente_siniestro;
DROP TABLE campanias.tipo_afeccion_personal;
DROP TABLE campanias.tipo_afeccion_familiar;
DROP TABLE campanias.seros_te_cuida_riesgo_cardiovascular;
DROP TABLE campanias.seros_te_cuida_persona;
DROP SEQUENCE campanias.seq_tipo_terminacion;
DROP SEQUENCE campanias.seq_tipo_presentacion;
DROP SEQUENCE campanias.seq_tipo_habito;
DROP SEQUENCE campanias.seq_tipo_antecedente_siniestro;
DROP SEQUENCE campanias.seq_tipo_afeccion_personal;
DROP SEQUENCE campanias.seq_tipo_afeccion_familiar;
DROP SEQUENCE campanias.seq_seros_te_cuida_riesgo_cardiovascular;
DROP SEQUENCE campanias.seq_seros_te_cuida_persona;
DROP SEQUENCE campanias.seq_hc_atencion;
DROP TABLE campanias.medicamento_consume;
DROP SEQUENCE campanias.seq_medicamento_consume;
DROP TABLE campanias.medicamento_alergia;
DROP SEQUENCE campanias.seq_medicamento_alergia;
DROP TABLE campanias.habito;
DROP SEQUENCE campanias.seq_habito;
DROP TABLE campanias.evolucion_ambulatoria;
DROP SEQUENCE campanias.seq_evolucion_ambulatoria;
DROP TABLE campanias.atencion;
DROP SEQUENCE campanias.seq_atencion;
DROP TABLE campanias.antecedente_siniestro;
DROP SEQUENCE campanias.seq_antecedente_siniestro;
DROP TABLE campanias.antecedente_personal;
DROP SEQUENCE campanias.seq_antecedente_personal;
DROP TABLE campanias.antecedente_perinatologico;
DROP SEQUENCE campanias.seq_antecedente_perinatologico;
DROP TABLE campanias.antecedente_familiar;
DROP SEQUENCE campanias.seq_antecedente_familiar;
DROP SCHEMA campanias;
--
-- Name: campanias; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA campanias;


ALTER SCHEMA campanias OWNER TO postgres;

SET search_path = campanias, pg_catalog;

--
-- Name: seq_antecedente_familiar; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_antecedente_familiar
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_antecedente_familiar OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: antecedente_familiar; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE antecedente_familiar (
    codigo integer DEFAULT nextval('seq_antecedente_familiar'::regclass) NOT NULL,
    atencion integer,
    tipo_afeccion_familiar integer,
    observacion character varying,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL,
    anulado boolean DEFAULT false
);


ALTER TABLE antecedente_familiar OWNER TO postgres;

--
-- Name: TABLE antecedente_familiar; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE antecedente_familiar IS 'Posee los antecedentes familiares (enfermedades) de un determinado paciente';


--
-- Name: seq_antecedente_perinatologico; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_antecedente_perinatologico
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_antecedente_perinatologico OWNER TO postgres;

--
-- Name: antecedente_perinatologico; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE antecedente_perinatologico (
    codigo integer DEFAULT nextval('seq_antecedente_perinatologico'::regclass) NOT NULL,
    controles_adecuados_embarazo boolean DEFAULT false NOT NULL,
    nacimiento_multiple boolean DEFAULT false NOT NULL,
    motivo_terminacion character varying(500),
    lugar_de_parto character varying(500),
    peso smallint,
    talla smallint,
    perimetro_cefalico smallint,
    edad_gestacional smallint,
    test_apgar smallint,
    otoemisiones_acusticas boolean,
    otoemisiones_acusticas_resultado boolean,
    grupo_y_factor character varying(2),
    internacion boolean,
    pesquisa_enf_congenitas_metabolicas boolean DEFAULT false NOT NULL,
    pesquisa_enf_congenitas_metabolicas_resultado boolean DEFAULT false,
    atencion integer,
    tipo_presentacion integer,
    tipo_terminacion integer,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL,
    test_apgar2 smallint
);


ALTER TABLE antecedente_perinatologico OWNER TO postgres;

--
-- Name: TABLE antecedente_perinatologico; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE antecedente_perinatologico IS 'Contiene los antecedentes perinatologicos del paciente al nacer';


--
-- Name: seq_antecedente_personal; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_antecedente_personal
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_antecedente_personal OWNER TO postgres;

--
-- Name: antecedente_personal; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE antecedente_personal (
    codigo integer DEFAULT nextval('seq_antecedente_personal'::regclass) NOT NULL,
    atencion integer,
    tipo_afeccion_personal integer,
    observacion character varying,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL,
    anulado boolean DEFAULT false
);


ALTER TABLE antecedente_personal OWNER TO postgres;

--
-- Name: TABLE antecedente_personal; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE antecedente_personal IS 'Contiene los antecedentes personales de una paciente determinado';


--
-- Name: seq_antecedente_siniestro; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_antecedente_siniestro
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_antecedente_siniestro OWNER TO postgres;

--
-- Name: antecedente_siniestro; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE antecedente_siniestro (
    codigo integer DEFAULT nextval('seq_antecedente_siniestro'::regclass) NOT NULL,
    fecha date NOT NULL,
    motivo character varying(500) NOT NULL,
    atencion integer,
    tipo_antecedente_siniestro integer,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL
);


ALTER TABLE antecedente_siniestro OWNER TO postgres;

--
-- Name: TABLE antecedente_siniestro; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE antecedente_siniestro IS 'Contiene las internaciones, accidentes, y operaciones como antecedente de un paciente';


--
-- Name: seq_atencion; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_atencion
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_atencion OWNER TO postgres;

--
-- Name: atencion; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE atencion (
    codigo integer DEFAULT nextval('seq_atencion'::regclass) NOT NULL,
    observacion character varying,
    fecha_atencion date,
    persona integer,
    observacion_anulacion character varying,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL,
    anulada boolean DEFAULT false,
    observacion_internacion character varying
);


ALTER TABLE atencion OWNER TO postgres;

--
-- Name: TABLE atencion; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE atencion IS 'Almacena todas las atenciones recibidas de un paciente';


--
-- Name: seq_evolucion_ambulatoria; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_evolucion_ambulatoria
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_evolucion_ambulatoria OWNER TO postgres;

--
-- Name: evolucion_ambulatoria; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE evolucion_ambulatoria (
    fecha date,
    peso real,
    talla smallint,
    pc smallint,
    edad smallint,
    imc real,
    percentilos_pc_edad real,
    percentilos_peso_edad real,
    percentilos_talla_edad real,
    percentilos_imc_edad real,
    presion_arterial integer,
    perimetro_abdominal integer,
    vacunacion boolean,
    enfermedades_cronicas character varying,
    estado_nutricional character varying,
    codigo integer DEFAULT nextval('seq_evolucion_ambulatoria'::regclass) NOT NULL,
    motivo_de_consulta character varying(500),
    enfermedad_actual character varying(500),
    examen_fisico character varying(500),
    diagn_problema_salud character varying(500),
    plan_tratamiento character varying(500),
    indicacion_lab character varying(500),
    indicacion_medicacion character varying,
    solicitud_de_derivacion character varying(1),
    solicitud_de_derivacion_interconsulta character varying(500),
    atencion integer,
    antecedente_personal integer,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL,
    presion_arterial_den integer,
    otras_texto character varying(500),
    interconsulta boolean DEFAULT false,
    internacion boolean DEFAULT false,
    hipertension boolean,
    diabetes boolean
);


ALTER TABLE evolucion_ambulatoria OWNER TO postgres;

--
-- Name: TABLE evolucion_ambulatoria; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE evolucion_ambulatoria IS 'Contiene la atencion (examen fisico) ambulatoria de un paciente en un determinado momento';


--
-- Name: seq_habito; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_habito
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_habito OWNER TO postgres;

--
-- Name: habito; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE habito (
    codigo integer DEFAULT nextval('seq_habito'::regclass) NOT NULL,
    atencion integer,
    tipo_habito integer,
    observacion character varying,
    cantidad smallint,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL
);


ALTER TABLE habito OWNER TO postgres;

--
-- Name: TABLE habito; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE habito IS 'Contiene los habitos de los pacientes';


--
-- Name: seq_medicamento_alergia; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_medicamento_alergia
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_medicamento_alergia OWNER TO postgres;

--
-- Name: medicamento_alergia; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE medicamento_alergia (
    codigo integer DEFAULT nextval('seq_medicamento_alergia'::regclass) NOT NULL,
    atencion integer,
    descripcion character varying,
    droga integer,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL
);


ALTER TABLE medicamento_alergia OWNER TO postgres;

--
-- Name: TABLE medicamento_alergia; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE medicamento_alergia IS 'Contiene los medicamentos a los que un paciente presenta alergia';


--
-- Name: seq_medicamento_consume; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_medicamento_consume
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_medicamento_consume OWNER TO postgres;

--
-- Name: medicamento_consume; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE medicamento_consume (
    codigo integer DEFAULT nextval('seq_medicamento_consume'::regclass) NOT NULL,
    producto integer,
    atencion integer,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL,
    observacion character varying
);


ALTER TABLE medicamento_consume OWNER TO postgres;

--
-- Name: TABLE medicamento_consume; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE medicamento_consume IS 'Almacena los distintos medicamentos que se encuentra consumiendo un paciente';


--
-- Name: seq_hc_atencion; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_hc_atencion
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_hc_atencion OWNER TO postgres;

--
-- Name: seq_seros_te_cuida_persona; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_seros_te_cuida_persona
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_seros_te_cuida_persona OWNER TO postgres;

--
-- Name: seq_seros_te_cuida_riesgo_cardiovascular; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_seros_te_cuida_riesgo_cardiovascular
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_seros_te_cuida_riesgo_cardiovascular OWNER TO postgres;

--
-- Name: seq_tipo_afeccion_familiar; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_tipo_afeccion_familiar
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_tipo_afeccion_familiar OWNER TO postgres;

--
-- Name: seq_tipo_afeccion_personal; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_tipo_afeccion_personal
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_tipo_afeccion_personal OWNER TO postgres;

--
-- Name: seq_tipo_antecedente_siniestro; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_tipo_antecedente_siniestro
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_tipo_antecedente_siniestro OWNER TO postgres;

--
-- Name: seq_tipo_habito; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_tipo_habito
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_tipo_habito OWNER TO postgres;

--
-- Name: seq_tipo_presentacion; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_tipo_presentacion
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_tipo_presentacion OWNER TO postgres;

--
-- Name: seq_tipo_terminacion; Type: SEQUENCE; Schema: campanias; Owner: postgres
--

CREATE SEQUENCE seq_tipo_terminacion
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_tipo_terminacion OWNER TO postgres;

--
-- Name: seros_te_cuida_persona; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE seros_te_cuida_persona (
    codigo integer DEFAULT nextval('seq_seros_te_cuida_persona'::regclass) NOT NULL,
    persona integer,
    tipo_documento smallint NOT NULL,
    numero_documento bigint NOT NULL,
    nombre text NOT NULL,
    sexo text NOT NULL,
    fecha_nacimiento date NOT NULL,
    nacionalidad integer NOT NULL,
    domicilio_personal_calle text NOT NULL,
    domicilio_personal_numero integer,
    domicilio_personal_piso text,
    domicilio_personal_dpto text,
    domicilio_personal_telefono_codigo_area integer,
    domicilio_personal_telefono_numero integer,
    domicilio_personal_codigo_postal text,
    domicilio_personal_localidad integer NOT NULL,
    email text,
    cargado_por_sistema_seros_te_cuida boolean NOT NULL,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL,
    CONSTRAINT seros_te_cuida_persona_domicilio_personal_calle_check CHECK ((btrim(domicilio_personal_calle) <> ''::text)),
    CONSTRAINT seros_te_cuida_persona_domicilio_personal_numero_check CHECK ((domicilio_personal_numero > 0)),
    CONSTRAINT seros_te_cuida_persona_nombre_check CHECK ((btrim(nombre) <> ''::text)),
    CONSTRAINT seros_te_cuida_persona_sexo_check CHECK (((sexo = 'M'::text) OR (sexo = 'F'::text)))
);


ALTER TABLE seros_te_cuida_persona OWNER TO postgres;

--
-- Name: TABLE seros_te_cuida_persona; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE seros_te_cuida_persona IS 'Contiene los tipos de retenciones aplicables a cada tipo de beneficiario de un pago.';


--
-- Name: seros_te_cuida_riesgo_cardiovascular; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE seros_te_cuida_riesgo_cardiovascular (
    codigo integer DEFAULT nextval('seq_seros_te_cuida_riesgo_cardiovascular'::regclass) NOT NULL,
    seros_te_cuida_persona integer NOT NULL,
    fecha_registro date NOT NULL,
    presion_arterial real NOT NULL,
    tratamiento_hipertension_arterial boolean NOT NULL,
    diabetes boolean NOT NULL,
    fumador boolean NOT NULL,
    indice_masa_corporal integer NOT NULL,
    edad_cardiovascular smallint NOT NULL,
    riesgo real NOT NULL,
    riesgo_normal real NOT NULL,
    riesgo_optimo real NOT NULL,
    se_entrega_beneficio boolean NOT NULL,
    observaciones text,
    anulado boolean NOT NULL,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL
);


ALTER TABLE seros_te_cuida_riesgo_cardiovascular OWNER TO postgres;

--
-- Name: TABLE seros_te_cuida_riesgo_cardiovascular; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE seros_te_cuida_riesgo_cardiovascular IS 'Contiene el calculo del riesgo cardiovascular de las personas que accedieron a la campania Seros Te Cuida.';


--
-- Name: tipo_afeccion_familiar; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE tipo_afeccion_familiar (
    codigo integer DEFAULT nextval('seq_tipo_afeccion_familiar'::regclass) NOT NULL,
    descripcion character varying,
    nombre character varying,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL
);


ALTER TABLE tipo_afeccion_familiar OWNER TO postgres;

--
-- Name: TABLE tipo_afeccion_familiar; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE tipo_afeccion_familiar IS 'Almacena los distintos tipos de afeccion como antecedentes de los familiares de un paciente';


--
-- Name: tipo_afeccion_personal; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE tipo_afeccion_personal (
    codigo integer DEFAULT nextval('seq_tipo_afeccion_personal'::regclass) NOT NULL,
    nombre character varying,
    descripcion character varying,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL
);


ALTER TABLE tipo_afeccion_personal OWNER TO postgres;

--
-- Name: TABLE tipo_afeccion_personal; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE tipo_afeccion_personal IS 'Contiene los comprobantes de deposito emitidos para cancelar cuotas de prestamos de personas.';


--
-- Name: tipo_antecedente_siniestro; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE tipo_antecedente_siniestro (
    codigo integer DEFAULT nextval('seq_tipo_antecedente_siniestro'::regclass) NOT NULL,
    descripcion character varying,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL
);


ALTER TABLE tipo_antecedente_siniestro OWNER TO postgres;

--
-- Name: TABLE tipo_antecedente_siniestro; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE tipo_antecedente_siniestro IS 'Almacena las tipos de internaciones que pueden ser accidentes, internaciones y operaciones';


--
-- Name: tipo_habito; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE tipo_habito (
    codigo integer DEFAULT nextval('seq_tipo_habito'::regclass) NOT NULL,
    nombre_corto character varying,
    descripcion character varying,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL
);


ALTER TABLE tipo_habito OWNER TO postgres;

--
-- Name: TABLE tipo_habito; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE tipo_habito IS 'Posee los tipos de habitos que puede tener un paciente';


--
-- Name: tipo_presentacion; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE tipo_presentacion (
    codigo integer DEFAULT nextval('seq_tipo_presentacion'::regclass) NOT NULL,
    descripcion character varying,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL
);


ALTER TABLE tipo_presentacion OWNER TO postgres;

--
-- Name: TABLE tipo_presentacion; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE tipo_presentacion IS 'Contiene las distintas formas de presentaci�n del paciente(bebe) al nacer';


--
-- Name: tipo_terminacion; Type: TABLE; Schema: campanias; Owner: postgres
--

CREATE TABLE tipo_terminacion (
    codigo integer DEFAULT nextval('seq_tipo_terminacion'::regclass) NOT NULL,
    descripcion character varying,
    usr_create text NOT NULL,
    time_create timestamp with time zone NOT NULL,
    usr_update text NOT NULL,
    time_update timestamp with time zone NOT NULL
);


ALTER TABLE tipo_terminacion OWNER TO postgres;

--
-- Name: TABLE tipo_terminacion; Type: COMMENT; Schema: campanias; Owner: postgres
--

COMMENT ON TABLE tipo_terminacion IS 'Contiene las distintas formas de termiancion del paciente(bebe) al nacer';


--
-- Data for Name: antecedente_familiar; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO antecedente_familiar VALUES (4, 95, 7, NULL, 'cnx_auditoria_medica_internet', '2017-10-10 13:42:00.250442-03', 'cnx_auditoria_medica_internet', '2017-10-10 13:42:00.250442-03', false);
INSERT INTO antecedente_familiar VALUES (5, 95, 8, NULL, 'cnx_auditoria_medica_internet', '2017-10-10 13:42:00.25789-03', 'cnx_auditoria_medica_internet', '2017-10-10 13:42:00.25789-03', false);


--
-- Data for Name: antecedente_perinatologico; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO antecedente_perinatologico VALUES (2, true, false, 'Algun motivo ', 'Sanatorio Trelew ', 2, 30, 20, 40, 2, true, true, 'B+', true, true, false, 124, 3, 3, 'cnx_auditoria_medica_internet', '2017-10-11 12:48:14.083686-03', 'cnx_auditoria_medica_internet', '2017-10-11 12:48:14.083686-03', 3);


--
-- Data for Name: antecedente_personal; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO antecedente_personal VALUES (1, 93, 5, NULL, 'cnx_auditoria_medica_internet', '2017-10-10 07:06:21.032163-03', 'cnx_auditoria_medica_internet', '2017-10-10 07:06:21.032163-03', false);
INSERT INTO antecedente_personal VALUES (2, 93, 6, NULL, 'cnx_auditoria_medica_internet', '2017-10-10 07:06:21.037092-03', 'cnx_auditoria_medica_internet', '2017-10-10 07:06:21.037092-03', false);


--
-- Data for Name: antecedente_siniestro; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO antecedente_siniestro VALUES (1, '2017-10-09', 'Apendice', 94, 2, 'cnx_auditoria_medica_internet', '2017-10-10 07:07:25.05742-03', 'cnx_auditoria_medica_internet', '2017-10-10 07:07:25.05742-03');
INSERT INTO antecedente_siniestro VALUES (2, '2010-10-10', 'Apendice', 126, 2, 'cnx_auditoria_medica_internet', '2017-10-11 13:12:17.758532-03', 'cnx_auditoria_medica_internet', '2017-10-11 13:12:17.758532-03');
INSERT INTO antecedente_siniestro VALUES (3, '2017-10-11', 'Algun motivo', 127, 1, 'cnx_auditoria_medica_internet', '2017-10-11 13:15:25.638477-03', 'cnx_auditoria_medica_internet', '2017-10-11 13:15:25.638477-03');
INSERT INTO antecedente_siniestro VALUES (4, '2017-10-11', 'Alergia', 128, 1, 'cnx_auditoria_medica_internet', '2017-10-11 13:22:10.695154-03', 'cnx_auditoria_medica_internet', '2017-10-11 13:22:10.695154-03');


--
-- Data for Name: atencion; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO atencion VALUES (90, 'Antecedentes Personales', '2017-10-09', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-09 13:49:47.791211-03', 'cnx_auditoria_medica_internet', '2017-10-09 13:49:47.791211-03', false, '');
INSERT INTO atencion VALUES (91, 'Antecedentes Personales', '2017-10-09', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-09 13:52:15.92507-03', 'cnx_auditoria_medica_internet', '2017-10-09 13:52:15.92507-03', false, '');
INSERT INTO atencion VALUES (92, 'Antecedentes Personales', '2017-10-09', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-09 13:53:53.914195-03', 'cnx_auditoria_medica_internet', '2017-10-09 13:53:53.914195-03', false, '');
INSERT INTO atencion VALUES (93, 'Antecedentes Personales', '2017-10-10', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-10 07:06:20.844316-03', 'cnx_auditoria_medica_internet', '2017-10-10 07:06:20.844316-03', false, '');
INSERT INTO atencion VALUES (94, 'Antecedentes siniestro', '2017-10-10', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-10 07:07:25.012419-03', 'cnx_auditoria_medica_internet', '2017-10-10 07:07:25.012419-03', false, '');
INSERT INTO atencion VALUES (95, 'Antecedentes familiares', '2017-10-10', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-10 13:42:00.091105-03', 'cnx_auditoria_medica_internet', '2017-10-10 13:42:00.091105-03', false, '');
INSERT INTO atencion VALUES (110, 'Evolucion Ambulatoria', '2017-10-11', 234729, 'baja de prueba', 'cnx_auditoria_medica_internet', '2017-10-11 09:19:19.050401-03', 'cnx_auditoria_medica_internet', '2017-10-11 10:13:46.522107-03', true, 'Aten');
INSERT INTO atencion VALUES (113, 'Antecedente perinatologico', '2017-10-11', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 10:21:56.787729-03', 'cnx_auditoria_medica_internet', '2017-10-11 10:21:56.787729-03', false, '');
INSERT INTO atencion VALUES (114, 'Antecedente perinatologico', '2017-10-11', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 10:23:11.74105-03', 'cnx_auditoria_medica_internet', '2017-10-11 10:23:11.74105-03', false, '');
INSERT INTO atencion VALUES (115, 'Antecedente perinatologico', '2017-10-11', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 10:24:41.938285-03', 'cnx_auditoria_medica_internet', '2017-10-11 10:24:41.938285-03', false, '');
INSERT INTO atencion VALUES (116, 'Antecedente perinatologico', '2017-10-11', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 10:27:21.600073-03', 'cnx_auditoria_medica_internet', '2017-10-11 10:27:21.600073-03', false, '');
INSERT INTO atencion VALUES (119, 'Evolucion Ambulatoria', '2017-10-11', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 10:40:45.812578-03', 'cnx_auditoria_medica_internet', '2017-10-11 10:40:45.953536-03', true, 'Aten');
INSERT INTO atencion VALUES (120, 'Evolucion Ambulatoria', '2017-10-11', 234729, 'Baja por correccion', 'cnx_auditoria_medica_internet', '2017-10-11 10:41:39.201908-03', 'cnx_auditoria_medica_internet', '2017-10-11 10:42:50.499436-03', true, 'Aten');
INSERT INTO atencion VALUES (118, 'Evolucion Ambulatoria', '2017-10-11', 234729, 'Otra baaj', 'cnx_auditoria_medica_internet', '2017-10-11 10:39:56.430217-03', 'cnx_auditoria_medica_internet', '2017-10-11 10:42:55.707218-03', true, 'Aten');
INSERT INTO atencion VALUES (117, 'Evolucion Ambulatoria', '2017-10-11', 234729, 'Agregar otra baja', 'cnx_auditoria_medica_internet', '2017-10-11 10:38:31.164518-03', 'cnx_auditoria_medica_internet', '2017-10-11 10:43:02.052381-03', true, 'Aten');
INSERT INTO atencion VALUES (140, 'Habito nuevo', '2017-10-12', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-12 10:27:58.559818-03', 'cnx_auditoria_medica_internet', '2017-10-12 10:27:58.559818-03', false, '');
INSERT INTO atencion VALUES (121, 'Evolucion Ambulatoria', '2017-10-11', 234729, 'Motivo de baja por supervisor', 'cnx_auditoria_medica_internet', '2017-10-11 10:43:11.226589-03', 'cnx_auditoria_medica_internet', '2017-10-11 12:09:23.506178-03', false, 'Aten');
INSERT INTO atencion VALUES (122, 'Evolucion Ambulatoria', '2017-10-11', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 12:17:31.813202-03', 'cnx_auditoria_medica_internet', '2017-10-11 12:17:31.813202-03', false, 'Aten');
INSERT INTO atencion VALUES (123, 'Evolucion Ambulatoria', '2017-10-11', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 12:47:14.353814-03', 'cnx_auditoria_medica_internet', '2017-10-11 12:47:14.353814-03', false, 'Aten');
INSERT INTO atencion VALUES (124, 'Antecedente perinatologico', '2017-10-11', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 12:48:14.057693-03', 'cnx_auditoria_medica_internet', '2017-10-11 12:48:14.057693-03', false, '');
INSERT INTO atencion VALUES (125, 'Antecedentes siniestro', '2017-10-11', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 13:01:17.129189-03', 'cnx_auditoria_medica_internet', '2017-10-11 13:01:17.129189-03', false, '');
INSERT INTO atencion VALUES (126, 'Antecedentes siniestro', '2017-10-11', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 13:12:17.316851-03', 'cnx_auditoria_medica_internet', '2017-10-11 13:12:17.316851-03', false, '');
INSERT INTO atencion VALUES (127, 'Antecedentes siniestro', '2017-10-11', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 13:15:25.589322-03', 'cnx_auditoria_medica_internet', '2017-10-11 13:15:25.589322-03', false, '');
INSERT INTO atencion VALUES (128, 'Antecedentes siniestro', '2017-10-11', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 13:22:10.547869-03', 'cnx_auditoria_medica_internet', '2017-10-11 13:22:10.547869-03', false, '');
INSERT INTO atencion VALUES (130, 'Medicamentos alergia', '2017-10-12', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-12 09:08:24.644236-03', 'cnx_auditoria_medica_internet', '2017-10-12 09:08:24.644236-03', false, '');
INSERT INTO atencion VALUES (131, 'Medicamentos alergia', '2017-10-12', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-12 09:24:18.108096-03', 'cnx_auditoria_medica_internet', '2017-10-12 09:24:18.108096-03', false, '');
INSERT INTO atencion VALUES (132, 'Medicamentos Consume', '2017-10-12', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-12 09:38:03.649032-03', 'cnx_auditoria_medica_internet', '2017-10-12 09:38:03.872272-03', true, '');
INSERT INTO atencion VALUES (133, 'Medicamentos Consume', '2017-10-12', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-12 09:47:19.544332-03', 'cnx_auditoria_medica_internet', '2017-10-12 09:47:20.207382-03', true, '');
INSERT INTO atencion VALUES (134, 'Medicamentos Consume', '2017-10-12', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-12 10:02:04.099782-03', 'cnx_auditoria_medica_internet', '2017-10-12 10:02:04.099782-03', false, '');
INSERT INTO atencion VALUES (135, 'Medicamentos Consume', '2017-10-12', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-12 10:03:59.057634-03', 'cnx_auditoria_medica_internet', '2017-10-12 10:03:59.057634-03', false, '');
INSERT INTO atencion VALUES (143, 'Habito nuevo', '2017-10-12', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-12 10:43:02.417318-03', 'cnx_auditoria_medica_internet', '2017-10-12 10:43:02.417318-03', false, '');
INSERT INTO atencion VALUES (144, 'Habito nuevo', '2017-10-12', 234729, NULL, 'cnx_auditoria_medica_internet', '2017-10-12 10:44:43.55732-03', 'cnx_auditoria_medica_internet', '2017-10-12 10:44:43.55732-03', false, '');


--
-- Data for Name: evolucion_ambulatoria; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO evolucion_ambulatoria VALUES ('2017-10-11', 80, 178, 50, 30, 25.2493382, 50, 60, 70, 80, 120, 80, true, '', 'Sobrepeso', 5, 'Consulta de prueba ', 'Enfermedad de prueba ', 'Examen fisico de prueba ', 'M484 FRACTURA DE VERTEBRA POR FATIGA', 'Descanso ', 'Analisis de sangre ', 'Ninguna ', '', '', 110, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 09:19:19.728805-03', 'cnx_auditoria_medica_internet', '2017-10-11 09:19:19.728805-03', 10, '', false, false, NULL, NULL);
INSERT INTO evolucion_ambulatoria VALUES ('2017-10-11', 80, 178, 50, 30, 25.2493382, 50, 60, 70, 80, 120, 80, true, '', 'Sobrepeso', 6, 'Consulta de prueba ', 'Enfermedad de prueba ', 'Examen fisico de prueba ', 'M484 FRACTURA DE VERTEBRA POR FATIGA', 'Descanso ', 'Analisis de sangre ', 'Ninguna ', '', '', 117, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 10:38:31.239466-03', 'cnx_auditoria_medica_internet', '2017-10-11 10:38:31.239466-03', 10, '', false, false, NULL, NULL);
INSERT INTO evolucion_ambulatoria VALUES ('2017-10-11', 80, 178, 50, 30, 25.2493382, 50, 60, 70, 80, 120, 80, true, '', 'Sobrepeso', 7, '', '', '', 'M484 FRACTURA DE VERTEBRA POR FATIGA', '', '', '', '', '', 119, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 10:40:45.881616-03', 'cnx_auditoria_medica_internet', '2017-10-11 11:28:11.163334-03', 10, '', true, false, NULL, NULL);
INSERT INTO evolucion_ambulatoria VALUES ('2017-10-11', 80, 178, 50, 30, 25.2493382, 50, 60, 70, 80, 120, 80, true, '', 'Sobrepeso', 8, '', '', '', 'M484 FRACTURA DE VERTEBRA POR FATIGA', '', '', '', '', '', 120, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 10:41:39.280562-03', 'cnx_auditoria_medica_internet', '2017-10-11 11:28:11.172339-03', 10, '', true, false, NULL, NULL);
INSERT INTO evolucion_ambulatoria VALUES ('2017-10-11', 80, 178, 50, 30, 25.2493382, 50, 60, 70, 80, 120, 80, true, '', 'Sobrepeso', 9, 'Dolor de garganta', 'Estado febril', 'Normal', 'M484 FRACTURA DE VERTEBRA POR FATIGA', 'Reposo', '', 'Ibuprofeno 3 comprimidos por dia de 600mg', '', '', 121, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 10:43:11.286972-03', 'cnx_auditoria_medica_internet', '2017-10-11 12:12:06.315178-03', 10, '', true, false, NULL, NULL);
INSERT INTO evolucion_ambulatoria VALUES ('2017-10-11', 80, 178, 50, 30, 25.2493382, 50, 60, 70, 80, 120, 80, true, '', 'Sobrepeso', 10, 'Consulta de prueba ', 'Enfermedad de prueba ', 'Examen fisico de prueba ', 'M484 FRACTURA DE VERTEBRA POR FATIGA', 'Descanso ', 'Analisis de sangre ', 'Ninguna ', '', '', 122, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 12:17:31.890934-03', 'cnx_auditoria_medica_internet', '2017-10-11 12:17:31.890934-03', 10, '', true, false, true, false);
INSERT INTO evolucion_ambulatoria VALUES ('2017-10-11', 80, 178, 50, 30, 25.2493382, 50, 60, 70, 80, 120, 83, true, '', 'Sobrepeso', 11, 'Consulta de prueba ', 'Enfermedad de prueba ', 'Examen fisico de prueba ', 'M484 FRACTURA DE VERTEBRA POR FATIGA', 'Descanso ', 'Analisis de sangre ', 'Ninguna ', '', '', 123, NULL, 'cnx_auditoria_medica_internet', '2017-10-11 12:47:14.428662-03', 'cnx_auditoria_medica_internet', '2017-10-11 12:47:14.428662-03', 10, '', false, false, true, false);


--
-- Data for Name: habito; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO habito VALUES (18, 143, 2, 'Una vez por semana', 5, 'cnx_auditoria_medica_internet', '2017-10-12 10:43:08.157141-03', 'cnx_auditoria_medica_internet', '2017-10-12 10:43:08.157141-03');
INSERT INTO habito VALUES (19, 144, 3, 'Natacion por semana', 1, 'cnx_auditoria_medica_internet', '2017-10-12 10:44:43.615511-03', 'cnx_auditoria_medica_internet', '2017-10-12 10:44:43.615511-03');


--
-- Data for Name: medicamento_alergia; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO medicamento_alergia VALUES (1, 130, 'Piel', 188, 'cnx_auditoria_medica_internet', '2017-10-12 09:10:53.877694-03', 'cnx_auditoria_medica_internet', '2017-10-12 09:10:53.877694-03');
INSERT INTO medicamento_alergia VALUES (2, 131, 'Oral', 10468, 'cnx_auditoria_medica_internet', '2017-10-12 09:24:18.925679-03', 'cnx_auditoria_medica_internet', '2017-10-12 09:24:18.925679-03');


--
-- Data for Name: medicamento_consume; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO medicamento_consume VALUES (1, 37309, 133, 'cnx_auditoria_medica_internet', '2017-10-12 09:55:23.089731-03', 'cnx_auditoria_medica_internet', '2017-10-12 09:55:23.089731-03', 'dfdfd');
INSERT INTO medicamento_consume VALUES (2, 45709, 135, 'cnx_auditoria_medica_internet', '2017-10-12 10:03:59.10374-03', 'cnx_auditoria_medica_internet', '2017-10-12 10:03:59.10374-03', 'Hioy');


--
-- Name: seq_antecedente_familiar; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_antecedente_familiar', 5, true);


--
-- Name: seq_antecedente_perinatologico; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_antecedente_perinatologico', 2, true);


--
-- Name: seq_antecedente_personal; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_antecedente_personal', 2, true);


--
-- Name: seq_antecedente_siniestro; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_antecedente_siniestro', 4, true);


--
-- Name: seq_atencion; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_atencion', 144, true);


--
-- Name: seq_evolucion_ambulatoria; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_evolucion_ambulatoria', 11, true);


--
-- Name: seq_habito; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_habito', 19, true);


--
-- Name: seq_hc_atencion; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_hc_atencion', 1, false);


--
-- Name: seq_medicamento_alergia; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_medicamento_alergia', 2, true);


--
-- Name: seq_medicamento_consume; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_medicamento_consume', 2, true);


--
-- Name: seq_seros_te_cuida_persona; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_seros_te_cuida_persona', 32, true);


--
-- Name: seq_seros_te_cuida_riesgo_cardiovascular; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_seros_te_cuida_riesgo_cardiovascular', 32, true);


--
-- Name: seq_tipo_afeccion_familiar; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_tipo_afeccion_familiar', 1, false);


--
-- Name: seq_tipo_afeccion_personal; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_tipo_afeccion_personal', 1, false);


--
-- Name: seq_tipo_antecedente_siniestro; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_tipo_antecedente_siniestro', 1, false);


--
-- Name: seq_tipo_habito; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_tipo_habito', 1, false);


--
-- Name: seq_tipo_presentacion; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_tipo_presentacion', 1, false);


--
-- Name: seq_tipo_terminacion; Type: SEQUENCE SET; Schema: campanias; Owner: postgres
--

SELECT pg_catalog.setval('seq_tipo_terminacion', 1, false);


--
-- Data for Name: seros_te_cuida_persona; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO seros_te_cuida_persona VALUES (1, 300913, 96, 23905285, 'CASTRO WALTER JOSE', 'M', '1974-07-04', 1, 'SOLER', 2270, '', '', 2965, NULL, '9100', 63, 'WJCASTRO@ISSYS.GOV.AR', false, 'cnx_auditoria_medica_internet', '2014-10-02 06:48:59.311062-03', 'cnx_auditoria_medica_internet', '2014-10-02 06:48:59.311062-03');
INSERT INTO seros_te_cuida_persona VALUES (2, NULL, 96, 23905286, 'CASTRO WALTER 2', 'M', '1974-07-04', 1, 'AAAA', 123, NULL, NULL, NULL, NULL, NULL, 63, NULL, true, 'cnx_auditoria_medica_internet', '2014-10-02 09:04:48.525302-03', 'cnx_auditoria_medica_internet', '2014-10-02 09:04:48.525302-03');
INSERT INTO seros_te_cuida_persona VALUES (3, 301008, 96, 32538402, 'TARDON MICHEL', 'M', '1986-09-15', 1, 'JUAN ONETTO', 18, '', '', NULL, NULL, '9103', 65, 'MICHELTARDON@GMAIL.COM', false, 'cnx_auditoria_medica_internet', '2014-10-02 09:18:56.368002-03', 'cnx_auditoria_medica_internet', '2014-10-02 09:18:56.368002-03');
INSERT INTO seros_te_cuida_persona VALUES (5, 258161, 96, 21961944, 'MASIMELLI MARIA LAURA', 'F', '1971-05-04', 1, 'SOLER', 2270, '0', NULL, NULL, NULL, '9100', 63, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-02 11:13:18.67579-03', 'cnx_auditoria_medica_internet', '2014-10-02 11:13:18.67579-03');
INSERT INTO seros_te_cuida_persona VALUES (6, 293671, 96, 26544072, 'ENTRAIGAS VALERIA ELIZABETH', 'F', '1978-04-11', 1, 'JULIO A. ROCA', 2680, '0', NULL, NULL, NULL, '9100', 63, 'ventraigas@gmail.com', false, 'cnx_auditoria_medica_internet', '2014-10-02 11:25:51.534438-03', 'cnx_auditoria_medica_internet', '2014-10-02 11:25:51.534438-03');
INSERT INTO seros_te_cuida_persona VALUES (7, NULL, 96, 265440721, 'ENTRAIGAS VALERIA (OTRA)', 'F', '1978-04-11', 1, 'JULIO A ROCA', 2680, NULL, NULL, NULL, NULL, NULL, 738, NULL, true, 'cnx_auditoria_medica_internet', '2014-10-02 11:30:57.424764-03', 'cnx_auditoria_medica_internet', '2014-10-02 11:31:28.290133-03');
INSERT INTO seros_te_cuida_persona VALUES (4, NULL, 96, 29983657, 'SOTO CARLOS GERMAN', 'M', '1983-06-04', 1, 'PJE NUEVA LEON', 130, '0', NULL, 280, 4323232, '9103', 65, NULL, true, 'cnx_auditoria_medica_internet', '2014-10-02 11:10:32.397419-03', 'cnx_auditoria_medica_internet', '2014-10-02 11:35:30.729091-03');
INSERT INTO seros_te_cuida_persona VALUES (8, 289045, 96, 31958929, 'JUDO LAURA PAMELA', 'F', '1986-02-15', 1, 'BRASIL', 164, NULL, NULL, NULL, NULL, '9100', 63, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-02 11:45:01.605375-03', 'cnx_auditoria_medica_internet', '2014-10-02 11:45:01.605375-03');
INSERT INTO seros_te_cuida_persona VALUES (9, 289784, 96, 25230298, 'DELLA TORRE SANTIAGO ARIEL', 'M', '1976-03-04', 1, 'SANTOS CALVO', 279, NULL, NULL, 280, NULL, '9103', 65, 'SDELLATORRE@GMAIL.COM', false, 'cnx_auditoria_medica_internet', '2014-10-02 12:08:13.729557-03', 'cnx_auditoria_medica_internet', '2014-10-02 12:08:13.729557-03');
INSERT INTO seros_te_cuida_persona VALUES (10, NULL, 96, 17940400, 'BENITEZ JOSE LUIS', 'M', '1967-04-01', 1, 'CHACRA GAIMAN', NULL, NULL, NULL, NULL, NULL, NULL, 46, NULL, true, 'cnx_auditoria_medica_internet', '2014-10-11 11:27:59.323177-03', 'cnx_auditoria_medica_internet', '2014-10-11 11:27:59.323177-03');
INSERT INTO seros_te_cuida_persona VALUES (11, 325259, 96, 13814908, 'MILLAPAN ESTER DORA', 'F', '1961-03-23', 1, 'CHACRA LOTE B', 214, '', '', NULL, NULL, '0', 46, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 11:42:58.219611-03', 'cnx_auditoria_medica_internet', '2014-10-11 11:42:58.219611-03');
INSERT INTO seros_te_cuida_persona VALUES (12, 329738, 96, 33353973, 'AVILA JESSICA BELEN', 'F', '1988-06-04', 1, 'FERNANDO BONAVIA', 3, '', '', NULL, NULL, '9107', 47, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 11:46:10.117476-03', 'cnx_auditoria_medica_internet', '2014-10-11 11:46:10.117476-03');
INSERT INTO seros_te_cuida_persona VALUES (13, 325262, 96, 38711565, 'HERNANDEZ JUANA TRINIDAD', 'F', '1995-05-11', 1, 'CHACRA LOTE B', 214, '', '', NULL, NULL, '0', 46, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 12:00:09.045768-03', 'cnx_auditoria_medica_internet', '2014-10-11 12:00:09.045768-03');
INSERT INTO seros_te_cuida_persona VALUES (14, NULL, 96, 16049946, 'JARA ROSA', 'F', '1962-07-27', 1, 'LOS ALGARROBOS 28', NULL, NULL, NULL, NULL, NULL, NULL, 65, NULL, true, 'cnx_auditoria_medica_internet', '2014-10-11 12:27:52.614203-03', 'cnx_auditoria_medica_internet', '2014-10-11 12:27:52.614203-03');
INSERT INTO seros_te_cuida_persona VALUES (15, NULL, 96, 31504765, 'FONSECA VICTOR', 'M', '1985-03-23', 1, 'BO 20 VIVIENDAS CASA 9', NULL, NULL, NULL, NULL, NULL, NULL, 65, NULL, true, 'cnx_auditoria_medica_internet', '2014-10-11 12:38:17.766875-03', 'cnx_auditoria_medica_internet', '2014-10-11 12:38:17.766875-03');
INSERT INTO seros_te_cuida_persona VALUES (16, NULL, 96, 27363162, 'FARIZO MARCOS', 'M', '1979-06-08', 1, 'BO PLANTA DE GAS AVDA COLON 1490', NULL, NULL, NULL, NULL, NULL, NULL, 63, NULL, true, 'cnx_auditoria_medica_internet', '2014-10-11 12:43:34.744912-03', 'cnx_auditoria_medica_internet', '2014-10-11 12:43:34.744912-03');
INSERT INTO seros_te_cuida_persona VALUES (17, 295479, 96, 26344405, 'RODRIGUEZ MARIA ROSA', 'F', '1977-11-28', 1, 'OWEN', 19, NULL, NULL, NULL, NULL, '9105', 46, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 12:50:12.460727-03', 'cnx_auditoria_medica_internet', '2014-10-11 12:50:12.460727-03');
INSERT INTO seros_te_cuida_persona VALUES (18, 235212, 96, 17797807, 'MORALES BAEZA MONICA GLENYS', 'F', '1961-04-13', 1, 'AVDA.VUCETICH Y STA. CRUZ', 9, '0', NULL, NULL, NULL, '9103', 65, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 12:55:27.801662-03', 'cnx_auditoria_medica_internet', '2014-10-11 12:55:27.801662-03');
INSERT INTO seros_te_cuida_persona VALUES (19, 227504, 96, 10036655, 'CORIA NORMA SONIA', 'F', '1951-07-28', 1, 'EMB.DON VICTOR MZA.37P', 2, '', '', NULL, NULL, '9103', 65, '', false, 'cnx_auditoria_medica_internet', '2014-10-11 12:59:30.891796-03', 'cnx_auditoria_medica_internet', '2014-10-11 12:59:30.891796-03');
INSERT INTO seros_te_cuida_persona VALUES (20, 228489, 96, 16902680, 'NAZAR CRISTINA EMILIA', 'F', '1963-06-27', 1, 'CENTENARIO', 569, '0', '', NULL, NULL, '9100', 63, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:03:55.611138-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:03:55.611138-03');
INSERT INTO seros_te_cuida_persona VALUES (21, 286924, 96, 30580250, 'ROBERTS SHIRLEY PAMELA', 'F', '1984-05-13', 1, 'BARRIO COVIRA R. PAYRO', 70, '0', '', NULL, NULL, '9103', 65, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:05:49.712231-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:05:49.712231-03');
INSERT INTO seros_te_cuida_persona VALUES (22, 270756, 96, 17735361, 'WILLIANS OSCAR DANIEL', 'M', '1966-03-25', 1, 'LA PAZ', 179, '0', NULL, NULL, NULL, '9105', 46, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:11:55.228193-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:11:55.228193-03');
INSERT INTO seros_te_cuida_persona VALUES (23, NULL, 96, 20238047, 'PIU MARCELA', 'F', '1968-11-24', 1, 'CHACRA GAIMAN', NULL, NULL, NULL, NULL, NULL, NULL, 46, NULL, true, 'cnx_auditoria_medica_internet', '2014-10-11 13:20:30.2021-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:20:30.2021-03');
INSERT INTO seros_te_cuida_persona VALUES (24, 306430, 96, 28054572, 'NEYRA ANDRES RICARDO', 'M', '1980-03-08', 1, 'MARTIN FIERRO PADRE JUAN MUZIO', 453, '', '', NULL, NULL, '9100', 63, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:23:08.625447-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:23:08.625447-03');
INSERT INTO seros_te_cuida_persona VALUES (25, 287370, 96, 32545366, 'GIBBON FERNANDO GONZALO', 'M', '1987-03-20', 1, 'BARRIO 490 VIVIENDAS', 231, '', '', NULL, NULL, '9103', 65, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:25:15.280441-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:25:15.280441-03');
INSERT INTO seros_te_cuida_persona VALUES (26, 187257, 96, 12207968, 'MARTINEZ ARGENTINA NOEMI', 'F', '1958-02-05', 1, 'A. P. BELL', 311, '5', 'B', NULL, NULL, '9100', 63, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:28:13.345903-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:28:13.345903-03');
INSERT INTO seros_te_cuida_persona VALUES (27, 277043, 96, 16001210, 'GISSER RAQUEL ESTER', 'F', '1962-08-22', 1, 'SAN MARTIN', 1097, '3', 'C', NULL, NULL, '9000', 31, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:34:58.367244-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:34:58.367244-03');
INSERT INTO seros_te_cuida_persona VALUES (28, 197504, 96, 17915455, 'WHITE REBECA ETHEL', 'F', '1967-11-17', 1, 'BARRIO DOCENTE CASA', 11, '0', NULL, NULL, NULL, '9105', 46, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:39:01.900612-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:39:01.900612-03');
INSERT INTO seros_te_cuida_persona VALUES (29, 167652, 96, 30883839, 'SOSA BRENDA NADIA', 'F', '1984-06-18', 1, 'GOBERNADOR TELLO', 770, '0', NULL, NULL, NULL, '9100', 63, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:42:13.924556-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:42:13.924556-03');
INSERT INTO seros_te_cuida_persona VALUES (30, NULL, 96, 14757254, 'AGUERO CONCEPCION OLGA', 'F', '1961-12-08', 1, 'BO 40 VIVIENDAS OWEN 172', NULL, NULL, NULL, NULL, NULL, NULL, 46, NULL, true, 'cnx_auditoria_medica_internet', '2014-10-11 14:36:53.206701-03', 'cnx_auditoria_medica_internet', '2014-10-11 14:36:53.206701-03');
INSERT INTO seros_te_cuida_persona VALUES (31, 313461, 96, 92806317, 'GUTIERREZ MARTICORENA LUCY LILIANA', 'F', '1982-05-27', 2, 'BROWN', 470, NULL, 'C', 280, NULL, '9100', 63, NULL, false, 'cnx_auditoria_medica_internet', '2015-09-09 13:26:13.012865-03', 'cnx_auditoria_medica_internet', '2015-09-09 13:26:13.012865-03');
INSERT INTO seros_te_cuida_persona VALUES (32, 234729, 96, 33345146, 'MANSILLA FERNANDO DAMIAN', 'M', '1987-10-27', 1, 'PASO DE INDIOS', 3384, '0', NULL, 280, 4432629, '9100', 63, 'FDMANSILLA333@GMAIL.COM', false, 'cnx_auditoria_medica_internet', '2017-10-12 11:27:31.121432-03', 'cnx_auditoria_medica_internet', '2017-10-12 11:27:31.121432-03');


--
-- Data for Name: seros_te_cuida_riesgo_cardiovascular; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (1, 1, '2014-10-02', 125, false, false, false, 24, 41, 4.5, 4.30000019, 3.29999995, false, NULL, true, 'cnx_auditoria_medica_internet', '2014-10-02 06:49:52.605092-03', 'cnx_auditoria_medica_internet', '2014-10-02 06:52:45.099039-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (3, 2, '2014-10-02', 125, false, false, false, 27, 42, 5, 4.30000019, 3.29999995, false, NULL, true, 'cnx_auditoria_medica_internet', '2014-10-02 09:05:02.400051-03', 'cnx_auditoria_medica_internet', '2014-10-02 09:05:43.7105-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (2, 1, '2014-10-02', 125, false, false, true, 27, 53, 9.80000019, 4.30000019, 3.29999995, false, NULL, true, 'cnx_auditoria_medica_internet', '2014-10-02 06:52:30.791935-03', 'cnx_auditoria_medica_internet', '2014-10-02 09:21:47.50535-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (4, 4, '2014-10-02', 125, false, false, false, 24, 32, 2.0999999, 2, 1.5, false, NULL, true, 'cnx_auditoria_medica_internet', '2014-10-02 11:11:50.212105-03', 'cnx_auditoria_medica_internet', '2014-10-02 11:13:07.876708-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (5, 6, '2014-10-02', 125, false, false, false, 1, 1, 0, 0, 0, true, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-02 11:26:21.555038-03', 'cnx_auditoria_medica_internet', '2014-10-02 11:26:21.555038-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (6, 6, '2014-10-02', 125, false, false, false, 1, 1, 0, 0, 0, true, '------------------------------------------------
null - 02/10/2014 11:31
------------------------------------------------
mmmmmmmmmm', false, 'cnx_auditoria_medica_internet', '2014-10-02 11:27:06.587355-03', 'cnx_auditoria_medica_internet', '2014-10-02 11:27:06.587355-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (7, 6, '2014-10-02', 125, false, false, false, 21, 36, 1.70000005, 1.79999995, 1.20000005, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-02 11:28:29.471192-03', 'cnx_auditoria_medica_internet', '2014-10-02 11:28:29.471192-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (8, 4, '2014-10-02', 125, false, false, false, 18, 29, 1.70000005, 2, 1.5, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-02 11:35:42.128538-03', 'cnx_auditoria_medica_internet', '2014-10-02 11:35:42.128538-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (9, 8, '2014-10-02', 125, false, false, false, 1, 1, 0, 0, 0, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-02 11:46:36.72239-03', 'cnx_auditoria_medica_internet', '2014-10-02 11:46:36.72239-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (10, 9, '2014-10-02', 125, false, false, false, 32, 42, 4.9000001, 3.70000005, 2.9000001, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-02 12:10:20.854463-03', 'cnx_auditoria_medica_internet', '2014-10-02 12:10:20.854463-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (11, 10, '2014-10-11', 120, false, false, true, 28, 61, 15, 7, 5.5, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 11:29:02.517796-03', 'cnx_auditoria_medica_internet', '2014-10-11 11:29:02.517796-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (12, 11, '2014-10-11', 109, false, false, false, 30, 48, 4, 5, 3.5, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 11:43:41.057099-03', 'cnx_auditoria_medica_internet', '2014-10-11 11:43:41.057099-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (13, 12, '2014-10-11', 110, false, false, false, 23, 23, 0.5, 0.699999988, 0.5, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 11:47:14.105758-03', 'cnx_auditoria_medica_internet', '2014-10-11 11:47:14.105758-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (14, 14, '2014-10-11', 130, false, false, false, 36, 59, 6.5999999, 4.69999981, 3.29999995, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 12:29:00.336508-03', 'cnx_auditoria_medica_internet', '2014-10-11 12:29:00.336508-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (15, 15, '2014-10-11', 130, false, false, true, 31, 40, 4.4000001, 1.60000002, 1.20000005, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 12:38:55.876526-03', 'cnx_auditoria_medica_internet', '2014-10-11 12:38:55.876526-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (16, 16, '2014-10-11', 110, false, false, false, 24, 33, 2.4000001, 2.9000001, 2.20000005, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 12:44:14.838264-03', 'cnx_auditoria_medica_internet', '2014-10-11 12:44:14.838264-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (17, 17, '2014-10-11', 110, false, false, true, 27, 41, 2.5, 1.79999995, 1.20000005, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 12:50:56.042079-03', 'cnx_auditoria_medica_internet', '2014-10-11 12:50:56.042079-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (18, 18, '2014-10-11', 110, false, false, false, 28, 48, 3.9000001, 5, 3.5, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 12:56:19.018587-03', 'cnx_auditoria_medica_internet', '2014-10-11 12:56:19.018587-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (19, 19, '2014-10-11', 120, false, false, false, 29, 63, 7.9000001, 7.9000001, 5.5, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:00:04.534279-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:00:04.534279-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (20, 20, '2014-10-11', 110, false, false, false, 31, 48, 3.70000005, 4.5, 3.0999999, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:04:31.971559-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:04:31.971559-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (21, 21, '2014-10-11', 110, false, false, false, 19, 26, 0.699999988, 1.10000002, 0.699999988, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:06:43.068093-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:06:43.068093-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (22, 8, '2014-10-11', 125, false, false, false, 1, 1, 0, 0, 0, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:09:40.562703-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:09:40.562703-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (23, 22, '2014-10-11', 124, false, false, true, 1, 1, 0, 0, 0, false, NULL, true, 'cnx_auditoria_medica_internet', '2014-10-11 13:13:27.952348-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:14:34.73751-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (24, 22, '2014-10-11', 125, false, false, true, 26, 62, 16, 7.4000001, 5.80000019, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:16:53.657917-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:16:53.657917-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (25, 23, '2014-10-11', 110, false, false, false, 24, 40, 2.29999995, 3.20000005, 2.20000005, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:21:13.934979-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:21:13.934979-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (26, 24, '2014-10-11', 120, false, false, false, 25, 34, 2.70000005, 2.5999999, 2, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:23:45.675653-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:23:45.675653-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (27, 25, '2014-10-11', 125, false, false, false, 26, 28, 1.39999998, 1.29999995, 1, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:26:10.898937-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:26:10.898937-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (28, 26, '2014-10-11', 125, false, false, true, 21, 70, 10.1999998, 5.80000019, 4, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:29:38.621545-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:29:38.621545-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (29, 27, '2014-10-11', 100, false, false, false, 25, 42, 2.70000005, 4.69999981, 3.29999995, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:36:11.888135-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:36:11.888135-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (30, 28, '2014-10-11', 125, false, false, false, 21, 45, 3.29999995, 3.4000001, 2.4000001, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:39:39.172893-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:39:39.172893-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (31, 29, '2014-10-11', 120, false, false, false, 31, 31, 1.10000002, 1.10000002, 0.699999988, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 13:49:02.261934-03', 'cnx_auditoria_medica_internet', '2014-10-11 13:49:02.261934-03');
INSERT INTO seros_te_cuida_riesgo_cardiovascular VALUES (32, 30, '2014-10-11', 130, false, false, false, 43, 61, 7.30000019, 4.69999981, 3.29999995, false, NULL, false, 'cnx_auditoria_medica_internet', '2014-10-11 14:37:29.82591-03', 'cnx_auditoria_medica_internet', '2014-10-11 14:37:29.82591-03');


--
-- Data for Name: tipo_afeccion_familiar; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO tipo_afeccion_familiar VALUES (1, 'Hipertension Arterial', 'HTA', 'postgres', '2017-10-09 07:35:27.270423-03', 'postgres', '2017-10-09 07:35:27.270423-03');
INSERT INTO tipo_afeccion_familiar VALUES (2, 'Cardiopatia', 'Cardiopatia', 'postgres', '2017-10-09 07:39:22.017001-03', 'postgres', '2017-10-09 07:39:22.017001-03');
INSERT INTO tipo_afeccion_familiar VALUES (3, 'Diabetes', 'DBT', 'postgres', '2017-10-09 07:39:30.550263-03', 'postgres', '2017-10-09 07:39:30.550263-03');
INSERT INTO tipo_afeccion_familiar VALUES (4, 'Accidente cardiovascular / Infarto Agudo de Miocardio', 'ACV/IAM', 'postgres', '2017-10-09 07:39:30.550263-03', 'postgres', '2017-10-09 07:39:30.550263-03');
INSERT INTO tipo_afeccion_familiar VALUES (5, 'C�ncer de Colon', 'Cancer de colon', 'postgres', '2017-10-09 07:39:30.550263-03', 'postgres', '2017-10-09 07:39:30.550263-03');
INSERT INTO tipo_afeccion_familiar VALUES (6, 'C�ncer de mama', 'Cancer de mama', 'postgres', '2017-10-09 07:39:30.550263-03', 'postgres', '2017-10-09 07:39:30.550263-03');
INSERT INTO tipo_afeccion_familiar VALUES (7, 'Otras enfermedades oncologicas', 'Otras enfermedades oncologicas', 'postgres', '2017-10-09 07:39:30.550263-03', 'postgres', '2017-10-09 07:39:30.550263-03');
INSERT INTO tipo_afeccion_familiar VALUES (8, 'Consumo de drogas', 'Consumo de drogas', 'postgres', '2017-10-09 07:39:30.550263-03', 'postgres', '2017-10-09 07:39:30.550263-03');
INSERT INTO tipo_afeccion_familiar VALUES (9, 'Abuso de alcohol', 'Abuso de Alcohol', 'postgres', '2017-10-09 07:39:30.550263-03', 'postgres', '2017-10-09 07:39:30.550263-03');
INSERT INTO tipo_afeccion_familiar VALUES (10, 'Depresi�n', 'Depresion', 'postgres', '2017-10-09 07:39:30.550263-03', 'postgres', '2017-10-09 07:39:30.550263-03');
INSERT INTO tipo_afeccion_familiar VALUES (11, 'Maltrato o violencia familiar', 'Maltrato o violencia familiar', 'postgres', '2017-10-09 07:39:30.550263-03', 'postgres', '2017-10-09 07:39:30.550263-03');
INSERT INTO tipo_afeccion_familiar VALUES (12, 'Otras', 'Otras', 'postgres', '2017-10-09 07:39:30.550263-03', 'postgres', '2017-10-09 07:39:30.550263-03');


--
-- Data for Name: tipo_afeccion_personal; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO tipo_afeccion_personal VALUES (2, 'DBT', 'Diabetes', 'postgres', '2017-10-09 07:44:11.398887-03', 'postgres', '2017-10-09 07:44:11.398887-03');
INSERT INTO tipo_afeccion_personal VALUES (3, 'Enfermedad coronaria', 'Enfermedad coronaria', 'postgres', '2017-10-09 07:44:13.859489-03', 'postgres', '2017-10-09 07:44:13.859489-03');
INSERT INTO tipo_afeccion_personal VALUES (4, 'IAM', 'Infarto Agudo de Miocardio', 'postgres', '2017-10-09 07:44:17.537721-03', 'postgres', '2017-10-09 07:44:17.537721-03');
INSERT INTO tipo_afeccion_personal VALUES (5, 'ACV', 'Accidente Cardiovascular', 'postgres', '2017-10-09 07:44:17.537721-03', 'postgres', '2017-10-09 07:44:17.537721-03');
INSERT INTO tipo_afeccion_personal VALUES (6, 'Epoc/asma', 'Epoc/Asma', 'postgres', '2017-10-09 07:44:17.537721-03', 'postgres', '2017-10-09 07:44:17.537721-03');
INSERT INTO tipo_afeccion_personal VALUES (7, 'Alergia/Atopia', 'Alergia/Atopia', 'postgres', '2017-10-09 07:44:17.537721-03', 'postgres', '2017-10-09 07:44:17.537721-03');
INSERT INTO tipo_afeccion_personal VALUES (8, 'Enfermedad reumatica', 'Enfermedad reum�tica', 'postgres', '2017-10-09 07:44:17.537721-03', 'postgres', '2017-10-09 07:44:17.537721-03');
INSERT INTO tipo_afeccion_personal VALUES (9, 'Enfermedad oncologica', 'Enfermedad oncologica', 'postgres', '2017-10-09 07:44:17.537721-03', 'postgres', '2017-10-09 07:44:17.537721-03');
INSERT INTO tipo_afeccion_personal VALUES (10, 'TBC', 'Tuberculosis', 'postgres', '2017-10-09 07:44:17.537721-03', 'postgres', '2017-10-09 07:44:17.537721-03');
INSERT INTO tipo_afeccion_personal VALUES (11, 'Chagas', 'Chagas', 'postgres', '2017-10-09 07:44:17.537721-03', 'postgres', '2017-10-09 07:44:17.537721-03');
INSERT INTO tipo_afeccion_personal VALUES (12, 'ITS', 'Enfermedades de transmisi�n sexual', 'postgres', '2017-10-09 07:44:17.537721-03', 'postgres', '2017-10-09 07:44:17.537721-03');
INSERT INTO tipo_afeccion_personal VALUES (13, 'Psicopatologicos', 'Psicopatol�gicos', 'postgres', '2017-10-09 07:44:17.537721-03', 'postgres', '2017-10-09 07:44:17.537721-03');
INSERT INTO tipo_afeccion_personal VALUES (14, 'Neurologicos', 'Neurologicos', 'postgres', '2017-10-09 07:44:17.537721-03', 'postgres', '2017-10-09 07:44:17.537721-03');
INSERT INTO tipo_afeccion_personal VALUES (15, 'Maltrato / Violencia familiar', 'Maltrato / Violencia familiar', 'postgres', '2017-10-09 07:44:17.537721-03', 'postgres', '2017-10-09 07:44:17.537721-03');
INSERT INTO tipo_afeccion_personal VALUES (16, 'Otros', 'Otros', 'postgres', '2017-10-09 07:44:17.537721-03', 'postgres', '2017-10-09 07:44:17.537721-03');
INSERT INTO tipo_afeccion_personal VALUES (1, 'HTA', 'Hipertension arterial', 'postgres', '2017-10-09 07:46:43.800397-03', 'postgres', '2017-10-09 07:46:43.800397-03');


--
-- Data for Name: tipo_antecedente_siniestro; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO tipo_antecedente_siniestro VALUES (2, 'Operaciones', 'postgres', '2017-10-09 07:45:40.323097-03', 'postgres', '2017-10-09 07:45:40.323097-03');
INSERT INTO tipo_antecedente_siniestro VALUES (3, 'Accidentes', 'postgres', '2017-10-09 07:45:42.509777-03', 'postgres', '2017-10-09 07:45:42.509777-03');
INSERT INTO tipo_antecedente_siniestro VALUES (1, 'Internaciones', 'postgres', '2017-10-09 07:46:27.583814-03', 'postgres', '2017-10-09 07:46:27.583814-03');


--
-- Data for Name: tipo_habito; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO tipo_habito VALUES (1, 'Fuma', 'Fuma', 'postgres', '2017-10-09 07:48:03.36788-03', 'postgres', '2017-10-09 07:48:03.36788-03');
INSERT INTO tipo_habito VALUES (2, 'Alcohol', 'Alcohol', 'postgres', '2017-10-09 07:48:03.36788-03', 'postgres', '2017-10-09 07:48:03.36788-03');
INSERT INTO tipo_habito VALUES (3, 'Actividad fisica', 'Actividad fisica', 'postgres', '2017-10-09 07:48:03.36788-03', 'postgres', '2017-10-09 07:48:03.36788-03');


--
-- Data for Name: tipo_presentacion; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO tipo_presentacion VALUES (3, 'Cefalica', 'postgres', '2017-10-11 10:32:21.456701-03', 'postgres', '2017-10-11 10:32:21.456701-03');
INSERT INTO tipo_presentacion VALUES (2, 'Podalica', 'postgres', '2017-10-11 10:32:21.50851-03', 'postgres', '2017-10-11 10:32:21.50851-03');
INSERT INTO tipo_presentacion VALUES (1, 'Transversa', 'postgres', '2017-10-11 10:32:21.518572-03', 'postgres', '2017-10-11 10:32:21.518572-03');


--
-- Data for Name: tipo_terminacion; Type: TABLE DATA; Schema: campanias; Owner: postgres
--

INSERT INTO tipo_terminacion VALUES (3, 'Espontanea', 'postgres', '2017-10-11 10:33:05.781815-03', 'postgres', '2017-10-11 10:33:05.781815-03');
INSERT INTO tipo_terminacion VALUES (2, 'Forceps', 'postgres', '2017-10-11 10:33:05.795108-03', 'postgres', '2017-10-11 10:33:05.795108-03');
INSERT INTO tipo_terminacion VALUES (1, 'Cesarea', 'postgres', '2017-10-11 10:33:05.803451-03', 'postgres', '2017-10-11 10:33:05.803451-03');


--
-- Name: antecedente_familiar_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY antecedente_familiar
    ADD CONSTRAINT antecedente_familiar_pk PRIMARY KEY (codigo);


--
-- Name: antecedente_perinatologico_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY antecedente_perinatologico
    ADD CONSTRAINT antecedente_perinatologico_pk PRIMARY KEY (codigo);


--
-- Name: antecedente_personal_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY antecedente_personal
    ADD CONSTRAINT antecedente_personal_pk PRIMARY KEY (codigo);


--
-- Name: antecedente_siniestro_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY antecedente_siniestro
    ADD CONSTRAINT antecedente_siniestro_pk PRIMARY KEY (codigo);


--
-- Name: atencion_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY atencion
    ADD CONSTRAINT atencion_pk PRIMARY KEY (codigo);


--
-- Name: evolucion_ambulatoria_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY evolucion_ambulatoria
    ADD CONSTRAINT evolucion_ambulatoria_pk PRIMARY KEY (codigo);


--
-- Name: habito_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY habito
    ADD CONSTRAINT habito_pk PRIMARY KEY (codigo);


--
-- Name: medicamento_alergia_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY medicamento_alergia
    ADD CONSTRAINT medicamento_alergia_pk PRIMARY KEY (codigo);


--
-- Name: medicamento_consume_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY medicamento_consume
    ADD CONSTRAINT medicamento_consume_pk PRIMARY KEY (codigo);


--
-- Name: pk_riesgo_cardiovascular; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY seros_te_cuida_riesgo_cardiovascular
    ADD CONSTRAINT pk_riesgo_cardiovascular PRIMARY KEY (codigo);


--
-- Name: pk_seros_te_cuida_persona; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY seros_te_cuida_persona
    ADD CONSTRAINT pk_seros_te_cuida_persona PRIMARY KEY (codigo);


--
-- Name: tipo_afeccion_familiar_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY tipo_afeccion_familiar
    ADD CONSTRAINT tipo_afeccion_familiar_pk PRIMARY KEY (codigo);


--
-- Name: tipo_afeccion_personal_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY tipo_afeccion_personal
    ADD CONSTRAINT tipo_afeccion_personal_pk PRIMARY KEY (codigo);


--
-- Name: tipo_antecedente_siniestro_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY tipo_antecedente_siniestro
    ADD CONSTRAINT tipo_antecedente_siniestro_pk PRIMARY KEY (codigo);


--
-- Name: tipo_habito_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY tipo_habito
    ADD CONSTRAINT tipo_habito_pk PRIMARY KEY (codigo);


--
-- Name: tipo_presentacion_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY tipo_presentacion
    ADD CONSTRAINT tipo_presentacion_pk PRIMARY KEY (codigo);


--
-- Name: tipo_terminacion_pk; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY tipo_terminacion
    ADD CONSTRAINT tipo_terminacion_pk PRIMARY KEY (codigo);


--
-- Name: unq_seros_te_cuida_persona; Type: CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY seros_te_cuida_persona
    ADD CONSTRAINT unq_seros_te_cuida_persona UNIQUE (tipo_documento, numero_documento);


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON seros_te_cuida_persona FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON seros_te_cuida_riesgo_cardiovascular FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON atencion FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON tipo_afeccion_familiar FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON tipo_afeccion_personal FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON tipo_habito FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON antecedente_familiar FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON tipo_presentacion FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON tipo_terminacion FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON antecedente_perinatologico FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON antecedente_personal FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON evolucion_ambulatoria FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON habito FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON tipo_antecedente_siniestro FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON antecedente_siniestro FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON medicamento_alergia FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_insert; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_insert BEFORE INSERT ON medicamento_consume FOR EACH ROW EXECUTE PROCEDURE public.before_insert();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON seros_te_cuida_persona FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON seros_te_cuida_riesgo_cardiovascular FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON atencion FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON tipo_afeccion_familiar FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON tipo_afeccion_personal FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON tipo_habito FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON antecedente_familiar FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON tipo_presentacion FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON tipo_terminacion FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON antecedente_perinatologico FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON antecedente_personal FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON evolucion_ambulatoria FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON habito FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON tipo_antecedente_siniestro FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON antecedente_siniestro FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON medicamento_alergia FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: before_update; Type: TRIGGER; Schema: campanias; Owner: postgres
--

CREATE TRIGGER before_update BEFORE UPDATE ON medicamento_consume FOR EACH ROW EXECUTE PROCEDURE public.before_update();


--
-- Name: antecedente_familiar_atencion_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY antecedente_familiar
    ADD CONSTRAINT antecedente_familiar_atencion_fk FOREIGN KEY (atencion) REFERENCES atencion(codigo);


--
-- Name: antecedente_familiar_tipo_afeccion_familiar_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY antecedente_familiar
    ADD CONSTRAINT antecedente_familiar_tipo_afeccion_familiar_fk FOREIGN KEY (tipo_afeccion_familiar) REFERENCES tipo_afeccion_familiar(codigo);


--
-- Name: antecedente_perinatologico_atencion_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY antecedente_perinatologico
    ADD CONSTRAINT antecedente_perinatologico_atencion_fk FOREIGN KEY (atencion) REFERENCES atencion(codigo);


--
-- Name: antecedente_perinatologico_tipo_presentacion_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY antecedente_perinatologico
    ADD CONSTRAINT antecedente_perinatologico_tipo_presentacion_fk FOREIGN KEY (tipo_presentacion) REFERENCES tipo_presentacion(codigo);


--
-- Name: antecedente_perinatologico_tipo_terminacion_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY antecedente_perinatologico
    ADD CONSTRAINT antecedente_perinatologico_tipo_terminacion_fk FOREIGN KEY (tipo_terminacion) REFERENCES tipo_terminacion(codigo);


--
-- Name: antecedente_personal_atencion_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY antecedente_personal
    ADD CONSTRAINT antecedente_personal_atencion_fk FOREIGN KEY (atencion) REFERENCES atencion(codigo);


--
-- Name: antecedente_personal_tipo_afeccion_personal_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY antecedente_personal
    ADD CONSTRAINT antecedente_personal_tipo_afeccion_personal_fk FOREIGN KEY (tipo_afeccion_personal) REFERENCES tipo_afeccion_personal(codigo);


--
-- Name: antecedente_siniestro_atencion_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY antecedente_siniestro
    ADD CONSTRAINT antecedente_siniestro_atencion_fk FOREIGN KEY (atencion) REFERENCES atencion(codigo);


--
-- Name: antecedente_siniestro_tipo_antecedente_siniestro_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY antecedente_siniestro
    ADD CONSTRAINT antecedente_siniestro_tipo_antecedente_siniestro_fk FOREIGN KEY (tipo_antecedente_siniestro) REFERENCES tipo_antecedente_siniestro(codigo);


--
-- Name: atencion_persona_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY atencion
    ADD CONSTRAINT atencion_persona_fk FOREIGN KEY (persona) REFERENCES public.persona(codigo);


--
-- Name: evolucion_ambulatoria_antecedente_personal_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY evolucion_ambulatoria
    ADD CONSTRAINT evolucion_ambulatoria_antecedente_personal_fk FOREIGN KEY (antecedente_personal) REFERENCES antecedente_personal(codigo);


--
-- Name: evolucion_ambulatoria_atencion_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY evolucion_ambulatoria
    ADD CONSTRAINT evolucion_ambulatoria_atencion_fk FOREIGN KEY (atencion) REFERENCES atencion(codigo);


--
-- Name: fk_domicilio_personal_localidad; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY seros_te_cuida_persona
    ADD CONSTRAINT fk_domicilio_personal_localidad FOREIGN KEY (domicilio_personal_localidad) REFERENCES public.localidad(codigo) ON UPDATE CASCADE;


--
-- Name: fk_nacionalidad; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY seros_te_cuida_persona
    ADD CONSTRAINT fk_nacionalidad FOREIGN KEY (nacionalidad) REFERENCES public.pais(codigo) ON UPDATE CASCADE;


--
-- Name: fk_persona; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY seros_te_cuida_persona
    ADD CONSTRAINT fk_persona FOREIGN KEY (persona) REFERENCES public.persona(codigo) ON UPDATE CASCADE;


--
-- Name: fk_seros_te_cuida_persona; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY seros_te_cuida_riesgo_cardiovascular
    ADD CONSTRAINT fk_seros_te_cuida_persona FOREIGN KEY (seros_te_cuida_persona) REFERENCES seros_te_cuida_persona(codigo) ON UPDATE CASCADE;


--
-- Name: fk_tipo_documento; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY seros_te_cuida_persona
    ADD CONSTRAINT fk_tipo_documento FOREIGN KEY (tipo_documento) REFERENCES public.tipo_documento(codigo) ON UPDATE CASCADE;


--
-- Name: habito_atencion_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY habito
    ADD CONSTRAINT habito_atencion_fk FOREIGN KEY (atencion) REFERENCES atencion(codigo);


--
-- Name: habito_tipo_habito_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY habito
    ADD CONSTRAINT habito_tipo_habito_fk FOREIGN KEY (tipo_habito) REFERENCES tipo_habito(codigo);


--
-- Name: medicamento_alergia_atencion_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY medicamento_alergia
    ADD CONSTRAINT medicamento_alergia_atencion_fk FOREIGN KEY (atencion) REFERENCES atencion(codigo);


--
-- Name: medicamento_alergia_monodroga_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY medicamento_alergia
    ADD CONSTRAINT medicamento_alergia_monodroga_fk FOREIGN KEY (droga) REFERENCES farmacia.monodroga(codigo);


--
-- Name: medicamento_consume_atencion_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY medicamento_consume
    ADD CONSTRAINT medicamento_consume_atencion_fk FOREIGN KEY (atencion) REFERENCES atencion(codigo);


--
-- Name: medicamento_consume_producto_fk; Type: FK CONSTRAINT; Schema: campanias; Owner: postgres
--

ALTER TABLE ONLY medicamento_consume
    ADD CONSTRAINT medicamento_consume_producto_fk FOREIGN KEY (producto) REFERENCES farmacia.producto(codigo);


--
-- Name: campanias; Type: ACL; Schema: -; Owner: postgres
--

--
-- Name: campanias; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA campanias FROM PUBLIC;
REVOKE ALL ON SCHEMA campanias FROM postgres;
GRANT ALL ON SCHEMA campanias TO postgres;
GRANT USAGE ON SCHEMA campanias TO campanias_seros_te_cuida_pool;
GRANT USAGE ON SCHEMA campanias TO consulta_datos;
GRANT ALL ON SCHEMA campanias TO historia_clinica_universal_auditor;


--
-- Name: seq_antecedente_familiar; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_antecedente_familiar FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_antecedente_familiar FROM postgres;
GRANT ALL ON SEQUENCE seq_antecedente_familiar TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_familiar TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_familiar TO auditoria_medica_internet_internaciones_pool; --Cambio
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_familiar TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_familiar TO historia_clinica_universal_consulta;


--
-- Name: antecedente_familiar; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE antecedente_familiar FROM PUBLIC;
REVOKE ALL ON TABLE antecedente_familiar FROM postgres;
GRANT ALL ON TABLE antecedente_familiar TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE antecedente_familiar TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE antecedente_familiar TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT ON TABLE antecedente_familiar TO historia_clinica_universal_consulta;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE antecedente_familiar TO historia_clinica_universal_auditor;

--
-- Name: seq_antecedente_perinatologico; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_antecedente_perinatologico FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_antecedente_perinatologico FROM postgres;
GRANT ALL ON SEQUENCE seq_antecedente_perinatologico TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_perinatologico TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_perinatologico TO auditoria_medica_internet_internaciones_pool; --correccion
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_perinatologico TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_perinatologico TO historia_clinica_universal_consulta;


--
-- Name: antecedente_perinatologico; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE antecedente_perinatologico FROM PUBLIC;
REVOKE ALL ON TABLE antecedente_perinatologico FROM postgres;
GRANT ALL ON TABLE antecedente_perinatologico TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE antecedente_perinatologico TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE antecedente_perinatologico TO auditoria_medica_historia_clinica_pool;
GRANT SELECT ON TABLE antecedente_perinatologico TO historia_clinica_universal_consulta;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE antecedente_perinatologico TO historia_clinica_universal_auditor;

--
-- Name: seq_antecedente_personal; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_antecedente_personal FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_antecedente_personal FROM postgres;
GRANT ALL ON SEQUENCE seq_antecedente_personal TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_personal TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_personal TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_personal TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_personal TO historia_clinica_universal_consulta;


--
-- Name: antecedente_personal; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE antecedente_personal FROM PUBLIC;
REVOKE ALL ON TABLE antecedente_personal FROM postgres;
GRANT ALL ON TABLE antecedente_personal TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE antecedente_personal TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,INSERT,UPDATE , DELETE ON TABLE antecedente_personal TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE antecedente_personal TO historia_clinica_universal_auditor;
GRANT SELECT ON TABLE antecedente_personal TO historia_clinica_universal_consulta;


--
-- Name: seq_antecedente_siniestro; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_antecedente_siniestro FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_antecedente_siniestro FROM postgres;
GRANT ALL ON SEQUENCE seq_antecedente_siniestro TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_siniestro TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_siniestro TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_siniestro TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_antecedente_siniestro TO historia_clinica_universal_consulta;


--
-- Name: antecedente_siniestro; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE antecedente_siniestro FROM PUBLIC;
REVOKE ALL ON TABLE antecedente_siniestro FROM postgres;
GRANT ALL ON TABLE antecedente_siniestro TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE antecedente_siniestro TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE antecedente_siniestro TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE antecedente_siniestro TO historia_clinica_universal_auditor;
GRANT SELECT ON TABLE antecedente_siniestro TO  historia_clinica_universal_consulta;


--
-- Name: seq_atencion; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_atencion FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_atencion FROM postgres;
GRANT ALL ON SEQUENCE seq_atencion TO postgres;
GRANT ALL ON SEQUENCE seq_atencion TO auditoria_medica_historia_clinica_pool;
GRANT ALL ON SEQUENCE seq_atencion TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_atencion TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_atencion TO historia_clinica_universal_consulta;


--
-- Name: atencion; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE atencion FROM PUBLIC;
REVOKE ALL ON TABLE atencion FROM postgres;
GRANT ALL ON TABLE atencion TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE atencion TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE atencion TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE atencion TO historia_clinica_universal_auditor;
GRANT SELECT ON TABLE atencion TO historia_clinica_universal_consulta


--
-- Name: seq_evolucion_ambulatoria; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_evolucion_ambulatoria FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_evolucion_ambulatoria FROM postgres;
GRANT ALL ON SEQUENCE seq_evolucion_ambulatoria TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_evolucion_ambulatoria TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_evolucion_ambulatoria TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_evolucion_ambulatoria TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_evolucion_ambulatoria TO historia_clinica_universal_consulta;


--
-- Name: evolucion_ambulatoria; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE evolucion_ambulatoria FROM PUBLIC;
REVOKE ALL ON TABLE evolucion_ambulatoria FROM postgres;
GRANT ALL ON TABLE evolucion_ambulatoria TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE evolucion_ambulatoria TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE evolucion_ambulatoria TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE evolucion_ambulatoria TO historia_clinica_universal_auditor;
GRANT SELECT ON TABLE evolucion_ambulatoria TO historia_clinica_universal_consulta;

--
-- Name: seq_habito; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_habito FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_habito FROM postgres;
GRANT ALL ON SEQUENCE seq_habito TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_habito TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_habito TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_habito TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_habito TO historia_clinica_universal_consulta;


--
-- Name: habito; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE habito FROM PUBLIC;
REVOKE ALL ON TABLE habito FROM postgres;
GRANT ALL ON TABLE habito TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE habito TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE habito TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE habito TO historia_clinica_universal_auditor;
GRANT SELECT ON TABLE habito TO historia_clinica_universal_consulta;


--
-- Name: seq_medicamento_alergia; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_medicamento_alergia FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_medicamento_alergia FROM postgres;
GRANT ALL ON SEQUENCE seq_medicamento_alergia TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_medicamento_alergia TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_medicamento_alergia TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_medicamento_alergia TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_medicamento_alergia TO historia_clinica_universal_consulta;


--
-- Name: medicamento_alergia; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE medicamento_alergia FROM PUBLIC;
REVOKE ALL ON TABLE medicamento_alergia FROM postgres;
GRANT ALL ON TABLE medicamento_alergia TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE medicamento_alergia TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE medicamento_alergia TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE medicamento_alergia TO historia_clinica_universal_auditor;
GRANT SELECT ON TABLE medicamento_alergia TO historia_clinica_universal_consulta;


--
-- Name: seq_medicamento_consume; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_medicamento_consume FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_medicamento_consume FROM postgres;
GRANT ALL ON SEQUENCE seq_medicamento_consume TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_medicamento_consume TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_medicamento_consume TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_medicamento_consume TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_medicamento_consume TO historia_clinica_universal_consulta;


--
-- Name: medicamento_consume; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE medicamento_consume FROM PUBLIC;
REVOKE ALL ON TABLE medicamento_consume FROM postgres;
GRANT ALL ON TABLE medicamento_consume TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE medicamento_consume TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE medicamento_consume TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE medicamento_consume TO historia_clinica_universal_auditor;
GRANT SELECT ON TABLE medicamento_consume TO historia_clinica_universal_consulta;


--
-- Name: seq_hc_atencion; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_hc_atencion FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_hc_atencion FROM postgres;
GRANT ALL ON SEQUENCE seq_hc_atencion TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_hc_atencion TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_hc_atencion TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_hc_atencion TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_hc_atencion TO historia_clinica_universal_consulta;


--
-- Name: seq_seros_te_cuida_persona; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_seros_te_cuida_persona FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_seros_te_cuida_persona FROM postgres;
GRANT ALL ON SEQUENCE seq_seros_te_cuida_persona TO postgres;
GRANT SELECT,UPDATE ON SEQUENCE seq_seros_te_cuida_persona TO campanias_seros_te_cuida_pool;
GRANT SELECT ON SEQUENCE seq_seros_te_cuida_persona TO consulta_datos;
GRANT SELECT,USAGE ON SEQUENCE seq_seros_te_cuida_persona TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_seros_te_cuida_persona TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_seros_te_cuida_persona TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_seros_te_cuida_persona TO historia_clinica_universal_consulta;


--
-- Name: seq_seros_te_cuida_riesgo_cardiovascular; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_seros_te_cuida_riesgo_cardiovascular FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_seros_te_cuida_riesgo_cardiovascular FROM postgres;
GRANT ALL ON SEQUENCE seq_seros_te_cuida_riesgo_cardiovascular TO postgres;
GRANT SELECT,UPDATE ON SEQUENCE seq_seros_te_cuida_riesgo_cardiovascular TO campanias_seros_te_cuida_pool;
GRANT SELECT ON SEQUENCE seq_seros_te_cuida_riesgo_cardiovascular TO consulta_datos;
GRANT SELECT,USAGE ON SEQUENCE seq_seros_te_cuida_riesgo_cardiovascular TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_seros_te_cuida_riesgo_cardiovascular TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_seros_te_cuida_riesgo_cardiovascular TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_seros_te_cuida_riesgo_cardiovascular TO historia_clinica_universal_consulta;


--
-- Name: seq_tipo_afeccion_familiar; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_tipo_afeccion_familiar FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_tipo_afeccion_familiar FROM postgres;
GRANT ALL ON SEQUENCE seq_tipo_afeccion_familiar TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_afeccion_familiar TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_afeccion_familiar TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_afeccion_familiar TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_afeccion_familiar TO historia_clinica_universal_consulta;


--
-- Name: seq_tipo_afeccion_personal; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_tipo_afeccion_personal FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_tipo_afeccion_personal FROM postgres;
GRANT ALL ON SEQUENCE seq_tipo_afeccion_personal TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_afeccion_personal TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_afeccion_personal TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_afeccion_personal TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_afeccion_personal TO historia_clinica_universal_consulta;


--
-- Name: seq_tipo_antecedente_siniestro; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_tipo_antecedente_siniestro FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_tipo_antecedente_siniestro FROM postgres;
GRANT ALL ON SEQUENCE seq_tipo_antecedente_siniestro TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_antecedente_siniestro TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_antecedente_siniestro TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_antecedente_siniestro TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_antecedente_siniestro TO historia_clinica_universal_consulta;


--
-- Name: seq_tipo_habito; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_tipo_habito FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_tipo_habito FROM postgres;
GRANT ALL ON SEQUENCE seq_tipo_habito TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_habito TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_habito TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_habito TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_habito TO historia_clinica_universal_consulta;


--
-- Name: seq_tipo_presentacion; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_tipo_presentacion FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_tipo_presentacion FROM postgres;
GRANT ALL ON SEQUENCE seq_tipo_presentacion TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_presentacion TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_presentacion TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_presentacion TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_presentacion TO historia_clinica_universal_consulta;


--
-- Name: seq_tipo_terminacion; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON SEQUENCE seq_tipo_terminacion FROM PUBLIC;
REVOKE ALL ON SEQUENCE seq_tipo_terminacion FROM postgres;
GRANT ALL ON SEQUENCE seq_tipo_terminacion TO postgres;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_terminacion TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_terminacion TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_terminacion TO historia_clinica_universal_auditor;
GRANT SELECT,USAGE ON SEQUENCE seq_tipo_terminacion TO historia_clinica_universal_consulta;


--
-- Name: seros_te_cuida_persona; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE seros_te_cuida_persona FROM PUBLIC;
REVOKE ALL ON TABLE seros_te_cuida_persona FROM postgres;
GRANT ALL ON TABLE seros_te_cuida_persona TO postgres;
GRANT SELECT,INSERT,UPDATE ON TABLE seros_te_cuida_persona TO campanias_seros_te_cuida_pool;
GRANT SELECT ON TABLE seros_te_cuida_persona TO consulta_datos;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE seros_te_cuida_persona TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE seros_te_cuida_persona TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE seros_te_cuida_persona TO historia_clinica_universal_consulta;


--
-- Name: seros_te_cuida_riesgo_cardiovascular; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE seros_te_cuida_riesgo_cardiovascular FROM PUBLIC;
REVOKE ALL ON TABLE seros_te_cuida_riesgo_cardiovascular FROM postgres;
GRANT ALL ON TABLE seros_te_cuida_riesgo_cardiovascular TO postgres;
GRANT SELECT,INSERT,UPDATE ON TABLE seros_te_cuida_riesgo_cardiovascular TO campanias_seros_te_cuida_pool;
GRANT SELECT ON TABLE seros_te_cuida_riesgo_cardiovascular TO consulta_datos;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE seros_te_cuida_riesgo_cardiovascular TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE seros_te_cuida_riesgo_cardiovascular TO historia_clinica_universal_consulta;


--
-- Name: tipo_afeccion_familiar; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE tipo_afeccion_familiar FROM PUBLIC;
REVOKE ALL ON TABLE tipo_afeccion_familiar FROM postgres;
GRANT ALL ON TABLE tipo_afeccion_familiar TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE tipo_afeccion_familiar TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE tipo_afeccion_familiar TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE tipo_afeccion_familiar TO historia_clinica_universal_auditor;
GRANT SELECT ON TABLE tipo_afeccion_familiar TO historia_clinica_universal_consulta;


--
-- Name: tipo_afeccion_personal; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE tipo_afeccion_personal FROM PUBLIC;
REVOKE ALL ON TABLE tipo_afeccion_personal FROM postgres;
GRANT ALL ON TABLE tipo_afeccion_personal TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE tipo_afeccion_personal TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE tipo_afeccion_oersonal TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE tipo_afeccion_personal TO historia_clinica_universal_auditor;
GRANT SELECT ON TABLE tipo_afeccion_personal TO historia_clinica_universal_consulta;


--
-- Name: tipo_antecedente_siniestro; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE tipo_antecedente_siniestro FROM PUBLIC;
REVOKE ALL ON TABLE tipo_antecedente_siniestro FROM postgres;
GRANT ALL ON TABLE tipo_antecedente_siniestro TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE tipo_antecedente_siniestro TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE tipo_antecedente_siniestro TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE tipo_antecedente_siniestro TO historia_clinica_universal_auditor;
GRANT SELECT ON TABLE tipo_antecedente_siniestro TO historia_clinica_universal_consulta;


--
-- Name: tipo_habito; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE tipo_habito FROM PUBLIC;
REVOKE ALL ON TABLE tipo_habito FROM postgres;
GRANT ALL ON TABLE tipo_habito TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE tipo_habito TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE tipo_habito TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE tipo_habito TO historia_clinica_universal_auditor;
GRANT SELECT ON TABLE tipo_habito TO historia_clinica_universal_consulta;


--
-- Name: tipo_presentacion; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE tipo_presentacion FROM PUBLIC;
REVOKE ALL ON TABLE tipo_presentacion FROM postgres;
GRANT ALL ON TABLE tipo_presentacion TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE tipo_presentacion TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE tipo_presentacion TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE tipo_presentacion TO historia_clinica_universal_auditor;
GRANT SELECT ON TABLE tipo_presentacion TO historia_clinica_universal_consulta;


--
-- Name: tipo_terminacion; Type: ACL; Schema: campanias; Owner: postgres
--

REVOKE ALL ON TABLE tipo_terminacion FROM PUBLIC;
REVOKE ALL ON TABLE tipo_terminacion FROM postgres;
GRANT ALL ON TABLE tipo_terminacion TO postgres;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE tipo_terminacion TO auditoria_medica_historia_clinica_pool;
GRANT SELECT,INSERT,UPDATE ON TABLE tipo_terminacion TO auditoria_medica_internet_internaciones_pool;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE tipo_terminacion TO historia_clinica_universal_auditor;
GRANT SELECT ON TABLE tipo_terminacion TO historia_clinica_universal_consulta;

--
-- PostgreSQL database dump complete
--

