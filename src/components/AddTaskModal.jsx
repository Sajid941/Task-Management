const AddTaskModal = () => {
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
                    <form className="">
                        <div className="form-control w-full mt-2">
                            <div className="label">
                                <span className="label-text">Title</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Your Title"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control w-full mt-2">
                            <div className="label">
                                <span className="label-text">Deadline</span>
                            </div>
                            <input
                                type="date"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control w-full mt-2">
                            <div className="label">
                                <span className="label-text">Priority</span>
                            </div>
                            <select className="select select-bordered w-full">
                                <option selected value="Normal">
                                    Normal
                                </option>
                                <option value="High">High</option>
                                <option value="Low">Low</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default AddTaskModal;
