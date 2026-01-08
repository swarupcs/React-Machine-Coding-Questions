import DataTable from './DataTable';
import users from './users';
import houses from './houses';


const userColumns= [
  {
    label: 'ID',
    key: 'id',
    renderCell: (user) => user.id,
    comparator: (a, b, direction) =>
      direction === 'asc' ? a.id - b.id : b.id - a.id,
  },
  {
    label: 'Name',
    key: 'name',
    renderCell: (user) => user.name,
    comparator: (a, b, direction) =>
      direction === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
  },
  {
    label: 'Age',
    key: 'age',
    renderCell: (user) => user.age,
    comparator: (a, b, direction) =>
      direction === 'asc' ? a.age - b.age : b.age - a.age,
  },
  {
    label: 'Occupation',
    key: 'occupation',
    renderCell: (user) => user.occupation,
    comparator: (a, b, direction) =>
      direction === 'asc'
        ? a.occupation.localeCompare(b.occupation)
        : b.occupation.localeCompare(a.occupation),
  },
];


const houseColumns = [
  {
    label: 'ID',
    key: 'id',
    renderCell: (house) => house.id,
    comparator: (a, b, direction) =>
      direction === 'asc' ? a.id - b.id : b.id - a.id,
  },
  {
    label: 'Street',
    key: 'street',
    renderCell: (house) => house.street,
    comparator: (a, b, direction) =>
      direction === 'asc'
        ? a.street.localeCompare(b.street)
        : b.street.localeCompare(a.street),
  },
  {
    label: 'City',
    key: 'city',
    renderCell: (house) => house.city,
    comparator: (a, b, direction) =>
      direction === 'asc'
        ? a.city.localeCompare(b.city)
        : b.city.localeCompare(a.city),
  },
  {
    label: 'State',
    key: 'state',
    renderCell: (house) => house.state,
    comparator: (a, b, direction) =>
      direction === 'asc'
        ? a.state.localeCompare(b.state)
        : b.state.localeCompare(a.state),
  },
  {
    label: 'Built Year',
    key: 'built_year',
    renderCell: (house) => house.built_year,
    comparator: (a, b, direction) =>
      direction === 'asc'
        ? a.built_year - b.built_year
        : b.built_year - a.built_year,
  },
];

export default function App() {
  return (
    <div>
      <h2>Users</h2>
      <DataTable data={users} columns={userColumns} />
      <br />
      <h2>Houses</h2>
      <DataTable data={houses} columns={houseColumns} />
    </div>
  );
}
