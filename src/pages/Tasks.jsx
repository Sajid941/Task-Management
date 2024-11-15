import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { IoMdAdd } from "react-icons/io";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

const Tasks = () => {
    const { data: tasks = [] } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await axios.get("tasks.json");
            return res.data;
        },
    });

    const data = useMemo(() => tasks, [tasks]);

    console.log(data);

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor("#", {
            cell: (info) => info.row.index + 1,
            header: "NO",
        }),
        columnHelper.accessor("task", {
            cell: (info) => info.getValue(),
            header: "Task",
        }),
        columnHelper.accessor("deadline", {
            cell: (info) => info.getValue(),
            header: "Deadline",
        }),
        columnHelper.accessor("priority", {
            cell: (info) => (
                <span
                    className={`py-[2px] px-3 rounded-full font-medium ${
                        info.getValue() === "Urgent" &&
                        "bg-red-100 text-red-600"
                    } 
                    ${
                        info.getValue() === "Normal" &&
                        "bg-blue-100 text-blue-600"
                    }
                    ${
                        info.getValue() === "High" &&
                        "bg-yellow-100 text-yellow-600"
                    }
                    ${
                        info.getValue() === "Low" &&
                        "bg-green-100 text-green-600"
                    }
                    
                    `}
                >
                    {info.getValue()}
                </span>
            ),
            header: "Priority",
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <section className="mt-10 mx-5">
            <div className="md:flex justify-between">
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                </div>
                <div className="mt-5 md:mt-0 w-full md:w-auto">
                    <button className="btn w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white">
                        <IoMdAdd size={20} /> Assign Task
                    </button>
                </div>
            </div>

            <div className="mt-5">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className="font-bold text-black">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Tasks;
