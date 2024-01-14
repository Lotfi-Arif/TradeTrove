import ScheduleTable from "src/components/Schedule";
import CounselorLayout from "src/layouts/Counselor";
import { withApollo } from "utils/hooks/withApollo";

const mySchedule = () => {
  return (
    <>
      <CounselorLayout>
        <ScheduleTable />
      </CounselorLayout>
    </>
  );
};

export default withApollo(mySchedule);