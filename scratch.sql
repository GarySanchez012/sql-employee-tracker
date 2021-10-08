SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name, role.salary, CONCAT_WS(' ', managers.first_name, managers.last_name) as manager_name
FROM employee AS employees
LEFT JOIN employee AS managers ON employees.manager_id = managers.id
INNER JOIN role ON employees.role_id = role.id
INNER JOIN department ON role.department_id = department.id;