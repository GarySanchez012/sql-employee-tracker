const db = require("./db/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

const list = [
  {
    type: "list",
    name: "hardware",
    message: "What would you like to do?",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
    ],
  },
];

const department = [
  {
    type: "input",
    name: "department",
    message: "What is the new department?",
  },
];

const role = [
  {
    type: "input",
    name: "role",
    message: "What is the new role?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary?",
  },
  {
    type: "input",
    name: "department_id",
    message: "What is the department id?",
  },
];

const employee = [
  {
    type: "input",
    name: "first_name",
    message: "What is the employees first name?",
  },
  {
    type: "input",
    name: "last_name",
    message: "What is the employees last name?",
  },
  {
    type: "input",
    name: "role_id",
    message: "What is the employees role id?",
  },
  {
    type: "list",
    name: "manager_or_employee",
    message: "is this a manager or employee?",
    choices: ["manager", "employee"],
  },
  {
    type: "number",
    name: "manager_id",
    message: "what's the manager id?",
    when: (answers) => answers.manager_or_employee === "employee",
  },
];
const updateEmployee = [
  {
    type: "number",
    name: "update_employee_id",
    message: "What is the employees id?"
  },
  {
    type: "number",
    name: "update_employee_role",
    message: "What is the employees new role id?"
  }
]

viewDepartments = () => {
  db.promise()
    .query(`SELECT * FROM department;`)
    .then(([rows, fields]) => {
      console.table(rows);
    })
    .catch(console.log);
};
viewRoles = () => {
  db.promise()
    .query(`SELECT * FROM role;`)
    .then(([rows, fields]) => {
      console.table(rows);
    })
    .catch(console.log);
};
viewEmployees = () => {
  db.promise()
    .query(`SELECT * FROM employee;`)
    .then(([rows, fields]) => {
      console.table(rows);
    })
    .catch(console.log);
};
addDepartment = () => {
  inquirer.prompt(department).then((answers) => {
    db.promise()
      .query(
        `INSERT INTO department (name)
          VALUES
          ('${answers.department}')`
      )
      .then(() => {
        viewDepartments();
      });
  });
};
addRole = () => {
  inquirer.prompt(role).then((answers) => {
    db.promise()
      .query(
        `INSERT INTO role (title, salary, department_id)
          VALUES
          ('${answers.role}', ${answers.salary}, ${answers.department_id})`
      )
      .then(() => {
        viewRoles();
      });
  });
};
addEmployee = () => {
  inquirer.prompt(employee).then((answers) => {
    if (answers.manager_or_employee === "manager") {
      answers.manager_id = "NULL";
    }

    db.promise()
      .query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
          VALUES
          ('${answers.first_name}', '${answers.last_name}', ${answers.role_id}, ${answers.manager_id})`
      )
      .then(() => {
        viewEmployees();
      });
  });
};
updateEmployeeRole = () => {
  inquirer.prompt(updateEmployee).then((answers) => {
    db.promise()
      .query(
        `UPDATE employee
        SET role_id = ${answers.update_employee_role}
        WHERE id = ${answers.update_employee_id};`
      )
      .then(() => {
        viewEmployees();
      });
  });
};


const generalPrompt = () => {
  inquirer.prompt(list).then((answers) => {
    switch (answers.hardware) {
      case "view all departments":
        viewDepartments();
        break;
      case "view all roles":
        viewRoles();
        break;
      case "view all employees":
        viewEmployees();
        break;
      case "add a department":
        addDepartment();
        break;
      case "add a role":
        addRole();
        break;
      case "add an employee":
        addEmployee();
        break;
      case "update an employee role":
        updateEmployeeRole();
        break;
    }
  });
};

generalPrompt();

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
});
