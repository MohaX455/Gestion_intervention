-- Creation de la base de données
create database if not exists Intervention;
use Intervention;

create table if not exists Responsable (
    id int auto_increment primary key,
    admin_name varchar(50) not null unique,
    admin_email varchar(100) not null unique,
    admin_password varchar(100) not null,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- -- Table : client
-- create table if not exists client (
--   id int auto_increment primary key,
--   nom varchar(30) not null,
--   email varchar(100) not null unique,
--   mot_de_passe varchar(100) not null,
--   id_intervention int,
--   foreign key(id_intervention) references intervention(id)
-- );

-- -- Table : technicien
-- create table if not exists technicien (
--   id int auto_increment primary key,
--   nom varchar(30) not null,
--   specialiste varchar(100) not null,
--   email varchar(100) not null unique,
--   telephone varchar(20),
--   mot_de_passe varchar(100) not null
-- );

-- -- Table : intervention
-- create table if not exists intervention (
--     id int auto_increment primary key,
--     type enum('maintenance', 'projet'),
--     statut varchar(50),
--     description_intervention text,
--     date_intervention date,
--     client_id int,
--     technicien_id int,
--     foreign key (client_id) references client(id),
--     foreign key (technicien_id) references technicien(id)
-- );

-- -- Table association : affecter
-- create table if not exists affecter (
--     date_affectation date not null,
--     statut_affectation varchar(20) not null,
--     id_technicien int,
--     id_intervention int,
--     primary key(id_technicien, id_intervention),
--     foreign key(id_technicien) references technicien(id),
--     foreign key(id_intervention) references intervention(id)
-- );

-- -- Table : utilisateur

-- create table if not exists utilisateur (
--     id int auto_increment primary key,
--     nom varchar(30) not null,
--     email varchar(100) not null unique,
--     mot_de_passe varchar(100) not null,
--     role enum('admin', 'secretaire')
-- );

-- -- Table association : transférer demande
-- create table if not exists transferer_demande (
--     date_transfere date not null,
-- );

-- -- Table : devis
-- create table if not exists devis (
--     id int auto_increment primary key,
--     montant_devis decimal(10, 2) not null,
--     date_creation date not null,
-- )