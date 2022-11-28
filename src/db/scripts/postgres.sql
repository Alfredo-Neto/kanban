DROP TABLE IF EXISTS PANELS;
CREATE TABLE PANELS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY   NOT NULL,
    TITLE   TEXT NOT NULL
);

DROP TABLE IF EXISTS COLUMNS;
CREATE TABLE COLUMNS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY   NOT NULL,
    TITLE  TEXT NOT NULL,
    PANEL_ID INT  NOT NULL,
    CONSTRAINT FK_PANELS
        FOREIGN KEY(PANEL_ID) 
	        REFERENCES PANELS(ID)
);

DROP TABLE IF EXISTS TASKS;
CREATE TABLE TASKS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY   NOT NULL,
    TITLE  TEXT NOT NULL,
    COLUMN_ID INT  NOT NULL,
    CONSTRAINT FK_COLUMNS
        FOREIGN KEY(COLUMN_ID) 
	        REFERENCES COLUMNS(ID)
);

--create
INSERT INTO PANELS
    (TITLE)
VALUES
    ('Panel1');

INSERT INTO COLUMNS
    (TITLE, PANEL_ID)
VALUES
    ('To do', 1);

INSERT INTO TASKS
    (TITLE, COLUMN_ID)
VALUES
    ('Fazer Kanban', 1);

--read
SELECT * FROM PANELS;
SELECT * FROM COLUMNS;
SELECT * FROM TASKS;

--update
UPDATE COLUMNS
SET TITLE = 'Subida prod', PANEL_ID = 2
WHERE ID = 1;

--delete
DELETE FROM TASKS WHERE ID = 1;