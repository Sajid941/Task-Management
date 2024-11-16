import { useMemo, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDotFilled } from "react-icons/rx";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import AddTaskModal from "../components/AddTaskModal";
import { getTasks } from "../JS/tasks";
import noDataImg from "../assets/no_data.png";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Tasks = () => {
    const localStorageTasks = getTasks();
    const [tasks, setTasks] = useState(localStorageTasks);

    const handleMarkCompleted = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            imageUrl:
                "https://i.postimg.cc/hGQm2BLZ/undraw-Throw-away-re-x60k.png",
            imageHeight: "200px",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    const updatedTasks = localStorageTasks.filter(
                        (task) => task.id !== id
                    );
                    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
                    setTasks(updatedTasks);
                    toast.success("Task deleted successfully");
                } catch (error) {
                    toast.error(error.message);
                }
            }
        });
    };

    const data = useMemo(() => tasks, [tasks]);

    console.log(data);

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor("#", {
            cell: (info) => info.row.index + 1,
            header: "NO",
        }),
        columnHelper.accessor("title", {
            cell: (info) => info.getValue(),
            header: "Title",
        }),
        columnHelper.accessor("deadline", {
            cell: (info) => info.getValue(),
            header: "Deadline",
        }),
        columnHelper.accessor("priority", {
            cell: (info) => (
                <span
                    className={`py-[2px] px-3 rounded-full font-medium flex items-center w-fit ${
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
                    <RxDotFilled />
                    {info.getValue()}
                </span>
            ),
            header: "Priority",
        }),
        columnHelper.display({
            cell: ({ row }) => (
                <input
                    onChange={() => handleMarkCompleted(row.original.id)}
                    checked={row.original.completed === true}
                    type="checkbox"
                    className="checkbox checkbox-info"
                />
            ),
            header: "Completed",
        }),
        columnHelper.display({
            cell: ({ row }) => (
                <button
                    onClick={() => handleDeleteTask(row.original.id)}
                    className="btn btn-xs btn-outline p-1 border-2 border-red-500  text-red-500"
                >
                    <RiDeleteBin6Line size={15} />
                </button>
            ),
            header: "Action",
        }),
    ];

    const [filtering, setFiltering] = useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: filtering,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
        onGlobalFilterChange: setFiltering,
    });

    return (
        <section className="my-10 mx-5">
            <div className="md:flex justify-between">
                <div className="md:flex gap-5">
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search"
                            value={filtering}
                            onChange={(e) => setFiltering(e.target.value)}
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
                    <div className="form-control w-full mt-5 md:mt-0 ">
                            <select
                            onChange={(e)=>setFiltering(e.target.value)}
                                className={`select select-bordered w-full`}
                                defaultValue=""

                            >
                                <option value="">
                                    All Priority
                                </option>
                                <option value="Normal">Normal</option>
                                <option value="High">High</option>
                                <option value="Low">Low</option>
                                <option value="Urgent">Urgent</option>
                            </select>

                        </div>
                </div>
                <div className="mt-5 md:mt-0 w-full md:w-auto">
                    <button
                        onClick={() =>
                            document.getElementById("my_modal_3").showModal()
                        }
                        className="btn w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white"
                    >
                        <IoMdAdd size={20} /> Assign Task
                    </button>
                </div>
            </div>

            {tasks.length === 0 ? (
                <div className="flex justify-center items-center h-[70vh]">
                    <div className="text-center text-gray-500 mt-5">
                        <img src={noDataImg} alt="no_data" className="w-48" />
                        <p>No tasks available</p>
                        <p className="text-sm">
                            Start by adding your first task!
                        </p>
                    </div>
                </div>
            ) : (
                <div className="mt-5">
                    <div className="overflow-x-auto">
                        <table className="table border">
                            <thead className="font-bold text-black">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
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
                    {tasks.length > 5 && (
                        <div className="float-right">
                            <div className="join grid grid-cols-2 mt-5">
                                <button
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    className="join-item btn btn-outline"
                                >
                                    Previous page
                                </button>
                                <button
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    className="join-item btn btn-outline"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <AddTaskModal setTasks={setTasks} />
        </section>
    );
};

export default Tasks;
