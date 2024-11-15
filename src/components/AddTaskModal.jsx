import { useForm } from "react-hook-form";

const AddTaskModal = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Add Task</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <div className="form-control w-full mt-2">
                            <div className="label">
                                <span className="label-text">Title</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Your Title"
                                className={`input input-bordered w-full ${
                                    errors.title && "input-error"
                                }`}
                                {...register("title", {
                                    required: "Title is required",
                                })}
                            />
                            {errors.title && (
                                <span className="text-xs ml-1 mt-2 text-red-500">
                                    {errors.title.message}
                                </span>
                            )}
                        </div>
                        <div className="form-control w-full mt-2">
                            <div className="label">
                                <span className="label-text">Deadline</span>
                            </div>
                            <input
                                type="date"
                                className={`input input-bordered w-full ${
                                    errors.deadline && "input-error"
                                }`}
                                {...register("deadline", {
                                    required: "Deadline is required",
                                })}
                                min={new Date().toISOString().split("T")[0]}
                            />
                            {errors.deadline && (
                                <span className="text-xs ml-1 mt-2 text-red-500">
                                    {errors.deadline.message}
                                </span>
                            )}
                        </div>
                        <div className="form-control w-full mt-2">
                            <div className="label">
                                <span className="label-text">Priority</span>
                            </div>
                            <select
                                className={`select select-bordered w-full ${errors.priority && "select-error"}`}
                                defaultValue=""
                                {...register("priority", {
                                    required: "Priority is required",
                                })}
                            >
                                <option disabled value="">
                                    Select Priority
                                </option>
                                <option value="Normal">Normal</option>
                                <option value="High">High</option>
                                <option value="Low">Low</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                            {errors.priority && (
                                <span className="text-xs ml-1 mt-2 text-red-500">
                                    {errors.priority.message}
                                </span>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="btn w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white"
                        >
                            Add Task
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default AddTaskModal;
