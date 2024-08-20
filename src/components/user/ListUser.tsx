import React from 'react';
import { useAppSelector } from '../../utils/hooks';
import { useTable, Column } from 'react-table';

interface SubUser {
  fullName: string;
  emailAdress: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  company: string;
  id: string;
}

const ListUser: React.FC = () => {
  // Get subuser data from Redux store
  const subUserList = useAppSelector((state) => state.subuser.subusers);

  // Define columns for the table
  const columns: Column<SubUser>[] = React.useMemo(
    () => [
      { Header: 'Full Name', accessor: 'fullName' },
      { Header: 'Email', accessor: 'emailAdress' },
      { Header: 'Phone Number', accessor: 'phoneNumber' },
      { Header: 'Company', accessor: 'company' },
    ],
    []
  );

  // Table instance with data and columns
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: subUserList });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">List of Subusers</h2>
      <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
        <thead className="bg-[#F4F6F8] text-[#637381]">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="py-3 px-4 border-b border-gray-200 text-left">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="py-2 px-4 border-b border-gray-200">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;
