Executing SQL script in server
ERROR: Error 1064: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'VISIBLE,
  INDEX `fk_MACHINERY_MACHINERY_TYPE1_idx` (`machinery_type` ASC) VISIB' at line 10
SQL Code:
        -- -----------------------------------------------------
        -- Table `delfos`.`MACHINERY`
        -- -----------------------------------------------------
        CREATE TABLE IF NOT EXISTS `delfos`.`MACHINERY` (
          `id` INT(11) NOT NULL,
          `machinery_type` INT(11) NULL,
          `id_user` INT(11) NOT NULL,
          `auto_payment` TIMESTAMP NULL,
          PRIMARY KEY (`id`),
          INDEX `fk_maquinaria_users_idx` (`id_user` ASC) VISIBLE,
          INDEX `fk_MACHINERY_MACHINERY_TYPE1_idx` (`machinery_type` ASC) VISIBLE,
          CONSTRAINT `fk_maquinaria_users`
            FOREIGN KEY (`id_user`)
            REFERENCES `delfos`.`USERS` (`id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
          CONSTRAINT `fk_MACHINERY_MACHINERY_TYPE1`
            FOREIGN KEY (`machinery_type`)
            REFERENCES `delfos`.`MACHINERY_TYPE` (`id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE)
        ENGINE = InnoDB

SQL script execution finished: statements: 7 succeeded, 1 failed

Fetching back view definitions in final form.
Nothing to fetch