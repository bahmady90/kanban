
type TaskStatusInputFieldProps = {
  currentStatus: string;
  allStatuses: Array<string>;
  handleSetStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function TaskStatusInputField({
  currentStatus,
  allStatuses,
  handleSetStatus,
}: TaskStatusInputFieldProps) {
  
  return (
     <form>
          <select onChange={(e) => handleSetStatus(e)} value={currentStatus} className="dark:bg-dark-dark-grey bg-white border focus:border-main-purple dark:text-white text-sm rounded-lg block w-full p-2.5 outline-none">
              {allStatuses.map((status, index) => 
                  <option className=" focus:bg-white" value={status} key={index}>{status}</option>
              )}
          </select>
      </form> 
  );
}












