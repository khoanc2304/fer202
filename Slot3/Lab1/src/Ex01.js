function EmployeeDetails() {
  const employee = { name: "John Doe", age: 30, department: "IT" };

  return (
    <div>
      <h1>{employee.name}</h1>
      <p>Age: {employee.age}</p>
      <p>Department: {employee.department}</p>
    </div>
  );
}

export default EmployeeDetails;