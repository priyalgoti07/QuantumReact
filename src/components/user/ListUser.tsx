import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useTable, Column, CellProps } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { deleteSubuser } from '../../userData/subUserSlice';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get subuser data from Redux store
  const subUserList = useAppSelector((state) => state.subuser.subusers);

  const handleEdit = (id: string) => {
    navigate(`/user/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteSubuser(id)); // Pass only the id
  };

  // Define columns for the table
  const columns: Column<SubUser>[] = React.useMemo(
    () => [
      { Header: 'Full Name', accessor: 'fullName' },
      { Header: 'Email', accessor: 'emailAdress' },
      { Header: 'Phone Number', accessor: 'phoneNumber' },
      { Header: 'Country', accessor: 'country' },
      { Header: 'State', accessor: 'state' },
      { Header: 'City', accessor: 'city' },

      {
        Header: '',
        id: 'edit',
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.original.id)}
              className="text-black-600 hover:underline"
            >
              <EditIcon />
            </button>
          </div>
        ),
      },
      {
        Header: '',
        id: 'action',
        Cell: ({ row }) => {
          const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

          const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
          };

          const handleClose = () => {
            setAnchorEl(null);
          };

          return (
            <div className="flex space-x-2">
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >

                <MenuItem onClick={() => { handleEdit(row.original.id); handleClose(); }}>
                  <button
                    onClick={() => handleEdit(row.original.id)}
                    className="text-black-600 hover:underline"
                  >
                    <EditIcon fontSize="small" /> Edit
                  </button>
                </MenuItem>
                <MenuItem onClick={() => { handleDelete(row.original.id); handleClose(); }}>
                  <button
                    onClick={() => handleDelete(row.original.id)}
                    className="text-[#FF5F3C] hover:underline"
                  >
                    <DeleteIcon fontSize="small" />  Delete</button>
                </MenuItem>
              </Menu>
            </div>
          );
        },
      },

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
  } = useTable<SubUser>({ columns, data: subUserList });

  return (
    <div className="px-40 py-2">
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
