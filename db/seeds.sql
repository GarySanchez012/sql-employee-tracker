INSERT INTO department (name)
VALUES
  ('Electrical'),
  ('Plumbing'),
  ('Paint'),
  ('Lawn')

INSERT INTO role (title, salary, department_id)
VALUES
  ('Electrician', 100000, 1),
  ('Plumber', 90000, 2),
  ('Painter', 80000, 3),
  ('Landscaper', 70000, 4)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Charles', 'LeRoi', 2, NULL),
  ('Dora', 'Carrington', 3, NULL),
  ('Montague', 'Summers', 4, NULL),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 1),
  ('Katherine', 'Mansfield', 2, 2),
  ('Edward', 'Bellamy', 3, 3),
  ('Octavia', 'Butler', 4, 4)