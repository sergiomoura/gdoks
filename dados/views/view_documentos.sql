CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `gdoks_view_documentos` AS
    SELECT 
        `a`.`id` AS `id_documento`,
        `a`.`nome` AS `nome_documento`,
        `a`.`codigo` AS `cod_documento`,
        `b`.`id` AS `id_subareas`,
        `b`.`nome` AS `nome_subarea`,
        `b`.`codigo` AS `cod_subarea`,
        `c`.`id` AS `id_area`,
        `c`.`nome` AS `nome_area`,
        `c`.`codigo` AS `cod_area`,
        `d`.`id` AS `id_projeto`,
        `d`.`nome` AS `nome_projeto`,
        `d`.`codigo` AS `cod_projeto`,
        `d`.`ativo` AS `ativo_projeto`,
        `e`.`nome` AS `nome_subdisciplina`,
        `e`.`id` AS `id_subdisciplina`,
        `f`.`id` AS `id_disciplina`,
        `f`.`nome` AS `nome_disciplina`,
        `f`.`sigla` AS `sigla_disciplina`
    FROM
        (((((`gdoks_documentos` `a`
        JOIN `gdoks_subareas` `b` ON ((`a`.`id_subarea` = `b`.`id`)))
        JOIN `gdoks_areas` `c` ON ((`b`.`id_area` = `c`.`id`)))
        JOIN `gdoks_projetos` `d` ON ((`c`.`id_projeto` = `d`.`id`)))
        JOIN `gdoks_subdisciplinas` `e` ON ((`a`.`id_subdisciplina` = `e`.`id`)))
        JOIN `gdoks_disciplinas` `f` ON ((`e`.`id_disciplina` = `f`.`id`)))