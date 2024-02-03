import React from 'react';
import "./index.scss";

interface TableProps {
    columns: {
        header: string,
        accessor: string,
        render?: (row: any, rowIndex: number)=>{}
    }[]
    data: any[]
}

const Table = ({columns, data}: TableProps) => {
    const renderColGroup = () => {
        return <colgroup>
            {columns?.map((column, index) => {
                return <col key={index} data-col={column.accessor} className={`col col-${column.accessor}`} />
            })}
        </colgroup>;
    }

    const renderTableHead = () => {
        return <thead>
            <tr>
                {columns?.map((column, index) => {
                    return <th key={index} data-col={column.accessor}>{column.header}</th>
                })}
            </tr>
        </thead>;
    }

    const renderTableBody = () => {
        return <tbody>
            {data?.map((row, rowIndex) => {
                return <tr key={rowIndex}>
                    {columns?.map((column, index) => {
                        return <td key={index} data-col={column.accessor}>{column?.render ? column?.render(row, rowIndex) : row[column.accessor]}</td>
                    })}
                </tr>
            })}
        </tbody>;
    }

    return (
        <div className='table-wrap'>
            <table>
                {renderColGroup()}
                {renderTableHead()}
                {renderTableBody()}
            </table>
        </div>
    );
};

export default Table;
