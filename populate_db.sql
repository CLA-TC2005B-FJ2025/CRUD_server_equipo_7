USE SHE;
GO

-- Limpiar las tablas (por si se corren múltiples veces)
DELETE FROM RESPUESTAS;
DELETE FROM PREGUNTAS;
DELETE FROM ENCUESTA;
DELETE FROM DEPARTAMENTO;
DELETE FROM PROFESORES;
DELETE FROM ESTUDIANTES;
GO

-- Insertar ESTUDIANTES
INSERT INTO ESTUDIANTES (matricula, nombre1, nombre2, apellido1, apellido2, correoInst) VALUES
('A01560000', 'Carlos', 'Alejandro', 'Ortiz', 'Caro', 'A01560000@tec.mx'),
('A01563607', 'Carlos', 'Alejandro', 'Ortiz', 'Caro', 'A01563607@tec.mx');
GO

-- Insertar PROFESORES
INSERT INTO PROFESORES (matricula, nombre1, nombre2, apellido1, apellido2, correoInst, departamento) VALUES
('A01563388', 'Alonso', 'Alejandro', 'Alarcon', 'Parra', 'A01563388@tec.mx', 4),
('A01563581', 'Samuel', 'Isaac', 'Lopez', 'Mar', 'A01563581@tec.mx', 4);
GO

-- Insertar DEPARTAMENTO
INSERT INTO DEPARTAMENTO (idDepartamento, nombreDepartamento, coordinador) VALUES
(1, 'Academico', 'A01563530'),
(4, 'Cultura', 'A01569104');
GO

-- Insertar ENCUESTA
INSERT INTO ENCUESTA (materia, profesor, categoria) VALUES
(1, 'A01563581', 'Cultura');
GO

-- Insertar PREGUNTAS
INSERT INTO PREGUNTAS (idEncuesta, pregunta, numPregunta) VALUES
(1, 'Mi profesor(a) es puntual a la hora de entrar y salir de clases', 1);
GO

-- Insertar RESPUESTAS
INSERT INTO RESPUESTAS (idEncuesta, numPregunta, calificacion, comentarios, estudiante) VALUES
(1, 1, 10, 'Me gusta como enseña el profe Sam', 'A01563607');
GO